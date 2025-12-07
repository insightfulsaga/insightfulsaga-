import { SmartQuery } from "../../types";
export type SmartQueryOptions = {
    removeDefaultStopWordFilter: boolean;
};
/**
 * Get all possible queries for a list of tokens consists of words mixed English and Chinese,
 * by a Chinese words dictionary.
 *
 * @returns A smart query list.
 */
export declare function smartQueries(tokens: string[], queryOptions?: SmartQueryOptions): SmartQuery[];
