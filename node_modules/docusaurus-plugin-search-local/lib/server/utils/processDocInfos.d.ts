import { Props as PostBuildProps } from "@docusaurus/types";
import { DocInfoWithFilePath, PluginConfig } from "../../types";
export declare function processDocInfos({ routesPaths, outDir, baseUrl, siteConfig }: PostBuildProps, { indexDocs, indexBlog, indexPages, docsRouteBasePath, blogRouteBasePath, ignoreFiles, }: PluginConfig): DocInfoWithFilePath[];
