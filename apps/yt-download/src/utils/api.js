export function getMediaTypeFromUrl(url) {
    if (/\/shorts\//i.test(url)) return "shorts";
    if (/\/playlist\//i.test(url) || /list=/.test(url)) return "playlist";
    if (/\/watch\//i.test(url) || /v=/.test(url)) return "video";
    if (/\/posts?\//i.test(url)) return "post";
    return "video";
}

export async function downloadYoutubeMedia(url) {
    if (!url || !url.trim()) throw new Error("Please enter a URL");

    try {
        const res = await fetch("/api/youtube", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Disposition": `attachment;filename=video.mp4`,
            },
            body: JSON.stringify({ url }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("API Error:", data.error || "Server error");
            data.error = data.error || "Server error";
        }


        if (data.detectedType === "playlist") {
            data.type = "playlist";
        }

        console.log(data, "detected data----------");
        return data;
    } catch (err) {
        console.error("downloadYoutubeMedia failed---", err);
        return { error: err.message || "Server error" };
    }
}
