import { Github, Twitter, Linkedin, Mail, Instagram, Gitlab, Cloud } from 'lucide-svelte';

export const SOCIALS = [
	{
		label: 'GitHub',
		href: 'https://github.com/safarrr',
		handle: '@safarrr',
		icon: Github
	},
	{
		label: 'Twitter/X',
		href: 'https://x.com/justsafarr',
		handle: '@justsafarr',
		icon: Twitter
	},
	{
		label: 'BlueSky',
		href: 'https://bsky.app/profile/safarudin.bsky.social',
		handle: '@safarudin.bsky',
		icon: Cloud
	},
	{
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/safarudin19/',
		handle: 'Safarudin',
		icon: Linkedin
	},
	{
		label: 'Instagram',
		href: 'https://instagram.com/safar19x',
		handle: '@safar19x',
		icon: Instagram
	},
	{
		label: 'Email',
		href: 'mailto:safarudin.dev@gmail.com',
		handle: 'safarudin.dev@gmail.com',
		icon: Mail
	}
];

export const TECH_STACK = [
	'SvelteKit',
	'python',
	'Nextjs',
	'Nuxtjs',
	'TypeScript',
	'TailwindCSS',
	'Node.js',
	'Laravel',
	'PostgreSQL',
	'MySQL',
	'React'
];
