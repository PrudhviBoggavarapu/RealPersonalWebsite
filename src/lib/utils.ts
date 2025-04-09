import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked } from 'marked';
// Optional: Add sanitizer later if needed
// import DOMPurify from 'dompurify';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a date object into a standard string format for display (e.g., "October 5, 2024").
 * @param date - The Date object, or a string/number that can be parsed into a Date.
 * @returns The formatted date string, or "Invalid Date" if input is invalid.
 */
export function formatDisplayDate(date: Date | string | number): string {
    // Attempt to create a Date object
    const dateObj = new Date(date);

    // Check if the Date object is valid
    if (isNaN(dateObj.getTime())) {
        console.warn("formatDisplayDate received invalid date input:", date);
        return "Invalid Date";
    }

    // Format the valid date
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}


/**
 * Parses a Markdown string into HTML.
 * WARNING: Does not sanitize by default. Add sanitization if content is not trusted.
 * @param markdownContent - The Markdown string.
 * @returns The parsed HTML string, or an empty string if input is null/undefined.
 */
export function parseMarkdown(markdownContent: string | null | undefined): string {
    if (!markdownContent) {
        return '';
    }
    // Basic parsing:
    const rawHtml = marked.parse(markdownContent) as string;

    // TODO: Add Sanitization if needed!
    // Example using DOMPurify (requires installation: pnpm add dompurify @types/dompurify)
    // Make sure DOMPurify runs only in the browser context
    // if (typeof window !== 'undefined') {
    //     return DOMPurify.sanitize(rawHtml);
    // }
    // Return raw HTML for SSR or if no sanitization needed (use with caution)
    return rawHtml;
}
