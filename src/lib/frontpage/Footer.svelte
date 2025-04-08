<!-- src/lib/components/layout/Footer.svelte -->
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	const currentYear = new Date().getFullYear();

	// --- Placeholder SVGs (Specific to Footer) ---
	const externalLinkIcon = `
    <svg aria-hidden="true" focusable="false" width="1em" height="1em" style="display: inline-block; margin-left: 0.5rem;" viewBox="0 0 512 512" fill="currentColor"><path d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-128c0-17.7-14.3-32-32-32L352 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"></path></svg>
  `;
	const githubIcon = `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
  `;
	const linkedinIcon = `
    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
  `;


  
</script>

<footer class="w-full bg-background p-8">
	<Separator class="mb-8" />
	<div class="mx-auto">
		<div class="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Quick Links -->
			<div>
				<h3 class="mb-4 text-2xl font-black uppercase tracking-wider text-foreground">
					Quick Links
				</h3>
				<ul class="font-base space-y-3">
					<li>
						<a
							href="#home"
							class="hover:bg-main hover:text-main-foreground inline-block border-4 border-transparent px-4 py-1 text-foreground transition-all duration-200 hover:border-border"
							>Home</a
						>
					</li>
					<li>
						<a
							href="#journey"
							class="hover:bg-main hover:text-main-foreground inline-block border-4 border-transparent px-4 py-1 text-foreground transition-all duration-200 hover:border-border"
							>Journey</a
						>
					</li>
					<li>
						<a
							href="#projects"
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
							{@html externalLinkIcon}
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
							{@html githubIcon}
						</a>
						<a
							href="https://www.linkedin.com/in/prudhviboggavarapu/"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-main text-4xl text-foreground transition-colors duration-300"
							aria-label="LinkedIn"
						>
							{@html linkedinIcon}
						</a>
					</div>
					<!-- You could add a contact button/form here -->
					<Button variant="default" onclick={() => console.log('Footer Get in Touch clicked!')}>
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
		<Separator thickness="h-1" class="mb-8" />
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
