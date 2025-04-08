<!-- src/lib/frontpage/Header.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	// Props passed down from the parent (+page.svelte or +layout.svelte)
	let {
		mounted = false, // To prevent hydration mismatch for theme icons
		isDark = false,
		toggleTheme = () => {} // Default empty function
	}: {
		mounted: boolean;
		isDark: boolean;
		toggleTheme: () => void;
	} = $props();

	// --- Placeholder SVGs (Specific to Header) ---
	const logoPlaceholder = `
    <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="10" fill="currentColor"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" font-weight="bold" fill="var(--main-foreground)">RJ</text>
    </svg>
  `;
	const externalLinkIcon = `
    <svg aria-hidden="true" focusable="false" width="1em" height="1em" style="display: inline-block; margin-left: 0.5rem;" viewBox="0 0 512 512" fill="currentColor"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"></path></svg>
  `;
	const sunIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
  `;
	const moonIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
  `;
</script>

<!-- Apply background, border, shadow, and vertical padding to the outer nav -->
<nav class="bg-main shadow-shadow w-full border-2 border-border py-2">
	<!-- Keep max-width and centering on the inner div -->
	<!-- Remove mt-4, bg-main, border, shadow from this inner div -->
	<!-- Adjust height and padding as needed -->
	<div class="mx-auto flex h-[64px] w-full max-w-screen-xl items-center justify-between px-6">
		<!-- Logo -->
		<h1
			class="text-main-foreground min-w-[50px] transform text-3xl font-black tracking-tight transition-transform duration-300 hover:rotate-0 lg:text-5xl"
		>
			<a href="#home" class="text-main-foreground block">
				{@html logoPlaceholder}
			</a>
		</h1>

		<!-- Desktop Navigation -->
		<div class="font-base hidden items-center space-x-6 text-base md:flex lg:text-lg">
			<a
				href="#home"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Home</a
			>
			<a
				href="#journey"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Journey</a
			>
			<a
				href="#projects"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Projects</a
			>
			<a
				href="/blog/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
			>
				Blogs
				{@html externalLinkIcon}
			</a>
			<div class="flex items-center gap-4">
				<Button variant="neutral" onclick={() => console.log('Get in Touch clicked!')}>
					Get in Touch!
				</Button>
				<Button variant="neutral" size="icon" onclick={toggleTheme} aria-label="Toggle theme">
					{#if mounted}
						{#if isDark}
							{@html sunIcon}
						{:else}
							{@html moonIcon}
						{/if}
					{/if}
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>

		<!-- Mobile Navigation Controls -->
		<div class="flex items-center gap-4 md:hidden">
			<Button variant="neutral" size="icon" onclick={toggleTheme} aria-label="Toggle theme">
				{#if mounted}
					{#if isDark}
						{@html sunIcon}
					{:else}
						{@html moonIcon}
					{/if}
				{/if}
				<span class="sr-only">Toggle theme</span>
			</Button>
			<!-- Mobile Menu Trigger (Sheet) Removed -->
		</div>
	</div>
</nav>
