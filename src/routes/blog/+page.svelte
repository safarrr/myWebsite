<script lang="ts">
	import Link from '$lib/components/Link.svelte';
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

<section class="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="relative mb-24 text-center">
		<!-- Aurora Background -->
		<div
			class="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 opacity-40"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 blur-[100px]"
			></div>
		</div>

		<h1 class="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
			Blog<span class="text-zinc-500">.</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-zinc-400">Thoughts, stories, and ideas.</p>

		<div
			class="mx-auto mt-6 flex max-w-fit items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-sm text-yellow-200"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				class="h-4 w-4"
			>
				<path
					fill-rule="evenodd"
					d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
					clip-rule="evenodd"
				/>
			</svg>
			<span>This blog content is only available in Indonesian.</span>
		</div>
	</div>

	<div class="space-y-12">
		{#each posts as post}
			<article class="group relative flex flex-col items-start">
				<div class="mb-3 flex items-center gap-4 text-xs text-zinc-500">
					<time datetime={post.metadata.date}>
						{new Date(post.metadata.date).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</time>
					{#if post.metadata.categories}
						<div class="flex gap-2">
							{#each post.metadata.categories as category}
								<span class="rounded-full bg-white/5 px-2 py-0.5 text-zinc-400">{category}</span>
							{/each}
						</div>
					{/if}
				</div>

				<h3 class="mb-2 text-2xl font-bold text-white transition-colors group-hover:text-zinc-200">
					<a href="/blog/{post.link}">
						<span class="absolute inset-0"></span>
						{post.metadata.title}
					</a>
				</h3>
				<p class="mb-4 line-clamp-2 text-base leading-relaxed text-zinc-400">
					{post.metadata.description}
				</p>

				<div
					class="flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300"
				>
					Read article <span aria-hidden="true">&rarr;</span>
				</div>
			</article>
		{/each}

		{#if posts.length === 0}
			<div class="text-center text-zinc-500">No posts found.</div>
		{/if}
	</div>
</section>
