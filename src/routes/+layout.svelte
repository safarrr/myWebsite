<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-[100dvh] flex-col">
	<!-- Background Noise/Texture could go here -->
	<div
		class="pointer-events-none fixed inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
	></div>

	<Navbar />
	<main class="flex-1 pt-20">
		{@render children()}
	</main>
	<Footer />
</div>
