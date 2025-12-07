import type { SearchDocument, WrappedIndex } from "../../types";
export declare function buildIndex(allDocuments: SearchDocument[][]): Omit<WrappedIndex, "type">[];
