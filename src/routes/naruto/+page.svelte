<script lang="ts">
	import { naruto, narutoArcs } from '$lib/episodes';
	import List from '$lib/List.svelte';
</script>

<main>
	<List {naruto} {narutoArcs}></List>
</main>
