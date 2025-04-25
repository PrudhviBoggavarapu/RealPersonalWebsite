<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import Footer from '$lib/frontpage/Footer.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import type { PageData } from './+page.server.js';

	import { marked } from 'marked';
	import { BlueskyComments } from 'bsky-comments-svelte';

	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data }: { data: PageData } = $props();
	const post = data.post;

	let renderedHtml = $state(marked.parse(post.content) as string);
	const neobrutalistBgColors = [
		'bg-neobrutalism-purple-50',
		'bg-neobrutalism-yellow-50', // Needs text-black potentially
		'bg-neobrutalism-green-50'
	];

	function getRandomColorClass() {
		const randomIndex = Math.floor(Math.random() * neobrutalistBgColors.length);
		console.log(neobrutalistBgColors[randomIndex]);
		return neobrutalistBgColors[randomIndex];
	}
</script>

<!-- src/routes/blog/[slug]/+page.svelte -->

<svelte:head>
	<title>{post.name} | Karma Jade Rose Blog</title>
	<meta name="description" content={post.blurb} />
	<meta property="og:title" content={post.name} />
	<meta property="og:description" content={post.blurb} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={'https://karmajaderose.com/' + post.slug} />
	{#if post.image}
		<meta property="og:image" content={post.image} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.name} />
	<meta name="twitter:description" content={post.blurb} />
	{#if post.image}
		<meta name="twitter:image" content={post.image} />
	{/if}
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />

	<main class="flex-grow">
		<article class="container mx-auto items-center p-8">
			<!-- Article Header -->
			<header class="mb-8 border-b-2 border-border pb-6">
				<h1 class="font-heading mb-3 text-4xl md:text-5xl">{post.name}</h1>
				<p class="mb-4 text-lg text-foreground/80">
					Published on: {post.date.toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
				{#if post.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each post.tags as tag}
							<!-- Use Badge for tags for consistency -->
							<Badge variant="neutral" class="text-sm"
								><a href="/tags/{tag}">
									{tag}
								</a></Badge
							>
						{/each}
					</div>
				{/if}
				{#if post.image}
					<img
						src={post.image}
						alt="Featured image for {post.name}"
						class="shadow-shadow mt-6 w-full rounded-[var(--radius-base)] border-2 border-border object-cover"
						width="800"
						height="400"
					/>
				{/if}
			</header>

			<!-- Article Content -->
			<div class="prose prose-neutral max-w-none dark:prose-invert">
				{@html renderedHtml}
			</div>

			<!-- Comments Section -->
			<div class="mt-12">
				<h2 class="font-heading mb-6 border-b-2 border-border pb-2 text-2xl">Comments</h2>
				<BlueskyComments uri={post.blogUrl}>
					{#snippet PostStatsSnippet(data)}
						<Button class="m-4">
							<a href={data.url}> Get involved </a>
						</Button>
					{/snippet}
					{#snippet LoaderSnippet()}
						<div class="font-base p-4 text-center text-foreground/70">Loading comments...</div>
					{/snippet}

					{#snippet PostSnippet({ post, collapsed, setCollapsed })}
						{@const randomBgClass = getRandomColorClass()}
						<div class:collapsed>
							<Card
								class="mb-2 {collapsed ? 'opacity-60' : ''} {randomBgClass} gap-3 py-3"
								data-comment-uri={post.uri}
							>
								<!-- Reduced px-4 -->
								<CardHeader class="flex flex-row items-center gap-3 px-4">
									<!-- Avatar with border, no shadow needed from card -->
									<Avatar class="size-10 border-2 border-border">
										<AvatarImage
											src={post.author.avatar}
											alt={post.author.displayName ?? 'User Avatar'}
										/>
										<AvatarFallback class="font-bold">
											{post.author.displayName?.substring(0, 2).toUpperCase() ?? '??'}
										</AvatarFallback>
									</Avatar>
									<div class="flex flex-col">
										<CardTitle class="text-base leading-tight">
											{post.author.displayName ?? 'Anonymous'}
										</CardTitle>
										{#if post.author.handle}
											<span class="text-sm font-normal text-foreground/70"
												>@{post.author.handle}</span
											>
										{/if}
										<!-- Added timestamp -->
										<p class="mt-1 text-xs text-foreground/60">
											{// @ts-ignore
											new Date(post.record.createdAt).toLocaleString()}
										</p>
									</div>
								</CardHeader>
								<!-- Reduced px-4 -->
								<CardContent class="px-4">
									<p class="font-base whitespace-pre-wrap">
										{// @ts-ignore
										post.record.text}
									</p>
								</CardContent>
							</Card>
						</div>
					{/snippet}
				</BlueskyComments>
			</div>
			<!-- End Comments Section -->
		</article>
	</main>

	<Footer />
</div>
