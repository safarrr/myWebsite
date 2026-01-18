<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { ProjectMetadata } from '$lib/utils';

	let { data } = $props();
	let projects = data.projects as { slug: string; metadata: ProjectMetadata }[];
</script>

<svelte:head>
	<title>Projects | Safarudin</title>
	<meta name="description" content="Showcase of my latest projects and experiments." />
</svelte:head>

<section class="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
	<div class="relative mb-16 text-center">
		<!-- Aurora Background -->
		<div
			class="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 opacity-30"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-[100px]"
			></div>
		</div>

		<h1 class="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
			Projects<span class="text-zinc-500">.</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-zinc-400">
			A collection of things I've built. From web applications to small experiments.
		</p>
	</div>

	{#if projects.length > 0}
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<div class="h-full">
					<ProjectCard project={project.metadata} slug={project.slug} />
				</div>
			{/each}
		</div>
	{:else}
		<div
			class="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30"
		>
			<p class="text-zinc-500">No projects found.</p>
		</div>
	{/if}
</section>
