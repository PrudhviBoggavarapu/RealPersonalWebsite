<!-- src/routes/tags/[tag]/+page.svelte -->
<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import Footer from '$lib/frontpage/Footer.svelte';
	import { Badge } from '$lib/components/ui/badge'; // Re-import Badge if needed
	import { formatDisplayDate } from '$lib/utils'; // Import date formatter
	import type { PageData } from './+page.server.js';

	let { data }: { data: PageData } = $props();
	const { tagName, filteredPosts } = data;
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />

	<!-- Main Content Area -->
	<main class="flex-grow">
		<div class="container mx-auto p-8">
			<h1 class="font-heading mb-6 border-b-2 border-border pb-4 text-4xl">
				Posts tagged with: <span class="text-main">{tagName}</span>
			</h1>

			<!-- Check if there are posts for this tag -->
			{#if filteredPosts && filteredPosts.length > 0}
				<div class="space-y-8">
					<!-- Iterate over the filtered posts -->
					{#each filteredPosts as post (post.slug)}
						<!-- Replicate the styling from /blog/+page.svelte -->
						<article
							class="shadow-shadow rounded-[var(--radius-base)] border-2 border-border p-6 transition-transform hover:-translate-y-1"
						>
							<h2 class="font-heading mb-2 text-2xl">{post.name}</h2>
							<p class="mb-4 text-sm text-foreground/80">
								Published on: {formatDisplayDate(post.date)}
							</p>

							<!-- Optionally display other tags for context -->
							{#if post.tags && post.tags.length > 0}
								<div class="mb-4 flex flex-wrap gap-2">
									{#each post.tags as postTag}
										<Badge variant={postTag === tagName ? 'default' : 'neutral'} class="text-xs">
											{postTag}
										</Badge>
									{/each}
								</div>
							{/if}

							{#if post.blurb}
								<p class="font-base mb-4">{post.blurb}</p>
							{/if}
							<a href="/blog/{post.slug}" class="text-main inline-block font-bold hover:underline">
								Read More &rarr;
							</a>
						</article>
					{/each}
				</div>
			{:else}
				<p class="font-base text-center italic">
					No blog posts found with the tag "{tagName}".
				</p>
			{/if}
		</div>
	</main>

	<Footer />
</div>
