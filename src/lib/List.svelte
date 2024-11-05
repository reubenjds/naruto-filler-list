<script lang="ts">
	import type { Arc, Episode, QuickList } from '$lib/index';
	import Ep from '$lib/Episode.svelte';
	import { onMount } from 'svelte';
	import { openQuickList } from '$lib/store.ts';

	export let naruto: Episode[];
	export let narutoArcs: Arc[];
	export let quickList: QuickList;
	export let name: string;

	let isSmallScreen = false;
	let Episodes = naruto;

	let selectedArc = -1;
	let selectedEpisode = '';
	let showTitles = true;
	let showExplanations = true;
	let useTable = false;
	let selectedEpisodeType = 'all';

	$: {
		if (selectedArc !== -1) {
			const arc = narutoArcs[selectedArc];
			Episodes = naruto.filter(
				(episode) => episode.number <= arc.episode_end && episode.number >= arc.episode_start
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
				Episodes = Episodes.filter((episode) =>
					episode.number.toString().includes(selectedEpisode.trim())
				);
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
	<div class="flex flex-col min-h-screen place-items-center p-5">
		<div class="navbar bg-base-100 p-5">
			<div class="flex-1">
				<a class="btn btn-ghost" href="/">
					<img src="/logo.png" alt="Logo" class="h-12 w-20" />
				</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<!-- svelte-ignore a11y-missing-attribute -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<li on:click={() => openQuickList.update((value) => !value)}><a>Quick List</a></li>
					<li><a>About</a></li>
				</ul>
			</div>
		</div>

		<input type="checkbox" id="my_modal_7" class="modal-toggle" />
		<div class="modal" class:modal-open={$openQuickList}>
			<div class="modal-box">
				<div class="h-full overflow-x-auto">
					<table class="table table-pin-rows">
						<thead>
							<tr>
								<th class="text-green-500 text-base">Canon</th>
							</tr>
						</thead>
						<tbody>
							<tr><td class="text-white">{quickList.Manga_Canon_Episodes.join(', ')}</td></tr>
						</tbody>
						<thead>
							<tr>
								<th class="text-yellow-500 text-base">Mixed</th>
							</tr>
						</thead>
						<tbody>
							<tr><td class="text-white">{quickList.Mixed_Canon_Filler_Episodes.join(', ')}</td></tr
							>
						</tbody>
						<thead>
							<tr>
								<th class="text-red-500 text-base">Filler</th>
							</tr>
						</thead>
						<tbody>
							<tr><td class="text-white">{quickList.Filler_Episodes.join(', ')}</td></tr>
						</tbody>
					</table>
				</div>
			</div>
			<button class="modal-backdrop" on:click={() => openQuickList.update((value) => !value)}
				>Close</button
			>
		</div>
		<div class="flex flex-col place-items-center h-full gap-4 m-6">
			<h1 class="text-4xl font-bold text-center pt-4">{name} Filler List</h1>

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
							<label
								for="modal-toggle"
								class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label
							>
							<select bind:value={selectedArc} class="select select-bordered w-full join-item mt-6">
								<option value={-1} selected>All Episodes</option>
								{#each narutoArcs as arc, index}
									<option value={index}>{arc.name}</option>
								{/each}
							</select>
							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text">View as Table</span>
									<input type="checkbox" bind:checked={useTable} class="toggle toggle-primary" />
								</label>
							</div>

							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text">Show Titles</span>
									<input type="checkbox" bind:checked={showTitles} class="toggle toggle-primary" />
								</label>
							</div>

							<div class="form-control">
								<label class="label cursor-pointer">
									<span class="label-text">Show Descriptions</span>
									<input
										type="checkbox"
										bind:checked={showExplanations}
										class="toggle toggle-primary"
									/>
								</label>
							</div>
							<div class="form-control flex flex-row gap-2 items-start justify-center">
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
										<span class="label-text">View as Table</span>
										<input type="checkbox" bind:checked={useTable} class="toggle toggle-primary" />
									</label>
								</div>

								<div class="form-control">
									<label class="label cursor-pointer">
										<span class="label-text">Show Titles</span>
										<input
											type="checkbox"
											bind:checked={showTitles}
											class="toggle toggle-primary"
										/>
									</label>
								</div>

								<div class="form-control">
									<label class="label cursor-pointer">
										<span class="label-text">Show Descriptions</span>
										<input
											type="checkbox"
											bind:checked={showExplanations}
											class="toggle toggle-primary"
										/>
									</label>
								</div>
								<div class="form-control flex flex-row gap-2 items-start justify-center">
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
									{#if episode.type === 'Filler' || (episode.explanation ?? '') !== ''}
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
															class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
															>✕</label
														>
														<h3 class="text-lg font-bold">
															Episode {episode.number} - {episode.type}
														</h3>
														<p class="py-4">{episode.explanation ?? ''}</p>
													</div>
												</div>
												{#if showExplanations}
													<label
														for="modal-toggle-{episode.number}"
														class="badge {episode.type === 'Filler'
															? 'badge-error'
															: 'badge-warning'} text-xs sm:text-base h-fit cursor-pointer relative"
													>
														{episode.type}
														<span
															class="absolute top-0 right-0 text-xs indicator-item badge badge-primary px-1 {!showExplanations
																? 'hidden'
																: ''}"
															style="transform: translate(50%, -50%);">?</span
														>
													</label>
												{:else}
													<!-- svelte-ignore a11y-label-has-associated-control -->
													<label
														class="badge {episode.type === 'Filler'
															? 'badge-error'
															: 'badge-warning'} text-xs sm:text-base h-fit relative"
													>
														{episode.type}
													</label>
												{/if}
											{:else}
												<span
													class="badge {episode.type === 'Filler'
														? 'badge-error'
														: 'badge-warning'} text-xs sm:text-base h-fit cursor-pointer tooltip tooltip-left relative"
													data-tip={showExplanations ? episode.explanation : ''}
												>
													{episode.type}
													<span
														class="absolute top-0 right-0 text-xs indicator-item badge badge-primary px-1 {!showExplanations
															? 'hidden'
															: ''}"
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
							<Ep {episode} {showTitles} {showExplanations} />
						{/each}
					</div>
				{/if}
			{/key}
		</div>
	</div>
</main>
