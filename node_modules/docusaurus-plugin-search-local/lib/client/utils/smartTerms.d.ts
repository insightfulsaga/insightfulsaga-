import { SmartTerm } from "../../types";
/**
 * Convert a list of tokens into smart terms.
 *
 * @privateRemarks
 *
 * This function seems like it is needed to support different languages and can likely be refactored
 * to flatten the data structures involved.
 *
 * @param tokens - Tokens consists of English.
 *
 * @returns A smart term list.
 */
export declare function smartTerms(tokens: string[]): SmartTerm[];
