// src/routes/tags/+page.server.ts
import { getAllPosts } from '$lib/server/blogPosts';
import type { BlogPost } from '$lib/server/blogPosts'; // Optional: if you need the type

export interface PageData {
    /** An alphabetically sorted array of unique tags from all blog posts. */
    uniqueTags: string[];
}

export function load(): PageData {
    const posts = getAllPosts();
    const allTags: string[] = [];

    // Collect all tags from all posts
    posts.forEach((post) => {
        if (post.tags && Array.isArray(post.tags)) {
            allTags.push(...post.tags);
        }
    });

    // Get unique tags using a Set and sort them alphabetically
    const uniqueTags = [...new Set(allTags)].sort((a, b) =>
        a.localeCompare(b)
    );

    console.log(`Found ${uniqueTags.length} unique tags.`); // Optional logging

    return {
        uniqueTags: uniqueTags
    };
}

// Prerender this page as the tag list is determined at build time
export const prerender = true;
