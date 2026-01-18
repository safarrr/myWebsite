<script lang="ts">
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
	import Link from './Link.svelte';

	let isMenuOpen = $state(false);

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/tools', label: 'Tools' }
	];

	// Close menu when route changes
	$effect(() => {
		if ($page.url.pathname) {
			isMenuOpen = false;
		}
	});
</script>

<nav class="glass fixed top-0 z-50 w-full">
	<div class="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
		<a
			href="/"
			class="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
		>
			Safarudin<span class="text-zinc-500">.</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden md:flex md:gap-x-8">
			{#each links as link}
				<a
					href={link.href}
					class="text-sm font-medium transition-colors hover:text-white
                    {$page.url.pathname === link.href ? 'text-white' : 'text-zinc-400'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Mobile Navigation Button -->
		<div class="flex md:hidden">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400 hover:text-white"
				onclick={toggleMenu}
				aria-label="Toggle menu"
			>
				{#if isMenuOpen}
					<X size={20} />
				{:else}
					<Menu size={20} />
				{/if}
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="space-y-1 border-b border-white/5 bg-zinc-950 px-4 py-6 sm:px-6">
				{#each links as link}
					<a
						href={link.href}
						class="block rounded-lg px-3 py-2 text-base leading-7 font-semibold transition-colors hover:bg-zinc-900
                        {$page.url.pathname === link.href
							? 'bg-zinc-900 text-white'
							: 'text-zinc-400 hover:text-white'}"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
