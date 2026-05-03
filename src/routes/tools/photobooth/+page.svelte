<script lang="ts">
	import Camera from '$lib/components/photobooth/Camera.svelte';
	import CanvasEditor from '$lib/components/photobooth/CanvasEditor.svelte';
	import Toolbar from '$lib/components/photobooth/Toolbar.svelte';
	import LayersPanel from '$lib/components/photobooth/LayersPanel.svelte';
	import { Undo2, Redo2, Download, Trash2 } from 'lucide-svelte';

	let canvasEditor: CanvasEditor;

	type LayerData = {
		id: string; name: string; active: boolean; type: string;
		opacity: number; stroke: string; strokeWidth: number;
		shadowEnabled: boolean; shadowColor: string;
		shadowBlur: number; shadowOffsetX: number; shadowOffsetY: number;
	};

	let layers: LayerData[] = [];
	let activeText: string | null = null;
	let activeColor: string | null = null;
	let canUndo = false;
	let canRedo = false;
	let activeTab: 'camera' | 'tools' | 'layers' = 'camera';
	let panelOpen = true;

	function handleCapture(detail: { dataUrl: string }) {
		canvasEditor?.addPhoto(detail.dataUrl);
	}
	function handleSetLayout(detail: { type: 'strip' | 'grid2x2' | 'clear' }) {
		canvasEditor?.setLayout(detail.type);
	}
	function handleAddCustomSlot() { canvasEditor?.addCustomSlot(); }
	function handleAddText(detail: { text: string; color: string }) {
		canvasEditor?.addText(detail.text, detail.color);
	}
	function handleAddShape(detail: { type: 'heart' | 'star' | 'square'; color: string; borderColor: string; borderWidth: number; shadowEnabled: boolean }) {
		canvasEditor?.addShape(detail.type, detail.color, detail.borderColor, detail.borderWidth, detail.shadowEnabled);
	}
	function handleSetDrawingMode(detail: { enabled: boolean; color: string; brushWidth: number }) {
		canvasEditor?.setDrawingMode(detail.enabled, detail.color, detail.brushWidth);
	}
	function handleDeleteSelected() { canvasEditor?.deleteSelected(); }
	function handleDownload() { canvasEditor?.download('my-photobooth.png'); }
	function handleLayersChange(newLayers: LayerData[]) { layers = newLayers; }
	function handleSetOpacity(id: string, opacity: number) { canvasEditor?.setOpacity(id, opacity); }
	function handleSetStroke(id: string, color: string, width: number) { canvasEditor?.setStroke(id, color, width); }
	function handleSetShadow(id: string, enabled: boolean, color: string, blur: number, offsetX: number, offsetY: number) {
		canvasEditor?.setShadow(id, enabled, color, blur, offsetX, offsetY);
	}
	function handleSelectionUpdate(detail: { text: string | null; color: string | null; type: string | null; isShape: boolean }) {
		activeText = detail.text;
		activeColor = detail.color;
	}
	function handleUpdateText(text: string) { canvasEditor?.updateSelectedText(text); }
	function handleUpdateColor(color: string) { canvasEditor?.updateSelectedColor(color); }
	function handleSetBackgroundColor(color: string) { canvasEditor?.setBackgroundColor(color); }
	function handleSetSize(detail: { width: number; height: number }) { canvasEditor?.setSize(detail.width, detail.height); }
	function handleSelectLayer(id: string) { canvasEditor?.selectObject(id); }
	function handleMoveUp(id: string) { canvasEditor?.bringForward(id); }
	function handleMoveDown(id: string) { canvasEditor?.sendBackwards(id); }
	function handleDeleteLayer(id: string) { canvasEditor?.deleteObjectById(id); }
	function handleCanvasReady() { canvasEditor?.setLayout('strip'); }
	function handleHistoryChange(detail: { canUndo: boolean; canRedo: boolean }) {
		canUndo = detail.canUndo;
		canRedo = detail.canRedo;
	}

	let toastMessage = '';
	let toastVisible = false;
	let toastTimer: ReturnType<typeof setTimeout> | null = null;
	function showToast(msg: string) {
		toastMessage = msg;
		toastVisible = true;
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => { toastVisible = false; }, 2000);
	}
	function handleUndo() {
		if (!canvasEditor || !canUndo) return;
		canvasEditor.undo();
		showToast('↩ Undo');
	}
	function handleRedo() {
		if (!canvasEditor || !canRedo) return;
		canvasEditor.redo();
		showToast('↪ Redo');
	}
</script>

<svelte:head>
	<title>Web Photobooth | Tools | Safarudin</title>
	<meta name="description" content="A fully client-side interactive Web Photobooth tool." />
</svelte:head>

<svelte:window
	on:keydown={(e) => {
		const tag = (e.target as HTMLElement)?.tagName;
		if (tag === 'INPUT' || tag === 'TEXTAREA') return;
		if (e.ctrlKey || e.metaKey) {
			if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
			if ((e.key === 'z' && e.shiftKey) || e.key === 'y') { e.preventDefault(); handleRedo(); }
		}
	}}
/>

<div class="flex flex-col min-h-screen bg-zinc-950">

	<!-- Sticky header -->
	<header class="shrink-0 border-b border-white/5 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-20">
		<div class="container mx-auto flex items-center gap-3 px-4 py-3 sm:px-6">
			<div class="flex-1 min-w-0">
				<h1 class="text-base font-bold text-white leading-none">
					Web Photobooth<span class="text-emerald-500">.</span>
				</h1>
				<p class="text-xs text-zinc-500 mt-0.5 hidden sm:block">100% client-side · private · no upload</p>
			</div>

			<div class="flex items-center gap-1.5">
				<button on:click={handleUndo} disabled={!canUndo}
					class="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all
					{canUndo ? 'border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'border-white/5 bg-transparent text-zinc-600 cursor-not-allowed'}"
					title="Undo (Ctrl+Z)">
					<Undo2 size={13} /><span class="hidden sm:inline">Undo</span>
				</button>
				<button on:click={handleRedo} disabled={!canRedo}
					class="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all
					{canRedo ? 'border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white' : 'border-white/5 bg-transparent text-zinc-600 cursor-not-allowed'}"
					title="Redo (Ctrl+Shift+Z)">
					<Redo2 size={13} /><span class="hidden sm:inline">Redo</span>
				</button>
				<div class="hidden sm:block w-px h-5 bg-white/10 mx-0.5"></div>
				<button on:click={handleDeleteSelected}
					class="hidden sm:flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20 transition-all"
					title="Delete Selected (Del)">
					<Trash2 size={13} /> Delete
				</button>
				<button on:click={handleDownload}
					class="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-xs font-bold text-zinc-900 hover:bg-emerald-400 transition-all">
					<Download size={13} /><span class="hidden sm:inline">Download</span>
				</button>
			</div>
		</div>
	</header>

	<!-- Body: 3-col on desktop, canvas+tabs on mobile -->
	<div class="flex flex-row flex-1 min-h-0">

		<!-- Left sidebar — desktop only -->
		<aside class="hidden lg:flex flex-col w-[320px] xl:w-[360px] shrink-0 border-r border-white/5 overflow-y-auto">
			<div class="p-4 space-y-4">
				<Camera onCapture={handleCapture} />
				<Toolbar
					onSetLayout={handleSetLayout}
					onAddCustomSlot={handleAddCustomSlot}
					onAddText={handleAddText}
					onAddShape={handleAddShape}
					onSetDrawingMode={handleSetDrawingMode}
					onDeleteSelected={handleDeleteSelected}
					onDownload={handleDownload}
					onSetBackgroundColor={handleSetBackgroundColor}
					onSetSize={handleSetSize}
					onUndo={handleUndo}
					onRedo={handleRedo}
					{canUndo}
					{canRedo}
				/>
			</div>
		</aside>

		<!-- Center column: canvas (always) + mobile bottom panel -->
		<div class="flex flex-col flex-1 min-w-0 min-h-0">

			<!-- Canvas area: scrollable on mobile, centered on desktop -->
			<div class="flex-1 overflow-auto bg-black/30" style="touch-action: pan-x pan-y;">
				<div class="flex items-start lg:items-center justify-center p-4 lg:p-6 h-full"
					style="min-width: 640px; min-height: 100%;">
					<div class="relative">
						<!-- Single CanvasEditor instance -->
						<CanvasEditor
							bind:this={canvasEditor}
							width={600}
							height={800}
							onReady={handleCanvasReady}
							onLayersChange={handleLayersChange}
							onSelectionUpdate={handleSelectionUpdate}
							onHistoryChange={handleHistoryChange}
						/>

						<!-- Toast notification -->
						{#if toastVisible}
							<div class="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2
							            rounded-full border border-white/10 bg-zinc-800/90 px-4 py-2
							            text-sm font-medium text-white shadow-xl backdrop-blur-sm toast-anim whitespace-nowrap">
								{toastMessage}
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Mobile bottom panel (hidden on desktop) -->
			<div class="lg:hidden shrink-0 border-t border-white/10 bg-zinc-900">

				<!-- Tab bar + chevron toggle -->
				<div class="flex items-center border-b border-white/5">
					{#each [
						{ id: 'camera', label: 'Camera' },
						{ id: 'tools',  label: 'Tools'  },
						{ id: 'layers', label: 'Layers' },
					] as const as tab (tab.id)}
						<button
							class="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors
							{activeTab === tab.id && panelOpen
								? 'border-b-2 border-emerald-500 text-emerald-400'
								: 'text-zinc-500 hover:text-zinc-300'}"
							on:click={() => {
								if (activeTab === tab.id) { panelOpen = !panelOpen; }
								else { activeTab = tab.id; panelOpen = true; }
							}}
						>
							{tab.label}
						</button>
					{/each}

					<button
						on:click={() => panelOpen = !panelOpen}
						class="px-3 py-2.5 text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
						aria-label="Toggle panel"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
							viewBox="0 0 24 24" fill="none" stroke="currentColor"
							stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
							class="transition-transform duration-300 {panelOpen ? '' : 'rotate-180'}">
							<polyline points="18 15 12 9 6 15"></polyline>
						</svg>
					</button>
				</div>

				<!-- Collapsible content -->
				<div class="overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out"
					style="max-height: {panelOpen ? '42vh' : '0px'}; opacity: {panelOpen ? 1 : 0};">
					<div class="p-3">
						{#if activeTab === 'camera'}
							<Camera onCapture={handleCapture} />
						{:else if activeTab === 'tools'}
							<Toolbar
								onSetLayout={handleSetLayout}
								onAddCustomSlot={handleAddCustomSlot}
								onAddText={handleAddText}
								onAddShape={handleAddShape}
								onSetDrawingMode={handleSetDrawingMode}
								onDeleteSelected={handleDeleteSelected}
								onDownload={handleDownload}
								onSetBackgroundColor={handleSetBackgroundColor}
								onSetSize={handleSetSize}
								onUndo={handleUndo}
								onRedo={handleRedo}
								{canUndo}
								{canRedo}
							/>
						{:else if activeTab === 'layers'}
							<LayersPanel
								{layers}
								onSelectLayer={handleSelectLayer}
								onMoveUp={handleMoveUp}
								onMoveDown={handleMoveDown}
								onDelete={handleDeleteLayer}
								onSetOpacity={handleSetOpacity}
								onSetStroke={handleSetStroke}
								onSetShadow={handleSetShadow}
								activeText={activeText}
								activeColor={activeColor}
								onUpdateText={handleUpdateText}
								onUpdateColor={handleUpdateColor}
							/>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<!-- Right sidebar — desktop only -->
		<aside class="hidden lg:flex flex-col w-[280px] xl:w-[300px] shrink-0 border-l border-white/5 overflow-y-auto">
			<div class="p-4">
				<LayersPanel
					{layers}
					onSelectLayer={handleSelectLayer}
					onMoveUp={handleMoveUp}
					onMoveDown={handleMoveDown}
					onDelete={handleDeleteLayer}
					onSetOpacity={handleSetOpacity}
					onSetStroke={handleSetStroke}
					onSetShadow={handleSetShadow}
					activeText={activeText}
					activeColor={activeColor}
					onUpdateText={handleUpdateText}
					onUpdateColor={handleUpdateColor}
				/>
			</div>
		</aside>
	</div>
</div>

<style>
	@keyframes toast-in {
		from { opacity: 0; transform: translateX(-50%) translateY(8px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}
	.toast-anim { animation: toast-in 0.18s ease-out; }
</style>
