export function sendGAEvent(name, params) {
    if (window.gtag) {
        window.gtag('event', name, params);
    } else {
        console.warn("GA is not initialized.");
    }
}
