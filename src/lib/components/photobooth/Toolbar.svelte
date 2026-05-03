<script lang="ts">
	import {
		LayoutGrid,
		LayoutList,
		PlusSquare,
		Type,
		Heart,
		Star,
		Square,
		PenTool,
		Download,
		Trash2,
		Undo2,
		Redo2
	} from 'lucide-svelte';

	export let onSetLayout: (detail: { type: 'strip' | 'grid2x2' | 'clear' }) => void = () => {};
	export let onAddCustomSlot: () => void = () => {};
	export let onAddText: (detail: { text: string; color: string }) => void = () => {};
	export let onAddShape: (detail: { type: 'heart' | 'star' | 'square'; color: string; borderColor: string; borderWidth: number; shadowEnabled: boolean }) => void = () => {};
	export let onSetDrawingMode: (detail: { enabled: boolean; color: string; brushWidth: number }) => void = () => {};
	export let onDeleteSelected: () => void = () => {};
	export let onDownload: () => void = () => {};
	export let onSetSize: (detail: { width: number; height: number }) => void = () => {};
	export let onSetBackgroundColor: (color: string) => void = () => {};
	export let onUndo: () => void = () => {};
	export let onRedo: () => void = () => {};
	export let canUndo = false;
	export let canRedo = false;

	let isDrawing = false;
	let drawColor = '#10b981';
	let drawWidth = 5;
	let shapeColor = '#ef4444';
	let shapeBorderEnabled = false;
	let shapeBorderColor = '#ffffff';
	let shapeBorderWidth = 3;
	let shapeShadowEnabled = false;

	function handleBackgroundColorChange(e: Event) {
		const target = e.target as HTMLInputElement;
		onSetBackgroundColor(target.value);
	}

	function toggleDrawing() {
		isDrawing = !isDrawing;
		onSetDrawingMode({ enabled: isDrawing, color: drawColor, brushWidth: drawWidth });
	}

	function updateDrawingParams() {
		if (isDrawing) {
			onSetDrawingMode({ enabled: true, color: drawColor, brushWidth: drawWidth });
		}
	}
</script>

<div class="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-4">
	<!-- Layouts -->
	<div class="space-y-3">
		<h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500">Layouts</h3>
		<div class="grid grid-cols-2 gap-2">
			<button
				on:click={() => onSetLayout({ type: 'strip' })}
				class="flex items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-sm text-white hover:bg-zinc-700"
			>
				<LayoutList size={16} /> Strip (3)
			</button>
			<button
				on:click={() => onSetLayout({ type: 'grid2x2' })}
				class="flex items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-sm text-white hover:bg-zinc-700"
			>
				<LayoutGrid size={16} /> Grid (2x2)
			</button>
			<button
				on:click={() => onSetLayout({ type: 'clear' })}
				class="col-span-2 flex items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-sm text-zinc-400 hover:bg-zinc-700 hover:text-white"
			>
				Clear Canvas
			</button>
			<button
				on:click={() => onAddCustomSlot()}
				class="col-span-2 flex items-center justify-center gap-2 rounded border border-emerald-500/30 bg-emerald-500/10 p-2 text-sm text-emerald-400 hover:bg-emerald-500/20"
			>
				<PlusSquare size={16} /> Add Custom Slot
			</button>
		</div>
	</div>

	<!-- Canvas Options (Size & Background) -->
	<div class="space-y-3">
		<h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500">Canvas Options</h3>
		<div class="flex items-center justify-between rounded border border-white/10 bg-zinc-800 p-2 text-sm text-white">
			<span>Background Color</span>
			<input
				type="color"
				value="#18181b"
				on:input={handleBackgroundColorChange}
				class="h-6 w-6 cursor-pointer rounded border border-white/10 bg-zinc-900 p-0.5"
				title="Background Color"
			/>
		</div>
		<div class="grid grid-cols-3 gap-2">
			<button
				on:click={() => onSetSize({ width: 600, height: 800 })}
				class="flex flex-col items-center gap-1 rounded border border-white/10 bg-zinc-800 p-2 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
			>
				<div class="h-6 w-4 border-2 border-current rounded-sm"></div>
				Portrait
			</button>
			<button
				on:click={() => onSetSize({ width: 600, height: 600 })}
				class="flex flex-col items-center gap-1 rounded border border-white/10 bg-zinc-800 p-2 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
			>
				<div class="h-5 w-5 border-2 border-current rounded-sm"></div>
				Square
			</button>
			<button
				on:click={() => onSetSize({ width: 800, height: 600 })}
				class="flex flex-col items-center gap-1 rounded border border-white/10 bg-zinc-800 p-2 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
			>
				<div class="h-4 w-6 border-2 border-current rounded-sm"></div>
				Landscape
			</button>
		</div>
	</div>

	<!-- Drawing -->
	<div class="space-y-3">
		<h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500">Drawing</h3>
		<div class="flex items-center gap-2">
			<button
				on:click={toggleDrawing}
				class="flex flex-1 items-center justify-center gap-2 rounded border p-2 text-sm transition-colors {isDrawing
					? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
					: 'border-white/10 bg-zinc-800 text-white hover:bg-zinc-700'}"
			>
				<PenTool size={16} /> {isDrawing ? 'Drawing On' : 'Draw'}
			</button>
			<input
				type="color"
				bind:value={drawColor}
				on:change={updateDrawingParams}
				class="h-9 w-9 cursor-pointer rounded border border-white/10 bg-zinc-800 p-1"
			/>
		</div>
		{#if isDrawing}
			<div class="flex items-center gap-2 text-xs text-zinc-400">
				<span>Size:</span>
				<input
					type="range"
					min="1"
					max="20"
					bind:value={drawWidth}
					on:input={updateDrawingParams}
					class="flex-1"
				/>
				<span>{drawWidth}px</span>
			</div>
		{/if}
	</div>

	<!-- Text -->
	<div class="space-y-3">
		<h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500">Text</h3>
		<button
			on:click={() => onAddText({ text: 'Hello!', color: '#ffffff' })}
			class="flex w-full items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-sm text-white hover:bg-zinc-700"
		>
			<Type size={16} /> Add Text
		</button>
	</div>

	<!-- Shapes -->
	<div class="space-y-3">
		<h3 class="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-zinc-500">
			<span>Stickers</span>
			<input
				type="color"
				on:input={(e) => { shapeColor = e.currentTarget.value; }}
				class="h-6 w-6 cursor-pointer rounded border border-white/10 bg-zinc-800 p-0.5"
				title="Fill Color"
			/>
		</h3>

		<!-- Border toggle + color -->
		<div class="flex items-center gap-2">
			<button
				on:click={() => { shapeBorderEnabled = !shapeBorderEnabled; }}
				class="flex flex-1 items-center justify-center gap-1.5 rounded border p-1.5 text-xs transition-colors {shapeBorderEnabled
					? 'border-violet-500 bg-violet-500/20 text-violet-300'
					: 'border-white/10 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
				Border
			</button>
			{#if shapeBorderEnabled}
				<input
					type="color"
					bind:value={shapeBorderColor}
					class="h-7 w-7 cursor-pointer rounded border border-white/10 bg-zinc-800 p-0.5"
					title="Border Color"
				/>
			{/if}
		</div>

		<!-- Border width -->
		{#if shapeBorderEnabled}
			<div class="flex items-center gap-2 text-xs text-zinc-400">
				<span class="shrink-0">Width:</span>
				<input
					type="range"
					min="1"
					max="12"
					bind:value={shapeBorderWidth}
					class="flex-1"
				/>
				<span class="shrink-0">{shapeBorderWidth}px</span>
			</div>
		{/if}

		<!-- Shadow toggle -->
		<div class="flex items-center gap-2">
			<button
				on:click={() => { shapeShadowEnabled = !shapeShadowEnabled; }}
				class="flex flex-1 items-center justify-center gap-1.5 rounded border p-1.5 text-xs transition-colors {shapeShadowEnabled
					? 'border-amber-500 bg-amber-500/20 text-amber-300'
					: 'border-white/10 bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="17" rx="8" ry="3" opacity="0.5"/><circle cx="12" cy="9" r="6"/></svg>
				Drop Shadow
			</button>
		</div>

		<!-- Shape buttons -->
		<div class="grid grid-cols-3 gap-2">
			<button
				on:click={() => onAddShape({ type: 'heart', color: shapeColor, borderColor: shapeBorderEnabled ? shapeBorderColor : '', borderWidth: shapeBorderWidth, shadowEnabled: shapeShadowEnabled })}
				class="flex items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-zinc-300 hover:bg-zinc-700 hover:text-red-400"
				title="Heart"
			>
				<Heart size={20} />
			</button>
			<button
				on:click={() => onAddShape({ type: 'star', color: shapeColor, borderColor: shapeBorderEnabled ? shapeBorderColor : '', borderWidth: shapeBorderWidth, shadowEnabled: shapeShadowEnabled })}
				class="flex items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-zinc-300 hover:bg-zinc-700 hover:text-yellow-400"
				title="Star"
			>
				<Star size={20} />
			</button>
			<button
				on:click={() => onAddShape({ type: 'square', color: shapeColor, borderColor: shapeBorderEnabled ? shapeBorderColor : '', borderWidth: shapeBorderWidth, shadowEnabled: shapeShadowEnabled })}
				class="flex items-center justify-center gap-2 rounded border border-white/10 bg-zinc-800 p-2 text-zinc-300 hover:bg-zinc-700 hover:text-blue-400"
				title="Square"
			>
				<Square size={20} />
			</button>
		</div>
	</div>

	<!-- Actions (Undo, Redo, Delete, Download) -->
	<div class="space-y-3 pt-2 border-t border-white/5">
		<h3 class="text-sm font-bold uppercase tracking-wider text-zinc-500">Actions</h3>
		<div class="grid grid-cols-2 gap-2">
			<button
				on:click={onUndo}
				disabled={!canUndo}
				class="flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm transition-colors
				{canUndo ? 'border-white/10 bg-zinc-800 text-white hover:bg-zinc-700' : 'border-white/5 bg-transparent text-zinc-600 cursor-not-allowed'}"
				title="Undo (Ctrl+Z)"
			>
				<Undo2 size={16} /> Undo
			</button>
			<button
				on:click={onRedo}
				disabled={!canRedo}
				class="flex items-center justify-center gap-2 rounded border px-3 py-2 text-sm transition-colors
				{canRedo ? 'border-white/10 bg-zinc-800 text-white hover:bg-zinc-700' : 'border-white/5 bg-transparent text-zinc-600 cursor-not-allowed'}"
				title="Redo (Ctrl+Shift+Z)"
			>
				<Redo2 size={16} /> Redo
			</button>
			<button
				on:click={onDeleteSelected}
				class="flex items-center justify-center gap-2 rounded border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-all"
				title="Delete Selected (Del)"
			>
				<Trash2 size={16} /> Delete
			</button>
			<button
				on:click={onDownload}
				class="flex items-center justify-center gap-2 rounded bg-emerald-500 px-3 py-2 text-sm font-bold text-zinc-900 hover:bg-emerald-400 transition-all"
				title="Download Image"
			>
				<Download size={16} /> Save
			</button>
		</div>
	</div>
</div>
