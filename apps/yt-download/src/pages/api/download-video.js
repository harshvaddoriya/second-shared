// pages/api/download-video.js
import ytdl from "ytdl-core";

export default async function handler(req, res) {
    const { videoId } = req.query;

    if (!videoId) return res.status(400).send("Missing videoId");
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        const info = await ytdl.getInfo(youtubeUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: "highest" });
        if (!format.url) throw new Error("Unable to get video URL");

        res.setHeader("Content-Disposition", `attachment; filename="${info.videoDetails.title}.mp4"`);
        res.setHeader("Content-Type", "video/mp4");

        ytdl(youtubeUrl, { format }).pipe(res);
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to download video");
    }
}
