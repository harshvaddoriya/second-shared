export function trackErrorGA4({ error, errorInfo }) {
    if (!window.gtag) {
        return;
    }

    window.gtag("event", "exception", {
        description: error?.message || "Unknown error",
        fatal: false,
        extra_info: JSON.stringify(errorInfo || {}),
    });
}