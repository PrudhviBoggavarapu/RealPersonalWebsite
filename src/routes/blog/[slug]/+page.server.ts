// src/routes/blog/[slug]/+page.server.ts
import { getAllPosts, getPostBySlug, type BlogPost } from "$lib/server/blogPosts";
import { error } from "@sveltejs/kit";

export interface PageData {
    post: BlogPost;
}

// The `params` object contains the dynamic route parameters (e.g., { slug: 'first-blog-post' })
export function load({ params }): PageData {
    const post = getPostBySlug(params.slug);

    if (!post) {
        // If the post isn't found by slug, throw a 404 error
        throw error(404, "Blog post not found");
    }

    return {
        post: post, // Pass the specific post data to the page
    };
}

export function entries() {
    const posts = getAllPosts();
    // Map the posts array to an array of objects, each with a 'slug' property
    return posts.map((post) => ({ slug: post.slug }));
    // Example output: [ { slug: 'first-blog-post' }, { slug: 'second-blog-post' }, ... ]
}
export const prerender = true;