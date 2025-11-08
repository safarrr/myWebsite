<script lang="ts">
	import GridPattern from '$lib/components/GridPattern.svelte';
	import Ripple from '$lib/components/Ripple.svelte';
	import { cn } from '$lib/utils';
	import Face from '$lib/components/Face.svelte';
	import Link from '$lib/components/Link.svelte';
	import type { PageData } from './$types';
	import BoxReveal from '$lib/components/BoxReveal.svelte';
	interface MetadataType {
		title: string;
		date: string;
		updated: string;
		author: string[];
		categories: string[];
		description: string;
	}
	// interface DataPostType {
	//   link: string; metadata?: MetadataType[] ;
	// }

	let { data }: { data: PageData } = $props();
	let dataPost = data.data || [];
</script>

<div class="w-svw">
	<section class="flex min-h-svh w-svw flex-col justify-center p-10">
		<div class="z-10 container mx-auto inline-flex justify-between space-x-2">
			<div class="flex h-full flex-col">
				<div class="relative inline-flex w-max">
					<BoxReveal boxColor={'white'} duration={0.5}>
						<h1 class="text-4xl font-bold">Hello.</h1>
					</BoxReveal>
					<!-- <span class="waving-hand absolute top-[-15px] right-[-70px] text-5xl">👋</span> -->
				</div>
				<h1 class="flex space-x-2 text-2xl font-bold">
					<span>My name is </span>
					<BoxReveal boxColor={'white'} duration={0.8}>Safarudin.</BoxReveal>
				</h1>
				<div class="flex flex-col space-y-2 text-sm lg:w-[70%] lg:text-base">
					<p class="">
						I'm a programmer from West Java, Indonesia, who loves turning ideas into reality through
						code. Whether it's building web applications, exploring new technologies, or just
						experimenting with creative projects, I enjoy every step of the process.
					</p>
					<p class="">
						Beyond coding, I have a passion for UI/UX design and often use Figma to craft clean,
						user-friendly interfaces. I believe that great design enhances functionality, making
						digital experiences more intuitive and enjoyable.
					</p>
					<p class="">
						Reading books is another passion, especially those about technology, self-improvement,
						and new topics that spark curiosity. Learning new things and taking on challenges is
						something I truly enjoy, always seeking fresh insights and skills to improve my craft.
					</p>
					<p class="">
						I use <span class=" font-semibold underline">javascript, </span><span
							class=" font-semibold underline"
							>Typescript,
						</span><span class=" font-semibold underline">python</span> and hopefully there will be
						more languages, all my public code in <Link to="https://github.com/safarrr">github</Link
						> or
						<Link to="https://gitlab.com/safar190305">gitlab</Link>
					</p>
					<!-- <p class="">
						currcurrently I work as a fullstack website developer in a small company in West Java,
						using
						<span class=" font-semibold underline">Vue</span> and
						<span class=" font-semibold underline">Nodejs</span>
					</p> -->
					<p class="">
						You can follow me on
						<Link to="https://bsky.app/profile/safarudin.bsky.social">BlueSky</Link> and
						<Link to="https://x.com/justsafarr">Twiter/x</Link> or just <Link
							to="mailto:safarudin.dev@gmail.com">email: safarudin.dev@gmail.com</Link
						>
					</p>
					<p class="">
						other
						<Link to="https://www.linkedin.com/in/safarudin19/">linkedin</Link>,
						<Link to="https://www.instagram.com/safar19x/">Instagram</Link>,
					</p>
				</div>
			</div>
			<div class=" hidden lg:block">
				<Face />
			</div>
		</div>
		<div class="container mx-auto flex flex-col items-start space-y-2 pt-2">
			<h3 class="text-2xl font-bold">Random Tools</h3>
			<a href="/tools" class="rounded-lg bg-neutral-100 px-5 py-2 text-black hover:bg-neutral-400"
				>Tools</a
			>
		</div>
	</section>
	<div
		id="blog"
		class="flex flex-col gap-2 overflow-x-hidden rounded-t-xl bg-neutral-900 px-5 py-8"
	>
		<h1 class=" text-xl font-bold">Blog</h1>
		<div class="">blog is only available in bahasa Indonesian for now</div>
		<div class="flex w-full flex-wrap items-center justify-center gap-2">
			{#each dataPost as post}
				{@const metadata = post.metadata ? (post.metadata as MetadataType) : null}
				<div class=" w-80 rounded-md bg-neutral-950 p-5">
					<a
						aria-label={'link to blog ' + (metadata ? metadata.title : '')}
						href={`/blog/${post.link}`}
						class=" hover:underline"
					>
						<h1 class="text-lg font-bold">{metadata ? metadata.title : ''}</h1>
					</a>
					<p class="">{metadata ? metadata.description : ''}</p>
				</div>
			{/each}
		</div>
	</div>
</div>
