import { getProjectAll } from '$lib/utils';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const projects = await getProjectAll();
	return {
		projects
	};
};
