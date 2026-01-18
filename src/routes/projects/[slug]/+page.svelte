<script lang="ts">
	import { ArrowLeft, Github, Globe } from 'lucide-svelte';
	import type { ProjectMetadata } from '$lib/utils';

	let { data } = $props();
	let { metadata, content: Content } = data as { metadata: ProjectMetadata; content: any };
	// content is the rendered svelte component from mdsvex
</script>

<svelte:head>
	<title>{metadata.title} | Projects</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<article class="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
	<!-- Back Link -->
	<a
		href="/projects"
		class="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400"
	>
		<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
		Back to projects
	</a>

	<header class="mb-12">
		<div class="mb-6 flex flex-wrap gap-2">
			{#each metadata.tech || [] as tech}
				<span
					class="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20 ring-inset"
				>
					{tech}
				</span>
			{/each}
		</div>

		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
			{metadata.title}
		</h1>

		<p class="mb-8 max-w-3xl text-xl leading-relaxed text-zinc-400">
			{metadata.description}
		</p>

		<div class="flex flex-wrap gap-4">
			{#if metadata.demo}
				<a
					href={metadata.demo}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
				>
					<Globe size={18} />
					Live Demo
				</a>
			{/if}
			{#if metadata.repo}
				<a
					href={metadata.repo}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-zinc-700 transition-colors ring-inset hover:bg-zinc-700"
				>
					<Github size={18} />
					Source Code
				</a>
			{/if}
		</div>
	</header>

	{#if metadata.thumbnail}
		<div class="mb-12 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
			<img
				src={metadata.thumbnail}
				alt={metadata.title}
				class="max-h-[600px] w-full object-cover"
			/>
		</div>
	{/if}

	<div
		class="prose prose-invert prose-lg prose-headings:font-heading prose-a:text-emerald-400 hover:prose-a:text-emerald-300 max-w-none"
	>
		<Content />
	</div>

	{#if metadata.gallery && metadata.gallery.length > 0}
		<section class="mt-16 border-t border-zinc-800 pt-12">
			<h2 class="mb-8 text-2xl font-bold tracking-tight text-white">Project Gallery</h2>
			<div class="columns-1 justify-center gap-4 space-y-4 sm:columns-2">
				{#each metadata.gallery as image, i}
					<div
						class="group relative break-inside-avoid overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-emerald-500/50"
					>
						<img
							src={image}
							alt={`${metadata.title} gallery image ${i + 1}`}
							class="h-auto w-full transition-transform duration-700 group-hover:scale-105"
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						></div>
					</div>
				{/each}
			</div>
		</section>
	{/if}
</article>
