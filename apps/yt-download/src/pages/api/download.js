import axios from "axios";

export default async function handler(req, res) {
    const { videoId, qualityId } = req.query;
    if (!videoId || !qualityId) return res.status(400).json({ error: "Missing videoId or qualityId" });

    try {
        const options = {
            method: "GET",
            url: `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/download_video/${videoId}`,
            params: { quality: qualityId },
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY_DOWNLOAD,
                "x-rapidapi-host": "youtube-video-fast-downloader-24-7.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);
        res.status(200).json({ file: response.data.file });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch video" });
    }
}









// import axios from "axios";
// import ffmpegPath from "ffmpeg-static";
// import { spawn } from "child_process";
// import fs from "fs";
// import { promises as fsp } from "fs";
// import { tmpdir } from "os";
// import { join } from "path";
// import stream from "stream";
// import { promisify } from "util";

// const pipeline = promisify(stream.pipeline);

// export default async function handler(req, res) {
//     const { videoUrl, audioUrl } = req.query;

//     if (!videoUrl) {
//         return res.status(400).json({ error: "Missing videoUrl" });
//     }

//     const tmp = tmpdir();
//     const uid = Date.now();
//     const videoPath = join(tmp, `video-${uid}.mp4`);
//     const audioPath = audioUrl ? join(tmp, `audio-${uid}`) : null;

//     const cleanup = async () => {
//         try { await fsp.unlink(videoPath); } catch (e) { }
//         if (audioPath) {
//             try { await fsp.unlink(audioPath); } catch (e) { }
//         }
//     };

//     try {
//         const vResp = await axios.get(videoUrl, { responseType: "stream", timeout: 30_000 });
//         await pipeline(vResp.data, fs.createWriteStream(videoPath));

//         if (!audioUrl) {
//             res.setHeader("Content-Disposition", `attachment; filename="video.mp4"`);
//             res.setHeader("Content-Type", "video/mp4");
//             const r = fs.createReadStream(videoPath);
//             r.pipe(res);
//             r.on("close", cleanup);
//             return;
//         }

//         const aResp = await axios.get(audioUrl, { responseType: "stream", timeout: 30_000 });
//         await pipeline(aResp.data, fs.createWriteStream(audioPath));

//         const args = [
//             "-y",
//             "-i", videoPath,
//             "-i", audioPath,
//             "-c:v", "copy",
//             "-c:a", "aac",
//             "-b:a", "128k",
//             "-movflags", "frag_keyframe+empty_moov",
//             "-f", "mp4",
//             "pipe:1"
//         ];

//         const ff = spawn(ffmpegPath, args, { stdio: ["ignore", "pipe", "pipe"] });

//         res.setHeader("Content-Disposition", `attachment; filename="merged.mp4"`);
//         res.setHeader("Content-Type", "video/mp4");

//         ff.stdout.pipe(res);

//         ff.stderr.on("data", (d) => {
//             console.error("[ffmpeg]", d.toString());
//         });

//         ff.on("close", async (code) => {
//             await cleanup();
//             if (code !== 0) console.error("ffmpeg exited with code", code);
//         });

//         req.on("close", () => {
//             try { ff.kill("SIGKILL"); } catch (e) { }
//         });

//     } catch (err) {
//         console.error("Download/merge error:", err);
//         await cleanup();
//         if (!res.headersSent) {
//             res.status(500).json({ error: "Failed to download/merge video" });
//         } else {
//             try { res.end(); } catch (e) { }
//         }
//     }
// }
