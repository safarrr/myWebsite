<script lang="ts">
	import type { ProjectMetadata } from '$lib/utils';

	interface Props {
		project: ProjectMetadata;
		slug: string;
	}

	let { project, slug }: Props = $props();
</script>

<a
	href="/projects/{slug}"
	class="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-zinc-900/30 transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/50"
>
	<!-- Image Placeholder or Image -->
	<div class="relative aspect-video w-full overflow-hidden bg-zinc-900">
		{#if project.thumbnail}
			<img
				src={project.thumbnail}
				alt={project.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		{:else}
			<div class="absolute inset-0 flex items-center justify-center bg-zinc-900 text-zinc-700">
				<span class="text-4xl font-bold opacity-20">{project.title.charAt(0)}</span>
			</div>
		{/if}

		<!-- Overlay -->
		<div class="absolute inset-0 bg-linear-to-t from-zinc-950/80 to-transparent opacity-60"></div>
	</div>

	<div class="flex flex-1 flex-col p-6">
		<div class="mb-3 flex items-center justify-between gap-4">
			<h3
				class="line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-zinc-200"
			>
				{project.title}
			</h3>
			{#if project.date}
				<span
					class="rounded-full border border-white/5 bg-zinc-900/50 px-2 py-1 text-xs font-medium text-zinc-500"
				>
					{new Date(project.date).getFullYear()}
				</span>
			{/if}
		</div>

		<p class="mb-6 line-clamp-2 flex-1 text-sm text-zinc-400">
			{project.description}
		</p>

		<div class="mt-auto flex flex-wrap gap-2">
			{#each (project.tech || []).slice(0, 3) as tech}
				<span
					class="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2 py-1 text-xs font-medium text-zinc-300"
				>
					{tech}
				</span>
			{/each}
			{#if (project.tech || []).length > 3}
				<span
					class="inline-flex items-center rounded-md border border-white/5 bg-zinc-900 px-2 py-1 text-xs font-medium text-zinc-500"
				>
					+{(project.tech || []).length - 3}
				</span>
			{/if}
		</div>
	</div>
</a>
