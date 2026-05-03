<script lang="ts">
	import { onMount } from 'svelte';
	import * as fabric from 'fabric';

	export let onReady: () => void = () => {};
	export let onLayersChange: (layers: { id: string; name: string; active: boolean; type: string; opacity: number; stroke: string; strokeWidth: number; shadowEnabled: boolean; shadowColor: string; shadowBlur: number; shadowOffsetX: number; shadowOffsetY: number }[]) => void = () => {};
	export let onSelectionUpdate: (detail: { text: string | null; color: string | null; type: string | null; isShape: boolean }) => void = () => {};
	export let onHistoryChange: (detail: { canUndo: boolean; canRedo: boolean }) => void = () => {};

	let canvasElement: HTMLCanvasElement;
	let canvas: fabric.Canvas;

	export let width = 600;
	export let height = 800;

	let containerWidth: number;
	$: scale = containerWidth && width ? Math.min(1, containerWidth / width) : 1;

	// Simple ID generator
	const generateId = () => Math.random().toString(36).substr(2, 9);

	// ── History (Undo / Redo) ──────────────────────────────────────────────────
	const MAX_HISTORY = 50;
	let undoStack: string[] = []; // JSON snapshots
	let redoStack: string[] = [];
	let isRestoringHistory = false;

	export let canUndo = false;
	export let canRedo = false;

	function saveHistory() {
		if (isRestoringHistory || !canvas) return;
		const json = JSON.stringify(canvas.toJSON(['id', 'name', 'isSlot', 'hasImage']));
		undoStack.push(json);
		if (undoStack.length > MAX_HISTORY) undoStack.shift();
		redoStack = [];
		updateHistoryState();
	}

	function updateHistoryState() {
		canUndo = undoStack.length > 1;
		canRedo = redoStack.length > 0;
		onHistoryChange({ canUndo, canRedo });
	}

	function restoreSnapshot(json: string) {
		isRestoringHistory = true;
		canvas.loadFromJSON(JSON.parse(json)).then(() => {
			canvas.renderAll();
			syncLayers();
			isRestoringHistory = false;
			updateHistoryState();
		});
	}

	export function undo() {
		if (undoStack.length <= 1) return;
		const current = undoStack.pop()!;
		redoStack.push(current);
		restoreSnapshot(undoStack[undoStack.length - 1]);
	}

	export function redo() {
		if (redoStack.length === 0) return;
		const next = redoStack.pop()!;
		undoStack.push(next);
		restoreSnapshot(next);
	}

	// Sync layers state to parent
	function syncLayers() {
		if (!canvas) return;
		const activeObj = canvas.getActiveObject();
		const objects = canvas.getObjects();
		const layersData = objects.map((obj: any) => {
			if (!obj.id) obj.id = generateId();
			if (!obj.name) {
				if (obj.type === 'path') obj.name = 'Drawing';
				else obj.name = 'Layer';
			}
			const shadow = (obj as any).shadow;
			return {
				id: obj.id,
				name: obj.name,
				active: obj === activeObj,
				type: obj.type,
				opacity: obj.opacity ?? 1,
				stroke: (obj.stroke as string) || '',
				strokeWidth: obj.strokeWidth ?? 1,
				shadowEnabled: !!shadow,
				shadowColor: shadow?.color || 'rgba(0,0,0,0.55)',
				shadowBlur: shadow?.blur ?? 18,
				shadowOffsetX: shadow?.offsetX ?? 4,
				shadowOffsetY: shadow?.offsetY ?? 6
			};
		});
		onLayersChange(layersData);

		// Sync selection properties (Text and Color)
		if (activeObj) {
			const isText = activeObj.type === 'i-text';
			const isShape = activeObj.type === 'rect' || activeObj.type === 'path' || activeObj.type === 'circle';
			
			onSelectionUpdate({
				// @ts-ignore
				text: isText ? activeObj.text : null,
				color: (isText || isShape) ? (activeObj.fill as string) : null,
				type: activeObj.type || null,
				isShape: isShape
			});
		} else {
			onSelectionUpdate({ text: null, color: null, type: null, isShape: false });
		}
	}

	onMount(() => {
		canvas = new fabric.Canvas(canvasElement, {
			width,
			height,
			backgroundColor: '#18181b', // zinc-900
			preserveObjectStacking: true // Keep selected objects at their z-index
		});

		// Listen to events to keep layers in sync
		canvas.on('object:added', syncLayers);
		canvas.on('object:removed', syncLayers);
		canvas.on('object:modified', syncLayers);
		canvas.on('selection:created', syncLayers);
		canvas.on('selection:updated', syncLayers);
		canvas.on('selection:cleared', syncLayers);

		// Hook history saving to meaningful mutation events
		canvas.on('object:added', saveHistory);
		canvas.on('object:removed', saveHistory);
		canvas.on('object:modified', saveHistory);
		// Save initial empty canvas state
		saveHistory();

		onReady();

		return () => {
			canvas.dispose();
		};
	});

	// API Exposed to Parent Component

	// 1. Add Photo to Canvas (replaces the first available empty slot, or adds freely)
	export async function addPhoto(dataUrl: string) {
		const img = await fabric.FabricImage.fromURL(dataUrl);
		
		const activeObj = canvas.getActiveObject();
		
		// If a photo is currently selected, replace it
		// @ts-ignore
		if (activeObj && activeObj.isSlot && activeObj.hasImage && activeObj.clipPath) {
			const oldScale = activeObj.scaleX!;
			const slotWidth = activeObj.clipPath.width! * oldScale;
			const slotHeight = activeObj.clipPath.height! * oldScale;
			
			const scaleX = slotWidth / img.width!;
			const scaleY = slotHeight / img.height!;
			const scale = Math.max(scaleX, scaleY);
			
			img.scale(scale);

			img.set({
				left: activeObj.left,
				top: activeObj.top,
				originX: 'center',
				originY: 'center',
				// @ts-ignore
				isSlot: true,
				hasImage: true,
				// @ts-ignore
				id: activeObj.id,
				// @ts-ignore
				name: activeObj.name
			});

			const clipPath = new fabric.Rect({
				originX: 'center',
				originY: 'center',
				width: slotWidth / scale,
				height: slotHeight / scale,
				rx: 10 / scale,
				ry: 10 / scale
			});
			
			img.set({ clipPath });

			const index = canvas.getObjects().indexOf(activeObj);
			canvas.remove(activeObj);
			canvas.insertAt(index, img); // Preserve z-index
			canvas.setActiveObject(img);
			canvas.renderAll();
			return;
		}

		// Find first empty slot (a rect tagged as isSlot)
		const slots = canvas.getObjects().filter((obj: any) => obj.isSlot && !obj.hasImage);
		const targetSlot = slots[0];

		if (targetSlot) {
			// Calculate scale to fill the slot (cover)
			const slotWidth = targetSlot.width! * targetSlot.scaleX!;
			const slotHeight = targetSlot.height! * targetSlot.scaleY!;
			
			const scaleX = slotWidth / img.width!;
			const scaleY = slotHeight / img.height!;
			const scale = Math.max(scaleX, scaleY);
			
			img.scale(scale);

			// Center the image at the slot's center
			const center = targetSlot.getCenterPoint();
			img.set({
				left: center.x,
				top: center.y,
				originX: 'center',
				originY: 'center',
				// @ts-ignore
				isSlot: true,
				hasImage: true,
				id: generateId(),
				name: 'Photo'
			});

			// Create a clip path that matches the slot's dimensions exactly
			const clipPath = new fabric.Rect({
				originX: 'center',
				originY: 'center',
				width: slotWidth / scale, // inverse scale because clipPath scales with the object
				height: slotHeight / scale,
				rx: 10 / scale, // rounded corners optionally
				ry: 10 / scale
			});
			
			img.set({ clipPath });

			// Remove the empty placeholder and add the image
			canvas.remove(targetSlot);
			canvas.add(img);
			canvas.setActiveObject(img);
		} else {
			// No empty slot, just add the image to the center, scaled down
			img.scaleToWidth(width / 2);
			img.set({
				left: width / 2,
				top: height / 2,
				originX: 'center',
				originY: 'center',
				// @ts-ignore
				id: generateId(),
				name: 'Photo'
			});
			canvas.add(img);
			canvas.setActiveObject(img);
		}
		canvas.renderAll();
	}

	// 2. Set Layout Presets
	export function setLayout(type: 'strip' | 'grid2x2' | 'clear') {
		canvas.clear();
		canvas.backgroundColor = '#18181b';

		const padding = 20;

		if (type === 'strip') {
			// 3 vertical slots
			const slotWidth = width * 0.4;
			const slotHeight = (height - padding * 4) / 3;
			const startX = width / 2;
			
			for (let i = 0; i < 3; i++) {
				const rect = new fabric.Rect({
					left: startX,
					top: padding + i * (slotHeight + padding) + slotHeight / 2,
					originX: 'center',
					originY: 'center',
					width: slotWidth,
					height: slotHeight,
					fill: '#27272a', // zinc-800
					stroke: '#52525b', // zinc-600
					strokeDashArray: [5, 5],
					rx: 10,
					ry: 10,
				});
				// @ts-ignore custom property
				rect.isSlot = true;
				// @ts-ignore
				rect.id = generateId();
				// @ts-ignore
				rect.name = `Slot ${i + 1}`;
				canvas.add(rect);
			}
		} else if (type === 'grid2x2') {
			// 2x2 grid
			const slotWidth = (width - padding * 3) / 2;
			const slotHeight = (height - padding * 3) / 2;
			
			for (let row = 0; row < 2; row++) {
				for (let col = 0; col < 2; col++) {
					const rect = new fabric.Rect({
						left: padding + col * (slotWidth + padding) + slotWidth / 2,
						top: padding + row * (slotHeight + padding) + slotHeight / 2,
						originX: 'center',
						originY: 'center',
						width: slotWidth,
						height: slotHeight,
						fill: '#27272a',
						stroke: '#52525b',
						strokeDashArray: [5, 5],
						rx: 10,
						ry: 10,
					});
					// @ts-ignore custom property
					rect.isSlot = true;
					// @ts-ignore
					rect.id = generateId();
					// @ts-ignore
					rect.name = `Slot ${row * 2 + col + 1}`;
					canvas.add(rect);
				}
			}
		}
		
		canvas.renderAll();
	}

	// 3. Add Custom Slot
	export function addCustomSlot() {
		const rect = new fabric.Rect({
			left: width / 2,
			top: height / 2,
			originX: 'center',
			originY: 'center',
			width: 200,
			height: 200,
			fill: '#27272a',
			stroke: '#52525b',
			strokeDashArray: [5, 5],
			rx: 10,
			ry: 10,
		});
		// @ts-ignore
		rect.isSlot = true;
		// @ts-ignore
		rect.id = generateId();
		// @ts-ignore
		rect.name = 'Custom Slot';
		canvas.add(rect);
		canvas.setActiveObject(rect);
		canvas.renderAll();
	}

	// 4. Drawing Mode
	export function setDrawingMode(enabled: boolean, color = '#10b981', brushWidth = 5) {
		canvas.isDrawingMode = enabled;
		if (enabled) {
			const brush = new fabric.PencilBrush(canvas);
			brush.color = color;
			brush.width = brushWidth;
			canvas.freeDrawingBrush = brush;
		}
	}

	// 5. Add Text
	export function addText(text = 'Hello!', color = '#ffffff') {
		const iText = new fabric.IText(text, {
			left: width / 2,
			top: height / 2,
			originX: 'center',
			originY: 'center',
			fill: color,
			fontFamily: 'Inter, sans-serif',
			fontSize: 40,
			fontWeight: 700
		});
		// @ts-ignore
		iText.id = generateId();
		// @ts-ignore
		iText.name = `Text: ${text.substring(0, 10)}`;
		canvas.add(iText);
		canvas.setActiveObject(iText);
		canvas.renderAll();
	}

	// 6. Add Shape
	export function addShape(
		type: 'heart' | 'star' | 'square',
		color = '#ef4444',
		borderColor = '',
		borderWidth = 3,
		shadowEnabled = false
	) {
		let shape;
		const center = { x: width / 2, y: height / 2 };

		// Build shadow object if enabled
		const shadow = shadowEnabled
			? new fabric.Shadow({
					color: 'rgba(0,0,0,0.55)',
					blur: 18,
					offsetX: 4,
					offsetY: 6
			  })
			: undefined;

		// Build stroke props
		const strokeProps = borderColor
			? { stroke: borderColor, strokeWidth: borderWidth }
			: {};

		if (type === 'square') {
			shape = new fabric.Rect({
				left: center.x,
				top: center.y,
				originX: 'center',
				originY: 'center',
				width: 100,
				height: 100,
				fill: color,
				rx: 10,
				ry: 10,
				...strokeProps,
				shadow
			});
			// @ts-ignore
			shape.name = 'Square Sticker';
		} else if (type === 'heart') {
			// Heart SVG path
			const path = "M 272.70141,238.71731 C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731 C 152.70146,493.47282 288.63461,528.80451 381.26391,662.02547 C 468.83815,532.20827 609.82641,489.86481 609.82641,358.71731 C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731 C 441.77851,238.71731 400.42481,266.90246 381.26391,309.5313 C 362.10311,266.90236 320.74931,238.7173 272.70141,238.71731 z";
			shape = new fabric.Path(path, {
				left: center.x,
				top: center.y,
				originX: 'center',
				originY: 'center',
				fill: color,
				scaleX: 0.2,
				scaleY: 0.2,
				...strokeProps,
				shadow
			});
			// @ts-ignore
			shape.name = 'Heart Sticker';
		} else if (type === 'star') {
			// Star SVG path
			const path = "M 12 2 L 15.09 8.26 L 22 9.27 L 17 14.14 L 18.18 21.02 L 12 17.77 L 5.82 21.02 L 7 14.14 L 2 9.27 L 8.91 8.26 L 12 2 Z";
			shape = new fabric.Path(path, {
				left: center.x,
				top: center.y,
				originX: 'center',
				originY: 'center',
				fill: color,
				scaleX: 5,
				scaleY: 5,
				...strokeProps,
				shadow
			});
			// @ts-ignore
			shape.name = 'Star Sticker';
		}

		if (shape) {
			// @ts-ignore
			shape.id = generateId();
			canvas.add(shape);
			canvas.setActiveObject(shape);
			canvas.renderAll();
		}
	}

	// 7. Delete Selected Object
	export function deleteSelected() {
		const activeObjects = canvas.getActiveObjects();
		if (activeObjects.length) {
			canvas.discardActiveObject();
			activeObjects.forEach((obj) => {
				canvas.remove(obj);
			});
		}
	}

	// Layer and Object Management API
	function getObjectById(id: string) {
		return canvas.getObjects().find((obj: any) => obj.id === id);
	}

	export function selectObject(id: string) {
		const obj = getObjectById(id);
		if (obj) {
			canvas.setActiveObject(obj);
			canvas.renderAll();
		}
	}

	export function bringForward(id: string) {
		const obj = getObjectById(id);
		if (obj) {
			canvas.bringObjectForward(obj);
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function sendBackwards(id: string) {
		const obj = getObjectById(id);
		if (obj) {
			canvas.sendObjectBackwards(obj);
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function deleteObjectById(id: string) {
		const obj = getObjectById(id);
		if (obj) {
			canvas.remove(obj);
			canvas.renderAll();
		}
	}

	export function setOpacity(id: string, opacity: number) {
		const obj = getObjectById(id);
		if (obj) {
			obj.set({ opacity });
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function setStroke(id: string, color: string, width: number) {
		const obj = getObjectById(id);
		if (obj) {
			obj.set({ stroke: color || undefined, strokeWidth: width });
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function setShadow(
		id: string,
		enabled: boolean,
		color: string,
		blur = 18,
		offsetX = 4,
		offsetY = 6
	) {
		const obj = getObjectById(id);
		if (obj) {
			if (enabled) {
				obj.set({
					shadow: new fabric.Shadow({ color, blur, offsetX, offsetY })
				});
			} else {
				obj.set({ shadow: undefined });
			}
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function updateSelectedText(text: string) {
		const activeObj = canvas.getActiveObject();
		if (activeObj && activeObj.type === 'i-text') {
			// @ts-ignore
			activeObj.set({ text });
			// @ts-ignore
			activeObj.name = `Text: ${text.substring(0, 10)}`;
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function updateSelectedColor(color: string) {
		const activeObj = canvas.getActiveObject();
		if (activeObj && (activeObj.type === 'i-text' || activeObj.type === 'rect' || activeObj.type === 'path')) {
			activeObj.set({ fill: color });
			canvas.renderAll();
			syncLayers();
			saveHistory();
		}
	}

	export function setBackgroundColor(color: string) {
		canvas.backgroundColor = color;
		canvas.renderAll();
		saveHistory();
	}

	export function setSize(newWidth: number, newHeight: number) {
		width = newWidth;
		height = newHeight;
		canvas.setDimensions({ width, height });
		canvas.renderAll();
		saveHistory();
	}

	// 8. Download
	export function download(filename = 'photobooth.png') {
		// Deselect objects to remove selection borders in the downloaded image
		canvas.discardActiveObject();
		canvas.renderAll();

		const dataUrl = canvas.toDataURL({
			format: 'png',
			quality: 1,
			multiplier: 1 // can increase for higher res
		});

		const link = document.createElement('a');
		link.download = filename;
		link.href = dataUrl;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="w-full flex justify-center" bind:clientWidth={containerWidth} style="height: {height * scale}px;">
	<div 
		class="relative overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl"
		style="transform: scale({scale}); transform-origin: top center; width: {width}px; height: {height}px;"
	>
		<canvas bind:this={canvasElement}></canvas>
	</div>
</div>

<svelte:window  
	on:keydown={(e) => {
		if (e.key === 'Delete' || e.key === 'Backspace') {
			// Only delete if we are not editing text
			const activeObj = canvas.getActiveObject();
			// @ts-ignore - isEditing exists on IText
			if (activeObj && activeObj.type === 'i-text' && activeObj.isEditing) {
				return; // Allow backspace in text editing
			}
			deleteSelected();
		}
	}} 
/>
