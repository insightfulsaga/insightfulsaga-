import * as React from "react";
interface SearchResultsSectionProps {
    heading: string;
    headingLink?: string;
    sectionQuery?: string;
}
declare const SearchResultsSection: React.FC<React.PropsWithChildren<SearchResultsSectionProps>>;
export default SearchResultsSection;
