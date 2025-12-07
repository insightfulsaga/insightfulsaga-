import * as cheerio from "cheerio";
import { ParsedDocument } from "../../types";
export declare function parsePage($: cheerio.CheerioAPI, url: string): ParsedDocument;
