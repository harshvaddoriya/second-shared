export function getMediaTypeFromUrl(url) {
    if (/\/shorts\//i.test(url)) return "shorts";
    if (/\/watch\//i.test(url) || /v=/.test(url)) return "video";
    if (/\/posts?\//i.test(url)) return "post";
    return "video";
}

export async function downloadYoutubeMedia(url) {
    if (!url || !url.trim()) throw new Error("Please enter a URL");

    const detectedType = getMediaTypeFromUrl(url);

    const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Server error");

    const normalized = { ...data };

    normalized.detectedType = detectedType;
    normalized.type = detectedType;

    if (Array.isArray(normalized.media)) {
        normalized.media = normalized.media.map((m) => {
            if (!m || !m.url) return m;

            if (m.url.includes("youtube.com/embed/")) return m;

            const match = (m.url + " " + (normalized.id || "")).match(
                /(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/
            );
            const vid = match ? match[1] : normalized.id;
            const embed = vid ? `https://www.youtube.com/embed/${vid}` : m.url;
            return { ...m, url: embed };
        });
    }

    return normalized;
}


