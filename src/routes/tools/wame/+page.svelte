<script lang="ts">
	let numbers = $state('');
	let message = $state('');
	let links = $state<string[]>([]);
	let generate = () => {
		let numbersArray = numbers.split(',').map((num) => num.trim());
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

<div class="container mx-auto flex h-screen flex-col items-center justify-center space-y-3 p-5">
	<div class="flex flex-col items-center justify-center space-y-3">
		<h1 class="text-4xl font-bold">Whatsapp Generator Link</h1>
		<p>Generate a link to chat without saving number. can multiple link</p>
	</div>
	<div
		class="flex max-h-[80%] flex-col gap-3 rounded-lg border border-neutral-100/10 bg-neutral-100/10 p-5 backdrop-blur-3xl md:flex-row"
	>
		<div class="flex flex-col space-y-3 p-2">
			<div class="flex flex-col space-y-2">
				<label class="text-lg font-bold" for="numbers">List of numbers</label>
				<textarea
					id="numbers"
					bind:value={numbers}
					placeholder="Enter numbers separated by commas"
					class="w-full rounded-lg border border-neutral-100/10 bg-neutral-100/10 p-5"
				></textarea>
				<p>separate numbers with commas</p>
			</div>
			<div class="flex flex-col space-y-2">
				<label class="text-lg font-bold" for="message">message</label>
				<textarea
					id="message"
					bind:value={message}
					placeholder="Enter message"
					class="w-full rounded-lg border border-neutral-100/10 bg-neutral-100/10 p-5"
				></textarea>
				<p>optional</p>
			</div>

			<button
				onclick={generate}
				class="rounded-lg bg-neutral-100 px-5 py-2 text-black hover:bg-neutral-400">Generate</button
			>
		</div>
		<div class=" flex flex-col gap-2 p-2">
			<p>Generated links</p>
			<div class=" inline-flex gap-2">
				<button
					disabled={links.length === 0}
					class="rounded-lg bg-neutral-100 px-5 py-2 text-black hover:bg-neutral-400 disabled:opacity-50"
					onclick={copyToClipboard}>Copy to clipboard</button
				>
				<button
					disabled={links.length === 0}
					class="rounded-lg bg-neutral-100 px-5 py-2 text-black hover:bg-neutral-400 disabled:opacity-50"
					onclick={downloadFile}>Download file text</button
				>
			</div>
			<div class=" scrollbar-links flex flex-col overflow-y-auto">
				{#if links.length > 0}
					{#each links as link, index (index)}
						<a href={link}>{link}</a>
					{/each}
				{:else}
					<p class="text-center">No links generated</p>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.scrollbar-links {
		scrollbar-width: thin;
		scrollbar-color: #6baf8d transparent;
	}

	.scrollbar-links::-webkit-scrollbar {
		width: 8px;
	}

	.scrollbar-links::-webkit-scrollbar-track {
		background: transparent;
		border-radius: 9999px;
	}

	.scrollbar-links::-webkit-scrollbar-thumb {
		background-color: #6baf8d;
		border-radius: 9999px;
	}
</style>
