import { getAllPosts } from '$lib/server/blogPosts';

export const GET = async () => {
	const posts = getAllPosts();

	const items = posts.map((post) => `
		<item>
			<title><![CDATA[${post.name}]]></title>
			<link>https://karamjaderose.com/blog/${post.slug}</link>
			<guid>https://karamjaderose.com/blog/${post.slug}</guid>
			<description><![CDATA[${post.blurb}]]></description>
			<pubDate>${post.date.toUTCString()}</pubDate>
		</item>
	`).join('\n');

	const rss = `
		<?xml version="1.0" encoding="UTF-8" ?>
		<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
			<channel>
				<atom:link href="https://karamjaderose.com/rss.xml" rel="self" type="application/rss+xml" />
				<title>Karma Jade Rose Blog</title>
				<link>https://karamjaderose.com/blog</link>
				<description>Blog about Rust, Python, and more</description>
				<atom:link href="https://karamjaderose.com/rss.xml" rel="self" type="application/rss+xml" />
				${items}
			</channel>
		</rss>
	`.trim();

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
};
