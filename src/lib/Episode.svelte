<script lang="ts">
	import type { Episode } from '$lib/index';
	export let episode: Episode;
	export let showTitles: boolean;

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
		class="card w-full bg-base-300 shadow-xl image-full min-h-[20rem] transition-all duration-300 ease-in-out"
		style="background-color: {epColour()};"
	>
		<div class="card-body p-4 md:p-6 lg:p-8">
			{#if showTitles}
				<div class="absolute top-4 right-4 bg-base-500 text-white md:pl-2 rounded-bl-lg">
					<p class="text-xs md:text-sm">{episode.number}</p>
				</div>
				<h2 class="pb-3 pt-6 md:pt-1 text-base md:text-xl lg:text-2xl">
					{episode.title}
				</h2>
				<p class="line-clamp-5 whitespace-pre-line italic text-sm md:text-base lg:text-lg">
					{episode.explanation}
				</p>
				<div class="flex justify-between items-center">
					<p class="text-xs md:text-sm lg:text-base bg-base-500">{episode.type}</p>
				</div>
			{:else}
				<div
					class="absolute inset-0 flex items-center justify-center bg-base-500 text-white md:pl-2 rounded-bl-lg"
				>
					<p class="flex place-items-center justify-center text-5xl">{episode.number}</p>
				</div>

				<p class="line-clamp-5 whitespace-pre-line italic text-sm md:text-base lg:text-lg">
					{episode.explanation}
				</p>
				<div class="flex justify-between items-center">
					<p class="text-xs md:text-sm lg:text-base bg-base-500">{episode.type}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
