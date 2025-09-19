export function trackErrorGA4({ error, errorInfo }) {
    if (!window.gtag) {
        console.warn("GA4 not initialized yet.");
        return;
    }

    window.gtag("event", "exception", {
        description: error?.message || "Unknown error",
        fatal: false,
        extra_info: JSON.stringify(errorInfo || {}),
    });
}