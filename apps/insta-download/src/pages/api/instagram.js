import { getInstagramMedia } from "../../lib/instagram-helper.js";
import { fetchStoryFromRapidAPI } from "../../lib/instagram-story-helper.js";
import { callRapidAPI } from "../../lib/rapidapi.js";
import { callApify } from "../../lib/apify.js";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { url } = req.body;
        if (!url || !/^https?:\/\/(www\.)?instagram\.com\//.test(url)) {
            return res.status(400).json({ error: "Invalid Instagram URL" });
        }

        // --- STORIES ---
        if (url.includes("/stories/")) {
            let result = await fetchStoryFromRapidAPI(url);

            if (!hasMedia(result)) {
                result = await callApify(url);
            }

            if (!hasMedia(result)) {
                return res.status(404).json({
                    error: "No media found.",
                    debug: {
                        url,
                        apis_tried: ["RapidAPI", "Apify"],
                        last_result: result
                    }
                });
            }

            let transformedStories = [];
            const rawMedias = result.medias || result.data || result.story || [];
            const mediaUrls = result.mediaUrls || [];

            if (Array.isArray(rawMedias) && rawMedias.length > 0) {
                transformedStories = rawMedias.map((media, index) => {
                    const mediaUrl =
                        media.url ||
                        media.download_url ||
                        media.video_url ||
                        media.image_url ||
                        media.media_url;

                    if (!mediaUrl) {
                        return null;
                    }

                    const isVideo =
                        mediaUrl.includes('.mp4') ||
                        mediaUrl.includes('.mov') ||
                        mediaUrl.includes('/video/') ||
                        media.type === 'video' ||
                        /\.(mp4|mov|avi|webm)$/i.test(mediaUrl);

                    const transformedStory = {
                        ...(isVideo
                            ? { video_versions: [{ url: mediaUrl }] }
                            : { image_versions2: { candidates: [{ url: mediaUrl }] } }
                        ),
                        user: {
                            username: result.username || extractUsernameFromUrl(url) || "instagram_user",
                            profile_pic_url: result.profile_pic_url || media.profile_pic_url || null
                        },
                        id: media.id || `story_${index}`,
                        taken_at: media.taken_at || Date.now() / 1000,
                        media_type: isVideo ? 2 : 1 // Instagram media type (1=image, 2=video)
                    };

                    return transformedStory;
                }).filter(Boolean);
            } else if (Array.isArray(mediaUrls) && mediaUrls.length > 0) {
                transformedStories = mediaUrls.map((mediaUrl, index) => {
                    const isVideo = /\.(mp4|mov|avi|webm)$/i.test(mediaUrl);

                    return {
                        ...(isVideo
                            ? { video_versions: [{ url: mediaUrl }] }
                            : { image_versions2: { candidates: [{ url: mediaUrl }] } }
                        ),
                        user: {
                            username: result.username || extractUsernameFromUrl(url) || "instagram_user",
                            profile_pic_url: result.profile_pic_url || null
                        },
                        id: `story_${index}`,
                        taken_at: Date.now() / 1000,
                        media_type: isVideo ? 2 : 1
                    };
                });
            }

            if (!transformedStories.length) {
                return res.status(404).json({
                    error: "No stories could be transformed",
                    debug: {
                        url,
                        result,
                        rawMedias,
                        mediaUrls
                    }
                });
            }

            const finalMediaUrls = transformedStories.map(story =>
                story.video_versions?.[0]?.url || story.image_versions2?.candidates?.[0]?.url
            ).filter(Boolean);

            const finalResponse = {
                type: "story",
                medias: transformedStories,
                mediaUrls: finalMediaUrls,
                username: result.username || extractUsernameFromUrl(url) || "instagram_user",
                fullName: result.fullName || null,
                isVerified: result.isVerified || false,
                debug: {
                    original_result: result,
                    transformed_count: transformedStories.length,
                    final_urls: finalMediaUrls
                }
            };

            return res.json(finalResponse);
        }

        // --- POSTS / REELS / IGTV --- 
        let results;
        try {
            results = await getInstagramMedia(url);
        } catch {
            results = null;
        }

        if (!hasMedia(results)) results = await callRapidAPI(url);
        if (!hasMedia(results)) results = await callApify(url);

        return respondOr404(results, res);
    } catch (err) {
        return res
            .status(500)
            .json({
                error: "Internal server error",
                details: err.message,
                stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
            });
    }
}

/* ---------- helpers ---------- */
function respondOr404(result, res) {
    if (!hasMedia(result)) {
        return res.status(404).json({ error: "No media found." });
    }

    const mediaUrls = result.mediaUrls || result.url_list || [];

    if (Array.isArray(result.medias)) {
        mediaUrls.push(
            ...result.medias.map(m => m.url).filter(Boolean)
        );
    }

    const first = result.mediaUrl || mediaUrls[0];
    const mediaDet = result.media_details?.[0] || {};
    const postInfo = result.post_info || {};

    let type = result.type || mediaDet.type || "viewer";
    if (type.includes("video") && result.requestUrl?.includes("/reel"))
        type = "reel";
    else if (type.includes("video") && result.requestUrl?.includes("/tv"))
        type = "igtv";
    else if (mediaDet.is_carousel) type = "carousel";
    else if (type.includes("image")) type = "photo";

    return res.json({
        type,
        mediaUrl: first,
        mediaUrls: mediaUrls.length ? mediaUrls : first ? [first] : [],
        thumbnail: result.thumbnail || mediaDet.thumbnail || first,
        quality: result.quality || [],
        username: result.username || postInfo.owner_username || "instagram_user",
        fullName: result.fullName || postInfo.owner_fullname || null,
        isVerified: result.isVerified ?? postInfo.is_verified ?? false,
        caption: result.caption || postInfo.caption || null,
        likes: result.likes ?? postInfo.likes ?? 0,
        comments: result.comments ?? postInfo.comment_count ?? null,
        views: result.views ?? mediaDet.video_view_count ?? 0,
        postedAt: result.postedAt || postInfo.timestamp || null,
    });
}

function hasMedia(obj) {
    if (!obj || obj.error) return false;

    const hasUrl = Boolean(obj.mediaUrl);
    const hasUrls = Boolean(Array.isArray(obj.mediaUrls) && obj.mediaUrls.length);
    const hasUrlList = Boolean(Array.isArray(obj.url_list) && obj.url_list.length);
    const hasMedias = Boolean(Array.isArray(obj.medias) && obj.medias.length);

    return hasUrl || hasUrls || hasUrlList || hasMedias;
}

function extractUsernameFromUrl(url) {
    const match = url.match(/instagram\.com\/stories\/([^/]+)/);
    return match?.[1] ?? null;
}
