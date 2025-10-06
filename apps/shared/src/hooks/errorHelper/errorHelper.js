export function userFriendlyMessage(error) {
    if (!error)
        return "Sorry — we couldn't retrieve the media. Please try again in a few moments.";

    const msg = (error + "").toLowerCase();

    if (msg.includes("no media found") || msg.includes("no stories could be transformed")) {
        return "We couldn't find any media at that link. The content may be private or removed.";
    }
    if (msg.includes("invalid instagram url") || msg.includes("invalid url")) {
        return "Please enter a valid Instagram or Facebook link and try again.";
    }
    if (msg.includes("403") || msg.includes("forbidden") || msg.includes("apify")) {
        return "We're temporarily unable to access this content. Please try again in a few minutes.";
    }
    if (msg.includes("rate limit") || msg.includes("rapidapi")) {
        return "We're temporarily unable to process this request. Please wait a minute and try again.";
    }
    if (msg.includes("internal server") || msg.includes("500")) {
        return "Sorry — our server encountered an error. Please try again shortly.";
    }
    if (msg.includes("failed to fetch") || msg.includes("network")) {
        return "Network error. Check your internet connection and try again.";
    }

    return "Sorry — we couldn't retrieve the media. Please try again in a few moments.";
}
