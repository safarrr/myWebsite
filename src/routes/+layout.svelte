<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-[100dvh] flex-col">
	<div class="pointer-events-none fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_rgba(63,63,70,0.18),_transparent_60%)]"></div>

	<Navbar />
	<main class="flex-1 pt-20">
		{@render children()}
	</main>
	<Footer />
</div>
