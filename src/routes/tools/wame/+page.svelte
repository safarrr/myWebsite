<script lang="ts">
	import { ArrowLeft, Copy, Download } from 'lucide-svelte';

	let numbers = $state('');
	let message = $state('');
	let links = $state<string[]>([]);

	let generate = () => {
		let numbersArray = numbers.split(',').map((num) => num.trim());
		numbersArray = numbersArray.filter((n) => n.length > 0);

		let linksArray = numbersArray.map((num) => `https://wa.me/${num}`);
		if (message) {
			const encodedMessage = encodeURIComponent(message);
			linksArray = linksArray.map((link) => `${link}?text=${encodedMessage}`);
		}
		if (linksArray.length > 0) {
			links = linksArray;
		}
	};

	let copyToClipboard = () => {
		navigator.clipboard.writeText(links.join('\n'));
	};

	let downloadFile = () => {
		const blob = new Blob([links.join(',\n')], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'links.txt';
		a.click();
		URL.revokeObjectURL(url);
	};
</script>

<svelte:head>
	<title>WhatsApp Link Generator | Tools</title>
</svelte:head>

<section class="container mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
	<div class="mb-8">
		<a href="/tools" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
			<ArrowLeft size={16} />
			Back to tools
		</a>
	</div>

	<div class="mb-16 text-center">
		<h1 class="mb-4 text-5xl font-bold text-white sm:text-6xl">
			WhatsApp Link Generator<span class="text-zinc-500">.</span>
		</h1>
		<p class="text-lg text-zinc-400">Generate direct chat links for multiple numbers</p>
	</div>

	<div class="space-y-6">
		<div class="rounded-lg border border-white/10 bg-white/5 p-6">
			<label class="mb-2 block text-sm font-medium text-white" for="numbers">
				Phone Numbers (comma separated)
			</label>
			<textarea
				id="numbers"
				bind:value={numbers}
				placeholder="628123456789, 628987654321"
				class="w-full rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
				rows="4"
			></textarea>
		</div>

		<div class="rounded-lg border border-white/10 bg-white/5 p-6">
			<label class="mb-2 block text-sm font-medium text-white" for="message">
				Pre-filled Message (optional)
			</label>
			<textarea
				id="message"
				bind:value={message}
				placeholder="Hello, I would like to inquire about..."
				class="w-full rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-white placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
				rows="3"
			></textarea>
		</div>

		<button
			onclick={generate}
			class="w-full rounded-lg bg-white/10 px-4 py-3 font-medium text-white transition-colors hover:bg-white/20"
		>
			Generate Links
		</button>

		{#if links.length > 0}
			<div class="rounded-lg border border-white/10 bg-white/5 p-6">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-sm font-medium text-white">Generated Links ({links.length})</h2>
					<div class="flex gap-2">
						<button
							onclick={copyToClipboard}
							class="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
						>
							<Copy size={14} />
							Copy
						</button>
						<button
							onclick={downloadFile}
							class="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20"
						>
							<Download size={14} />
							Download
						</button>
					</div>
				</div>
				<div class="max-h-64 overflow-y-auto rounded-lg border border-white/10 bg-zinc-900 p-3">
					<ul class="space-y-1">
						{#each links as link}
							<li>
								<a
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									class="block truncate text-xs text-zinc-400 hover:text-white"
								>
									{link}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>
</section>
