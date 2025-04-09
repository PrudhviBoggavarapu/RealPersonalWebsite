<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/themeStore';

	let { children } = $props();

	// Initialize theme on client-side mount
	onMount(() => {
		themeStore.initialize();
	});

	// Optional: Effect to reactively apply class if needed elsewhere,
	// but applyThemeClass is already called by initialize/toggle.
	// $effect(() => {
	//   if ($themeStore.mounted) {
	//     applyThemeClass($themeStore.isDark);
	//   }
	// });
</script>

{@render children()}
