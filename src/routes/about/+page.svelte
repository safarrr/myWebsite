<script lang="ts">
	import {
		Github,
		Linkedin,
		Twitter,
		Mail,
		Instagram,
		Gitlab,
		Cloud,
		Code2,
		BookOpen,
		Palette
	} from 'lucide-svelte';
	import { TECH_STACK } from '$lib/config';
	import Face from '$lib/components/Face.svelte';
</script>

<svelte:head>
	<title>About | Safarudin</title>
	<meta name="description" content="Learn more about Safarudin and his journey." />
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header -->
	<div class="relative z-0 mb-16 text-center">
		<!-- Face Illustration -->
		<div
			class="pointer-events-none absolute -top-10 -right-20 -z-10 rotate-15 text-white opacity-20 transition-all duration-500 hover:scale-110 hover:opacity-40 md:-right-32"
		>
			<Face />
		</div>

		<!-- Aurora Background -->
		<div
			class="pointer-events-none absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 opacity-30"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 blur-[100px]"
			></div>
		</div>

		<h1 class="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
			About Me<span class="text-zinc-500">.</span>
		</h1>
	</div>

	<div class="space-y-12">
		<!-- Bio Section -->
		<div class="prose prose-invert prose-lg mx-auto text-zinc-400">
			<p class="leading-relaxed">
				My name is <span class="font-semibold text-white">Safarudin</span>. I'm a programmer from
				West Java, Indonesia, who loves turning ideas into reality through code. Whether it's
				building web applications, exploring new technologies, or just experimenting with creative
				projects, I enjoy every step of the process.
			</p>

			<div class="my-8 flex gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-6">
				<Palette class="shrink-0 text-indigo-400" size={24} />
				<p class="mt-0 text-base">
					Beyond coding, I have a passion for <span class="text-indigo-300">UI/UX design</span> and often
					use Figma to craft clean, user-friendly interfaces. I believe that great design enhances functionality,
					making digital experiences more intuitive and enjoyable.
				</p>
			</div>

			<div class="my-8 flex gap-4 rounded-xl border border-white/5 bg-zinc-900/30 p-6">
				<BookOpen class="shrink-0 text-emerald-400" size={24} />
				<p class="mt-0 text-base">
					Reading books is another passion, especially those about technology, self-improvement, and
					new topics that spark curiosity. Learning new things and taking on challenges is something
					I truly enjoy, always seeking fresh insights and skills to improve my craft.
				</p>
			</div>
		</div>

		<!-- Tech Stack -->
		<div class="border-t border-white/10 pt-12">
			<h2 class="mb-6 flex items-center gap-2 text-2xl font-bold text-white">
				<Code2 class="text-zinc-500" />
				Tech Stack
			</h2>
			<div class="flex flex-wrap gap-3">
				{#each TECH_STACK as tech}
					<span
						class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
					>
						{tech}
					</span>
				{/each}
				<span class="px-2 py-2 text-sm text-zinc-500 italic">...and hopefully more soon!</span>
			</div>
		</div>

		<!-- Connect -->
		<div class="border-t border-white/10 pt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Let's Connect</h2>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<a
					href="mailto:safarudin.dev@gmail.com"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Mail size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">Email</div>
						<div class="text-xs text-zinc-500">safarudin.dev@gmail.com</div>
					</div>
				</a>

				<a
					href="https://bsky.app"
					target="_blank"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Cloud size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">BlueSky</div>
						<div class="text-xs text-zinc-500">Follow me</div>
					</div>
				</a>

				<a
					href="https://x.com/justsafarr"
					target="_blank"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Twitter size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">Twitter / X</div>
						<div class="text-xs text-zinc-500">@justsafarr</div>
					</div>
				</a>

				<a
					href="https://github.com/safarrr"
					target="_blank"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Github size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">GitHub</div>
						<div class="text-xs text-zinc-500">View code</div>
					</div>
				</a>

				<a
					href="https://gitlab.com"
					target="_blank"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Gitlab size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">GitLab</div>
						<div class="text-xs text-zinc-500">View code</div>
					</div>
				</a>

				<a
					href="https://linkedin.com/in/safarudin19"
					target="_blank"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Linkedin size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">LinkedIn</div>
						<div class="text-xs text-zinc-500">Connect</div>
					</div>
				</a>

				<a
					href="https://instagram.com"
					target="_blank"
					class="group flex items-center gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 transition-all hover:border-white/10 hover:bg-zinc-900/50"
				>
					<div
						class="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors group-hover:text-white"
					>
						<Instagram size={20} />
					</div>
					<div>
						<div class="text-sm font-medium text-zinc-300">Instagram</div>
						<div class="text-xs text-zinc-500">Follow</div>
					</div>
				</a>
			</div>
		</div>
	</div>
</section>
