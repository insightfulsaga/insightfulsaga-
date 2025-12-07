import * as React from "react";
import "./SearchButton.css";
type Translations = Partial<{
    buttonText: string;
    buttonAriaLabel: string;
}>;
export type DocSearchButtonProps = React.ComponentProps<"button"> & {
    translations?: Translations;
};
export declare const SearchButton: React.ForwardRefExoticComponent<Omit<DocSearchButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export {};
