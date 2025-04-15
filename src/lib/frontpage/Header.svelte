<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { themeStore } from '$lib/stores/themeStore';
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger,
		SheetClose
	} from '$lib/components/ui/sheet';
	import { Separator } from '$lib/components/ui/separator'; // Import Separator
	import { goto } from '$app/navigation';

	import LogoPlaceholder from '$lib/components/icons/LogoPlaceholder.svelte';
	import ExternalLinkIcon from '$lib/components/icons/ExternalLinkIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import Menu from '@lucide/svelte/icons/menu';
</script>

<nav class="bg-main shadow-shadow w-full border-4 border-border">
	<!-- Ensure the main container has a defined height -->
	<div class="mx-auto flex h-[64px] w-full items-stretch justify-between px-6">
		<!-- Logo section - align self center if needed -->
		<h1
			class="text-main-foreground min-w-[50px] transform self-center text-3xl font-black tracking-tight transition-transform duration-300 hover:rotate-0 lg:text-5xl"
		>
			<a href="/" class="text-main-foreground block">
				<LogoPlaceholder />
			</a>
		</h1>

		<!-- Desktop Navigation -->
		<!-- Use items-stretch to make children fill height -->
		<div class="font-base hidden items-stretch gap-4 text-base md:flex lg:text-lg">
			<Separator orientation="vertical" class="w-[4px]" />
			<a
				href="/"
				class="text-main-foreground transform self-center px-2 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Home</a
			>

			<!-- Separator will now stretch - remove h-6 -->
			<Separator orientation="vertical" class="w-[4px]" />

			<a
				href="/blog/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-main-foreground transform self-center px-2 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
			>
				Blogs
				<ExternalLinkIcon />
			</a>

			<Separator orientation="vertical" class="w-[4px]" />

			<a
				href="/linktree"
				target="_blank"
				rel="noopener noreferrer"
				class="text-main-foreground transform self-center px-2 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
			>
				Contact Me
			</a>
			<Separator orientation="vertical" class="w-[4px]" />

			<!-- Group Contact and Theme buttons - align items center within this group -->
			<div class="flex items-center gap-4 self-center">
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

		<!-- Mobile Navigation - align self center -->
		<div class="flex items-center gap-4 self-center md:hidden">
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

			<Sheet>
				<SheetTrigger
					class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-[var(--radius-base)] border-2 border-[var(--border)] text-sm font-[var(--font-weight-base)] shadow-[var(--shadow-shadow)] ring-offset-white transition-all hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
					aria-label="Open menu"
				>
					<Menu class="size-5" />
					<span class="sr-only">Open menu</span>
				</SheetTrigger>
				<SheetContent
					side="right"
					class="w-[280px] border-l-4 border-border bg-[var(--background)] p-6"
				>
					<SheetHeader class="mb-6 text-left">
						<SheetTitle class="font-heading text-2xl">Menu</SheetTitle>
					</SheetHeader>
					<nav class="flex flex-col">
						<SheetClose>
							<a href="/" class="hover:text-main block py-2 text-lg font-bold text-foreground"
								>Home</a
							>
						</SheetClose>

						<SheetClose>
							<a
								href="/blog/"
								target="_blank"
								rel="noopener noreferrer"
								class="hover:text-main inline-flex items-center gap-1 py-2 text-lg font-bold text-foreground"
							>
								Blogs
								<ExternalLinkIcon />
							</a>
						</SheetClose>

						<Separator class="my-4" />

						<SheetClose>
							<Button
								variant="default"
								class="w-full"
								onclick={() => {
									goto('/linktree');
								}}
							>
								Contact Me
							</Button>
						</SheetClose>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	</div>
</nav>
