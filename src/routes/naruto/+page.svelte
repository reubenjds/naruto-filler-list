<script lang="ts">
	import { naruto, narutoArcs } from '$lib/episodes';
	import Episode from '$lib/Episode.svelte';
	import { onMount } from 'svelte';

	let isSmallScreen = false;
	let Episodes = naruto;

	let selectedArc = -1;
	let selectedEpisode = '';
	let showTitles = true;
	let useTable = false;
	let selectedEpisodeType = 'all';

	let modal: HTMLDialogElement;

	$: {
		if (selectedArc !== -1) {
			const arc = narutoArcs[selectedArc];
			Episodes = naruto.filter(
				(episode) =>
					Number(episode.number) <= arc.episode_end && Number(episode.number) >= arc.episode_start
			);
		} else {
			Episodes = naruto;
		}

		if (selectedEpisode) {
			if (isNaN(Number(selectedEpisode)) && showTitles) {
				Episodes = Episodes.filter((episode) =>
					episode.title.toLowerCase().includes(selectedEpisode.trim().toLowerCase())
				);
			} else {
				Episodes = Episodes.filter((episode) => episode.number.includes(selectedEpisode.trim()));
			}
		}

		if (selectedEpisodeType !== 'all') {
			Episodes = Episodes.filter((episode) => {
				if (selectedEpisodeType === 'filler') {
					return episode.type === 'Filler';
				} else if (selectedEpisodeType === 'mixedCanonFiller') {
					return episode.type === 'Mixed Canon/Filler';
				} else if (selectedEpisodeType === 'canon') {
					return episode.type === 'Canon';
				}
				return true;
			});
		}
	}

	onMount(() => {
		isSmallScreen = window.innerWidth < 640;
	});
</script>

<main>
	<div class="flex flex-col place-items-center min-h-screen gap-4 p-10">
		<h1 class="text-4xl font-bold text-center pt-2 pb-2">Naruto Filler List</h1>
		<div class="join flex place-items-center">
			<input
				bind:value={selectedEpisode}
				class="input input-bordered join-item"
				placeholder="Episode"
			/>
			{#if isSmallScreen}
				<!-- Modal for small screens -->
				<input type="checkbox" id="modal-toggle" class="modal-toggle" />
				<div class="modal">
					<div class="modal-box relative flex flex-col gap-2">
						<label for="modal-toggle" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
							>✕</label
						>
						<select bind:value={selectedArc} class="select select-bordered w-full join-item mt-6">
							<option value={-1} selected>All Episodes</option>
							{#each narutoArcs as arc, index}
								<option value={index}>{arc.name}</option>
							{/each}
						</select>
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">Show Episode Titles</span>
								<input
									type="checkbox"
									bind:checked={showTitles}
									class="checkbox checkbox-warning"
								/>
							</label>
						</div>
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text">View as Table</span>
								<input type="checkbox" bind:checked={useTable} class="checkbox checkbox-warning" />
							</label>
						</div>
						<div class="form-control flex flex-row gap-2 items-start">
							<label class="label cursor-pointer">
								<input
									type="radio"
									name="episodeType"
									value="all"
									bind:group={selectedEpisodeType}
									class="radio radio-info"
								/>
								<span class="label-text p-1">All</span>
							</label>
							<label class="label cursor-pointer">
								<input
									type="radio"
									name="episodeType"
									value="filler"
									bind:group={selectedEpisodeType}
									class="radio radio-error"
								/>
								<span class="label-text p-1">Filler</span>
							</label>
							<label class="label cursor-pointer">
								<input
									type="radio"
									name="episodeType"
									value="mixedCanonFiller"
									bind:group={selectedEpisodeType}
									class="radio radio-warning"
								/>
								<span class="label-text p-1">Mixed</span>
							</label>
							<label class="label cursor-pointer">
								<input
									type="radio"
									name="episodeType"
									value="canon"
									bind:group={selectedEpisodeType}
									class="radio radio-success"
								/>
								<span class="label-text p-1">Canon</span>
							</label>
						</div>
					</div>
				</div>
				<label for="modal-toggle" class="btn join-item m-1">Options</label>
			{:else}
				<!-- Dropdown for larger screens -->
				<details class="dropdown">
					<summary class="btn join-item m-1">Options</summary>
					<ul class="dropdown-content menu bg-base-100 rounded-box z-[99] w-max p-2 shadow">
						<div class="flex flex-col gap-1 p-2">
							<select bind:value={selectedArc} class="select select-bordered w-full join-item">
								<option value={-1} selected>All Arcs</option>
								{#each narutoArcs as arc, index}
									<option value={index}>{arc.name}</option>
								{/each}
							</select>
							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text">Show Episode Titles</span>
									<input
										type="checkbox"
										bind:checked={showTitles}
										class="checkbox checkbox-warning"
									/>
								</label>
							</div>
							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text">View as Table</span>
									<input
										type="checkbox"
										bind:checked={useTable}
										class="checkbox checkbox-warning"
									/>
								</label>
							</div>
							<div class="form-control flex flex-row gap-2 items-start">
								<label class="label cursor-pointer">
									<input
										type="radio"
										name="episodeType"
										value="all"
										bind:group={selectedEpisodeType}
										class="radio radio-info"
									/>
									<span class="label-text p-1">All</span>
								</label>
								<label class="label cursor-pointer">
									<input
										type="radio"
										name="episodeType"
										value="filler"
										bind:group={selectedEpisodeType}
										class="radio radio-error"
									/>
									<span class="label-text p-1">Filler</span>
								</label>
								<label class="label cursor-pointer">
									<input
										type="radio"
										name="episodeType"
										value="mixedCanonFiller"
										bind:group={selectedEpisodeType}
										class="radio radio-warning"
									/>
									<span class="label-text p-1">Mixed Canon/Filler</span>
								</label>
								<label class="label cursor-pointer">
									<input
										type="radio"
										name="episodeType"
										value="canon"
										bind:group={selectedEpisodeType}
										class="radio radio-success"
									/>
									<span class="label-text p-1">Canon</span>
								</label>
							</div>
						</div>
					</ul>
				</details>
			{/if}
		</div>
		{#key Episodes}
			{#if useTable}
				<table class="table table-compact table-zebra place-content-center justify-center">
					<thead>
						<tr>
							<th class="md:text-base text-center">Episode</th>
							<th class="md:text-base">Title</th>
							<th class="md:text-base text-center">Type</th>
						</tr>
					</thead>
					<tbody>
						{#each Episodes as episode}
							<tr>
								<td class="md:text-base text-center">{episode.number}</td>
								<td class={showTitles ? 'md:text-base' : 'md:text-base text-transparent'}
									>{episode.title}</td
								>
								{#if episode.type === 'Filler' || episode.explanation !== ''}
									<td class="md:text-base text-center">
										{#if isSmallScreen}
											<input
												type="checkbox"
												id="modal-toggle-{episode.number}"
												class="modal-toggle"
											/>
											<div class="modal">
												<div class="modal-box relative">
													<label
														for="modal-toggle-{episode.number}"
														class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label
													>
													<h3 class="text-lg font-bold">
														Episode {episode.number} - {episode.type}
													</h3>
													<p class="py-4">{episode.explanation}</p>
												</div>
											</div>
											<label
												for="modal-toggle-{episode.number}"
												class="badge {episode.type === 'Filler'
													? 'badge-error'
													: 'badge-warning'} text-xs sm:text-base h-fit cursor-pointer relative"
											>
												{episode.type}
												<span
													class="absolute top-0 right-0 text-xs indicator-item badge badge-primary px-1"
													style="transform: translate(50%, -50%);">?</span
												>
											</label>
										{:else}
											<span
												class="badge {episode.type === 'Filler'
													? 'badge-error'
													: 'badge-warning'} text-xs sm:text-base h-fit cursor-pointer tooltip tooltip-left relative"
												data-tip={episode.explanation}
											>
												{episode.type}
												<span
													class="absolute top-0 right-0 text-xs indicator-item badge badge-primary px-1"
													style="transform: translate(50%, -50%);">?</span
												>
											</span>
										{/if}
									</td>
								{:else if episode.type === 'Mixed Canon/Filler'}
									<td class="md:text-base text-center">
										<span class="badge badge-warning text-xs sm:text-base h-fit"
											>Mixed Canon/Filler</span
										>
									</td>
								{:else}
									<td class="md:text-base text-center">
										<span class="badge badge-success text-xs sm:text-base h-fit">Canon</span>
									</td>
								{/if}
								<!-- <td class="md:text-base">{episode.explanation}</td> -->
							</tr>
						{/each}
					</tbody>
				</table>
			{:else}
				<div
					class="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
					style="width: 100%; overflow-x: auto;"
				>
					{#each Episodes as episode}
						<Episode {episode} {showTitles} />
					{/each}
				</div>
			{/if}
		{/key}
	</div>
</main>
