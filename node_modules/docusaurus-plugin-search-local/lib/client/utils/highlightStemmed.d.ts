import { HighlightChunk, MetadataPosition, ChunkIndexRef } from "../../types";
export declare function highlightStemmed(content: string, positions: MetadataPosition[], tokens: string[], maxLength?: number): string;
export declare function splitIntoChunks(content: string, positions: MetadataPosition[], tokens: string[], positionIndex: number, cursor: number, chunkIndexRef?: ChunkIndexRef): HighlightChunk[];
