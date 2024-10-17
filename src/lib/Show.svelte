<script lang="ts">
	export let show: { name: string; image: string; link: string };
</script>

<div class="card bg-base-100 w-full sm:w-96">
	<figure>
		<img src={show.image} alt={show.name} class="w-full h-auto" />
	</figure>
	<div class="card-body">
		<div class="card-actions justify-center">
			<a href={show.link} class="btn btn-warning">{show.name}</a>
		</div>
	</div>
</div>
