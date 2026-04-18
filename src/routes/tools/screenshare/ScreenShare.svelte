<script lang="ts">
	import { onDestroy } from 'svelte';
	import type PeerType from 'peerjs';
	import type { MediaConnection } from 'peerjs';
	import {
		MonitorUp,
		MonitorPlay,
		Users,
		Copy,
		ArrowLeft,
		LogOut,
		Check,
		AlertTriangle,
		Loader2,
		Volume2,
		VolumeX,
		Info
	} from 'lucide-svelte';

	// State
	let mode = $state<'select' | 'host' | 'viewer'>('select');

	// Host state
	let shareAudio = $state(false);
	let hostStatus = $state<'idle' | 'starting' | 'streaming' | 'error'>('idle');
	let hostError = $state('');
	let hostId = $state('');
	let hostStream = $state<MediaStream | null>(null);
	let viewersCount = $state(0);
	let copied = $state(false);

	// Viewer state
	let viewerInputHostId = $state('');
	let viewerStatus = $state<'idle' | 'connecting' | 'connected' | 'error'>('idle');
	let viewerError = $state('');
	let viewerStream = $state<MediaStream | null>(null);
	let viewerMuted = $state(true);

	// Internals
	let peerInstance: PeerType | null = null;
	let activeConnections: MediaConnection[] = [];
	let videoElement: HTMLVideoElement | undefined = $state();

	onDestroy(() => {
		cleanup();
	});

	function cleanup() {
		// Stop all media tracks
		if (hostStream) {
			hostStream.getTracks().forEach((track) => track.stop());
			hostStream = null;
		}
		if (viewerStream) {
			viewerStream.getTracks().forEach((track) => track.stop());
			viewerStream = null;
		}

		// Close connections
		activeConnections.forEach((conn) => conn.close());
		activeConnections = [];
		viewersCount = 0;

		// Destroy peer
		if (peerInstance) {
			peerInstance.destroy();
			peerInstance = null;
		}

		hostStatus = 'idle';
		viewerStatus = 'idle';
	}

	async function initHost() {
		cleanup();
		hostStatus = 'starting';
		hostError = '';

		try {
			const stream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio: shareAudio
			});

			hostStream = stream;

			stream.getVideoTracks()[0].onended = () => {
				// User clicked "Stop sharing" via browser UI
				resetMode();
			};

			const { default: Peer } = await import('peerjs');
			peerInstance = new Peer();

			peerInstance.on('open', (id) => {
				hostId = id;
				hostStatus = 'streaming';
			});

			peerInstance.on('call', (call) => {
				// Automatically answer viewer calls with the screen stream
				call.answer(hostStream!);

				activeConnections.push(call);
				viewersCount = activeConnections.length;

				call.on('close', () => {
					activeConnections = activeConnections.filter((c) => c !== call);
					viewersCount = activeConnections.length;
				});

				// Some browsers don't fire close event properly,
				// we can assume disconnected if error occurs
				call.on('error', () => {
					activeConnections = activeConnections.filter((c) => c !== call);
					viewersCount = activeConnections.length;
				});
			});

			peerInstance.on('error', (err) => {
				hostError = `Peer connection error: ${err.type}`;
				hostStatus = 'error';
			});
		} catch (err: any) {
			hostError = err.message || 'Failed to access screen share';
			hostStatus = 'error';
		}
	}

	async function initViewer() {
		if (!viewerInputHostId.trim()) {
			viewerError = 'Please enter a valid Host ID';
			return;
		}

		cleanup();
		viewerStatus = 'connecting';
		viewerError = '';

		try {
			const { default: Peer } = await import('peerjs');
			peerInstance = new Peer();

			peerInstance.on('open', () => {
				// Critical WebRTC Fix: Pass dummy stream to prevent getUserMedia error when answering
				const canvas = document.createElement('canvas');
				canvas.width = 1;
				canvas.height = 1;
				const dummyStream = canvas.captureStream();

				const call = peerInstance!.call(viewerInputHostId.trim(), dummyStream);

				if (!call) {
					viewerError = 'Failed to connect. Invalid Host ID.';
					viewerStatus = 'error';
					return;
				}

				call.on('stream', (remoteStream) => {
					viewerStream = remoteStream;
					viewerStatus = 'connected';
					if (videoElement) {
						videoElement.srcObject = remoteStream;
					}
				});

				call.on('close', () => {
					viewerStatus = 'error';
					viewerError = 'Host disconnected the stream.';
					viewerStream = null;
				});

				call.on('error', (err) => {
					viewerStatus = 'error';
					viewerError = `Call error: ${err.message}`;
				});
			});

			peerInstance.on('error', (err) => {
				viewerStatus = 'error';
				let msg =
					err.type === 'peer-unavailable'
						? 'Host not found. Check the ID.'
						: `Connection error: ${err.type}`;
				viewerError = msg;
			});
		} catch (err: any) {
			viewerStatus = 'error';
			viewerError = 'Failed to initialize peer connection';
		}
	}

	function resetMode() {
		cleanup();
		mode = 'select';
	}

	async function copyHostId() {
		if (hostId) {
			await navigator.clipboard.writeText(hostId);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		}
	}
</script>

<div class="overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
	<!-- Header -->
	<div class="border-b border-white/10 bg-zinc-800/50 p-4">
		{#if mode !== 'select'}
			<button
				onclick={resetMode}
				class="group flex items-center text-sm font-medium text-zinc-400 transition-colors hover:text-white"
			>
				<ArrowLeft size={16} class="mr-2 transition-transform group-hover:-translate-x-1" />
				Back
			</button>
		{:else}
			<h2 class="text-lg font-semibold text-white">Select Mode</h2>
		{/if}
	</div>

	<div class="p-6 sm:p-8">
		{#if mode === 'select'}
			<div class="grid gap-6 md:grid-cols-2">
				<button
					onclick={() => (mode = 'host')}
					class="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-emerald-500/50 hover:bg-white/10"
				>
					<div class="rounded-full bg-emerald-500/20 p-4 text-emerald-400">
						<MonitorUp size={32} />
					</div>
					<div class="text-center">
						<h3 class="text-xl font-semibold text-white">Host a Stream</h3>
						<p class="mt-2 text-sm text-zinc-400">
							Share your screen directly with others via P2P.
						</p>
					</div>
				</button>

				<button
					onclick={() => (mode = 'viewer')}
					class="flex flex-col items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-white/10"
				>
					<div class="rounded-full bg-blue-500/20 p-4 text-blue-400">
						<MonitorPlay size={32} />
					</div>
					<div class="text-center">
						<h3 class="text-xl font-semibold text-white">View a Stream</h3>
						<p class="mt-2 text-sm text-zinc-400">Connect to an active host using their ID.</p>
					</div>
				</button>
			</div>
		{:else if mode === 'host'}
			<div
				class="animate-in slide-in-from-bottom-2 fade-in mx-auto max-w-xl space-y-8 duration-300"
			>
				<div class="text-center">
					<h2 class="text-2xl font-bold text-white">Host a Screen Share</h2>
					<p class="mt-2 text-zinc-400">Share your screen efficiently using peer-to-peer WebRTC.</p>
				</div>

				{#if hostStatus === 'idle' || hostStatus === 'starting'}
					<div class="rounded-lg border border-orange-500/20 bg-orange-500/10 p-4">
						<div class="flex gap-3 text-orange-200">
							<AlertTriangle class="mt-0.5 shrink-0 text-orange-400" size={20} />
							<div class="text-sm leading-relaxed">
								<strong class="text-orange-400">⚠️ P2P Connection Warning:</strong> Streaming
								directly from your browser consumes heavy CPU and upload bandwidth. Maximum
								recommended viewers: 3-5 people.
								<br />
								<span class="mt-1 block opacity-80"
									>Note: Connection often fails if users are behind strict corporate networks (NAT).</span
								>
							</div>
						</div>
					</div>

					<div class="space-y-6">
						<label
							class="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
						>
							<div class="relative flex items-center">
								<input type="checkbox" bind:checked={shareAudio} class="peer sr-only" />
								<div
									class="peer h-6 w-11 rounded-full bg-zinc-700 peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full"
								></div>
							</div>
							<span class="text-sm font-medium text-white">Share System Audio</span>
						</label>

						{#if hostError}
							<div
								class="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
							>
								<AlertTriangle size={16} class="mt-0.5 shrink-0" />
								<span>{hostError}</span>
							</div>
						{/if}

						<button
							onclick={initHost}
							disabled={hostStatus === 'starting'}
							class="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-white transition-all hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if hostStatus === 'starting'}
								<Loader2 size={20} class="animate-spin" />
								Initializing...
							{:else}
								<MonitorUp size={20} />
								Start Sharing
							{/if}
						</button>
					</div>
				{:else if hostStatus === 'streaming'}
					<div class="space-y-6">
						<div
							class="animate-in zoom-in fade-in rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 duration-300"
						>
							<div class="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-400">
								<span class="relative flex h-2 w-2">
									<span
										class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
									></span>
									<span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
								</span>
								You are currently sharing
							</div>

							<div class="mt-6 space-y-4 text-center">
								<div>
									<div class="mb-2 text-xs font-semibold tracking-widest text-zinc-400 uppercase">
										Your Host ID
									</div>
									<div class="flex items-center justify-center gap-2">
										<code
											class="rounded-lg border border-white/10 bg-black/50 px-4 py-2 font-mono text-lg tracking-wider text-emerald-300 shadow-inner select-all"
										>
											{hostId}
										</code>
										<button
											onclick={copyHostId}
											class="rounded-lg border border-transparent p-2.5 text-zinc-400 transition-colors hover:border-white/10 hover:bg-white/10 hover:text-white"
											title="Copy ID"
										>
											{#if copied}
												<Check size={20} class="text-emerald-400" />
											{:else}
												<Copy size={20} />
											{/if}
										</button>
									</div>
								</div>

								<div
									class="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
								>
									<Users size={16} class="text-zinc-400" />
									<span class="text-sm font-medium text-zinc-300">
										{viewersCount} active viewer{viewersCount === 1 ? '' : 's'}
									</span>
								</div>
							</div>
						</div>

						<button
							onclick={cleanup}
							class="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
						>
							<LogOut size={20} />
							Stop Sharing
						</button>
					</div>
				{/if}
			</div>
		{:else if mode === 'viewer'}
			<div
				class="animate-in slide-in-from-bottom-2 fade-in mx-auto max-w-4xl space-y-8 duration-300"
			>
				{#if viewerStatus === 'idle' || viewerStatus === 'connecting' || (viewerStatus === 'error' && !viewerStream)}
					<div class="mx-auto max-w-xl space-y-6">
						<div class="text-center">
							<h2 class="text-2xl font-bold text-white">Join a Stream</h2>
							<p class="mt-2 text-zinc-400">
								Enter the Host ID to connect and view the shared screen.
							</p>
						</div>

						<div class="space-y-4">
							<div class="space-y-2">
								<label for="hostId" class="block text-sm font-medium text-zinc-300">Host ID</label>
								<input
									type="text"
									id="hostId"
									bind:value={viewerInputHostId}
									placeholder="e.g. 1a2b3c4d-5e6f-..."
									class="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-3 font-mono text-white placeholder-zinc-600 transition-shadow focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
									onkeydown={(e) => e.key === 'Enter' && initViewer()}
								/>
							</div>

							{#if viewerError}
								<div
									class="flex items-start gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
								>
									<AlertTriangle size={16} class="mt-0.5 shrink-0" />
									<span>{viewerError}</span>
								</div>
							{/if}

							<button
								onclick={initViewer}
								disabled={viewerStatus === 'connecting'}
								class="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-all hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
							>
								{#if viewerStatus === 'connecting'}
									<Loader2 size={20} class="animate-spin" />
									Connecting...
								{:else}
									<MonitorPlay size={20} />
									Connect
								{/if}
							</button>

							<div class="flex items-start gap-2 pt-2 text-xs text-zinc-500">
								<Info size={14} class="mt-0.5 shrink-0" />
								<p>Connection often fails if users are behind strict corporate networks (NAT).</p>
							</div>
						</div>
					</div>
				{/if}

				<div
					class="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl {viewerStatus ===
						'connected' ||
					(viewerStatus === 'error' && viewerStream)
						? 'block'
						: 'hidden'}"
				>
					<!-- svelte-ignore a11y-media-has-caption -->
					<!-- svelte-ignore a11y_media_has_caption -->
					<video
						bind:this={videoElement}
						autoplay
						playsinline
						controls
						bind:muted={viewerMuted}
						class="h-full w-full object-contain"
					></video>

					{#if viewerStatus === 'error' && viewerStream === null}
						<div
							class="animate-in fade-in absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm duration-300"
						>
							<div
								class="mx-4 max-w-sm rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center"
							>
								<AlertTriangle size={36} class="mx-auto mb-4 text-red-400" />
								<p class="mb-2 text-lg font-semibold text-red-400">Connection Lost</p>
								<p class="mb-6 text-sm text-red-400/80">{viewerError}</p>
								<button
									onclick={resetMode}
									class="flex w-full justify-center rounded-lg border border-red-500/50 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20"
								>
									Return to Menu
								</button>
							</div>
						</div>
					{/if}
				</div>

				{#if viewerStatus === 'connected'}
					<div
						class="animate-in fade-in slide-in-from-bottom-2 mt-6 flex flex-wrap justify-center gap-4"
					>
						<button
							onclick={() => (viewerMuted = !viewerMuted)}
							class="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-2.5 font-semibold text-white transition-all hover:bg-white/10"
						>
							{#if viewerMuted}
								<VolumeX size={18} />
								Unmute
							{:else}
								<Volume2 size={18} />
								Mute
							{/if}
						</button>

						<button
							onclick={cleanup}
							class="flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-6 py-2.5 font-semibold text-red-400 transition-all hover:bg-red-500 hover:text-white"
						>
							<LogOut size={18} />
							Disconnect
						</button>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
