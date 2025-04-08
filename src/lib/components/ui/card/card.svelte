<script lang="ts">
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
	data-slot="card"
	class={cn(
		// Updated classes using CSS variables
		'flex flex-col gap-6 rounded-[var(--radius-base)] border-2 border-[var(--border)] bg-[var(--background)] py-6 font-[var(--font-base)] text-[var(--foreground)] shadow-[var(--shadow-shadow)]',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>

<!--
  Depends on CSS variables:
  --radius-base, --shadow-shadow, --border, --background, --foreground, --font-base
-->
