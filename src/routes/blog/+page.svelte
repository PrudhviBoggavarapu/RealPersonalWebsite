<script lang="ts">
	// Import the shared Header and Footer
	import Header from '$lib/frontpage/Header.svelte';
	import Footer from '$lib/frontpage/Footer.svelte';
	import { onMount } from 'svelte';

	// --- Theme Toggle State and Logic ---
	// NOTE: Ideally, this logic should live in your root +layout.svelte
	// so it applies globally and doesn't need repeating on each page.
	// We're keeping it here for now to match the previous structure.
	let isDark = false;
	let mounted = false;

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
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<!-- Render Shared Header Component -->
	<Header {mounted} {isDark} {toggleTheme} />

	<!-- Main Blog Content Area -->
	<main class="flex-grow">
		<div class="container mx-auto p-8">
			<h1 class="font-heading mb-6 border-b-2 border-border pb-4 text-4xl">Blog Posts</h1>

			<!-- Placeholder for Blog Post List -->
			<div class="space-y-8">
				<article class="shadow-shadow rounded-[var(--radius-base)] border-2 border-border p-6">
					<h2 class="font-heading mb-2 text-2xl">Placeholder Blog Post Title 1</h2>
					<p class="mb-4 text-sm text-foreground/80">Published on: August 1, 2024</p>
					<p class="font-base mb-4">
						This is a short excerpt of the first blog post. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit...
					</p>
					<a href="/blog/post-1" class="text-main font-bold hover:underline">Read More</a>
				</article>

				<article class="shadow-shadow rounded-[var(--radius-base)] border-2 border-border p-6">
					<h2 class="font-heading mb-2 text-2xl">Placeholder Blog Post Title 2</h2>
					<p class="mb-4 text-sm text-foreground/80">Published on: July 25, 2024</p>
					<p class="font-base mb-4">
						Another blog post summary goes here. Sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua...
					</p>
					<a href="/blog/post-2" class="text-main font-bold hover:underline">Read More</a>
				</article>

				<p class="font-base text-center italic">More posts coming soon!</p>
			</div>
		</div>
	</main>

	<!-- Render Shared Footer Component -->
	<Footer />
</div>
