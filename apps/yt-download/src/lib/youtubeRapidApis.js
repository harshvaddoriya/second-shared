import axios from "axios";
import parseCountText from "@/utils/commentCount";

export async function fetchYoutubeMedia(videoId, detectedType) {
    const options = {
        method: "GET",
        url: "https://youtube-media-downloader.p.rapidapi.com/v2/video/details",
        params: {
            videoId,
            urlAccess: "normal",
            videos: "auto",
            audios: "auto",
        },
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "youtube-media-downloader.p.rapidapi.com",
        },
    };

    const response = await axios.request(options);
    const data = response.data;
    const videoItem = data.videos?.items?.[0];

    return {
        id: videoId,
        title: data.title || "",
        description: data.description || "",
        thumbnail: data.thumbnail || "",
        media: videoItem ? [{ url: videoItem.url }] : [],
        statistics: {
            viewCount: data.viewCount || 0,
            likeCount: data.likeCount || 0,
            commentCount: parseCountText(data.commentCountText) || 0,
        },
        detectedType,
        type: detectedType,
    };
}

export async function fetchYoutubePost(postId) {
    return {
        id: postId || "unknown",
        title: "Post Placeholder",
        description: "",
        thumbnail: "",
        media: [],
        statistics: {},
        detectedType: "post",
        type: "post",
    };
}
