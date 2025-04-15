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
	import { Separator } from '$lib/components/ui/separator';
	import { goto } from '$app/navigation';

	import LogoPlaceholder from '$lib/components/icons/LogoPlaceholder.svelte';
	import ExternalLinkIcon from '$lib/components/icons/ExternalLinkIcon.svelte';
	import SunIcon from '$lib/components/icons/SunIcon.svelte';
	import MoonIcon from '$lib/components/icons/MoonIcon.svelte';
	import Menu from '@lucide/svelte/icons/menu';
</script>

<nav class="bg-main shadow-shadow w-full border-4 border-border">
	<div class="mx-auto flex h-[64px] w-full items-center justify-between px-6">
		<h1
			class="text-main-foreground min-w-[50px] transform text-3xl font-black tracking-tight transition-transform duration-300 hover:rotate-0 lg:text-5xl"
		>
			<a href="/" class="text-main-foreground block">
				<LogoPlaceholder />
			</a>
		</h1>

		<div class="font-base hidden items-center space-x-6 text-base md:flex lg:text-lg">
			<a
				href="/"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Home</a
			>

			<a
				href="/tags"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
				>Tag Search</a
			>
			<a
				href="/blog/"
				class="text-main-foreground transform px-3 py-1 font-bold transition-all duration-200 hover:-translate-y-1 hover:rotate-2"
			>
				Blogs
			</a>
			<div class="flex items-center gap-4">
				<Button variant="default" onclick={() => goto('/linktree')}>Contact Me</Button>
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

		<div class="flex items-center gap-4 md:hidden">
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
					class="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-[var(--radius-base)] border-2 border-[var(--border)] text-sm font-[var(--font-weight-base)] shadow-[var(--shadow-shadow)] ring-offset-white transition-all hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
					aria-label="Open menu"
				>
					<Menu class="size-5" />
					<span class="sr-only">Open menu</span>
				</SheetTrigger>
				<SheetContent
					side="right"
					class="w-[280px] border-l-4 border-border bg-[var(--background)] opacity-100"
				>
					<SheetHeader class="mb-6 text-left">
						<SheetTitle class="font-heading text-2xl">Menu</SheetTitle>
					</SheetHeader>
					<nav class="flex flex-col space-y-4">
						<SheetClose>
							<a href="/" class="hover:text-main block text-lg font-bold text-foreground">Home</a>
						</SheetClose>
						<SheetClose>
							<a href="/tags" class="hover:text-main block text-lg font-bold text-foreground"
								>Tag Search</a
							>
						</SheetClose>
						<SheetClose>
							<a
								href="/blog/"
								target="_blank"
								rel="noopener noreferrer"
								class="hover:text-main inline-flex items-center gap-1 text-lg font-bold text-foreground"
							>
								Blogs
								<ExternalLinkIcon />
							</a>
						</SheetClose>

						<Separator class="y-full" />

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
