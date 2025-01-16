import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getPostAll } from '$lib/utils';
interface Post {
	link: string;
	metadata?: {
		title: string;
		date: string;
		updated: string;
		author: string[];
		categories: string[];
		description: string[];
	};
}
export const load: PageLoad = async ({ params }) => {
	try {
		const data = await getPostAll();

		// const post = await
		return { data: data };
	} catch (err) {
		console.error(err);

		error(505, 'error');
	}
};
