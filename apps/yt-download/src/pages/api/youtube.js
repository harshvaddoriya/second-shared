export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "Missing URL" });

        const videoId = getYoutubeVideoId(url);
        if (!videoId) return res.status(400).json({ error: "Invalid YouTube URL" });

        const API_KEY = "AIzaSyCOBWhRxwAP7N9APxHsss2ogdwWkzaZ2zk";
        if (!API_KEY) return res.status(500).json({ error: "YouTube API key missing" });

        // Fetch video metadata from YouTube API
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,player&id=${videoId}&key=${API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!response.ok || data.error || !data.items?.length) {
            return res.status(500).json({
                error: data.error?.message || "Failed to fetch YouTube video data",
            });
        }

        const videoData = data.items[0];

        // Normalize media data
        const media = [
            {
                url: `https://www.youtube.com/embed/${videoId}`,
            },
        ];

        return res.status(200).json({
            id: videoId,
            title: videoData.snippet.title,
            description: videoData.snippet.description,
            thumbnail:
                videoData.snippet.thumbnails.maxres?.url ||
                videoData.snippet.thumbnails.high?.url ||
                videoData.snippet.thumbnails.default?.url,
            statistics: videoData.statistics,
            duration: videoData.contentDetails?.duration,
            detectedType: isShortsUrl(url) ? "shorts" : "video",
            media,
        });
    } catch (err) {
        console.error("API error:", err);
        res.status(500).json({ error: "Server error" });
    }
}

function getYoutubeVideoId(url) {
    try {
        const u = new URL(url);
        // video ----------
        if (u.searchParams.has("v")) return u.searchParams.get("v");
        // shorts ----------
        if (/\/shorts\/([a-zA-Z0-9_-]+)/.test(u.pathname)) {
            return u.pathname.split("/shorts/")[1];
        }
        return null;
    } catch {
        return null;
    }
}

// Helper to detect if URL is Shorts
function isShortsUrl(url) {
    try {
        const u = new URL(url);
        return /\/shorts\//i.test(u.pathname);
    } catch {
        return false;
    }
}
