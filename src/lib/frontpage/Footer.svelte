<!-- src/lib/components/layout/Footer.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	// Import Icon Components
	import ExternalLinkIcon from '$lib/components/icons/ExternalLinkIcon.svelte';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import LinkedinIcon from '$lib/components/icons/LinkedinIcon.svelte';

	const currentYear = new Date().getFullYear();

	// Removed SVG string variables
</script>

<footer class="w-full bg-background">
	<Separator class="mb-4" />
	<div class="mx-auto">
		<div class="mb- grid grid-cols-1 gap-8 px-8 md:grid-cols-3">
			<!-- Quick Links -->
			<div>
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
							>Journey</a
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
							class="hover:bg-main hover:text-main-foreground inline-flex items-center border-4 border-transparent px-4 py-1 text-foreground transition-all duration-200 hover:border-border"
						>
							Blogs
							<ExternalLinkIcon />
						</a>
					</li>
				</ul>
			</div>

			<!-- Get in Touch -->
			<div class="rotate-50 transform">
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
					<!-- You could add a contact button/form here -->
					<Button
						variant="default"
						class="bg-[var(--neobrutalism-yellow-70)]"
						onclick={() => console.log('Footer Get in Touch clicked!')}
					>
						Contact Me
					</Button>
				</div>
			</div>

			<!-- Column 3 (Optional) -->
			<div>
				<!-- Placeholder for potential third column content -->
				<h3 class="mb-4 text-2xl font-black uppercase tracking-wider text-foreground">
					Placeholder
				</h3>
				<p class="font-base text-foreground">Maybe some extra info here.</p>
			</div>
		</div>

		<!-- Footer Bottom -->
		<Separator class="mb-4" />
		<!-- Thinner separator -->
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<p class="text-center font-bold text-foreground md:text-left">
				© {currentYear} Karma | Built with love by
				<a href="https://karmajaderose.com" class="text-main-foreground underline">Karma</a>
			</p>
			<div
				class="bg-black px-4 py-2 font-mono text-sm text-white dark:bg-background dark:text-foreground"
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
