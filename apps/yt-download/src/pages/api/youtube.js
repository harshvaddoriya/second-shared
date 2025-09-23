export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "Missing YouTube URL" });
        }

        // Extract video ID from YouTube URL (supports watch?v=, youtu.be, embed, etc.)
        const match = url.match(
            /(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/
        );
        const videoId = match ? match[1] : null;

        if (!videoId) {
            return res.status(400).json({ error: "Invalid YouTube URL" });
        }

        // ✅ Hardcoded API key here
        const API_KEY = "AIzaSyCOBWhRxwAP7N9APxHsss2ogdwWkzaZ2zk";
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;

        const response = await fetch(apiUrl);
        const text = await response.text();

        if (!response.ok) {
            console.error("YouTube API error:", text);
            return res.status(response.status).json({ error: text });
        }

        const data = JSON.parse(text);
        const video = data.items?.[0];

        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }

        // Standardize response so UI can consume it
        return res.status(200).json({
            id: video.id,
            title: video.snippet.title,
            description: video.snippet.description,
            thumbnail: video.snippet.thumbnails?.high?.url,
            media: [
                {
                    type: "video",
                    url: `https://www.youtube.com/watch?v=${video.id}`,
                },
            ],
            statistics: video.statistics,
            initials: video.snippet.title.charAt(0),
        });
    } catch (error) {
        console.error("YouTube API error:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}
