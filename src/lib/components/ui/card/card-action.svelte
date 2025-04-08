<script lang="ts">
	// New component for CardAction
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="card-action"
	class={cn(
		// Classes for positioning within the CardHeader grid
		'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
