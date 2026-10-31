import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

type ThreadsPost = {
	id: string;
	text?: string;
	timestamp: string;
	permalink: string;
	media_type?: string;
	media_url?: string;
	thumbnail_url?: string;
};

type ThreadsResponse = { data?: ThreadsPost[] };
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
let cachedThreads: { posts: ThreadsPost[]; expiresAt: number } | undefined;

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400'
	});

	if (cachedThreads && cachedThreads.expiresAt > Date.now()) {
		return { threads: cachedThreads.posts };
	}

	const accessToken = env.THREADS_ACCESS_TOKEN;
	if (!accessToken) return { threads: [] as ThreadsPost[] };

	try {
		const url = new URL('https://graph.threads.net/v1.0/me/threads');
		url.searchParams.set(
			'fields',
			'id,text,timestamp,permalink,media_type,media_url,thumbnail_url'
		);
		url.searchParams.set('limit', '1');

		const response = await fetch(url, {
			headers: { Authorization: `Bearer ${accessToken}` }
		});
		if (!response.ok) {
			const body = (await response.json().catch(() => null)) as {
				error?: {
					message?: string;
					type?: string;
					code?: number;
					error_subcode?: number;
				};
			} | null;
			console.error('Threads API request failed.', {
				status: response.status,
				error: body?.error
			});
			return { threads: [] as ThreadsPost[] };
		}

		const result = (await response.json()) as ThreadsResponse;
		const threads = (result.data ?? [])
			.filter((post) => post.id && post.timestamp && post.permalink)
			.slice(0, 1);
		cachedThreads = { posts: threads, expiresAt: Date.now() + CACHE_TTL_MS };

		return { threads };
	} catch (error) {
		console.error('Unable to load the latest Threads posts.', error);
		return { threads: cachedThreads?.posts ?? [] };
	}
};
