import { spawn } from 'child_process';
import { PassThrough } from 'stream';

export default async function handler(req, res) {
  const { videoUrl } = req.query;

  if (!videoUrl) return res.status(400).json({ error: "Missing videoUrl" });

  res.setHeader('Content-Disposition', `attachment; filename="audio.mp3"`);
  res.setHeader('Content-Type', 'audio/mpeg');

  const stream = new PassThrough();

  const ytdlpProcess = spawn('yt-dlp', [
    '-f', 'bestaudio',
    '-x',
    '--audio-format', 'mp3',
    '--no-playlist',
    '-o', '-',
    videoUrl
  ]);

  ytdlpProcess.stdout.pipe(stream).pipe(res);
  ytdlpProcess.stderr.on('data', (data) => console.error(data.toString()));
}



// import youtubedl from "youtube-dl-exec";
// import path from "path";
// import fs from "fs";
// import ffmpegPath from "ffmpeg-static";

// export default async function handler(req, res) {
//   const { videoId } = req.query;

//   if (!videoId) return res.status(400).json({ error: "Missing videoId" });

//   try {
//     const tempMp3Path = path.join(process.cwd(), `audio-${videoId}.mp3`);
//     const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

//     await youtubedl(videoUrl, {
//       extractAudio: true,
//       audioFormat: "mp3",
//       audioQuality: 5,
//       output: tempMp3Path,
//       ffmpegLocation: ffmpegPath,
//     });

//     res.setHeader("Content-Type", "audio/mpeg");
//     res.setHeader(
//       "Content-Disposition",
//       `attachment; filename="audio-${videoId}.mp3"`
//     );

//     const stream = fs.createReadStream(tempMp3Path);
//     stream.pipe(res);

//     stream.on("close", () => fs.unlinkSync(tempMp3Path));
//   } catch (err) {
//     console.error("MP3 download failed:", err);
//     res.status(500).json({ error: "MP3 conversion failed" });
//   }
// }



// export default async function handler(req, res) {
//   const { videoUrl } = req.query;
//   console.log("inside downloadMp3 api-------------");

//   if (!videoUrl) {
//     return res.status(400).json({ error: 'Missing videoUrl parameter' });
//   }

//   try {
//     console.log("inside try block--------");

//     const ytdlp = require('ytdlp-nodejs');

//     const fixedUrl = videoUrl.replace('/embed/', '/watch?v=');
//     console.log("Url fixes:", fixedUrl);

//     const mp3Buffer = await ytdlp.run(fixedUrl, {
//       format: 'bestaudio[ext=mp3]',
//       output: '-', 
//     });

//     console.log("mp3Buffer---------------:", mp3Buffer);

//     // Send MP3
//     res.setHeader('Content-Type', 'audio/mpeg');
//     res.setHeader(
//       'Content-Disposition',
//       `attachment; filename="audio-${Date.now()}.mp3"`
//     );
//     res.send(Buffer.from(mp3Buffer));
//   } catch (err) {
//     console.log("inside catch part--------");
//     console.error('MP3 download failed:', err);
//     res.status(500).json({ error: 'Failed to fetch MP3' });
//   }
// }
