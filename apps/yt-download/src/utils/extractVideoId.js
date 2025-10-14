export function extractVideoId(url) {
    try {
        if (!url) return null;

        if (url.includes("shorts/")) {
            const match = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }

        if (url.includes("watch?v=")) {
            const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }

        if (url.includes("youtu.be/")) {
            const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }

        if (url.includes("embed/")) {
            const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }

        const match = url.match(/([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    } catch (err) {
        console.error("extractVideoId error:", err);
        return null;
    }
}
