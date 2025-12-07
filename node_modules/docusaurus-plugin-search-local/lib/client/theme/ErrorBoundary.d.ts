import { Component, ErrorInfo } from "react";
type ErrorBoundaryProps = {
    children?: JSX.Element | JSX.Element[];
};
export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
    state: {
        hasError: boolean;
    };
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): JSX.Element | JSX.Element[] | undefined;
}
export {};
