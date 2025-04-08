<!-- src/routes/blog/[slug]/+page.svelte -->
<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import Footer from '$lib/frontpage/Footer.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { onMount } from 'svelte';
	import type { PageData } from './+page.server.js';

	// --- Markdown Rendering ---
	import { marked } from 'marked'; // For parsing Markdown ONLY

	// --- Theme Toggle State and Logic ---
	let isDark = $state(false);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		const storedTheme = localStorage.getItem('theme');
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (storedTheme) {
			isDark = storedTheme === 'dark';
		} else {
			isDark = prefersDark;
		}
		applyTheme();
	});

	function toggleTheme() {
		isDark = !isDark;
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		applyTheme();
	}

	function applyTheme() {
		if (typeof document !== 'undefined') {
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
	// --- End Theme Logic ---

	let { data }: { data: PageData } = $props();
	const post = data.post;

	// Reactive statement to parse Markdown when post.content is available
	// WARNING: No sanitization! Only use if content is 100% trusted.
	let renderedHtml = $state(''); // Use $state for reactivity

	$effect(() => {
		if (post?.content) {
			// Directly parse Markdown to HTML. Assumes content is safe.
			renderedHtml = marked.parse(post.content) as string;
		} else {
			renderedHtml = ''; // Handle cases where content is initially null/undefined
		}
	});
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header {mounted} {isDark} {toggleTheme} />

	<main class="flex-grow">
		<article class="container mx-auto items-center p-8">
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
							<Badge variant="neutral">{tag}</Badge>
						{/each}
					</div>
				{/if}
				{#if post.image}
					<img
						src={post.image}
						alt="Featured image for {post.name}"
						class="shadow-shadow mt-6 w-full rounded border-2 border-border object-cover"
						width="800"
						height="400"
					/>
				{/if}
			</header>

			<!-- Render the UNSANITIZED HTML generated from Markdown -->
			<!-- Add prose styles for better Markdown rendering -->
			<div class="prose prose-neutral max-w-none dark:prose-invert">
				{@html renderedHtml}
			</div>
		</article>
	</main>

	<Footer />
</div>
