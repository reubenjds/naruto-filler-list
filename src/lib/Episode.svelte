<script lang="ts">
	import type { Episode } from '$lib/index';
	export let episode: Episode;
	export let showTitles: boolean;
	export let showExplanations: boolean;

	function epColour() {
		if (episode.type === 'Filler') {
			return 'hsl(0, 100%, 50%)';
		} else if (episode.type === 'Canon') {
			return 'hsl(147, 90%, 47%)';
		} else if (episode.type === 'Mixed Canon/Filler') {
			return 'hsl(39, 100%, 50%)';
		}
	}
</script>

<div>
	<div
		class="card w-full min-w-[20%] md:min-h-88 lg:min-h-72 xl:min-h-80 bg-base-300 shadow-xl image-full min-h-[15rem] transition-all duration-300 ease-in-out "
		style="background-color: {epColour()};"
	>
		<div class="card-body p-6">
			{#if !(showExplanations || showTitles)}
				<div
					class="absolute inset-0 flex items-center justify-center bg-base-500 text-white md:pl-2 rounded-bl-lg"
				>
					<p class="flex place-items-center justify-center font-semibold text-6xl text-slate-200">{episode.number}</p>
				</div>
				<div class="flex justify-between items-center">
					<p class="text-sm md:text-sm lg:text-base 2xl:text-lg bg-base-500 text-center uppercase font-mono text-slate-300">{episode.type}</p>
				</div>
			{:else}
				<div class="flex flex-row items-center gap-x-5 text-slate-200">
					<div class="font-semibold text-4xl 2xl:text-6xl">{episode.number}</div>
					<div class="text-xs md:text-sm lg:text-sm 2xl:text-sm font-medium">{showTitles ? episode.title : ''}</div>
				</div>
				<p class="line-clamp-5 whitespace-pre-line mt-1 text-slate-200 text-xs md:text-sm lg:text-sm">
					{showExplanations ? episode.explanation ?? '' : ''}
				</p>
				<div class="flex justify-between items-center">
					<p class="text-sm md:text-sm lg:text-base 2xl:text-lg bg-base-500 text-center uppercase font-mono text-slate-300">{episode.type}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
