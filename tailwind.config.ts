import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				heading: ['Inter', 'sans-serif'] // Unified font family
			},
			colors: {
				background: 'var(--color-background)',
				foreground: 'var(--color-foreground)',
				primary: {
					DEFAULT: 'var(--color-primary)',
					foreground: 'var(--color-primary-foreground)'
				},
				muted: {
					DEFAULT: 'var(--color-muted)',
					foreground: 'var(--color-muted-foreground)'
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					foreground: 'var(--color-accent-foreground)'
				}
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'font-family': 'Inter, sans-serif',
						'code::before': { content: '""' },
						'code::after': { content: '""' },
						color: theme('colors.zinc.400'),
						'h1, h2, h3, h4, h5, h6': {
							fontFamily: 'Inter, sans-serif',
							color: theme('colors.white'),
							fontWeight: '600',
							letterSpacing: '-0.025em'
						},
						strong: { color: theme('colors.white') },
						a: {
							color: theme('colors.white'),
							textDecoration: 'underline',
							textDecorationColor: theme('colors.zinc.700'),
							textUnderlineOffset: '4px',
							'&:hover': {
								color: theme('colors.zinc.200'),
								textDecorationColor: theme('colors.white')
							}
						},
						code: {
							color: theme('colors.zinc.200'),
							backgroundColor: theme('colors.zinc.900'),
							padding: '0.25rem 0.5rem',
							borderRadius: '0.25rem',
							border: `1px solid ${theme('colors.zinc.800')}`
						}
					}
				}
			}),
			animation: {
				ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite',
				float: 'float 6s ease-in-out infinite'
			},
			keyframes: {
				ripple: {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)'
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				}
			}
		}
	},

	plugins: [typography, containerQueries]
} satisfies Config;
