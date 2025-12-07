import lunr from "lunr";
import { MatchMetadata } from "../../types";
export declare function tokenizer(input: string | string[] | null | undefined, metadata: MatchMetadata): lunr.Token[];
