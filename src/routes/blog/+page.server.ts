// src/routes/blog/+page.server.ts
import { getAllPosts, type BlogPost } from "$lib/server/blogPosts";

export interface PageData {
    posts: BlogPost[];
}

export function load(): PageData {
    const posts = getAllPosts();
    return {
        posts: posts, // Pass the loaded posts to the page
    };
}
