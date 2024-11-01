<script lang="ts">
	import { naruto, narutoArcs, narutoQuickList } from '$lib/episodes';
	import List from '$lib/List.svelte';
</script>

<main>
	<List name={'Naruto'} {naruto} {narutoArcs} quickList={narutoQuickList}></List>
</main>
