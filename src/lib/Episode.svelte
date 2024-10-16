<script lang="ts">
	import type { Episode } from '$lib/index';
	export let episode: Episode;

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
		class="card w-full bg-base-300 shadow-xl image-full min-h-[20rem]"
		style="background-color: {epColour()};"
	>
		<div class="card-body">
			<!-- add episode number at top right -->
			<div class="absolute top-4 right-4 bg-base-500 text-white p-1 rounded-bl-lg">
				<p class="text-xs">{episode.number}</p>
			</div>
			<h2 class="">{episode.title}</h2>
			<p class="line-clamp-5 whitespace-pre-line">{episode.explanation}</p>
			<div class="flex justify-between items-center">
				<p class="text-xs bg-base-500">{episode.type}</p>
			</div>
		</div>
	</div>
</div>
