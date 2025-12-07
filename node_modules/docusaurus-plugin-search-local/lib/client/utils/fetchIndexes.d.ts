import { WrappedIndex } from "../../types";
interface FetchIndexResponse {
    wrappedIndexes: WrappedIndex[];
}
export declare function fetchIndexes(baseUrl: string, indexHash?: string | null): Promise<FetchIndexResponse>;
export {};
