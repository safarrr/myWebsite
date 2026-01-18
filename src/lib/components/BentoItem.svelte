<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils'; // Assuming you have a cn utility, or I'll define a simple one here if not.

	let {
		class: className,
		children,
		title,
		header
	}: { class?: string; children: any; title?: string; header?: any } = $props();

	let div: HTMLDivElement | undefined = $state();
	let position = $state({ x: 0, y: 0 });
	let opacity = $state(0);

	function handleMouseMove(e: MouseEvent) {
		if (!div) return;
		const rect = div.getBoundingClientRect();
		position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
		opacity = 1;
	}

	function handleMouseLeave() {
		opacity = 0;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={div}
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	class="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/50 p-6 backdrop-blur-md transition-all hover:bg-zinc-900/50 {className}"
>
	<!-- Spotlight Effect -->
	<div
		class="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
		style="opacity: {opacity}; background: radial-gradient(600px circle at {position.x}px {position.y}px, rgba(255,255,255,0.06), transparent 40%);"
	></div>

	<div class="relative z-10 flex h-full flex-col">
		{#if header}
			<div class="mb-4">
				{@render header()}
			</div>
		{/if}

		<div class="flex-1">
			{@render children()}
		</div>

		{#if title}
			<div class="mt-4">
				<h3 class="font-heading text-lg font-bold tracking-tight text-white">{title}</h3>
			</div>
		{/if}
	</div>
</div>
