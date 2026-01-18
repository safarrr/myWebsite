<script lang="ts">
	import { ArrowRight, Github, Linkedin, Twitter, MapPin, Mail } from 'lucide-svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import BentoItem from '$lib/components/BentoItem.svelte';
	import Face from '$lib/components/Face.svelte';

	import { SOCIALS, TECH_STACK } from '$lib/config';

	let { data } = $props();
	let { projects } = data;

	// Tech Stack Icons (using text/emoji for simplicity, can replace with SVG icons)
	const techStack = TECH_STACK;
</script>

<svelte:head>
	<title>Safarudin | Fullstack Developer</title>
	<meta
		name="description"
		content="Portfolio of Safarudin, a Fullstack Developer from Indonesia."
	/>
</svelte:head>

<section class="container mx-auto max-w-7xl px-4 py-12 pb-32 sm:px-6 lg:px-8">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3 lg:gap-6">
		<!-- Large Intro Block (2x2) -->
		<BentoItem class="relative min-h-[400px] overflow-hidden md:col-span-2 md:row-span-2">
			<!-- Animated Aurora Background -->
			<div class="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
				<div
					class="absolute -top-20 -right-20 h-[200px] w-[200px] animate-pulse rounded-full bg-indigo-500/20 blur-[100px] md:h-[500px] md:w-[500px]"
				></div>
				<div
					class="absolute -bottom-20 -left-20 h-[200px] w-[200px] animate-pulse rounded-full bg-teal-500/10 blur-[80px] delay-700 md:h-[400px] md:w-[400px]"
				></div>

				<!-- Face Illustration as Background -->
				<div
					class="absolute -right-10 -bottom-20 scale-50 rotate-[-10deg] opacity-10 transition-all duration-500 hover:scale-110 hover:opacity-30 md:scale-150 md:opacity-20"
				>
					<Face />
				</div>
			</div>

			<div class="relative z-20 flex h-full flex-col justify-end p-6 md:p-10">
				<div>
					<h1
						class="font-heading max-w-lg text-4xl font-bold tracking-tight text-white sm:text-6xl"
					>
						Turning ideas into <span class="text-zinc-500">reality.</span>
					</h1>
					<p class="mt-4 max-w-md text-lg text-zinc-400">
						I'm <span class="font-semibold text-white">Safarudin</span>, a fullstack developer
						focused on building high-performance, accessible web apps.
					</p>
				</div>
			</div>
		</BentoItem>

		<!-- Socials Block -->
		<BentoItem class="md:col-span-1 md:row-span-1" title="Connect">
			<div class="grid h-full grid-cols-2 content-center gap-4">
				{#each SOCIALS.slice(0, 4) as social}
					{@const Icon = social.icon}
					<a
						href={social.href}
						target="_blank"
						class="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/5 p-4 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
					>
						<Icon size={24} />
						<span class="text-xs">{social.label}</span>
					</a>
				{/each}
			</div>
		</BentoItem>

		<!-- Tech Stack Block -->
		<BentoItem class="md:col-span-1 md:row-span-1" title="Tech Stack">
			<div class="mt-2 flex flex-wrap gap-2">
				{#each techStack as tech}
					<span
						class="rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300"
					>
						{tech}
					</span>
				{/each}
			</div>
		</BentoItem>

		<!-- Featured Project (Wide) -->
		<BentoItem class="md:col-span-3 md:row-span-1" title="Featured Work">
			{#if projects[0]}
				<div
					class="group relative mt-2 flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6"
				>
					<div
						class="aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-white/5 bg-zinc-900 md:w-48"
					>
						{#if projects[0].metadata.thumbnail}
							<img
								src={projects[0].metadata.thumbnail}
								alt={projects[0].metadata.title}
								class="h-full w-full object-cover"
							/>
						{:else}
							<div class="flex h-full items-center justify-center text-2xl font-bold text-zinc-700">
								{projects[0].metadata.title[0]}
							</div>
						{/if}
					</div>
					<div>
						<h4 class="text-lg font-bold text-white">{projects[0].metadata.title}</h4>
						<p class="mt-1 line-clamp-2 text-sm text-zinc-400">
							{projects[0].metadata.description}
						</p>
						<a
							href="/projects/{projects[0].slug}"
							class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
						>
							View Project <ArrowRight size={14} />
						</a>
					</div>
				</div>
			{/if}
		</BentoItem>
	</div>
</section>
