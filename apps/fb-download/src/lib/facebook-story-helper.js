export async function fetchStoryFromRapidAPI(url) {

    const response = await fetch("https://facebook-media-api.p.rapidapi.com/media/stories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //"x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-key": 'ecfb71dbc6msh2db6058090453a8p1e7ff6jsna42d93ce4e1b',
            "x-rapidapi-host": "facebook-media-api.p.rapidapi.com",

        },
        body: JSON.stringify({
            url,
            cookie: "",
            proxy: "",
        }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));

    function collectMedia(obj, collected = []) {
        if (!obj || typeof obj !== "object") return collected;

        if (obj.playable_url_quality_hd || obj.playable_url) {
            collected.push(obj.playable_url_quality_hd || obj.playable_url);
        }

        if (obj.image?.uri) {
            collected.push(obj.image.uri);
        }

        if (Array.isArray(obj)) {
            obj.forEach(item => collectMedia(item, collected));
        } else {
            for (const key of Object.keys(obj)) {
                collectMedia(obj[key], collected);
            }
        }

        return collected;
    }

    const urls = collectMedia(data);

    if (!urls.length) {
        throw new Error("No story media found from RapidAPI");
    }

    const firstNode = data?.data?.nodes?.[0];
    const accountInfo = firstNode?.story_bucket_owner || {};

    return {
        type: "story",
        urls,
        media: urls.map((u) => ({ url: u })),
        account: {
            id: accountInfo.id || null,
            name: accountInfo.name || "Unknown User",
            profilePic: accountInfo.profile_picture?.uri || null,
            url: accountInfo.url || null,
        },
    };
}
