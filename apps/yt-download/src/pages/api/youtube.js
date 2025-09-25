import { fetchYoutubeMedia, fetchYoutubePost } from "@/lib/youtubeRapidApis";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const getMediaTypeFromUrl = (url) => {
        if (/\/shorts\//i.test(url)) return "shorts";
        if (/\/watch\//i.test(url) || /v=/.test(url)) return "video";
        if (/\/posts?\//i.test(url)) return "post";
        return "video";
    };

    const detectedType = getMediaTypeFromUrl(url);

    try {
        let data;

        if (detectedType === "video" || detectedType === "shorts") {
            const match = url.match(
                /(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/
            );
            const videoId = match ? match[1] : null;

            if (!videoId) throw new Error("Invalid YouTube video URL");

            data = await fetchYoutubeMedia(videoId);
            console.log("API response data ------------", data);
        } else if (detectedType === "post") {
            const match = url.match(/posts?\/([a-zA-Z0-9_-]+)/);
            const postId = match ? match[1] : null;
            data = await fetchYoutubePost(postId);
        }
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || "Server error" });
    }
}
