<script lang="ts">
	import { narutoShippuden, narutoShippudenArcs } from '$lib/episodes';
	import List from '$lib/List.svelte';
</script>

<main>
	<List naruto={narutoShippuden} narutoArcs={narutoShippudenArcs}></List>
</main>
