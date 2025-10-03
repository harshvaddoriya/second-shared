// import axios from "axios";

// export default async function handler(req, res) {
//     const { url } = req.query;

//     if (!url) return res.status(400).json({ error: "Missing video URL" });

//     try {
//         const response = await axios.get(url, { responseType: "stream" });

//         res.setHeader("Content-Disposition", "attachment; filename=video.mp4");
//         res.setHeader("Content-Type", "video/mp4");

//         response.data.pipe(res);

//     } catch (err) {
//         console.error("Download error:", err.message);
//         res.status(500).json({ error: "Failed to download video" });
//     }
// }

import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);
ffmpeg.setFfmpegPath(ffmpegPath.path);

export default async function handler(req, res) {
    const { url, format = "mp4" } = req.query;

    if (!url) return res.status(400).json({ error: "Missing video URL" });

    try {
        const videoResponse = await axios.get(url, { responseType: "stream" });

        if (format === "mp3") {
            // Convert to mp3 on request
            res.setHeader("Content-Disposition", `attachment; filename=audio.mp3`);
            res.setHeader("Content-Type", "audio/mpeg");

            ffmpeg(videoResponse.data)
                .format("mp3")
                .audioCodec("libmp3lame")
                .on("error", (err) => {
                    console.error("FFmpeg error:", err);
                    res.status(500).send("Error converting video to mp3");
                })
                .pipe(res, { end: true });

        } else {
            // Default: send MP4
            res.setHeader("Content-Disposition", `attachment; filename=video.mp4`);
            res.setHeader("Content-Type", "video/mp4");
            await pipeline(videoResponse.data, res);
        }

    } catch (err) {
        console.error("Download error:", err.message);
        res.status(500).json({ error: "Failed to download video" });
    }
}
