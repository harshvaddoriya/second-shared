export async function fetchStoryFromRapidAPI(url) {
  const apiUrl =
    "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi";

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) throw new Error("Missing RapidAPI key");

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host":
        "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
    },
  };

  const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`, options);
  if (!response.ok) throw new Error(`RapidAPI error: ${response.status}`);

  // const result = await response.json();
  let result;
  try {
    const text = await response.text();
    if (!text) {
      return null;
    }
    result = JSON.parse(text);
  } catch (err) {
    console.error("RapidAPI returned invalid JSON:", err);
    return null;
  }

  const mediaItems = result.medias || result.story || result.data || [];

  const medias = mediaItems.map((item, index) => {
    const mediaUrl = item.download_url || item.url;
    const isVideo = mediaUrl && /\.(mp4|mov|avi)$/i.test(mediaUrl);

    return {
      url: mediaUrl,
      download_url: mediaUrl,
      type: isVideo ? 'video' : 'image'
    };
  }).filter(item => item.url);

  const mediaUrls = medias.map(m => m.url).filter(Boolean);

  let type = "story";
  let subType = "unknown";

  if (mediaUrls.length) {
    const first = mediaUrls[0];
    if (/\.(jpg|jpeg|png|webp)$/i.test(first)) subType = "photo";
    else if (/\.(mp4|mov|avi)$/i.test(first)) subType = "video";
  }

  return {
    type,
    subType,
    caption: result.caption || null,
    mediaUrls,
    cover: mediaUrls[0] || result.thumbnail || null,
    medias,
    username: result.username || extractUsernameFromUrl(url) || null,
    profile_pic_url: result.profile_pic_url || null,
    raw: result,
  };
}

function extractUsernameFromUrl(url) {
  const match = url.match(/instagram\.com\/stories\/([^/]+)/);
  return match?.[1] ?? null;
}
