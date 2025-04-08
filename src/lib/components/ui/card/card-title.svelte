<script lang="ts">
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		level = 3, // Keep the semantic level prop
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	} = $props();
</script>

<div
	role="heading"
	aria-level={level}
	bind:this={ref}
	data-slot="card-title"
	class={cn(
		// Updated classes using CSS variable
		'font-[var(--font-heading)] leading-none',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

<!-- Depends on CSS variable: --font-heading -->
