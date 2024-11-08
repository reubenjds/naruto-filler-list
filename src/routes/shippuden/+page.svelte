<script lang="ts">
	import { narutoShippuden, narutoShippudenArcs, narutoShippudenQuickList } from '$lib/episodes';
	import List from '$lib/List.svelte';
</script>

<main>
	<List
		name={'Naruto: Shippuden'}
		naruto={narutoShippuden}
		narutoArcs={narutoShippudenArcs}
		quickList={narutoShippudenQuickList}
	></List>
</main>
