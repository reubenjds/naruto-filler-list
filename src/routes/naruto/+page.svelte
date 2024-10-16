<script lang="ts">
	import { naruto } from '$lib/episodes';
	import Episode from '$lib/Episode.svelte';
</script>

<main>
	<div class="flex flex-col justify-center items-center min-h-screen">
		<h1 class="text-4xl font-bold text-center py-2">Naruto Filler List</h1>
		<div>
			<div class="flex flex-col gap-4">
				{#each naruto as episode}
					<Episode {episode} />
				{/each}
			</div>
		</div>
	</div>
</main>
