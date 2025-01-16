import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getPostAll() {
	const glob_import = import.meta.glob<{ metadata: Record<string, any> }>('$lib/posts/*.md', {
		eager: true
	});
	let post = [];
	const blog = Object.entries(glob_import);
	for (let i = 0; i < blog.length; i++) {
		const el = blog[i];
		let r: { link: string; metadata?: {} } = { link: '', metadata: undefined };
		const fileNameSplit = el[0].split('/');
		const metadata = el[1].metadata;
		r.link = fileNameSplit[fileNameSplit.length - 1].split('.')[0];
		if (metadata) {
			r.metadata = metadata;
		}
		post.push(r);
	}
	return post;
}
