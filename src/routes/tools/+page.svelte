<script>
	import { MessageCircle, MonitorUp, Camera } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Tools | Safarudin</title>
	<meta name="description" content="A collection of web tools, utilities, and experiments created by Safarudin." />
	<link rel="canonical" href="https://safarudin.com/tools" />
	<meta property="og:url" content="https://safarudin.com/tools" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Tools | Safarudin" />
	<meta property="og:description" content="A collection of web tools, utilities, and experiments created by Safarudin." />
	<meta property="twitter:domain" content="safarudin.com" />
	<meta property="twitter:url" content="https://safarudin.com/tools" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Tools | Safarudin" />
	<meta name="twitter:description" content="A collection of web tools, utilities, and experiments created by Safarudin." />
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
			href="/tools/screenshare"
			class="block rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 hover:border-emerald-500/50"
		>
			<div class="flex items-center gap-3">
				<MonitorUp size={20} class="text-emerald-400" />
				<h2 class="text-xl font-bold text-white">P2P Screen Share</h2>
			</div>
			<p class="mt-2 text-sm text-zinc-400">
				Low-latency, direct peer-to-peer screen sharing directly from your browser.
			</p>
		</a>

		<a
			href="/tools/photobooth"
			class="block rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 hover:border-emerald-500/50"
		>
			<div class="flex items-center gap-3">
				<Camera size={20} class="text-pink-400" />
				<h2 class="text-xl font-bold text-white">Web Photobooth</h2>
			</div>
			<p class="mt-2 text-sm text-zinc-400">
				Client-side interactive photobooth. Capture, create layouts, add stickers, and draw freely.
			</p>
		</a>

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
