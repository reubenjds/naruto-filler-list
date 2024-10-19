<script lang="ts">
	import Show from '$lib/Show.svelte';

	let shows = [
		{
			name: 'Naruto',
			image: '/naruto.jpg',
			link: '/naruto'
		},
		{
			name: 'Naruto Shippuden',
			image: '/naruto_shippuden.jpg',
			link: '/shippuden'
		}
	];
</script>

<main>
	<div class="flex flex-col justify-center items-center min-h-screen p-5">
		<h1 class="text-4xl font-bold text-center py-2">Naruto Filler List</h1>
		<div>
			<div class="flex flex-col sm:flex-row gap-4">
				{#each shows as show}
					<Show {show} />
				{/each}
			</div>
		</div>
	</div>
</main>
