<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props(); // Keep as <p> for semantics
</script>

<p
	bind:this={ref}
	data-slot="card-description"
	class={cn(
		// Updated classes using CSS variable
		'text-sm font-[var(--font-base)]',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</p>

<!-- Depends on CSS variable: --font-base -->
