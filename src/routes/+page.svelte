<script lang="ts">
	import Show from '$lib/Show.svelte';
	import openWelcomeModal from './+layout.svelte';

	let shows = [
		{
			name: 'Naruto',
			image: '/naruto.png',
			link: '/naruto'
		},
		{
			name: 'Naruto Shippuden',
			image: '/naruto_shippuden.png',
			link: '/shippuden'
		}
	];
</script>

<main>
	<div class="flex flex-col justify-center place-items-center">
		<!-- <h1 class="text-4xl font-bold text-center py-2">Naruto Filler List</h1> -->
		<div>
			<div class="flex flex-col sm:flex-row gap-12">
				{#each shows as show}
					<Show {show} />
				{/each}
			</div>
		</div>
	</div>
</main>
