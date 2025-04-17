<script lang="ts">
	import Header from '$lib/frontpage/Header.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';

	// Import icons as Svelte components
	import MdiPostOutline from '~icons/mdi/post-outline';
	import SimpleIconsGithub from '~icons/simple-icons/github';
	import SimpleIconsYoutube from '~icons/simple-icons/youtube';
	import SimpleIconsTwitch from '~icons/simple-icons/twitch';
	import SimpleIconsBluesky from '~icons/simple-icons/bluesky';
	import SimpleIconsSnapchat from '~icons/simple-icons/snapchat';
	import SimpleIconsWhatsapp from '~icons/simple-icons/whatsapp';
	import MdiEmailOutline from '~icons/mdi/email-outline';
	import MdiCardAccountDetailsOutline from '~icons/mdi/card-account-details-outline';

	// Define the links for the Linktree, using icon components
	const links = [
		{
			href: '/blog',
			label: 'Blog',
			icon: MdiPostOutline,
			variant: 'neutral' as const
		},
		{
			href: 'https://github.com/prudhviboggavarapu',
			label: 'GitHub',
			icon: SimpleIconsGithub,
			variant: 'default' as const
		},
		{
			href: 'https://www.youtube.com/@LetsLearnThingsLive',
			label: 'YouTube',
			icon: SimpleIconsYoutube,
			variant: 'default' as const
		},
		{
			href: 'https://twitch.tv/letslearnthingslive',
			label: 'Twitch',
			icon: SimpleIconsTwitch,
			variant: 'default' as const
		},
		{
			href: 'https://bsky.app/profile/thethornyrose.bsky.social',
			label: 'Bluesky',
			icon: SimpleIconsBluesky,
			variant: 'default' as const
		},
		{
			href: 'https://www.snapchat.com/add/soulcrusher6942?share_id=mO4CkjwaURo&locale=en-US',
			label: 'Snapchat',
			icon: SimpleIconsSnapchat,
			variant: 'default' as const
		},
		{
			href: 'https://wa.me/qr/LJWL6RUQD2TJE1',
			label: 'WhatsApp',
			icon: SimpleIconsWhatsapp,
			variant: 'default' as const
		},
		{
			href: 'mailto:codingpabs@gmail.com',
			label: 'Email Me',
			icon: MdiEmailOutline,
			variant: 'neutral' as const
		},
		{
			href: '/contact.vcf',
			label: 'Add to Contacts (vCard)',
			icon: MdiCardAccountDetailsOutline,
			variant: 'neutral' as const,
			download: 'KarmaJadeRose_Contact.vcf'
		}
	];
</script>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />

	<main class="flex flex-grow items-start justify-center pb-12 pt-12">
		<div class="container mx-auto flex max-w-md flex-col items-center p-4">
			<Avatar class="shadow-shadow mb-4 size-24 border-4 border-border">
				<AvatarFallback class="text-4xl font-bold">KJ</AvatarFallback>
			</Avatar>
			<h1 class="font-heading mb-2 text-3xl">Karma Jade Rose</h1>
			<p class="font-base mb-8 text-center text-foreground/80">
				Rust & Python Developer | Web Dev Enthusiast | Robotics Tinkerer
			</p>

			<div class="flex w-full flex-col space-y-4">
				{#each links as link (link.href)}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full no-underline"
						{...link.download ? { download: link.download } : {}}
					>
						<Button variant={link.variant} size="lg" class="w-full justify-center text-lg">
							{#if link.icon}
								<svelte:component this={link.icon} class="mr-2 size-6" />
							{/if}
							{link.label}
						</Button>
					</a>
				{/each}
			</div>
		</div>
	</main>
</div>
