import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface ProjectMetadata {
	title: string;
	description: string;
	date: string;
	tech: string[];
	thumbnail?: string;
	demo?: string;
	repo?: string;
	gallery?: string[];
}

export interface PostMetadata {
	title: string;
	date: string;
	updated?: string;
	author?: string[];
	categories?: string[];
	description: string;
}

export function getPostAll() {
	const glob_import = import.meta.glob<{ metadata: PostMetadata }>('$lib/posts/*.md', {
		eager: true
	});
	let post: { link: string; metadata: PostMetadata }[] = [];
	const blog = Object.entries(glob_import);
	for (let i = 0; i < blog.length; i++) {
		const el = blog[i];
		const fileNameSplit = el[0].split('/');
		const metadata = el[1].metadata;
		// Skip if no metadata
		if (!metadata) continue;

		post.push({
			link: fileNameSplit[fileNameSplit.length - 1].split('.')[0],
			metadata: metadata
		});
	}
	// Sort by date desc
	post.sort((a, b) => {
		const da = new Date(a.metadata.date || 0).getTime();
		const db = new Date(b.metadata.date || 0).getTime();
		return db - da;
	});
	return post;
}

export function getProjectAll() {
	const glob_import = import.meta.glob<{ metadata: ProjectMetadata }>('$lib/projects/*.md', {
		eager: true
	});

	const projects = Object.entries(glob_import).map(([path, module]) => {
		const slug = path.split('/').pop()?.split('.')[0] || '';
		return {
			slug,
			metadata: module.metadata
		};
	});

	return projects.sort((a, b) => {
		const dateA = new Date(a.metadata.date || 0).getTime();
		const dateB = new Date(b.metadata.date || 0).getTime();
		return dateB - dateA;
	});
}
