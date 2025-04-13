// src/routes/tags/[tag]/+page.server.ts
import { getAllPosts, type BlogPost } from '$lib/server/blogPosts';
import { error } from '@sveltejs/kit';

export interface PageData {
    tagName: string;
    filteredPosts: BlogPost[];
}

export function load({ params }): PageData {
    const requestedTag = params.tag; // Get tag from URL (already decoded by SvelteKit)
    if (!requestedTag) {
        throw error(400, 'Tag parameter is missing');
    }

    const allPosts = getAllPosts();

    const filteredPosts = allPosts.filter((post) =>
        post.tags?.includes(requestedTag)
    );

    console.log(
        `Found ${filteredPosts.length} posts for tag: ${requestedTag}`
    ); // Optional logging


    return {
        tagName: requestedTag,
        filteredPosts: filteredPosts
    };
}

export function entries() {
    const posts = getAllPosts();
    const allTags: string[] = [];
    posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
            allTags.push(...post.tags);
        }
    });
    const uniqueTags = [...new Set(allTags)];

    return uniqueTags.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export const prerender = true; // Enable prerendering for these tag pages
