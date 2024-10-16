<script lang="ts">
	import { naruto } from '$lib/episodes';
	import Episode from '$lib/Episode.svelte';
	import { onMount } from 'svelte';

	let isSmallScreen = false;

	onMount(() => {
		isSmallScreen = window.innerWidth < 640;
	});
</script>

<main>
	<div class="flex flex-col justify-center items-center min-h-screen gap-4 p-10">
		<h1 class="text-4xl font-bold text-center pt-2 pb-2">Naruto Filler List</h1>
		<div class="join">
			<input class="input input-bordered join-item" placeholder="Episode" />
			<!-- Need to fix the css for options dropdown -->
			{#if isSmallScreen}
				<!-- Modal for small screens -->
				<input type="checkbox" id="modal-toggle" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box">
						<h3 class="font-bold text-lg">Select an Item</h3>
						<ul class="menu bg-base-100 rounded-box w-full p-2 shadow">
							<li>Item 1</li>
							<li>Item 2</li>
						</ul>
						<div class="modal-action">
							<label for="modal-toggle" class="btn">Close</label>
						</div>
					</div>
				</div>
				<label for="modal-toggle" class="btn m-1">Click</label>
			{:else}
				<!-- Dropdown for larger screens -->
				<div class="dropdown dropdown-bottom">
					<div tabindex="0" role="button" class="btn m-1">Click</div>
					<ul class="dropdown-content menu bg-base-100 rounded-box z-[99] w-52 p-2 shadow">
						<li>Item 1</li>
						<li>Item 2</li>
					</ul>
				</div>
			{/if}
		</div>
		<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{#each naruto as episode}
				<Episode {episode} />
			{/each}
		</div>
	</div>
</main>
