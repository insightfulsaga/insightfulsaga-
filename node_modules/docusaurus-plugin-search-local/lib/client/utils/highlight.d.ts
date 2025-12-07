/**
 * Highlight specified tokens in text content.
 *
 * @param content - Text content.
 * @param tokens - Tokens to be highlighted (in lower-case and sorted by descending of length).
 * @param forceMatched - Whether to force matched.
 *
 * @returns A html string with marked tokens.
 */
export declare function highlight(content: string, tokens: string[], forceMatched?: boolean): string;
