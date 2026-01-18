<script>
	import { MessageCircle } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Tools | Safarudin</title>
</svelte:head>

<section class="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="relative mb-24 text-center">
		<!-- Aurora Background -->
		<div
			class="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 opacity-40"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-[100px]"
			></div>
		</div>

		<h1 class="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
			Tools<span class="text-zinc-500">.</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-zinc-400">Random utilities and tools I've made.</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		<!-- Whatsapp Utils -->
		<a
			href="/tools/wame"
			class="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 p-8 transition-all duration-500 hover:border-emerald-500/30 hover:bg-zinc-900/50 hover:shadow-2xl hover:shadow-emerald-500/10"
		>
			<div
				class="pointer-events-none absolute -top-20 -right-20 z-0 h-[200px] w-[200px] rounded-full bg-emerald-500/10 blur-[50px] transition-all group-hover:bg-emerald-500/20"
			></div>

			<div class="relative z-10">
				<div
					class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400"
				>
					<MessageCircle size={24} />
				</div>

				<h2
					class="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-emerald-400"
				>
					WhatsApp Link
				</h2>
				<p class="text-base leading-relaxed text-zinc-400">
					Generate a direct chat link without saving the contact number.
				</p>
			</div>

			<div
				class="relative z-10 mt-8 flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300"
			>
				Open Tool <span aria-hidden="true" class="transition-transform group-hover:translate-x-1"
					>&rarr;</span
				>
			</div>
		</a>
	</div>
</section>
