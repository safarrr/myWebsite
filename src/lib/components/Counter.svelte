<script>
	let count = 0;
</script>

<div class=" inline-flex space-x-6">
	<button on:click={() => (count -= 1)}>-</button>
	<span>{count}</span>
	<button on:click={() => (count += 1)}>+</button>
</div>
