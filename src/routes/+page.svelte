<script>
	import GridPattern from '$lib/components/GridPattern.svelte';
	import Ripple from '$lib/components/Ripple.svelte';
	import { cn } from '$lib/utils';
	import Face from '$lib/components/Face.svelte';
	import Link from '$lib/components/Link.svelte';
</script>

<section class="flex h-screen w-screen flex-col p-10">
	<GridPattern
		width={20}
		height={20}
		x={-1}
		y={-1}
		class={cn('z-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ')}
	/>
	<div class=" container-md z-10 mx-auto inline-flex justify-between space-x-2">
		<div class="flex flex-col">
			<div class="relative inline-flex w-max">
				<h1 class=" text-4xl font-bold">Hello.</h1>
				<span class="waving-hand absolute right-[-70px] top-[-15px] text-5xl">👋</span>
			</div>
			<h1 class="text-2xl font-bold">My name is Safarudin.</h1>
			<div class="flex w-[80%] flex-col space-y-2">
				<p class="">
					I'm a programmer from West Java, Indonesia. I use my skills to create cool stuff or just
					have fun swimming through code!.
				</p>
				<p class="">
					I use <span class=" font-semibold underline">javascript, </span><span
						class=" font-semibold underline"
						>Typescript,
					</span><span class=" font-semibold underline">python</span> and hopefully there will be
					more languages, all my public code in <Link to="https://github.com/safarrr">github</Link> or
					<Link to="https://gitlab.com/safar190305">gitlab</Link>
				</p>
				<p class="">
					currcurrently I work as a fullstack website developer in a small company in West Java,
					using
					<span class=" font-semibold underline">Vue</span> and
					<span class=" font-semibold underline">Nodejs</span>
				</p>
				<p class="">
					You can follow me on
					<Link to="https://bsky.app/profile/safarudin.bsky.social">BlueSky</Link> and
					<Link to="https://x.com/justsafarr">Twiter/x</Link> or just <Link
						to="mailto:safar190305@gmail.com">email: safar190305@gmail.com</Link
					>
				</p>
			</div>
		</div>
		<div class=" hidden md:block">
			<Face />
		</div>
	</div>
</section>

<style>
	.waving-hand:hover {
		animation-name: wave-animation;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		transform-origin: 70% 70%;
		display: inline-block;
	}

	@keyframes wave-animation {
		0% {
			transform: rotate(0deg);
		}
		15% {
			transform: rotate(14deg);
		}
		30% {
			transform: rotate(-8deg);
		}
		40% {
			transform: rotate(14deg);
		}
		50% {
			transform: rotate(-4deg);
		}
		60% {
			transform: rotate(10deg);
		}
		70% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
