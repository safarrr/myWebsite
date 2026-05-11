<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Camera as CameraIcon, RefreshCw } from 'lucide-svelte';

	export let onCapture: (detail: { dataUrl: string }) => void = () => {};

	let videoElement: HTMLVideoElement;
	let stream: MediaStream | null = null;
	let devices: MediaDeviceInfo[] = [];
	let selectedDeviceId = '';
	let isReady = false;

	async function getDevices() {
		try {
			// Ask permission first to get labels
			const tempStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
			tempStream.getTracks().forEach(track => track.stop());
			
			const allDevices = await navigator.mediaDevices.enumerateDevices();
			devices = allDevices.filter((d) => d.kind === 'videoinput');
			if (devices.length > 0 && !selectedDeviceId) {
				selectedDeviceId = devices[0].deviceId;
			}
		} catch (error) {
			console.error('Error getting devices:', error);
		}
	}

	async function startCamera() {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}

		if (!selectedDeviceId) return;

		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: { deviceId: { exact: selectedDeviceId } },
				audio: false
			});
			if (videoElement) {
				videoElement.srcObject = stream;
				videoElement.onloadedmetadata = () => {
					videoElement.play();
					isReady = true;
				};
			}
		} catch (error) {
			console.error('Error starting camera:', error);
		}
	}

	function handleDeviceChange() {
		isReady = false;
		startCamera();
	}

	function capturePhoto() {
		if (!videoElement || !isReady) return;

		const canvas = document.createElement('canvas');
		canvas.width = videoElement.videoWidth;
		canvas.height = videoElement.videoHeight;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
			const dataUrl = canvas.toDataURL('image/png');
			onCapture({ dataUrl });
		}
	}

	function handleFileUpload(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			const file = target.files[0];
			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target && typeof event.target.result === 'string') {
					onCapture({ dataUrl: event.target.result });
				}
			};
			reader.readAsDataURL(file);
		}
	}

	onMount(async () => {
		await getDevices();
		await startCamera();
	});

	onDestroy(() => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
	});
</script>

<div class="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
	<div class="flex items-center justify-between">
		<h2 class="flex items-center gap-2 text-lg font-bold text-white">
			<CameraIcon size={20} class="text-emerald-400" />
			Camera
		</h2>
		
		{#if devices.length > 0}
			<div class="flex items-center gap-2">
				<button 
					on:click={getDevices} 
					class="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
					title="Refresh Cameras"
				>
					<RefreshCw size={16} />
				</button>
				<select
					bind:value={selectedDeviceId}
					on:change={handleDeviceChange}
					class="rounded border w-full border-white/10 bg-zinc-800 px-2 py-1 text-sm text-white focus:border-emerald-500 focus:outline-none"
				>
					{#each devices as device}
						<option value={device.deviceId}>
							{device.label || `Camera ${devices.indexOf(device) + 1}`}
						</option>
					{/each}
				</select>
			</div>
		{/if}
	</div>

	<div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-black">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={videoElement}
			class="h-full w-full object-cover {isReady ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300"
			playsinline
			autoplay
		></video>

		{#if !isReady}
			<div class="absolute inset-0 flex items-center justify-center text-zinc-500">
				Starting camera...
			</div>
		{/if}
	</div>

	<div class="flex gap-2">
		<button
			on:click={capturePhoto}
			disabled={!isReady}
			class="flex-1 rounded-lg bg-emerald-500 py-3 font-bold text-zinc-900 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
		>
			Capture
		</button>
		
		<label class="flex-1 cursor-pointer rounded-lg bg-indigo-500 py-3 text-center font-bold text-white transition-colors hover:bg-indigo-400 flex justify-center items-center">
			Upload
			<input type="file" accept="image/*" class="hidden" on:change={handleFileUpload} />
		</label>
	</div>
</div>
