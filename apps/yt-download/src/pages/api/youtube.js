import { fetchYoutubeMedia, fetchYoutubePost } from "@/lib/youtubeRapidApis";
import { fetchPlaylistData } from "@/lib/youtubePlaylistData";
import { getYoutubeVideoData } from "@/lib/youtubeData";

const getMediaTypeFromUrl = (url) => {
    if (/\/shorts\//i.test(url)) return "shorts";
    if (/\/playlist\//i.test(url) || /list=/.test(url)) return "playlist";
    if (/\/watch\//i.test(url) || /v=/.test(url)) return "video";
    if (/\/posts?\//i.test(url)) return "post";
    return "video";
};

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const detectedType = getMediaTypeFromUrl(url);

    try {
        let data;

        if (detectedType === "video") {
            const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
            const videoId = match ? match[1] : null;
            if (!videoId) throw new Error("Invalid YouTube video URL");

            //const data = await fetchYoutubeMedia(videoId, detectedType);
            const data = await getYoutubeVideoData(videoId, detectedType);
            console.log("API response data ------------", data);
            return res.status(200).json(data);
        } else if (detectedType === "shorts") {
            const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
            const videoId = match ? match[1] : null;
            if (!videoId) throw new Error("Invalid YouTube shorts URL");

            const data = await fetchYoutubeMedia(videoId, detectedType);
            console.log("API response data ------------", data);
            return res.status(200).json(data);
        } else if (detectedType === "playlist") {
            data = await fetchPlaylistData(url);

        } else if (detectedType === "post") {
            const match = url.match(/posts?\/([a-zA-Z0-9_-]+)/);
            const postId = match ? match[1] : null;
            if (!postId) throw new Error("Invalid YouTube post URL");

            data = await fetchYoutubePost(postId);
        }

        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ error: err.message || "Server error" });
    }
}
