<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	// --- MODIFICATIONS START HERE ---
	export const buttonVariants = tv({
		// Updated base styles using CSS variables where appropriate
		base: 'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-base)] text-sm font-[var(--font-weight-base)] ring-offset-white transition-all gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		variants: {
			// Replaced variants with the new ones, using CSS variables
			variant: {
				default:
					'text-[var(--border)] border-2 border-[var(--border)] shadow-[var(--shadow-shadow)] hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none',
				noShadow: 'text-[var(--main-foreground)] border-2 border-[var(--border)]',
				neutral:
					'text-[var(--foreground)] border-2 border-[var(--border)] shadow-[var(--shadow-shadow)] hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none',
				reverse:
					'text-[var(--main-foreground)] border-2 border-[var(--border)] hover:translate-x-[var(--spacing-reverseBoxShadowX)] hover:translate-y-[var(--spacing-reverseBoxShadowY)] hover:shadow-[var(--shadow-shadow)]'
				// Original variants removed, add back if needed
			},
			// Kept original sizes, updated icon size slightly
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3', // Kept original Svelte sm style
				lg: 'h-11 rounded-md px-8',
				icon: 'size-10' // Updated to use size-* utility
			}
		},
		// Kept default variants
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});
	// --- MODIFICATIONS END HERE ---

	// Types automatically adapt to the new variants
	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	// Props definition remains the same
	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	// No changes needed for cn import
	import { cn } from '$lib/utils.js';

	// ButtonProps type is directly available from the module script above
	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<!-- No changes in the template -->
{#if href}
	<a bind:this={ref} class={cn(buttonVariants({ variant, size }), className)} {href} {...restProps}>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		{...restProps}
	>
		{@render children?.()}
	</button>
{/if}

<!--
  Reminder: This component now heavily relies on CSS variables defined in your global CSS (src/app.css),
  such as:
  --radius-base, --font-weight-base, --main-foreground, --main, --border, --shadow-shadow,
  --spacing-boxShadowX, --spacing-boxShadowY, --secondary-background, --foreground,
  --spacing-reverseBoxShadowX, --spacing-reverseBoxShadowY

  Ensure these are correctly defined for the styles to apply.
-->
