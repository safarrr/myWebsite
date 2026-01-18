<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
	<title>404 | Safarudin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
	<!-- Aurora Background -->
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30"
	>
		<div
			class="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 blur-[100px]"
		></div>
	</div>

	<h1 class="font-heading mb-4 text-8xl font-bold tracking-tighter text-white">404</h1>
	<h2 class="mb-6 text-2xl font-semibold text-white">Page not found</h2>
	<p class="mb-8 max-w-md text-zinc-400">
		Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
	</p>

	<a
		href="/"
		class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-200"
	>
		<ArrowLeft size={16} />
		Back to Home
	</a>
</section>
