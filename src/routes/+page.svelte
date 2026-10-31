<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import { SOCIALS, TECH_STACK } from '$lib/config';
	import ThreadsIcon from '$lib/components/ThreadsIcon.svelte';

	let { data } = $props();
	let { projects = [], threads = [] } = $derived(data);
</script>

<svelte:head>
	<title>Safarudin | Programer</title>
	<meta name="description" content="programmer from West Java, Indonesia. I use my skills to create cool stuff or just have fun swimming through code!" />
	<meta name="keywords" content="web developer, front-end development, safarrr,safarudin,programmer" />
	<link rel="canonical" href="https://safarudin.com" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://safarudin.com" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Safarudin | Programer" />
	<meta property="og:description" content="programmer from West Java, Indonesia. I use my skills to create cool stuff or just have fun swimming through code!" />

	<!-- Twitter -->
	<meta property="twitter:domain" content="safarudin.com" />
	<meta property="twitter:url" content="https://safarudin.com" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Safarudin | Programer" />
	<meta name="twitter:description" content="programmer from West Java, Indonesia. I use my skills to create cool stuff or just have fun swimming through code!" />
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

	{#if threads.length > 0}
		<div class="border-t border-white/10 px-5 py-6">
			<div class="mb-4 flex items-center justify-between gap-4">
				<div>
					<h2 class="text-xl font-bold text-white">Latest on Threads</h2> 
				</div>
				<a
					href="https://www.threads.com/@safar19x"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
				>
					<ThreadsIcon size={16} />
					@safar19x
				</a>
			</div>
			<div class="grid max-w-2xl gap-3">
				{#each threads as post (post.id)}
					<a
						href={post.permalink}
						target="_blank"
						rel="noopener noreferrer"
						class="group grid overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 transition-colors hover:border-white/20 hover:bg-zinc-900/80 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]"
					>
						{#if post.media_type === 'IMAGE' && post.media_url}
							<img
								src={post.media_url}
								alt="Media from a Threads post"
								loading="lazy"
								class="aspect-video w-full bg-black object-contain sm:aspect-auto sm:h-full sm:min-h-40"
							/>
						{:else if post.media_type === 'VIDEO' && post.thumbnail_url}
							<img
								src={post.thumbnail_url}
								alt="Video preview from a Threads post"
								loading="lazy"
								class="aspect-video w-full bg-black object-contain sm:aspect-auto sm:h-full sm:min-h-40"
							/>
						{/if}
						<div class="flex min-h-36 flex-col justify-between p-4">
							{#if post.text}
								<p class="line-clamp-4 whitespace-pre-wrap break-words text-sm leading-5 text-zinc-300">
									{post.text}
								</p>
							{:else}
								<p class="text-sm text-zinc-400">View this post on Threads</p>
							{/if}
							<div class="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-xs text-zinc-500">
								<time datetime={post.timestamp}>
									{new Intl.DateTimeFormat('id-ID', {
										dateStyle: 'medium',
										timeZone: 'Asia/Jakarta'
									}).format(new Date(post.timestamp))}
								</time>
								<span class="transition-colors group-hover:text-zinc-300">Open post ↗</span>
							</div>
						</div>
					</a>
				{/each}
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
