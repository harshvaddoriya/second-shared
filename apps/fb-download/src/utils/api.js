export function getMediaTypeFromUrl(url) {
    if (/\/stories\//i.test(url)) return "story";
    if (/\/reel\//i.test(url)) return "reel";
    if (/\/(videos|watch)\//i.test(url)) return "video";
    if (/\/(photos|photo)\//i.test(url)) return "photo";
    if (/\/posts?\//i.test(url)) return "post";

    return "video";
}

export async function downloadFacebookMedia(url) {
    if (!url || !url.trim()) {
        throw new Error("Please enter a URL");
    }

    try {
        const res = await fetch("/api/facebook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Server error");
        }

        data.detectedType = getMediaTypeFromUrl(url);

        return data;
    } catch (err) {
        console.error("downloadFacebookMedia failed---", err);
        throw err;
    }




}

