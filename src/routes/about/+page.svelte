<script lang="ts">
	import { TECH_STACK, SOCIALS } from '$lib/config';
</script>

<svelte:head>
	<title>About | Safarudin</title>
	<meta name="description" content="Learn more about Safarudin and his journey." />
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
				My name is <span class="font-semibold text-white">Safarudin</span>. I'm a programmer from
				West Java, Indonesia, who loves turning ideas into reality through code. Whether it's
				building web applications, exploring new technologies, or just experimenting with creative
				projects, I enjoy every step of the process.
			</p>
			<p class="mt-4 text-lg leading-relaxed text-zinc-400">
				Beyond coding, I have a passion for UI/UX design and often use Figma to craft clean,
				user-friendly interfaces. Reading books is another passion, especially those about
				technology, self-improvement, and new topics that spark curiosity.
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
