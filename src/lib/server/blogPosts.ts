// src/lib/server/blogPosts.ts
import fs from "node:fs";
import path from "node:path";
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
	filePath: string; // Keep track of the original file
}

const articlesDir = path.resolve("src/articles"); // Path to your articles

let allPosts: BlogPost[] | null = null; // Cache the posts
/**
 * Reads all .toml files from the articles directory, parses them,
 * sorts them by date (newest first), caches the result, and returns the array.
 * Subsequent calls return the cached, sorted array directly.
 */
export function getAllPosts(): BlogPost[] {
	// If posts are already loaded and cached, return the cached version directly.
	// It was sorted before being cached.
	if (allPosts) {
		return allPosts;
	}

	// If cache is empty, proceed to load, parse, and sort.
	console.log("Cache empty. Loading and parsing posts..."); // Log cache miss
	const posts: BlogPost[] = [];

	try {
		const files = fs.readdirSync(articlesDir);

		for (const file of files) {
			// console.log(`Processing file: ${file}`); // Keep if needed for debugging
			if (path.extname(file).toLowerCase() === ".toml") {
				const filePath = path.join(articlesDir, file);
				try {
					const fileContent = fs.readFileSync(filePath, "utf-8");
					const parsedData = toml.parse(fileContent) as TomlArticleData;

					// Validate the structure
					if (
						!parsedData.title ||
						!Array.isArray(parsedData.title) ||
						parsedData.title.length === 0
					) {
						console.warn(
							`Skipping ${file}: Missing or invalid [[title]] array.`
						);
						continue;
					}

					const postData = parsedData.title[0];

					// Validate required fields
					if (
						!postData.slug ||
						!postData.name ||
						!postData.date ||
						!postData.content
					) {
						console.warn(
							`Skipping ${file}: Missing required fields (slug, name, date, content) in title object.`
						);
						continue;
					}

					// Create the BlogPost object, converting date string to Date object
					posts.push({
						name: postData.name,
						slug: postData.slug,
						blurb: postData.blurb || "",
						tags: postData.tags || [],
						date: new Date(postData.date), // Convert string to Date here
						image: postData.image,
						content: postData.content,
						filePath: filePath,
					});
				} catch (parseError: any) {
					console.error(`Error parsing TOML file ${file}:`, parseError);
				}
			}
		}
	} catch (readDirError: any) {
		if (readDirError.code === "ENOENT") {
			console.warn(
				`Articles directory not found at ${articlesDir}. No posts loaded.`
			);
			allPosts = []; // Cache empty array if dir not found
			return allPosts;
		}
		console.error(
			`Error reading articles directory ${articlesDir}:`,
			readDirError
		);
		throw error(500, "Could not read blog articles directory");
	}

	// Sort the newly loaded posts by date (newest first) *before* caching.
	// This uses the Date objects directly.
	posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	console.log(`Loaded and sorted ${posts.length} posts.`);

	// Cache the sorted result.
	allPosts = posts;
	return allPosts;
}

/**
 * Finds and returns a single blog post by its slug.
 * Uses the cached list generated by getAllPosts.
 *
 * @param slug The slug of the post to find.
 * @returns The found BlogPost or null if not found.
 */
export function getPostBySlug(slug: string): BlogPost | null {
	const posts = getAllPosts(); // Ensure posts are loaded and cached
	const post = posts.find((p) => p.slug === slug);
	//sort posts by date, newest first

	return post || null;
}
