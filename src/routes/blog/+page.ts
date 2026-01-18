import { getPostAll } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await getPostAll();
	return {
		posts
	};
};
