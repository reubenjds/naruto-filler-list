<script lang="ts">
	export let show: { name: string; image: string };
</script>

<div class="card bg-base-100 w-96">
	<figure>
		<img src={show.image} alt={show.name} />
	</figure>
	<div class="card-body">
		<div class="card-actions justify-center">
			<button class="btn btn-warning">{show.name}</button>
		</div>
	</div>
</div>
