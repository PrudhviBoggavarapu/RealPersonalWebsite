// src/lib/themeUtils.ts
/**
 * Applies the theme class to the document root.
 * Handles server-side rendering safety.
 * @param isDark - Whether the dark theme should be applied.
 */
export function applyThemeClass(isDark: boolean): void {
    if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }
}

/**
 * Gets the preferred theme based on localStorage or system preference.
 * Handles server-side rendering safety.
 * @returns 'dark' or 'light'
 */
export function getPreferredTheme(): 'dark' | 'light' {
    if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme');
        // Explicitly check for 'dark' or 'light' to avoid invalid values
        if (storedTheme === 'dark' || storedTheme === 'light') {
            return storedTheme;
        }
        // Check system preference only if no valid theme is stored
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }
    // Return a default theme for SSR or environments without window
    // Consider if 'light' or 'dark' makes more sense as your default fallback
    return 'light';
}

/**
 * Persists the chosen theme to localStorage.
 * Handles server-side rendering safety.
 * @param theme - 'dark' or 'light'
 */
export function persistTheme(theme: 'dark' | 'light'): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('theme', theme);
    }
}
