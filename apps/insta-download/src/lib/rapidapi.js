// Not call & Not working

export async function callRapidAPI(url) {
  try {
    const response = await fetch(
      `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodeURIComponent(
        url
      )}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": 'ae42f8aee0mshb3fe23ab29181e8p129ebfjsnba40b78302f4',
          "x-rapidapi-host": "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `RapidAPI HTTP ${response.status}: ${response.statusText} - ${errorText}`
      );
    }

    const data = await response.json();

    if (data.error || data.status === "error") {
      throw new Error(
        data.error || data.message || "API returned error status"
      );
    }

    const urlList = extractUrls(data);
    if (urlList.length === 0) {
      return { error: "No download URLs found in API response." };
    }

    return normalizeResponse(data, urlList);
  } catch (err) {
    return { error: `RapidAPI failed: ${err.message}` };
  }
}

function extractUrls(data) {
  const urlList = [];

  if (data.medias && Array.isArray(data.medias)) {
    data.medias.forEach((media) => {
      if (media.download_url) urlList.push(media.download_url);
    });
  }

  if (data.url_list && Array.isArray(data.url_list)) {
    urlList.push(...data.url_list.filter((url) => url));
  } else if (data.link) {
    urlList.push(data.link);
  } else if (data.media_url) {
    urlList.push(data.media_url);
  } else if (data.download_url) {
    urlList.push(data.download_url);
  } else if (data.video_url) {
    urlList.push(data.video_url);
  } else if (data.image_url) {
    urlList.push(data.image_url);
  } else if (data.media?.url) {
    urlList.push(data.media.url);
  } else if (data.result?.url) {
    urlList.push(data.result.url);
  }

  if (data.carousel_media && Array.isArray(data.carousel_media)) {
    data.carousel_media.forEach((item) => {
      if (item.url) urlList.push(item.url);
      if (item.video_url) urlList.push(item.video_url);
      if (item.image_url) urlList.push(item.image_url);
    });
  }

  return urlList.filter((url) => typeof url === "string");
}

function normalizeResponse(data, urlList) {
  const username = extractUsername(data) ?? "instagram_user";

  return {
    url_list: urlList,
    media_details: [
      {
        type:
          data.type ||
          data.media_type ||
          data.kind ||
          detectMediaType(urlList[0], data),
        thumbnail: data.thumbnail || data.thumb || data.image_url || urlList[0],
        is_carousel: urlList.length > 1 || Boolean(data.carousel_media),
        video_view_count: data.views || data.view_count || data.play_count || 0,
      },
    ],
    post_info: {
      owner_username: username,
      owner_fullname: extractFullName(data),
      is_verified: data.is_verified || data.owner?.is_verified || false,
      caption: data.caption || data.title || data.description || null,
      likes: data.likes || data.like_count || data.likes_count || 0,
      comment_count:
        data.comment_count || data.comments || data.comments_count || null,
      timestamp: data.timestamp || data.taken_at || data.created_at || null,
    },
    quality: data.quality || [],
  };
}

function determineMediaType(data, firstMedia) {
  if (data.type === "album") return "image";
  if (data.type === "video") return "video";
  if (data.type === "image") return "image";

  if (firstMedia?.type === "video") return "video";
  if (firstMedia?.type === "image") return "image";

  const firstUrl = data.medias?.[0]?.download_url;
  if (firstUrl) {
    if (firstUrl.includes(".mp4") || firstUrl.includes("video")) return "video";
    if (
      firstUrl.includes(".jpg") ||
      firstUrl.includes(".jpeg") ||
      firstUrl.includes(".png")
    )
      return "image";
  }

  return "unknown";
}

function extractUsername(data) {
  return (
    data.username ||
    data.user?.username ||
    data.owner?.username ||
    data.author?.username ||
    data.uploader ||
    null
  );
}

function extractFullName(data) {
  return (
    data.full_name ||
    data.fullname ||
    data.user?.full_name ||
    data.owner?.full_name ||
    data.author?.full_name ||
    data.display_name ||
    null
  );
}
