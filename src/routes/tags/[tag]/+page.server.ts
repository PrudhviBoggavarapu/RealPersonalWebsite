// src/routes/tags/[tag]/+page.server.ts
import { getAllPosts, type BlogPost } from '$lib/server/blogPosts';
import { error } from '@sveltejs/kit';

export interface PageData {
    /** The tag name requested from the URL. */
    tagName: string;
    /** An array of blog posts that include the requested tag. */
    filteredPosts: BlogPost[];
}

export function load({ params }): PageData {
    const requestedTag = params.tag; // Get tag from URL (already decoded by SvelteKit)
    if (!requestedTag) {
        throw error(400, 'Tag parameter is missing');
    }

    const allPosts = getAllPosts();

    // Filter posts: keep only those whose tags array includes the requested tag.
    // Consider case-insensitivity if your tags might vary in casing:
    // const filteredPosts = allPosts.filter(post =>
    //     post.tags?.some(t => t.toLowerCase() === requestedTag.toLowerCase())
    // );
    const filteredPosts = allPosts.filter((post) =>
        post.tags?.includes(requestedTag)
    );

    console.log(
        `Found ${filteredPosts.length} posts for tag: ${requestedTag}`
    ); // Optional logging

    // Optional: Could throw 404 if no posts found, but showing an empty list might be better UX.
    // if (filteredPosts.length === 0) {
    //     throw error(404, `No posts found for tag: ${requestedTag}`);
    // }

    return {
        tagName: requestedTag,
        filteredPosts: filteredPosts
    };
}

// --- Prerendering Support ---
export function entries() {
    const posts = getAllPosts();
    const allTags: string[] = [];
    posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
            allTags.push(...post.tags);
        }
    });
    const uniqueTags = [...new Set(allTags)];

    // Return an array of objects mapping the unique tags to the `tag` parameter
    return uniqueTags.map((tag) => ({ tag: encodeURIComponent(tag) }));
    // Example output: [ { tag: 'blog' }, { tag: 'first' }, { tag: 'second' }, ... ]
}

export const prerender = true; // Enable prerendering for these tag pages
