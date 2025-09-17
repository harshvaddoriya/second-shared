import getFBInfo from "@xaviabot/fb-downloader";

export async function getFacebookMedia(url, cookies, userAgent) {
    const fbData = await getFBInfo(url, cookies, userAgent);
    const mediaArray = Array.isArray(fbData) ? fbData : [fbData];
    if (!mediaArray.length) return null;

    const first = mediaArray[0];
    const videoUrl = first.hd || first.sd || first.url || null;

    return {
        type: /\/reel\//i.test(url) ? "reel" : (videoUrl ? "video" : "photo"),
        title: first.title || null,
        caption: first.description || first.caption || null,
        thumbnail: first.thumbnail || null,
        media: videoUrl
            ? [{ quality: first.hd ? "HD" : "SD/auto", url: videoUrl }]
            : [{ quality: "original", url: first.url }],
    };
}
