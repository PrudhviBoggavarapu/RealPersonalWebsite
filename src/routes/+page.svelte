<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import Footer from '$lib/frontpage/Footer.svelte';
	// Removed onMount and theme logic variables/functions
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />

	<!-- Main Content Area -->
	<main class="flex-grow">
		<div class="container mx-auto bg-background p-8">
			<h1 class="font-heading mb-4 text-3xl">Main Content Area</h1>
			<p class="font-base">This is where the main page content would go.</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<!-- Add more placeholder content or actual sections here -->
			<div
				class="bg-secondary-background mt-8 flex h-96 items-center justify-center rounded-md border border-border"
			>
				Placeholder Content Block
			</div>
		</div>
	</main>

	<!-- Render Footer Component -->
	<Footer />
</div>
