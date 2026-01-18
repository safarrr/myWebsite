import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const post = await import(`../../../lib/projects/${params.slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata
		};
	} catch (e) {
		error(404, `Could not find project ${params.slug}`);
	}
};
