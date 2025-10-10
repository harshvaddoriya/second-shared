import axios from "axios";

export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Missing video URL" });
    }

    try {
        const response = await axios.get(url, { responseType: "stream" });

        res.setHeader("Content-Disposition", "attachment; filename=audio.mp3");
        res.setHeader("Content-Type", "audio/mpeg");

        response.data.pipe(res);
    } catch (err) {
        console.error("Download error:", err.message);
        res.status(500).json({ error: "Failed to download audio" });
    }
}
