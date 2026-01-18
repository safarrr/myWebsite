<script lang="ts">
	import '../app.css';
	import Dock from '$lib/components/Dock.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-[100dvh] flex-col pb-24">
	<!-- Background Noise/Texture could go here -->
	<div
		class="pointer-events-none fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
	></div>

	<main class="flex-1 pt-12 md:pt-20">
		{@render children()}
	</main>
	<Footer />
	<Dock />
</div>
