import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// --- Existing Shadcn/Theme Colors ---
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)', // Assuming you might define --input later
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					// Assuming you might define --primary later, or map it to --main
					DEFAULT: 'hsl(var(--main) / <alpha-value>)', // Map primary to --main
					foreground: 'hsl(var(--main-foreground) / <alpha-value>)' // Map primary-foreground to --main-foreground
				},
				secondary: {
					// Map secondary to --secondary-background
					DEFAULT: 'hsl(var(--secondary-background) / <alpha-value>)',
					// Assuming secondary-foreground is same as main text on secondary bg
					foreground: 'hsl(var(--foreground) / <alpha-value>)'
				},
				destructive: {
					// Map destructive to danger-50
					DEFAULT: 'hsl(var(--neobrutalism-danger-50) / <alpha-value>)',
					// Assuming white/black text on danger
					foreground: 'hsl(var(--main-foreground) / <alpha-value>)' // Or adjust as needed
				},
				muted: {
					// You might map muted to a lighter decorative color or define --muted
					DEFAULT: 'hsl(var(--neobrutalism-purple-90) / <alpha-value>)', // Example: Map to purple-90
					foreground: 'hsl(var(--foreground) / 0.6 / <alpha-value>)' // Example: Dimmed foreground
				},
				accent: {
					// Map accent to --main or another decorative color
					DEFAULT: 'hsl(var(--main) / <alpha-value>)',
					foreground: 'hsl(var(--main-foreground) / <alpha-value>)'
				},
				popover: {
					// Map popover background/foreground, often similar to card
					DEFAULT: 'hsl(var(--background) / <alpha-value>)',
					foreground: 'hsl(var(--foreground) / <alpha-value>)'
				},
				card: {
					// Map card background/foreground
					DEFAULT: 'hsl(var(--background) / <alpha-value>)',
					foreground: 'hsl(var(--foreground) / <alpha-value>)'
				},
				// Keep sidebar if you use it, otherwise remove
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))', // Define --sidebar-* vars if needed
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

				// --- Neobrutalism Decorative Colors ---
				'neobrutalism-pink-70': 'hsl(var(--neobrutalism-pink-70) / <alpha-value>)',
				'neobrutalism-pink-90': 'hsl(var(--neobrutalism-pink-90) / <alpha-value>)',

				'neobrutalism-purple-50': 'hsl(var(--neobrutalism-purple-50) / <alpha-value>)',
				'neobrutalism-purple-70': 'hsl(var(--neobrutalism-purple-70) / <alpha-value>)',
				'neobrutalism-purple-90': 'hsl(var(--neobrutalism-purple-90) / <alpha-value>)',

				'neobrutalism-blue-50': 'hsl(var(--neobrutalism-blue-50) / <alpha-value>)',
				'neobrutalism-blue-70': 'hsl(var(--neobrutalism-blue-70) / <alpha-value>)',
				'neobrutalism-blue-90': 'hsl(var(--neobrutalism-blue-90) / <alpha-value>)',

				'neobrutalism-yellow-50': 'hsl(var(--neobrutalism-yellow-50) / <alpha-value>)',
				'neobrutalism-yellow-70': 'hsl(var(--neobrutalism-yellow-70) / <alpha-value>)',
				'neobrutalism-yellow-90': 'hsl(var(--neobrutalism-yellow-90) / <alpha-value>)',

				'neobrutalism-green-50': 'hsl(var(--neobrutalism-green-50) / <alpha-value>)',
				'neobrutalism-green-70': 'hsl(var(--neobrutalism-green-70) / <alpha-value>)',
				'neobrutalism-green-90': 'hsl(var(--neobrutalism-green-90) / <alpha-value>)',

				// --- Feedback Colors ---
				'neobrutalism-danger-50': 'hsl(var(--neobrutalism-danger-50) / <alpha-value>)',
				'neobrutalism-danger-90': 'hsl(var(--neobrutalism-danger-90) / <alpha-value>)',
				'neobrutalism-warning-50': 'hsl(var(--neobrutalism-warning-50) / <alpha-value>)',
				'neobrutalism-warning-90': 'hsl(var(--neobrutalism-warning-90) / <alpha-value>)',
				'neobrutalism-success-50': 'hsl(var(--neobrutalism-success-50) / <alpha-value>)',

				// --- Other Palette Colors ---
				'neobrutalism-primary-50': 'hsl(var(--neobrutalism-primary-50) / <alpha-value>)',
				'neobrutalism-secondary-0': 'hsl(var(--neobrutalism-secondary-0) / <alpha-value>)',
				'neobrutalism-separator-90': 'hsl(var(--neobrutalism-separator-90) / <alpha-value>)',
				'neobrutalism-body-90': 'hsl(var(--neobrutalism-body-90) / <alpha-value>)',
				'neobrutalism-white-100': 'hsl(var(--neobrutalism-white-100) / <alpha-value>)'
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--bits-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--bits-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			}
		}
	},
	plugins: [tailwindcssAnimate, typography, containerQueries]
};

export default config;
