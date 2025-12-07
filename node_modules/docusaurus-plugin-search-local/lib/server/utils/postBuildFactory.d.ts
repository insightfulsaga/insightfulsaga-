import { Props as PostBuildProps } from "@docusaurus/types";
import { PluginConfig } from "../../types";
export declare function postBuildFactory(config: PluginConfig): (buildData: PostBuildProps) => Promise<void>;
