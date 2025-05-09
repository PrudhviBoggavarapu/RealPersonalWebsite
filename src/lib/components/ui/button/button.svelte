<script lang="ts" module>
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const buttonVariants = tv({
		base: 'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-base)] text-sm font-[var(--font-weight-base)] ring-offset-white transition-all gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
		variants: {
			variant: {
				default:
					'text-[var(--border)] border-[3px] border-[var(--border)] shadow-[var(--shadow-shadow)] hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none',
				noBorder:
					'text-[var(--border)] shadow-[var(--shadow-shadow)] hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none',
				noShadow: 'text-[var(--main-foreground)] border-[3px] border-[var(--border)]',
				neutral:
					'text-[var(--foreground)] border-[3px] border-[var(--border)] shadow-[var(--shadow-shadow)] hover:translate-x-[var(--spacing-boxShadowX)] hover:translate-y-[var(--spacing-boxShadowY)] hover:shadow-none',
				reverse:
					'text-[var(--main-foreground)] border-[3px] border-[var(--border)] hover:translate-x-[var(--spacing-reverseBoxShadowX)] hover:translate-y-[var(--spacing-reverseBoxShadowY)] hover:shadow-[var(--shadow-shadow)]'
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
		};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

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
