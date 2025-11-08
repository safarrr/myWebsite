<script>
	import MagicCard from '$lib/components/MagicCard.svelte';
</script>

<div class=" container mx-auto flex h-screen flex-col items-center justify-center space-y-3 p-5">
	<h1 class="text-center text-4xl font-bold">Tools</h1>
	<div class="flex w-full flex-wrap justify-center gap-4">
		<MagicCard class="w-full max-w-sm items-start justify-start">
			<div class="flex flex-col items-start p-4 text-left">
				<h2 class="text-2xl font-bold">whatsapp generator link</h2>
				<p>Generate a link to chat without saving number. can multiple link</p>
				<div class="mt-4">
					<a
						href="/tools/wame"
						class=" rounded-full bg-gray-100 px-5 py-2 text-gray-900 hover:bg-zinc-400"
						>Go to page</a
					>
				</div>
			</div>
		</MagicCard>
		<!-- <MagicCard>
			<p>ss</p>
		</MagicCard>
		<MagicCard>
			<p>ss</p>
		</MagicCard> -->
	</div>
</div>
