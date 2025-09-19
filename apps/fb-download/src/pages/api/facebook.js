import { getFacebookMedia } from "../../lib/facebook-helper.js";
import { fetchStoryFromRapidAPI } from "../../lib/facebook-story-helper.js";
import { fetchPostFromRapidAPI } from "../../lib/facebook-post-helper.js";
import { callFacebookPuppeteer } from "../../lib/facebook-puppeteer.js";

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { url } = req.body;

        if (!url) return res.status(400).json({ error: "Missing Facebook URL" });

        if (
            !/^https?:\/\/(www\.|m\.|web\.)?facebook\.com/i.test(url) &&
            !/^https?:\/\/fb\.watch/i.test(url)
        ) {
            return res.status(400).json({ error: "Invalid Facebook URL" });
        }

        // --- STORIES ---
        if (url.includes("/stories/")) {
            let result;
            try {
                result = await fetchStoryFromRapidAPI(url);
            } catch (err) {
                return res.status(500).json({ error: "Story extraction failed", details: err.message });
            }
            return respondOr404(result, res);
        }

        // --- POSTS / REELS / VIDEOS ---
        let result;
        try {
            result = await getFacebookMedia(url);
        } catch (err) {
            result = null;
        }

        if (!hasMedia(result)) {
            try {
                result = await callFacebookPuppeteer(url);
            } catch (err) {
                result = null;
            }
        }

        if (!hasMedia(result)) {
            try {
                result = await fetchPostFromRapidAPI(url);

                if (result && hasMedia(result)) {
                    return respondOr404(result, res);
                }
            } catch (err) {
                console.log("RapidAPI Post failed:", err.message);
            }
        }

        return respondOr404(result, res);
    } catch (err) {
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
}


/* ---------- helpers ---------- */
function respondOr404(result, res) {
    if (!hasMedia(result)) {
        return res.status(404).json({ error: "No media found." });
    }

    const mediaUrls = result.mediaUrls || result.urls || result.media?.map(m => m.url) || [];
    const first = result.mediaUrl || mediaUrls[0];
    const media = result.media || [];

    let type = result.type || "video";

    const response = {
        ok: true,
        type,
        mediaUrl: first,
        mediaUrls: mediaUrls.length ? mediaUrls : first ? [first] : [],
        thumbnail: result.thumbnail || (type === "photo" ? first : null),
        title: result.title || null,
        caption: result.caption || null,
        normalizedUrl: result.normalizedUrl || null,
        media,
        ...result,
    };

    if (result.account) response.account = result.account;
    if (type === "story" && result.urls) response.urls = result.urls;

    return res.json(response);
}

function hasMedia(obj) {
    if (!obj || obj.error) return false;
    return Boolean(
        obj.mediaUrl ||
        (Array.isArray(obj.mediaUrls) && obj.mediaUrls.length) ||
        (Array.isArray(obj.urls) && obj.urls.length) ||
        (Array.isArray(obj.media) && obj.media.length)
    );
}
