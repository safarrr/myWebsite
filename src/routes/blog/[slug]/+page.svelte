<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';

	let { data } = $props();
	let { metadata, content: Content } = data;
</script>

<svelte:head>
	<title>{metadata.title} | Blog</title>
	<meta name="description" content={metadata.description} />
</svelte:head>

<article class="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
	<a
		href="/blog"
		class="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400"
	>
		<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
		Back to blog
	</a>

	<header class="mb-12 text-center">
		<time class="mb-4 block text-sm text-slate-500">
			{new Date(metadata.date).toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</time>
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">
			{metadata.title}
		</h1>
		{#if metadata.categories}
			<div class="flex justify-center gap-2">
				{#each metadata.categories as category}
					<span class="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">{category}</span>
				{/each}
			</div>
		{/if}
	</header>

	<div
		class="prose prose-invert prose-lg prose-headings:font-heading prose-a:text-indigo-400 hover:prose-a:text-indigo-300 mx-auto max-w-none"
	>
		<Content />
	</div>
</article>
