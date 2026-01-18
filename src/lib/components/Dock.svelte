<script lang="ts">
	import {
		Home,
		FolderGit2,
		PenTool,
		Mail,
		Github,
		Twitter,
		Linkedin,
		Wrench,
		User
	} from 'lucide-svelte';
	import { page } from '$app/stores';
	import { SOCIALS } from '$lib/config';

	let links = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/about', label: 'About', icon: User },
		{ href: '/projects', label: 'Projects', icon: FolderGit2 },
		{ href: '/tools', label: 'Tools', icon: Wrench },
		{ href: '/blog', label: 'Blog', icon: PenTool }
	];
</script>

<div
	class="fixed bottom-6 left-1/2 z-50 w-full max-w-[calc(100%-2rem)] -translate-x-1/2 sm:w-auto sm:max-w-none"
>
	<nav
		class="flex items-center justify-center gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 p-2 shadow-2xl shadow-zinc-950/50 backdrop-blur-xl sm:gap-2"
	>
		{#each links as link}
			{@const isActive = $page.url.pathname === link.href}
			<a
				href={link.href}
				class="group relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-all duration-300 hover:bg-white/10 hover:text-white sm:h-12 sm:w-12
                {isActive
					? 'bg-white/10 text-white shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]'
					: ''}"
				aria-label={link.label}
			>
				<svelte:component
					this={link.icon}
					size={20}
					class="transition-transform duration-300 group-hover:scale-110"
				/>

				<!-- Tooltip -->
				<span
					class="absolute -top-10 left-1/2 hidden -translate-x-1/2 scale-0 rounded-lg border border-white/5 bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 group-hover:-top-12 group-hover:scale-100 group-hover:opacity-100 sm:block"
				>
					{link.label}
				</span>
			</a>
		{/each}

		<!-- Separator -->
		<div class="mx-1 h-8 w-[1px] bg-white/10"></div>

		<!-- Socials Mini -->
		<a
			href={SOCIALS.find((s) => s.label === 'GitHub')?.href || '#'}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative flex h-10 w-10 items-center justify-center rounded-xl text-zinc-400 transition-all duration-300 hover:bg-white/10 hover:text-white sm:h-12 sm:w-12"
		>
			<Github size={20} />
			<span
				class="absolute -top-10 left-1/2 hidden -translate-x-1/2 scale-0 rounded-lg border border-white/5 bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-300 group-hover:-top-12 group-hover:scale-100 group-hover:opacity-100 sm:block"
			>
				GitHub
			</span>
		</a>
	</nav>
</div>
