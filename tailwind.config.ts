import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			animation: {
				// ripple: "ripple 3400ms ease infinite",
				ripple: 'ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite'
			},
			keyframes: {
				ripple: {
					'0%, 100%': {
						transform: 'translate(-50%, -50%) scale(1)'
					},
					'50%': {
						transform: 'translate(-50%, -50%) scale(0.9)'
					}
				}
			}
		}
	},

	plugins: [typography, containerQueries]
} satisfies Config;
