export async function fetchPostFromRapidAPI(url) {
    const response = await fetch("https://facebook17.p.rapidapi.com/api/facebook/links", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-rapidapi-key": "ecfb71dbc6msh2db6058090453a8p1e7ff6jsna42d93ce4e1b",
            "x-rapidapi-host": "facebook17.p.rapidapi.com",
        },
        body: JSON.stringify({ url }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));

    if (!Array.isArray(data) || !data.length) {
        throw new Error("No post media found from RapidAPI");
    }

    const mediaUrls = data.flatMap(item =>
        (item.urls || []).map(u => u.url).filter(Boolean)
    );

    if (!mediaUrls.length) {
        throw new Error("No post media found from RapidAPI");
    }

    const firstMeta = data[0]?.meta || {};

    return {
        type: "post",
        mediaUrls, // array of urls
        media: mediaUrls.map(u => ({ url: u })),
        mediaUrl: mediaUrls[0],
        title: firstMeta.title || null,
        caption: firstMeta.caption || null,
        thumbnail: data[0]?.pictureUrl || null,
        account: {
            name: data[0]?.meta?.username || "Unknown User",
            profilePic: data[0]?.pictureUrl || null,
            url: firstMeta.sourceUrl || null,
        },
    };
}