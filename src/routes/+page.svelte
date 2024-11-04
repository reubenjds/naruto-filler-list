<script lang="ts">
	import Show from '$lib/Show.svelte';

	let shows = [
		{
			name: 'Naruto',
			image: '/naruto.png',
			link: '/naruto'
		},
		{
			name: 'Naruto Shippuden',
			image: '/naruto_shippuden.png',
			link: '/shippuden'
		}
	];
</script>

<main>
	<div class="flex flex-col justify-between place-items-center min-h-screen p-5">
		<div class="navbar bg-base-100">
			<div class="flex-1">
				<a class="btn btn-ghost text-xl">
					<img src="/logo.png" alt="Logo" class="h-full w-full" />
				</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a>Link</a></li>
					<li>
						<details>
							<summary>Parent</summary>
							<ul class="bg-base-100 rounded-t-none p-2">
								<li><a>Link 1</a></li>
								<li><a>Link 2</a></li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</div>
		<!-- <h1 class="text-4xl font-bold text-center py-2">Naruto Filler List</h1> -->
		<div>
			<div class="flex flex-col sm:flex-row gap-12">
				{#each shows as show}
					<Show {show} />
				{/each}
			</div>
		</div>

		<footer
			class="footer footer-center bg-base-300 text-base-content p-4 w-1/2 min-w-fit rounded-full"
		>
			<aside>
				<p class="flex items-center justify-center gap-2 text-lg">
					Hosted with ❤️ on <a href="https://github.com/reubenjds/naruto-filler-list"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="inline w-6 h-6"
							fill="currentColor"
							><path
								d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.805 1.305 3.49.997.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.125-.305-.535-1.53.115-3.18 0 0 1.005-.32 3.3 1.23.955-.265 1.98-.397 3-.403 1.02.006 2.045.138 3 .403 2.28-1.55 3.285-1.23 3.285-1.23.655 1.65.245 2.875.12 3.18.77.84 1.235 1.91 1.235 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.1.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .32.215.695.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
							/></svg
						></a
					>
				</p>
			</aside>
		</footer>
	</div>
</main>
