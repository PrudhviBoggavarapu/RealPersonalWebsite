import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { marked } from 'marked';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Formats a date object into a standard string format for display (e.g., "October 5, 2024").
 * @param date - The Date object, or a string/number that can be parsed into a Date.
 * @returns The formatted date string, or "Invalid Date" if input is invalid.
 */
export function formatDisplayDate(date: Date | string | number): string {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
        console.warn("formatDisplayDate received invalid date input:", date);
        return "Invalid Date";
    }

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
    const rawHtml = marked.parse(markdownContent) as string;

    return rawHtml;
}
