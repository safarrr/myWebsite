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

<header
	class="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl"
>
	<nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
		<div class="flex items-center gap-8">
			{#each links as link}
				{@const isActive = $page.url.pathname === link.href}
				<a
					href={link.href}
					class="group flex items-center gap-2 text-sm font-medium transition-colors duration-300
                    {isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}"
				>
					<svelte:component
						this={link.icon}
						size={18}
						class="transition-transform duration-300 group-hover:scale-110"
					/>
					<span class="hidden sm:inline">{link.label}</span>
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-4">
			<a
				href={SOCIALS.find((s) => s.label === 'GitHub')?.href || '#'}
				target="_blank"
				rel="noopener noreferrer"
				class="text-zinc-400 transition-colors duration-300 hover:text-white"
				aria-label="GitHub"
			>
				<Github size={20} />
			</a>
		</div>
	</nav>
</header>
