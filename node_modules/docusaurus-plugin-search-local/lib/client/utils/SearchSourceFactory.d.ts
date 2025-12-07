import { WrappedIndex, SearchResult, SearchSourceFn } from "../../types";
export type SearchSourceFactoryProps = {
    wrappedIndexes: WrappedIndex[];
    removeDefaultStopWordFilter: boolean;
    resultsLimit: number;
    onResults: (query: string, results: SearchResult[]) => void;
};
export declare function SearchSourceFactory(props: SearchSourceFactoryProps): SearchSourceFn;
