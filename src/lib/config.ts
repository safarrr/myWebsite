import { Github, Twitter, Linkedin, Mail, Instagram, Cloud } from 'lucide-svelte';
import ThreadsIcon from '$lib/components/ThreadsIcon.svelte';

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
		label: 'Threads',
		href: 'https://www.threads.com/@safar19x',
		handle: '@safar19x',
		icon: ThreadsIcon
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
	'Nextjs',
	'Nuxtjs',
	'Vuejs',
	'React',
	'go',
	'python',
	'TypeScript',
	'TailwindCSS',
	'Node.js',
	'Laravel',
	'PostgreSQL',
	'MySQL'
];
