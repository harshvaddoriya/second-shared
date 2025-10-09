import ffmpegPath from "ffmpeg-static";
import { spawn } from "child_process";

console.log("FFmpeg binary:", ffmpegPath);

const ff = spawn(ffmpegPath, ["-version"]);

ff.stdout.on("data", (data) => console.log("stdout:", data.toString()));
ff.stderr.on("data", (data) => console.log("stderr:", data.toString()));
ff.on("close", (code) => console.log("Exited with code", code));
