import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: (theme) => ({
				 
			// typography: {
					DEFAULT: {
						
						css: {
							"code::before": { content: '""' },
							"code::after": { content: '""' },
							color: theme("colors.gray.50"),
							"p,h1,h2,h3,h4,h5,h6,code,input,label,li,th,td":{ color:theme("colors.gray.50")},
							strong:{ color:theme("colors.gray.50")},
							"li::before":{color: theme("colors.gray.50")},
							"li::marker": {color:theme("colors.gray.50")},
							figcaption:{color: theme("colors.gray.50")}, 
							a: {
								color: theme("colors.blue.500"),
								textDecoration:"none",
								'&:hover': {
								  color: theme("colors.blue.500"),
								  textDecoration:"underline"
								},
							  },
							
					},
				},
		}),		
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
