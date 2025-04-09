<!-- src/lib/frontpage/Header.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { themeStore } from '$lib/stores/themeStore'; // Import the store

	// Import Icon Components
	import LogoPlaceholder from '$lib/components/icons/LogoPlaceholder.svelte';
	import ExternalLinkIcon from '$lib/components/icons/ExternalLinkIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';

	// Removed theme props: mounted, isDark, toggleTheme
	// Removed SVG string variables
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
			<a href="/" class="text-main-foreground block">
				<LogoPlaceholder />
			</a>
		</h1>

		<!-- Desktop Navigation -->
		<div class="font-base hidden items-center space-x-6 text-base md:flex lg:text-lg">
			<a
				href="/"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Home</a
			>
			<a
				href="/"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Journey</a
			>
			<a
				href="/"
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
				<ExternalLinkIcon />
			</a>
			<div class="flex items-center gap-4">
				<Button variant="neutral" onclick={() => console.log('Get in Touch clicked!')}>
					Get in Touch!
				</Button>
				<!-- Use themeStore directly -->
				<Button variant="neutral" size="icon" onclick={themeStore.toggle} aria-label="Toggle theme">
					{#if $themeStore.mounted}
						{#if $themeStore.isDark}
							<SunIcon />
						{:else}
							<MoonIcon />
						{/if}
					{/if}
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>

		<!-- Mobile Navigation Controls -->
		<div class="flex items-center gap-4 md:hidden">
			<!-- Use themeStore directly -->
			<Button variant="neutral" size="icon" onclick={themeStore.toggle} aria-label="Toggle theme">
				{#if $themeStore.mounted}
					{#if $themeStore.isDark}
						<SunIcon />
					{:else}
						<MoonIcon />
					{/if}
				{/if}
				<span class="sr-only">Toggle theme</span>
			</Button>
			<!-- Mobile Menu Trigger (Sheet) Removed -->
		</div>
	</div>
</nav>
