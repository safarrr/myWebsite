import type { PageLoad } from './$types';
import { getPostAll, getProjectAll } from '$lib/utils';

export const load: PageLoad = async () => {
	const posts = await getPostAll();
	const projects = await getProjectAll();

	return {
		posts: posts.slice(0, 3), // Top 3 posts
		projects: projects.slice(0, 3) // Top 3 projects
	};
};
