<!-- src/routes/tags/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Fuse, { type IFuseOptions } from 'fuse.js';
	import Header from '$lib/blog_stuff/Header.svelte';
	import Footer from '$lib/blog_stuff/Footer.svelte';
	import { Input } from '$lib/components/ui/input'; // Assuming you have an Input component
	import { Badge } from '$lib/components/ui/badge';
	import type { PageData } from './+page.server.js';

	// --- Get Page Data ---
	let { data }: { data: PageData } = $props();
	const allUniqueTags = data.uniqueTags || []; // Ensure it's an array

	// --- State for Search ---
	let searchTerm = $state('');
	let filteredTags = $state([...allUniqueTags]); // Start with all tags
	let fuse: Fuse<string>; // Fuse instance, initialized in onMount

	// --- Initialize Fuse.js on Mount ---
	onMount(() => {
		const options: IFuseOptions<string> = {
			threshold: 0.4, // Adjust for sensitivity
			minMatchCharLength: 1
		};
		fuse = new Fuse(allUniqueTags, options);
	});

	// --- Reactive Effect for Filtering ---
	$effect(() => {
		if (!fuse) return; // Don't run if Fuse isn't initialized yet

		const term = searchTerm.trim();
		if (term === '') {
			filteredTags = [...allUniqueTags];
		} else {
			const results = fuse.search(term);
			filteredTags = results.map((result) => result.item);
		}
	});
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />

	<!-- Main Content Area -->
	<main class="flex-grow">
		<div class="container mx-auto p-8">
			<h1 class="font-heading mb-6 border-b-2 border-border pb-4 text-4xl">Search Tags</h1>

			<div class="mb-8">
				<Input
					type="search"
					placeholder="Start typing to fuzzy search tags..."
					bind:value={searchTerm}
					class="w-full max-w-lg"
					aria-label="Search blog tags"
				/>
			</div>

			{#if filteredTags.length > 0}
				<div class="flex flex-wrap gap-3">
					{#each filteredTags as tag (tag)}
						<!-- Make the tag a link -->
						<a
							href="/tags/{encodeURIComponent(tag)}"
							class="no-underline transition-transform hover:-translate-y-0.5"
							aria-label="View posts tagged with {tag}"
						>
							<Badge variant="neutral" class="cursor-pointer text-base">
								{tag}
							</Badge>
						</a>
					{/each}
				</div>
			{:else if searchTerm.trim() !== ''}
				<p class="font-base text-center italic text-foreground/80">
					No tags found matching "{searchTerm}".
				</p>
			{:else}
				<p class="font-base text-center italic text-foreground/80">No tags available.</p>
			{/if}
		</div>
	</main>

	<Footer />
</div>
