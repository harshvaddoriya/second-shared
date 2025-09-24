// import { getYoutubeVideoData } from "@/lib/youtubeData";
// import { getYoutubePostData } from "@/lib/youtubeiPost";

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//         return res.status(405).json({ error: "Method not allowed" });
//     }

//     try {
//         const { url } = req.body;
//         if (!url) return res.status(400).json({ error: "Missing URL" });

//         const u = new URL(url);

//         // ---- Detect type ----
//         if (u.pathname.startsWith("/post/")) {
//             // YouTube Post
//             const postId = u.pathname.split("/post/")[1];
//             if (!postId) return res.status(400).json({ error: "Invalid post URL" });

//             const postData = await getYoutubePostData(postId);
//             return res.status(200).json({ detectedType: "post", ...postData });
//         } else {
//             // Video or Shorts
//             let videoId = null;
//             if (u.searchParams.has("v")) videoId = u.searchParams.get("v");
//             else if (/\/shorts\/([a-zA-Z0-9_-]+)/.test(u.pathname))
//                 videoId = u.pathname.split("/shorts/")[1];
//             else return res.status(400).json({ error: "Invalid YouTube video URL" });

//             const videoData = await getYoutubeVideoData(videoId);
//             return res.status(200).json({
//                 detectedType: /\/shorts\//i.test(url) ? "shorts" : "video",
//                 ...videoData,
//             });
//         }
//     } catch (err) {
//         console.error("API error:", err);
//         res.status(500).json({ error: err.message || "Server error" });
//     }
// }
import { getYoutubeVideoData } from "@/lib/youtubeData";
import { getYoutubePostData } from "@/lib/youtubeiPost";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "Missing URL" });

        const u = new URL(url);

        // ---- Detect type ----
        if (u.pathname.startsWith("/post/")) {
            const postData = await getYoutubePostData(url);
            return res.status(200).json({ detectedType: "post", ...postData });
        } else {
            // Video or Shorts
            let videoId = null;
            if (u.searchParams.has("v")) videoId = u.searchParams.get("v");
            else if (/\/shorts\/([a-zA-Z0-9_-]+)/.test(u.pathname))
                videoId = u.pathname.split("/shorts/")[1];
            else return res.status(400).json({ error: "Invalid YouTube video URL" });

            const videoData = await getYoutubeVideoData(videoId);
            return res.status(200).json({
                detectedType: /\/shorts\//i.test(url) ? "shorts" : "video",
                ...videoData,
            });
        }
    } catch (err) {
        console.error("API error:", err);
        res.status(500).json({ error: err.message || "Server error" });
    }
}
