<!-- src/routes/blog/+page.svelte -->

<script lang="ts">
	import Header from '$lib/blog_stuff/Header.svelte';
	import type { PageData } from './+page.server.js';
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Blog | Karma Jade Rose</title>
	<meta
		name="description"
		content="All blog posts by Karma Jade Rose. Rust, Python, Web, and more."
	/>
	<meta property="og:title" content="Blog | Karma Jade Rose" />
	<meta
		property="og:description"
		content="All blog posts by Karma Jade Rose. Rust, Python, Web, and more."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://karmajaderose.com/blog" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />
	<main class="flex-grow">
		<div class="container mx-auto p-8">
			<h1 class="font-heading mb-6 border-b-2 border-border pb-4 text-4xl">Blog Posts</h1>

			{#if data.posts && data.posts.length > 0}
				<div class="space-y-8">
					{#each data.posts as post}
						<article class="shadow-shadow rounded-[var(--radius-base)] border-2 border-border p-6">
							<h2 class="font-heading mb-2 text-2xl">{post.name}</h2>
							<p class="mb-4 text-sm text-foreground/80">
								Published on: {post.date.toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</p>
							{#if post.blurb}
								<p class="font-base mb-4">{post.blurb}</p>
							{/if}
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
</div>
