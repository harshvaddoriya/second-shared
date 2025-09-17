export const handleShare = (url) => {
    if (typeof navigator === "undefined" || !navigator.share) {
        alert("Sharing not supported in this browser.");
        return;
    }
    navigator.share({ title: "Post", url }).catch(console.error);
};

export const handleShareAll = (mediaUrls) => {
    if (typeof navigator === "undefined" || !navigator.share) {
        alert("Sharing not supported in this browser.");
        return;
    }
    const firstUrl = mediaUrls?.[0];
    if (firstUrl) {
        navigator.share({ title: "Post", url: firstUrl }).catch(console.error);
    }
};

