<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	// --- MODIFICATIONS START HERE ---
	export const badgeVariants = tv({
		// Updated base styles using CSS variables
		base: 'inline-flex items-center justify-center rounded-[var(--radius-base)] border-2 border-[var(--border)] px-2.5 py-0.5 text-xs font-[var(--font-weight-base)] w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-[var(--ring)] focus-visible:ring-[var(--ring)]/50 focus-visible:ring-[3px] overflow-hidden',
		variants: {
			// Replaced variants with the new ones, using CSS variables
			variant: {
				default: 'bg-[var(--main)] text-[var(--main-foreground)]',
				neutral: 'bg-[var(--secondary-background)] text-[var(--foreground)]'
				// Original variants removed, add back if needed
			}
		},
		// Kept default variant
		defaultVariants: {
			variant: 'default'
		}
	});
	// --- MODIFICATIONS END HERE ---

	// Type automatically adapts to the new variants
	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	// No changes needed for these imports
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';
	// REMOVED the conflicting import: import type { BadgeVariant } from "./badge.svelte";

	// Props definition remains largely the same
	// BadgeVariant type is directly available from the module script above
	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = 'default', // Default variant is now 'default' from new variants
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		// Note: Original was Anchor, assuming span/a toggle is desired
		variant?: BadgeVariant;
	} = $props();
</script>

<!-- No changes in the template -->
<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>

<!--
  Reminder: This component now relies on CSS variables defined in your global CSS (src/app.css),
  such as:
  --radius-base, --border, --font-weight-base, --ring, --main, --main-foreground,
  --secondary-background, --foreground

  Ensure these are correctly defined for the styles to apply.
-->
