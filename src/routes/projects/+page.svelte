<script lang="ts">
	import type { ProjectMetadata } from '$lib/utils';

	let { data } = $props();
	let projects = $derived(data.projects as { slug: string; metadata: ProjectMetadata }[]);
</script>

<svelte:head>
	<title>Projects | Safarudin</title>
	<meta name="description" content="Showcase of my latest projects and experiments." />
	<link rel="canonical" href="https://safarudin.my.id/projects" />
	<meta property="og:url" content="https://safarudin.my.id/projects" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Projects | Safarudin" />
	<meta property="og:description" content="Showcase of my latest projects and experiments." />
	<meta property="twitter:domain" content="safarudin.my.id" />
	<meta property="twitter:url" content="https://safarudin.my.id/projects" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Projects | Safarudin" />
	<meta name="twitter:description" content="Showcase of my latest projects and experiments." />
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-bold text-white sm:text-6xl">
			Projects<span class="text-zinc-500">.</span>
		</h1>
		<p class="text-lg text-zinc-400">Things I've built</p>
	</div>

	{#if projects.length > 0}
		<div class="space-y-6">
			{#each projects as project}
				<a
					href="/projects/{project.slug}"
					class="block rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
				>
					<h3 class="mb-2 text-xl font-bold text-white">{project.metadata.title}</h3>
					<p class="text-sm text-zinc-400">{project.metadata.description}</p>
					{#if project.metadata.tech}
						<div class="mt-4 flex flex-wrap gap-2">
							{#each project.metadata.tech as tech}
								<span class="rounded-lg bg-white/5 px-2 py-1 text-xs text-zinc-400">{tech}</span>
							{/each}
						</div>
					{/if}
				</a>
			{/each}
		</div>
	{:else}
		<div class="text-center text-zinc-500">No projects found.</div>
	{/if}
</section>
