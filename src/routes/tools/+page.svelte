<script>
	import { MessageCircle } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Tools | Safarudin</title>
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-bold text-white sm:text-6xl">
			Tools<span class="text-zinc-500">.</span>
		</h1>
		<p class="text-lg text-zinc-400">Utilities I've made</p>
	</div>

	<div class="space-y-6">
		<a
			href="/tools/wame"
			class="block rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
		>
			<div class="flex items-center gap-3">
				<MessageCircle size={20} class="text-zinc-400" />
				<h2 class="text-xl font-bold text-white">WhatsApp Link Generator</h2>
			</div>
			<p class="mt-2 text-sm text-zinc-400">
				Generate direct chat links without saving contact numbers
			</p>
		</a>
	</div>
</section>
