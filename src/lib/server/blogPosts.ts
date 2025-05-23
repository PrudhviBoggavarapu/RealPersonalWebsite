// src/lib/server/blogPosts.ts
import toml from "toml";
import { error } from "@sveltejs/kit";

// Define the structure of your article data based on the TOML
// Note: Your TOML uses [[title]], which creates an array. We'll assume
// you want the first element of that array for the main post details.
interface TomlArticleData {
	title: {
		name: string;
		slug: string;
		blurb: string;
		tags: string[];
		date: string; // Keep as string initially for sorting
		image?: string; // Optional image
		content: string;
		blog_url: string
	}[]; // Array due to [[title]]
}

export interface BlogPost {
	name: string;
	slug: string;
	blurb: string;
	tags: string[];
	date: Date; // Convert to Date object for easier use
	image?: string;
	content: string;
	blogUrl: string;
	// filePath is removed as it's no longer needed at runtime
}

// --- Build-Time Data Loading using import.meta.glob ---
// Use Vite's import.meta.glob to find all .toml files in src/articles
// `eager: true` imports the modules immediately during build
// `as: 'raw'` imports the raw string content of the files
const rawTomlFiles = import.meta.glob("/src/articles/*.toml", {
	eager: true,
	as: "raw",
});
// Example rawTomlFiles structure at build time:
// {
//   '/src/articles/first_blog.toml': '[[title]]\nname = "First..."',
//   '/src/articles/second_blog.toml': '[[title]]\nname = "Second..."',
//   ...
// }
// -------------------------------------------------------

let allPosts: BlogPost[] | null = null; // Cache the posts

/**
 * Parses the TOML content fetched at build time, sorts the posts by date,
 * caches the result, and returns the array.
 * Subsequent calls return the cached, sorted array directly.
 * This function NO LONGER uses node:fs or node:path at runtime.
 */
export function getAllPosts(): BlogPost[] {
	// If posts are already processed and cached, return the cached version.
	if (allPosts) {
		return allPosts;
	}

	console.log("Processing build-time TOML data..."); // Log processing
	const posts: BlogPost[] = [];

	// Iterate over the raw TOML strings imported by import.meta.glob
	for (const filePath in rawTomlFiles) {
		const fileContent = rawTomlFiles[filePath];
		// Extract a simple filename for logging purposes
		const fileName = filePath.split("/").pop() || filePath;

		try {
			const parsedData = toml.parse(fileContent) as TomlArticleData;

			// Validate the structure
			if (
				!parsedData.title ||
				!Array.isArray(parsedData.title) ||
				parsedData.title.length === 0
			) {
				console.warn(
					`Skipping ${fileName}: Missing or invalid [[title]] array.`
				);
				continue;
			}

			// Assume the first [[title]] entry contains the main post data
			const postData = parsedData.title[0];

			// Validate required fields
			if (
				!postData.slug ||
				!postData.name ||
				!postData.date ||
				!postData.content
			) {
				console.warn(
					`Skipping ${fileName}: Missing required fields (slug, name, date, content) in title object.`
				);
				continue;
			}

			// Create the BlogPost object, converting date string to Date object
			posts.push({
				name: postData.name,
				slug: postData.slug,
				blurb: postData.blurb || "", // Provide default empty string if missing
				tags: postData.tags || [], // Provide default empty array if missing
				date: new Date(postData.date), // Convert string to Date here
				image: postData.image, // Will be undefined if missing
				content: postData.content,
				blogUrl: postData.blog_url
				// filePath is removed
			});
		} catch (parseError: any) {
			// Log the error with the specific file that failed
			console.error(`Error parsing TOML from ${fileName}:`, parseError);
			// Depending on requirements, you might want to stop the build here
			// by re-throwing the error, potentially wrapped in a SvelteKit error.
			// For now, we just log it and continue with other posts.
			// throw error(500, `Failed to parse blog post: ${fileName}. Error: ${parseError.message}`);
		}
	}

	// Sort the newly processed posts by date (newest first) *before* caching.
	// This uses the Date objects directly.
	posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	console.log(`Processed and sorted ${posts.length} posts from build-time data.`);

	// Cache the processed and sorted result.
	allPosts = posts;
	return allPosts;
}

/**
 * Finds and returns a single blog post by its slug.
 * Uses the cached list generated by getAllPosts (which now uses build-time data).
 *
 * @param slug The slug of the post to find.
 * @returns The found BlogPost or null if not found.
 */
export function getPostBySlug(slug: string): BlogPost | null {
	const posts = getAllPosts(); // Ensure posts are processed and cached
	const post = posts.find((p) => p.slug === slug);
	return post || null; // Return the found post or null if not found
}
