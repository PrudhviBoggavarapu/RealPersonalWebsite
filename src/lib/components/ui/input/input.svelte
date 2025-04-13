<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	>;

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		...restProps
	}: Props = $props();

	// Define the shared classes based on the React component
	// Use outline-none instead of outline-hidden (standard Tailwind)
	const inputClasses = cn(
		'flex h-10 w-full rounded-base border-2 border-border bg-secondary-background selection:bg-main selection:text-main-foreground px-3 py-2 text-sm font-base text-foreground file:border-0 file:bg-transparent file:text-sm file:font-heading placeholder:text-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
		className // Merge passed className here
	);
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		data-slot="input"
		class={inputClasses}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<input bind:this={ref} data-slot="input" class={inputClasses} {type} bind:value {...restProps} />
{/if}

<!--
  Reminder: This component now relies on CSS variables defined in your global CSS (src/app.css),
  such as:
  --radius-base, --border, --secondary-background, --main, --main-foreground,
  --font-base, --foreground, --font-heading

  Ensure these are correctly defined for the styles to apply as intended.
-->
