<script lang="ts">
	import { ArrowLeft, Copy, Download, Link, Wand2 } from 'lucide-svelte';

	let numbers = $state('');
	let message = $state('');
	let links = $state<string[]>([]);

	let generate = () => {
		let numbersArray = numbers.split(',').map((num) => num.trim());
		// Basic validation filtering
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

<div
	class="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 py-20 sm:px-6 lg:px-8"
>
	<!-- Back Link -->
	<div class="mb-12 w-full max-w-6xl">
		<a
			href="/tools"
			class="group inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
		>
			<ArrowLeft size={16} class="transition-transform group-hover:-translate-x-1" />
			Back to tools
		</a>
	</div>

	<div class="relative mb-16 text-center">
		<!-- Aurora Background -->
		<div
			class="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 opacity-40"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 blur-[100px]"
			></div>
		</div>

		<h1 class="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
			WhatsApp Link Generator<span class="text-emerald-500">.</span>
		</h1>
		<p class="mx-auto max-w-2xl text-lg text-zinc-400">
			Generate direct chat links for multiple numbers instantly. Perfect for marketing campaigns or
			quick outreach.
		</p>
	</div>

	<div class="flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
		<!-- Input Section -->
		<div
			class="flex flex-1 flex-col gap-6 rounded-2xl border border-white/5 bg-zinc-900/30 p-6 backdrop-blur-sm lg:p-8"
		>
			<div class="flex flex-col gap-2">
				<label class="text-sm font-semibold text-zinc-300" for="numbers">
					Phone Numbers <span class="ml-2 font-normal text-zinc-500">(Comma separated)</span>
				</label>
				<textarea
					id="numbers"
					bind:value={numbers}
					placeholder="Example: 628123456789, 628987654321"
					class="min-h-[150px] w-full rounded-xl border border-white/10 bg-zinc-950/50 p-4 text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
				></textarea>
			</div>

			<div class="flex flex-col gap-2">
				<label class="text-sm font-semibold text-zinc-300" for="message">
					Pre-filled Message <span class="ml-2 font-normal text-zinc-500">(Optional)</span>
				</label>
				<textarea
					id="message"
					bind:value={message}
					placeholder="Hello, I would like to inquire about..."
					class="min-h-[100px] w-full rounded-xl border border-white/10 bg-zinc-950/50 p-4 text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
				></textarea>
			</div>

			<button
				onclick={generate}
				class="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:bg-emerald-500"
			>
				<Wand2 size={18} />
				Generate Links
			</button>
		</div>

		<!-- Output Section -->
		<div
			class="flex flex-1 flex-col rounded-2xl border border-white/5 bg-zinc-900/30 p-6 backdrop-blur-sm lg:p-8"
		>
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-lg font-semibold text-white">Generated Links</h2>
				<span class="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400"
					>{links.length} links</span
				>
			</div>

			<div
				class="flex flex-1 flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/50"
			>
				<div class="scrollbar-custom flex-1 overflow-y-auto p-4">
					{#if links.length > 0}
						<ul class="space-y-2">
							{#each links as link}
								<li>
									<a
										href={link}
										target="_blank"
										rel="noopener noreferrer"
										class="flex items-center gap-3 rounded-lg p-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-emerald-400"
									>
										<Link size={14} class="shrink-0" />
										<span class="truncate">{link}</span>
									</a>
								</li>
							{/each}
						</ul>
					{:else}
						<div class="flex h-full flex-col items-center justify-center text-zinc-600">
							<Link size={48} class="mb-4 opacity-20" />
							<p>No links generated yet</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="mt-6 flex flex-wrap gap-3">
				<button
					disabled={links.length === 0}
					class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-800 px-4 py-3 font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
					onclick={copyToClipboard}
				>
					<Copy size={18} />
					Copy All
				</button>
				<button
					disabled={links.length === 0}
					class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-800 px-4 py-3 font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
					onclick={downloadFile}
				>
					<Download size={18} />
					Save as .txt
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar-custom {
		scrollbar-width: thin;
		scrollbar-color: #10b981 transparent;
	}

	.scrollbar-custom::-webkit-scrollbar {
		width: 6px;
	}

	.scrollbar-custom::-webkit-scrollbar-track {
		background: transparent;
	}

	.scrollbar-custom::-webkit-scrollbar-thumb {
		background-color: #10b981;
		border-radius: 9999px;
	}
</style>
