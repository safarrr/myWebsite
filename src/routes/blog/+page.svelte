<script lang="ts">
	import type { PostMetadata } from '$lib/utils';

	let { data } = $props();
	let posts = data.posts;
</script>

<svelte:head>
	<title>Blog | Safarudin</title>
	<meta
		name="description"
		content="Thoughts, tutorials, and insights on web development and design."
	/>
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-bold text-white sm:text-6xl">
			Blog<span class="text-zinc-500">.</span>
		</h1>
		<p class="text-lg text-zinc-400">Thoughts, stories, and ideas.</p>
		<p class="mt-4 text-sm text-yellow-400">Content available in Indonesian only</p>
	</div>

	<div class="space-y-8">
		{#each posts as post}
			<article class="border-b border-white/10 p-8">
				<time class="text-sm text-zinc-500">
					{new Date(post.metadata.date).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
				{#if post.metadata.categories}
					<div class="mt-2 flex gap-2">
						{#each post.metadata.categories as category}
							<span class="rounded-lg bg-white/5 px-2 py-1 text-xs text-zinc-400">{category}</span>
						{/each}
					</div>
				{/if}
				<h3 class="mt-3 text-xl font-bold text-white">
					<a href="/blog/{post.link}" class="hover:text-zinc-300">
						{post.metadata.title}
					</a>
				</h3>
				<p class="mt-2 text-sm text-zinc-400">
					{post.metadata.description}
				</p>
			</article>
		{/each}

		{#if posts.length === 0}
			<div class="text-center text-zinc-500">No posts found.</div>
		{/if}
	</div>
</section>
