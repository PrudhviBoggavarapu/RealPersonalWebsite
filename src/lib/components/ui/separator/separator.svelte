<script lang="ts">
	import { Separator as SeparatorPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'horizontal',
		// Add a prop for thickness, defaulting to 8px (h-2 in Tailwind)
		thickness = 'h-1', // Default thickness for horizontal
		...restProps
	}: SeparatorPrimitive.RootProps & { thickness?: string } = $props();

	// Determine vertical thickness based on horizontal (e.g., w-2 if h-2)
	// Or keep it fixed if preferred
	const verticalThickness = thickness.replace('h-', 'w-'); // Simple replacement, adjust if needed
</script>

<SeparatorPrimitive.Root
	bind:ref
	class={cn(
		// Change background to black
		'shrink-0 bg-black',
		// Use the thickness prop for height/width
		orientation === 'horizontal'
			? `${thickness} w-full` // e.g., h-2 w-full
			: `min-h-full ${verticalThickness}`, // e.g., min-h-full w-2
		className
	)}
	{orientation}
	{...restProps}
/>
