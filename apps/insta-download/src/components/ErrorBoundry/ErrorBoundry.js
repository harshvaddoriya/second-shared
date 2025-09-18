import React from "react";
import { ErrorModal } from "@/shared";
import PageNotFound from "../PageNotFound/PageNotFound";
import ServerError from "../ServerError/ServerError";
import { trackErrorGA4 } from "@/utils/errorTrack";


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null, lastGoodUI: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
        trackErrorGA4({ error, errorInfo });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.state.hasError && !this.state.error && this.props.children !== prevProps.children) {
            this.setState({ lastGoodUI: this.props.children });
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleClose = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    getErrorMessage = (error) => {
        if (!error) return "Something went wrong!";

        if (error?.message === 404) "Page not found.";
        if (error?.status === 500) return "Internal server error.";
        if (error?.status === 401) return error.message || "Unauthorized access.";
        if (error?.status === 403) return error.message || "Forbidden.";
        if (error?.status === 422) return error.message || "Invalid input.";


        return "Something went wrong!";
    };


    render() {
        const { hasError, error } = this.state;


        if (hasError) {
            if (error?.message === 404) return <PageNotFound />;
            if (error?.status === 500) return <ServerError />;

            const message = this.getErrorMessage(error);

            return (
                <ErrorModal
                    errorMessage={message}
                    onRetry={this.handleRetry}
                    onClose={this.handleClose}
                />
            );
        }

        return this.state.lastGoodUI || this.props.children;

    }
}

export default React.memo(ErrorBoundary);
