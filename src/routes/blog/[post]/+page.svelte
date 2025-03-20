<script lang="ts">
	import GridPattern from '$lib/components/GridPattern.svelte';
	import { cn } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let meta = data.meta;
	let author = data.meta.author || [];
	let categories = data.meta.categories || [];
	const { PostContent } = data;
</script>

<svelte:head>
	<title>{meta.title ?? ''}</title>
	<meta data-key="description" name="description" content={meta.description ?? ''} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={meta.title ?? ''} />
	<meta name="twitter:title" content={meta.title ?? ''} />
	<meta property="og:description" content={meta.description ?? ''} />
	<meta name="twitter:description" content={meta.description ?? ''} />
	<meta name="keywords" content={categories.join(', ')} />
	<meta name="author" content="safarudin" />
</svelte:head>

<div class="container mx-auto flex w-screen flex-col space-y-2">
	<GridPattern
		x={0}
		y={0}
		class={cn('z-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ')}
	/>
	<!-- <div class=" items-enter relative flex h-36 flex-col justify-center overflow-hidden p-2"></div> -->
	<div
		class="sticky top-0 z-20 inline-flex w-full items-center justify-between rounded-md border border-gray-950 bg-neutral-950/60 px-3 py-4 backdrop-blur-lg"
	>
		<a href="/" class="text-lg">Safarudin</a>
		<a href="/#blog" class="text-lg">all post</a>
		<!-- <span></span> -->
	</div>
	<div class="z-10 rounded-sm bg-neutral-900 p-5">
		<h1 class="text-3xl font-bold">{meta.title ?? ''}</h1>
		<div class="inline-flex space-x-2">
			<p><b class="font-bold">Published</b>: {meta.date}</p>
			<p><b class="font-bold">Updated</b>: {meta.updated}</p>
			<!-- <p><b class="font-bold">author</b>: {meta.author}</p> -->
			<!-- <br />
			<b>Updated:</b>
			{meta.updated} -->
		</div>
		<div class="inline-flex w-full items-center space-x-2">
			<b class="sticky left-0">author</b>
			<div class="inline-flex w-full overflow-x-auto">
				{#each author as item}
					<p class=" rounded-full bg-neutral-950 px-4 py-2 text-gray-50">{item}</p>
				{/each}
			</div>
		</div>
		<article class="prose prose-sm z-10 mt-2 min-w-full max-w-full md:prose-base">
			<PostContent />
		</article>
	</div>
	<div
		class="flex w-full flex-col bg-neutral-900 p-5 md:flex-row md:items-center md:justify-between"
	>
		<h1 class="text-lg font-bold">contact me at</h1>
		<div class="flex flex-col md:flex-row md:items-center md:space-x-3">
			<a
				class="hover:text-blue-500 hover:underline"
				href="https://bsky.app/profile/safarudin.bsky.social/"
				target="_blank"
				rel="noopener noreferrer">BlueSky</a
			>
			<a
				class="hover:text-blue-500 hover:underline"
				href="https://x.com/justsafarr"
				target="_blank"
				rel="noopener noreferrer">Twiter/x</a
			>
			<a
				class="hover:text-blue-500 hover:underline"
				href="mailto:safarudin.dev@gmail.com"
				target="_blank"
				rel="noopener noreferrer">email: safarudin.dev@gmail.com</a
			>
		</div>
	</div>
</div>
