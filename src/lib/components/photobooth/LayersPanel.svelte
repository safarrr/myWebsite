<script lang="ts">
	import { Layers, ArrowUp, ArrowDown, Trash2, Image, Type, Shapes, LayoutTemplate, Eye, Square, Sun } from 'lucide-svelte';

	export let layers: { id: string; name: string; active: boolean; type: string; opacity: number; stroke: string; strokeWidth: number; shadowEnabled: boolean; shadowColor: string; shadowBlur: number; shadowOffsetX: number; shadowOffsetY: number }[] = [];

	export let onSelectLayer: (id: string) => void = () => {};
	export let onMoveUp: (id: string) => void = () => {};
	export let onMoveDown: (id: string) => void = () => {};
	export let onDelete: (id: string) => void = () => {};
	export let onSetOpacity: (id: string, opacity: number) => void = () => {};
	export let onSetStroke: (id: string, color: string, width: number) => void = () => {};
	export let onSetShadow: (id: string, enabled: boolean, color: string, blur: number, offsetX: number, offsetY: number) => void = () => {};

	export let activeText: string | null = null;
	export let activeColor: string | null = null;
	export let onUpdateText: (text: string) => void = () => {};
	export let onUpdateColor: (color: string) => void = () => {};

	function getIconForType(type: string) {
		if (type === 'image') return Image;
		if (type === 'i-text') return Type;
		if (type === 'rect' || type === 'path' || type === 'circle') return Shapes;
		return LayoutTemplate;
	}

	function hexToRgba(hex: string, alpha: number): string {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);
		return `rgba(${r},${g},${b},${alpha})`;
	}

	function rgbaToHex(rgba: string): string {
		const match = rgba.match(/rgba?\((\d+),(\d+),(\d+)/);
		if (!match) return '#000000';
		const r = parseInt(match[1]).toString(16).padStart(2, '0');
		const g = parseInt(match[2]).toString(16).padStart(2, '0');
		const b = parseInt(match[3]).toString(16).padStart(2, '0');
		return `#${r}${g}${b}`;
	}

	function rgbaAlpha(rgba: string): number {
		const match = rgba.match(/rgba?\(\d+,\d+,\d+,?([\d.]+)?\)/);
		return match && match[1] ? parseFloat(match[1]) : 1;
	}

	let borderWidths: Record<string, number> = {};
	function getBorderWidth(layer: typeof layers[0]): number {
		return borderWidths[layer.id] ?? layer.strokeWidth ?? 3;
	}
</script>

<div class="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 w-full h-full max-h-[800px] overflow-hidden">
	<!-- Header -->
	<div class="flex items-center gap-2 shrink-0">
		<Layers size={18} class="text-indigo-400" />
		<h2 class="text-sm font-bold uppercase tracking-wider text-zinc-400">Layers</h2>
		<span class="ml-auto text-xs text-zinc-600">{layers.length}</span>
	</div>

	<div class="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
		{#if layers.length === 0}
			<div class="flex flex-col items-center justify-center py-12 gap-2">
				<Layers size={28} class="text-zinc-700" />
				<p class="text-xs text-zinc-600">No layers yet</p>
			</div>
		{:else}
			{#each [...layers].reverse() as layer (layer.id)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->

				<!-- Layer Row -->
				<div
					class="flex items-center gap-2 px-2 py-1.5 rounded-lg border cursor-pointer transition-all group
					{layer.active
						? 'border-indigo-500/60 bg-indigo-500/10 shadow-sm shadow-indigo-500/10'
						: 'border-white/5 bg-zinc-800/40 hover:bg-zinc-800/70 hover:border-white/10'}"
					on:click={() => onSelectLayer(layer.id)}
				>
					<!-- Icon + Name -->
					<div class="flex items-center gap-2 flex-1 min-w-0">
						<div class="shrink-0 {layer.active ? 'text-indigo-400' : 'text-zinc-500'}">
							<svelte:component this={getIconForType(layer.type)} size={14} />
						</div>
						<span class="text-xs truncate {layer.active ? 'text-white font-medium' : 'text-zinc-400'}">
							{layer.name}
						</span>
					</div>

					<!-- Action buttons (show on hover / active) -->
					<div class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity {layer.active ? '!opacity-100' : ''}">
						<button
							on:click|stopPropagation={() => onMoveUp(layer.id)}
							class="p-1 rounded hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
							title="Bring Forward"
						>
							<ArrowUp size={12} />
						</button>
						<button
							on:click|stopPropagation={() => onMoveDown(layer.id)}
							class="p-1 rounded hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
							title="Send Backward"
						>
							<ArrowDown size={12} />
						</button>
						<button
							on:click|stopPropagation={() => onDelete(layer.id)}
							class="p-1 rounded hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-colors"
							title="Delete"
						>
							<Trash2 size={12} />
						</button>
					</div>
				</div>

				<!-- ── Properties Panel (active only) ── -->
				{#if layer.active}
					<div class="mx-1 mb-2 rounded-lg border border-indigo-500/20 bg-zinc-900/60 overflow-hidden divide-y divide-white/5">

						<!-- ─ OPACITY ─ -->
						<div class="px-3 py-2.5">
							<div class="flex items-center gap-1.5 mb-1.5">
								<Eye size={11} class="text-zinc-500" />
								<span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Opacity</span>
								<span class="ml-auto text-[10px] text-zinc-400 tabular-nums">{Math.round(layer.opacity * 100)}%</span>
							</div>
							<input
								type="range" min="0" max="1" step="0.01"
								value={layer.opacity}
								on:input={(e) => onSetOpacity(layer.id, parseFloat(e.currentTarget.value))}
								class="w-full accent-indigo-500"
							/>
						</div>

						<!-- ─ BORDER ─ -->
						<div class="px-3 py-2.5">
							<div class="flex items-center gap-1.5 mb-2">
								<Square size={11} class="text-zinc-500" />
								<span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Border</span>
								<div class="ml-auto flex items-center gap-1.5">
									{#if layer.stroke}
										<input
											type="color"
											value={layer.stroke}
											on:input={(e) => onSetStroke(layer.id, e.currentTarget.value, getBorderWidth(layer))}
											class="h-5 w-5 cursor-pointer rounded border border-white/10 bg-transparent p-0 shrink-0"
											title="Border Color"
										/>
									{/if}
									<!-- Toggle pill -->
									<button
										on:click={() => {
											const next = !layer.stroke;
											onSetStroke(layer.id, next ? '#ffffff' : '', getBorderWidth(layer));
										}}
										class="relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border transition-colors
										{layer.stroke ? 'border-violet-500 bg-violet-500' : 'border-zinc-600 bg-zinc-700'}"
										aria-label="Toggle Border"
									>
										<span class="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform
										{layer.stroke ? 'left-3.5' : 'left-0.5'}"></span>
									</button>
								</div>
							</div>
							{#if layer.stroke}
								<div class="flex items-center gap-2">
									<span class="text-[10px] text-zinc-500 w-10 shrink-0">Width</span>
									<input
										type="range" min="1" max="20" step="1"
										value={getBorderWidth(layer)}
										on:input={(e) => {
											const w = parseInt(e.currentTarget.value);
											borderWidths[layer.id] = w;
											onSetStroke(layer.id, layer.stroke, w);
										}}
										class="flex-1 accent-violet-500"
									/>
									<span class="text-[10px] text-zinc-400 w-6 text-right shrink-0">{getBorderWidth(layer)}</span>
								</div>
							{/if}
						</div>

						<!-- ─ DROP SHADOW ─ -->
						<div class="px-3 py-2.5">
							<div class="flex items-center gap-1.5 mb-2">
								<Sun size={11} class="text-zinc-500" />
								<span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Shadow</span>
								<div class="ml-auto flex items-center gap-1.5">
									{#if layer.shadowEnabled}
										<input
											type="color"
											value={rgbaToHex(layer.shadowColor)}
											on:input={(e) => onSetShadow(layer.id, true, hexToRgba(e.currentTarget.value, rgbaAlpha(layer.shadowColor)), layer.shadowBlur, layer.shadowOffsetX, layer.shadowOffsetY)}
											class="h-5 w-5 cursor-pointer rounded border border-white/10 bg-transparent p-0 shrink-0"
											title="Shadow Color"
										/>
									{/if}
									<!-- Toggle pill -->
									<button
										on:click={() => onSetShadow(layer.id, !layer.shadowEnabled, layer.shadowColor, layer.shadowBlur, layer.shadowOffsetX, layer.shadowOffsetY)}
										class="relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border transition-colors
										{layer.shadowEnabled ? 'border-amber-500 bg-amber-500' : 'border-zinc-600 bg-zinc-700'}"
										aria-label="Toggle Shadow"
									>
										<span class="absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform
										{layer.shadowEnabled ? 'left-3.5' : 'left-0.5'}"></span>
									</button>
								</div>
							</div>
							{#if layer.shadowEnabled}
								<div class="space-y-1.5">
									<!-- Blur -->
									<div class="flex items-center gap-2">
										<span class="text-[10px] text-zinc-500 w-10 shrink-0">Blur</span>
										<input
											type="range" min="0" max="60" step="1"
											value={layer.shadowBlur}
											on:input={(e) => onSetShadow(layer.id, true, layer.shadowColor, parseInt(e.currentTarget.value), layer.shadowOffsetX, layer.shadowOffsetY)}
											class="flex-1 accent-amber-500"
										/>
										<span class="text-[10px] text-zinc-400 w-6 text-right tabular-nums shrink-0">{layer.shadowBlur}</span>
									</div>
									<!-- Offset X -->
									<div class="flex items-center gap-2">
										<span class="text-[10px] text-zinc-500 w-10 shrink-0">X</span>
										<input
											type="range" min="-30" max="30" step="1"
											value={layer.shadowOffsetX}
											on:input={(e) => onSetShadow(layer.id, true, layer.shadowColor, layer.shadowBlur, parseInt(e.currentTarget.value), layer.shadowOffsetY)}
											class="flex-1 accent-amber-500"
										/>
										<span class="text-[10px] text-zinc-400 w-6 text-right tabular-nums shrink-0">{layer.shadowOffsetX}</span>
									</div>
									<!-- Offset Y -->
									<div class="flex items-center gap-2">
										<span class="text-[10px] text-zinc-500 w-10 shrink-0">Y</span>
										<input
											type="range" min="-30" max="30" step="1"
											value={layer.shadowOffsetY}
											on:input={(e) => onSetShadow(layer.id, true, layer.shadowColor, layer.shadowBlur, layer.shadowOffsetX, parseInt(e.currentTarget.value))}
											class="flex-1 accent-amber-500"
										/>
										<span class="text-[10px] text-zinc-400 w-6 text-right tabular-nums shrink-0">{layer.shadowOffsetY}</span>
									</div>
								</div>
							{/if}
						</div>

						<!-- ─ CONTENT (Text / Fill Color) ─ -->
						{#if activeText !== null || activeColor !== null}
							<div class="px-3 py-2.5">
								<div class="flex items-center gap-1.5 mb-2">
									<Type size={11} class="text-zinc-500" />
									<span class="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Content</span>
								</div>
								<div class="space-y-2">
									{#if activeText !== null}
										<div class="flex items-center gap-2">
											<span class="text-[10px] text-zinc-500 w-10 shrink-0">Text</span>
											<input
												type="text"
												value={activeText}
												on:input={(e) => onUpdateText(e.currentTarget.value)}
												class="flex-1 rounded-md border border-white/10 bg-zinc-800 px-2 py-1 text-xs text-white focus:border-indigo-500 focus:outline-none transition-colors"
											/>
										</div>
									{/if}
									{#if activeColor !== null}
										<div class="flex items-center gap-2">
											<span class="text-[10px] text-zinc-500 w-10 shrink-0">Fill</span>
											<input
												type="color"
												value={activeColor}
												on:input={(e) => onUpdateColor(e.currentTarget.value)}
												class="h-6 w-6 cursor-pointer rounded border border-white/10 bg-zinc-800 p-0.5"
											/>
										</div>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>
