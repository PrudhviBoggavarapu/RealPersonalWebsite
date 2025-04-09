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
</script>

{@render children()}
