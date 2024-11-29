<script lang="ts">
	import type { Snippet } from 'svelte';

	let { to, children }: { to: string; children: Snippet } = $props();
</script>

<a
	href={to}
	target="_blank"
	rel="noopener noreferrer"
	class="font-semibold text-blue-500 hover:underline"
>
	{@render children()}
</a>
