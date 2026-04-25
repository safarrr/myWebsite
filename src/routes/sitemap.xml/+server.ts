import { getPostAll } from '$lib/utils';
import { getProjectAll } from '$lib/utils';

const BASE_URL = 'https://safarudin.my.id';

export async function GET() {
	const posts = getPostAll();
	const projects = getProjectAll();

	const staticPages = [
		{ url: '/', priority: 1.0 },
		{ url: '/about', priority: 0.8 },
		{ url: '/blog', priority: 0.9 },
		{ url: '/projects', priority: 0.8 },
		{ url: '/tools', priority: 0.7 },
		{ url: '/tools/wame', priority: 0.6 },
		{ url: '/tools/screenshare', priority: 0.6 },
	];

	const pages = [
		...staticPages,
		...posts.map((post) => ({
			url: `/blog/${post.link}`,
			priority: 0.8,
		})),
		...projects.map((project) => ({
			url: `/projects/${project.slug}`,
			priority: 0.7,
		})),
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
}