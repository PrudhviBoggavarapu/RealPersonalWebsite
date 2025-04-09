<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import Footer from '$lib/frontpage/Footer.svelte';
	import type { PageData } from './+page.server.js'; // Import the type for loaded data

	// Get the loaded posts from the page data provided by +page.server.ts
	let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<!-- Render Shared Header Component - No longer needs theme props -->
	<Header />

	<!-- Main Blog Content Area -->
	<main class="flex-grow">
		<div class="container mx-auto p-8">
			<h1 class="font-heading mb-6 border-b-2 border-border pb-4 text-4xl">Blog Posts</h1>

			<!-- Check if there are posts loaded -->
			{#if data.posts && data.posts.length > 0}
				<div class="space-y-8">
					<!-- Iterate over the loaded posts -->
					{#each data.posts as post}
						<!-- Apply the exact same classes as the original placeholder article -->
						<article class="shadow-shadow rounded-[var(--radius-base)] border-2 border-border p-6">
							<!-- Post Title - styled like original h2 -->
							<h2 class="font-heading mb-2 text-2xl">{post.name}</h2>
							<!-- Publication Date - styled like original date p -->
							<p class="mb-4 text-sm text-foreground/80">
								Published on: {post.date.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</p>
							<!-- Post Blurb/Excerpt - styled like original excerpt p -->
							{#if post.blurb}
								<p class="font-base mb-4">{post.blurb}</p>
							{/if}
							<!-- Read More Link - styled like original link -->
							<a href="/blog/{post.slug}" class="text-main font-bold hover:underline">
								Read More
							</a>
						</article>
					{/each}
				</div>
			{:else}
				<p class="font-base text-center italic">More posts coming soon!</p>
			{/if}
		</div>
	</main>

	<!-- Render Shared Footer Component -->
	<Footer />
</div>
