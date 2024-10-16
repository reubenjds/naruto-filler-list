<script lang="ts">
	import { naruto, narutoArcs } from '$lib/episodes';
	import Episode from '$lib/Episode.svelte';
	import { onMount } from 'svelte';

	let isSmallScreen = false;
	let Episodes = naruto;
	let selectedArc = -1;

	$: if (selectedArc !== -1) {
		const arc = narutoArcs[selectedArc];
		Episodes = naruto.filter(
			(episode) =>
				Number(episode.number) <= arc.episode_end && Number(episode.number) >= arc.episode_start
		);
	} else {
		Episodes = naruto;
	}

	onMount(() => {
		isSmallScreen = window.innerWidth < 640;
	});
</script>

<main>
	<div class="flex flex-col justify-center items-center min-h-screen gap-4 p-10">
		<h1 class="text-4xl font-bold text-center pt-2 pb-2">Naruto Filler List</h1>
		<div class="join flex place-items-center">
			<input class="input input-bordered join-item" placeholder="Episode" />
			{#if isSmallScreen}
				<!-- Modal for small screens -->
				<input type="checkbox" id="modal-toggle" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box relative">
						<label for="modal-toggle" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>✕</label
						>
						<select
							bind:value={selectedArc}
							class="select select-bordered w-full max-w-xs join-item mt-6"
						>
							<option value={-1} selected>All Episodes</option>
							{#each narutoArcs as arc, index}
								<option value={index}>{arc.name}</option>
							{/each}
						</select>
					</div>
				</div>
				<label for="modal-toggle" class="btn join-item m-1">Options</label>
			{:else}
				<!-- Dropdown for larger screens -->
				<div class="dropdown dropdown-bottom">
					<div tabindex="0" role="button" class="btn join-item m-1">Options</div>
					<ul class="dropdown-content menu bg-base-100 rounded-box z-[99] w-max p-2 shadow">
						<select
							bind:value={selectedArc}
							class="select select-bordered w-full max-w-xs join-item"
						>
							<option value={-1} selected>All Episodes</option>
							{#each narutoArcs as arc, index}
								<option value={index}>{arc.name}</option>
							{/each}
						</select>
					</ul>
				</div>
			{/if}
		</div>
		<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{#key Episodes}
				{#each Episodes as episode}
					<Episode {episode} />
				{/each}
			{/key}
		</div>
	</div>
</main>
