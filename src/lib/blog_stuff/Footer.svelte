<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import ExternalLinkIcon from '$lib/components/icons/ExternalLinkIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import LinkedinIcon from '$lib/components/icons/LinkedinIcon.svelte';
	import { goto } from '$app/navigation';

	const currentYear = new Date().getFullYear();
</script>

<footer class="w-full bg-background">
	<Separator />
	<div class="mx-auto">
		<div class="flex flex-col gap-8 md:flex md:flex-row md:items-stretch">
			<Separator orientation="vertical" class="w-1" />

			<div class="ml-8 mt-2 flex-1">
				<h3 class="mb-4 text-2xl font-black uppercase tracking-wider text-foreground">
					Quick Links
				</h3>
				<ul class="font-base space-y-3">
					<li>
						<a
							href="/"
							class="hover:bg-main hover:text-main-foreground inline-block border-4 border-transparent px-4 py-1 text-foreground transition-all duration-200 hover:border-border"
							>Home</a
						>
					</li>
					<li>
						<a
							href="/"
							class="hover:bg-main hover:text-main-foreground inline-block border-4 border-transparent px-4 py-1 text-foreground transition-all duration-200 hover:border-border"
							>Projects</a
						>
					</li>
					<li>
						<a
							href="/blog/"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:bg-main hover:text-main-foreground inline-flex items-center border-4 border-transparent px-4 pb-4 text-foreground transition-all duration-200 hover:border-border"
						>
							Blogs
							<ExternalLinkIcon />
						</a>
					</li>
				</ul>
			</div>

			<Separator orientation="vertical" class="w-1" />

			<div class="mt-2 flex-1">
				<h3 class="mb-4 text-2xl font-black uppercase tracking-wider text-foreground">
					Get in Touch!
				</h3>
				<div class="mb-8 flex flex-col items-start">
					<div class="mb-6 flex space-x-6">
						<a
							href="https://github.com/prudhviboggavarapu"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-main text-4xl text-foreground transition-colors duration-300"
							aria-label="GitHub"
						>
							<GithubIcon />
						</a>
						<a
							href="https://www.linkedin.com/in/prudhviboggavarapu/"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-main text-4xl text-foreground transition-colors duration-300"
							aria-label="LinkedIn"
						>
							<LinkedinIcon />
						</a>
					</div>
					<Button
						variant="default"
						class="bg-[var(--neobrutalism-yellow-50)] text-black dark:bg-[var(--neobrutalism-yellow-50)]"
						onclick={() => goto('/linktree')}
					>
						Contact Me
					</Button>
				</div>
			</div>

			<Separator orientation="vertical" class="hidden md:block" />
			<div class="mt-2 flex-1">
				<h3 class="mb-4 text-2xl font-black uppercase tracking-wider text-foreground">
					Placeholder
				</h3>
				<p class="font-base text-foreground">Maybe some extra info here.</p>
			</div>
			<Separator orientation="vertical" class="w-1" />
		</div>

		<Separator />

		<div
			class="flex flex-col items-center justify-between gap-4 md:flex md:flex-row md:items-stretch"
		>
			<p class="ml-8 text-center font-bold text-foreground md:text-left">
				© {currentYear} Karma | Built with love by
				<a href="https://karmajaderose.com" class="text-main-foreground underline">Karma</a>
			</p>

			<Separator class="w-1/2 md:hidden" />

			<div
				class="content-evenly bg-black px-2 font-mono text-sm text-white dark:bg-background dark:text-foreground"
			>
				&lt;/&gt; with <a href="https://svelte.dev/" class="text-main-foreground hover:underline"
					>SvelteKit</a
				>
				+
				<a href="https://www.shadcn-svelte.com/" class="text-main-foreground hover:underline"
					>Shadcn UI Svelte</a
				>
			</div>
		</div>
		
	</div>
</footer>
