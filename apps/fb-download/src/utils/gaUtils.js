export function sendGAEvent(name, params) {
    console.log('GA Event Fired:', name, params);
    if (window.gtag) {
        console.log('GA4 loaded, sending event');
        window.gtag('event', name, params);
    } else {
        console.warn("GA is not initialized.");
    }
}
