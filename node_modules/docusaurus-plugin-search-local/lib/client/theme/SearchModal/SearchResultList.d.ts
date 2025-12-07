import * as React from "react";
import { SearchResult as ISearchResult } from "../../../types";
export interface SearchResultListProps {
    currentSelection?: ISearchResult;
    cursor: number;
    cursorOffset?: number;
    results: ISearchResult[];
    searchSource?: string;
    onSearchResultClick: () => void;
    setHovered: (searchResult: ISearchResult | undefined) => void;
    setSelected: (searchResult: ISearchResult | undefined) => void;
}
declare const SearchResultList: React.FC<SearchResultListProps>;
export default SearchResultList;
