import axios from "axios";
import ffmpeg from "fluent-ffmpeg";

export default async function handler(req, res) {
    const { url, format = "mp4" } = req.query;

    if (!url) return res.status(400).json({ error: "Missing video URL" });

    try {
        if (format === "mp4") {
            const response = await axios.get(url, { responseType: "arraybuffer" });
            res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
            res.setHeader("Content-Type", "video/mp4");
            res.end(Buffer.from(response.data));
        } else if (format === "mp3") {
            res.setHeader("Content-Disposition", "attachment; filename=audio.mp3");
            res.setHeader("Content-Type", "audio/mpeg");
            const videoStream = (await axios.get(url, { responseType: "stream" })).data;

            ffmpeg(videoStream)
                .format("mp3")
                .on("error", (err) => {
                    console.error("FFmpeg error:", err.message);
                    res.status(500).end("MP3 conversion failed");
                })
                .pipe(res, { end: true });
        } else {
            res.status(400).json({ error: "Invalid format. Use mp4 or mp3" });
        }
    } catch (err) {
        console.error("Download error:", err.message);
        res.status(500).json({ error: "Failed to download video/audio" });
    }
}
