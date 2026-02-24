<script lang="ts">
	import { SOCIALS } from '$lib/config';
	const currentYear = new Date().getFullYear();
</script>

<footer class="mt-auto border-t border-white/5 py-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col items-center justify-between gap-6 md:flex-row">
			<div class="text-sm text-zinc-500">
				&copy; {currentYear} Safarudin. All rights reserved.
			</div>

			<div class="flex w-full flex-wrap justify-center gap-6">
				{#each SOCIALS.slice(0, 4) as social}
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-zinc-500 transition-colors hover:text-white"
					>
						{social.label}
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
