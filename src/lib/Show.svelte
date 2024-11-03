<script lang="ts">
	export let show: { name: string; image: string; link: string };
</script>

<a href={show.link} class="w-full sm:w-96 md:opacity-50 md:hover:opacity-100">
	<figure>
		<img src={show.image} alt={show.name} class="w-full" />
	</figure>
</a>
