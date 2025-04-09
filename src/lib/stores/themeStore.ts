// src/lib/stores/themeStore.ts
import { writable, type Writable } from 'svelte/store';
import { applyThemeClass, getPreferredTheme, persistTheme } from '$lib/themeUtils';

interface ThemeStore {
    isDark: boolean;
    mounted: boolean; // To track if client-side logic can run
}

// Create the writable store
const { subscribe, set, update }: Writable<ThemeStore> = writable({
    isDark: false, // Initial default, will be updated on mount
    mounted: false
});

// Function to initialize the theme based on preference/storage
function initializeTheme(): void {
    if (typeof window !== 'undefined') {
        const preferredTheme = getPreferredTheme();
        const newIsDark = preferredTheme === 'dark';
        update((store) => ({ ...store, isDark: newIsDark, mounted: true }));
        applyThemeClass(newIsDark); // Apply initial theme class
        console.log('Theme initialized:', preferredTheme);
    }
}

// Function to toggle the theme
function toggleTheme(): void {
    update((store) => {
        const newIsDark = !store.isDark;
        persistTheme(newIsDark ? 'dark' : 'light');
        applyThemeClass(newIsDark);
        console.log('Theme toggled to:', newIsDark ? 'dark' : 'light');
        return { ...store, isDark: newIsDark };
    });
}

// Export the store and actions
export const themeStore = {
    subscribe,
    initialize: initializeTheme,
    toggle: toggleTheme
    // Note: We don't export set or update directly to control state changes
};
