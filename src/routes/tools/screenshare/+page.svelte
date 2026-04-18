<script lang="ts">
  import ScreenShare from './ScreenShare.svelte';
</script>

<svelte:head>
  <title>P2P Screen Share | Tools | Safarudin</title>
</svelte:head>

<section class="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
  <div class="mb-8 text-center">
    <h1 class="mb-4 text-4xl font-bold text-white sm:text-5xl">
      P2P Screen Share<span class="text-emerald-500">.</span>
    </h1>
    <p class="text-lg text-zinc-400">Low-latency peer-to-peer screen sharing using WebRTC</p>
  </div>

  <ScreenShare />
</section>
