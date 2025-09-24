import { Innertube } from "youtubei.js";
import axios from "axios";


async function scrapeChannelIdFromPost(url) {
    const res = await axios.get(url);
    const html = res.data;

    let match = html.match(/"channelId":"(UC[\w-]+)"/);
    if (match) return match[1];

    const initialDataMatch = html.match(/var ytInitialData = (.*?);<\/script>/s);
    if (initialDataMatch) {
        try {
            const ytInitialData = JSON.parse(initialDataMatch[1]);
            const channelId = JSON.stringify(ytInitialData).match(/UC[\w-]{22,}/)?.[0];
            if (channelId) return channelId;
        } catch { }
    }

    throw new Error("Could not extract channelId from post page");
}

export async function getYoutubePostData(url) {
    try {
        const postId = url.split("/").pop();
        const channelId = await scrapeChannelIdFromPost(url);

        const yt = await Innertube.create();
        const post = await yt.getPost(postId, channelId);

        return {
            postId,
            channelId,
            title: post?.content?.text?.toString()?.slice(0, 50) || "YouTube Post",
            content: post?.content?.text?.toString() ?? null,
            published: post?.published ?? null,
            likes: post?.like_count ?? 0,
            author: post?.author?.name ?? null,
            thumbnail: post?.images?.[0] || null,
            media: post?.images?.map((img) => ({ url: img })) || [],
        };
    } catch (err) {
        console.error("getYoutubePostData error:", err.message);
        return { error: "Failed to fetch post data" };
    }
}
