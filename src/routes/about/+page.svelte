<script lang="ts">
	import { TECH_STACK, SOCIALS } from '$lib/config';
</script>

<svelte:head>
	<title>About | Safarudin</title>
	<meta name="description" content="Get to know Safarudin, a curious programmer from West Java, Indonesia, who enjoys exploring ideas and learning by doing." />
	<link rel="canonical" href="https://safarudin.com/about" />
	<meta property="og:url" content="https://safarudin.com/about" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="About | Safarudin" />
	<meta property="og:description" content="Get to know Safarudin, a curious programmer from West Java, Indonesia, who enjoys exploring ideas and learning by doing." />
	<meta property="twitter:domain" content="safarudin.com" />
	<meta property="twitter:url" content="https://safarudin.com/about" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About | Safarudin" />
	<meta name="twitter:description" content="Get to know Safarudin, a curious programmer from West Java, Indonesia, who enjoys exploring ideas and learning by doing." />
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-bold text-white sm:text-6xl">
			About<span class="text-zinc-500">.</span>
		</h1>
	</div>

	<div class="space-y-12">
		<div>
			<p class="text-lg leading-relaxed text-zinc-400">
				Hi, I'm <span class="font-semibold text-white">Safarudin</span>, a programmer from West
				Java, Indonesia. I'm curious about how things work and enjoy following an idea to see
				where it leads. Sometimes that means building something useful; other times, it's simply
				trying something new for the fun of it.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-zinc-400">
				I like learning by doing. Trying things out, running into problems, and figuring them out
				is a big part of how I learn. I enjoy having room to experiment and improve an idea as I
				understand it better.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-zinc-400">
				This website is a small space for things I make, things I learn, and whatever catches my
				interest along the way.
			</p>
		</div>

		<div class="border-t border-white/10 pt-12">
			<h2 class="mb-6 text-xl font-bold text-white">Tech Stack</h2>
			<div class="flex flex-wrap gap-2">
				{#each TECH_STACK as tech}
					<span class="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-zinc-300">{tech}</span>
				{/each}
			</div>
		</div>

		<div class="border-t border-white/10 pt-12">
			<h2 class="mb-6 text-xl font-bold text-white">Connect</h2>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each SOCIALS as social}
					<a
						href={social.href}
						target={social.label === 'Email' ? undefined : '_blank'}
						rel={social.label === 'Email' ? undefined : 'noopener noreferrer'}
						class="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
					>
						<svelte:component this={social.icon} size={16} />
						<span> {social.label}: {social.handle} </span>
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
