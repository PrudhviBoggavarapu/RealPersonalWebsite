<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import { Button } from '$lib/components/ui/button';
	import Icon from '@iconify/svelte'; // Import Iconify component
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

	// Define the links for the Linktree, using Iconify strings for icons
	const links = [
		{
			href: '/blog', // Assuming this is an internal link
			label: 'Blog',
			icon: 'mdi:post-outline',
			variant: 'neutral' as const
		},
		{
			href: 'https://github.com/prudhviboggavarapu',
			label: 'GitHub',
			icon: 'simple-icons:github',
			variant: 'default' as const
		},
		// {
		// 	href: 'https://www.linkedin.com/in/prudhviboggavarapu/',
		// 	label: 'LinkedIn',
		// 	icon: 'simple-icons:linkedin',
		// 	variant: 'default' as const
		// },
        {
            href: 'https://www.youtube.com/@LetsLearnThingsLive', // Added YouTube link
            label: 'YouTube',
            icon: 'simple-icons:youtube', // Added YouTube icon
            variant: 'default' as const
        },
        {
            href: 'https://twitch.tv/letslearnthingslive',
            label: 'Twitch',
            icon: 'simple-icons:twitch',
            variant: 'default' as const
        },
		{
			href: 'https://bsky.app/profile/thethornyrose.bsky.social',
			label: 'Bluesky',
			icon: 'simple-icons:bluesky',
			variant: 'default' as const
		},
		{
			href: 'https://www.snapchat.com/add/soulcrusher6942?share_id=mO4CkjwaURo&locale=en-US',
			label: 'Snapchat',
			icon: 'simple-icons:snapchat',
			variant: 'default' as const
		},
		{
			href: 'https://wa.me/qr/LJWL6RUQD2TJE1',
			label: 'WhatsApp',
			icon: 'simple-icons:whatsapp',
			variant: 'default' as const
		},
		{
			href: 'mailto:codingpabs@gmail.com',
			label: 'Email Me',
			icon: 'mdi:email-outline',
			variant: 'neutral' as const
		},
		{
			// --- IMPORTANT: Replace with the ACTUAL URL to your vCard file ---
			href: '/contact.vcf', // Placeholder URL - you need to host the .vcf file
			label: 'Add to Contacts (vCard)',
			icon: 'mdi:card-account-details-outline',
			variant: 'neutral' as const
		}
	];
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />

	<!-- Main Content Area: Centered horizontally, starts near the top -->
	<main class="flex flex-grow items-start justify-center pb-12 pt-12">
		<div class="container mx-auto flex max-w-md flex-col items-center p-4">
			<!-- Profile Avatar and Name -->
			<Avatar class="shadow-shadow mb-4 size-24 border-4 border-border">
				<!-- Replace with your actual image URL -->
				<AvatarImage src="/placeholder-avatar.jpg" alt="Karma Jade Rose" />
				<AvatarFallback class="text-4xl font-bold">KJ</AvatarFallback>
			</Avatar>
			<h1 class="font-heading mb-2 text-3xl">Karma Jade Rose</h1>
			<p class="font-base mb-8 text-center text-foreground/80">
				Rust & Python Developer | Web Dev Enthusiast | Robotics Tinkerer
			</p>

			<!-- Links Section -->
			<div class="flex w-full flex-col space-y-4">
				{#each links as link (link.href)}
					{#if link.label === 'Add to Contacts (vCard)'}
						<!-- Special handling for vCard download link -->
						<a
							href={link.href}
							class="w-full no-underline"
							download="KarmaJadeRose_Contact.vcf"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Button variant={link.variant} size="lg" class="w-full justify-center text-lg">
								{#if link.icon}
									<Icon icon={link.icon} class="mr-2 size-6" />
								{/if}
								{link.label}
							</Button>
						</a>
					{:else}
						<!-- Standard link handling -->
						<a
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							class="w-full no-underline"
						>
							<Button variant={link.variant} size="lg" class="w-full justify-center text-lg">
								{#if link.icon}
									<Icon icon={link.icon} class="mr-2 size-6" />
								{/if}
								{link.label}
							</Button>
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</main>
</div>
