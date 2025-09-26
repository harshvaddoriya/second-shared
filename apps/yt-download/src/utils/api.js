export function getMediaTypeFromUrl(url) {
    if (/\/shorts\//i.test(url)) return "shorts";
    if (/\/watch\//i.test(url) || /v=/.test(url)) return "video";
    if (/\/posts?\//i.test(url)) return "post";
    return "video";
}

export async function downloadYoutubeMedia(url) {
    if (!url || !url.trim()) throw new Error("Please enter a URL");

    try {
        const res = await fetch("/api/youtube", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Content-Disposition": `attachment;filename=video.mp4` },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();
        console.log("api data--------------", data)

        if (!res.ok) throw new Error(data.error || "Server error");

        const normalized = { ...data };
        console.log(normalized, "data normal-------------")
        return normalized;
    } catch (err) {
        console.error("downloadYoutubeMedia failed---", err);
        throw err;
    }
}


