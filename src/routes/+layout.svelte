<script>
	import '../app.css';
	import { openQuickList } from '$lib/store.ts';
</script>

<div class="flex flex-col min-h-screen">
	<div class="navbar bg-base-100 p-5">
		<div class="flex-1">
			<a class="btn btn-ghost" href="/">
				<img src="/logo.png" alt="Logo" class="h-12 w-20" />
			</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<!-- svelte-ignore a11y-missing-attribute -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li on:click={() => openQuickList.update((value) => !value)}><a>Quick List</a></li>
				<li><a>About</a></li>
			</ul>
		</div>
	</div>
	<div class="flex flex-col justify-between">
		<slot />
	</div>
</div>
