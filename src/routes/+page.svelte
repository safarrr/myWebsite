<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { SOCIALS, TECH_STACK } from '$lib/config';

	let { data } = $props();
	let { projects } = data;
</script>

<svelte:head>
	<title>Safarudin | Programer</title>
	<meta name="description" content="Portfolio of Safarudin, a Programer from Indonesia." />
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-bold text-white sm:text-6xl">
			Safarudin<span class="text-zinc-500">.</span>
		</h1>
		<p class="text-lg text-zinc-400">Programer from Indonesia</p>
	</div>

	{#if projects[0]}
		<div class=" p-5">
			<h2 class="mb-6 text-xl font-bold text-white">Featured Project</h2>
			<div class="rounded-lg border border-white/10 bg-white/5 p-6">
				<h3 class="mb-2 text-lg font-bold text-white">{projects[0].metadata.title}</h3>
				<p class="mb-4 text-sm text-zinc-400">{projects[0].metadata.description}</p>
				<a
					href="/projects/{projects[0].slug}"
					class="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300"
				>
					View Project <ArrowRight size={14} />
				</a>
			</div>
		</div>
	{/if}
	<div class="space-y-12">
		<div class="border-t border-white/10 px-5 pt-5 pb-5">
			<h2 class="mb-6 text-xl font-bold text-white">Tech Stack</h2>
			<div class="flex flex-wrap gap-2">
				{#each TECH_STACK as tech}
					<span class="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-zinc-300">{tech}</span>
				{/each}
			</div>
		</div>

		<div class="border-t border-white/10 px-5 pt-5 pb-5">
			<h2 class="mb-6 text-xl font-bold text-white">Connect</h2>
			<div class="flex flex-wrap gap-4">
				{#each SOCIALS as social}
					{@const Icon = social.icon}
					<a
						href={social.href}
						target="_blank"
						class="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
					>
						<Icon size={16} />
						{social.label}: {social.handle}
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>
