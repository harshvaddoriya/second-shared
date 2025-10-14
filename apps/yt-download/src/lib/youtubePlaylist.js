// not using
import { exec } from "child_process";
import path from "path";

export async function getYoutubeMediaInfo(url, type = "playlist") {
    return new Promise((resolve, reject) => {
        let cmd = `"${path.join(process.cwd(), "bin", "yt-dlp.exe")}" -J "${url}"`;

        exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) return reject({ success: false, error: error.message });

            try {
                const json = JSON.parse(stdout);

                if (!json.entries || !Array.isArray(json.entries)) {
                    return reject({ success: false, error: "No playlist entries found" });
                }

                const items = json.entries.map(v => {
                    const video = (v.formats || [])
                        .filter(f => f.vcodec !== "none" && f.acodec === "none") // video only
                        .sort((a, b) => b.height - a.height)[0];

                    const audio = (v.formats || [])
                        .filter(f => f.acodec !== "none" && f.vcodec === "none") // audio only
                        .sort((a, b) => b.abr - a.abr)[0];

                    return {
                        id: v.id,
                        title: v.title,
                        videoUrl: video?.url,
                        audioUrl: audio?.url,
                        thumbnail: v.thumbnail,
                        duration: v.duration,
                        channel: { name: v.uploader },
                        statistics: {
                            views: v.view_count || 0,
                            likes: v.like_count || 0,
                            comments: v.comment_count || 0,
                        },
                    };
                });



                resolve({
                    detectedType: "playlist",
                    playlistUrl: url,
                    title: json.title,
                    items,
                });
            } catch (err) {
                console.error("Failed to parse yt-dlp output:", err);
                reject({ success: false, error: "Failed to parse yt-dlp output" });
            }

        });
    });
}