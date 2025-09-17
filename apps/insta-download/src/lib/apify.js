export async function callApify(url) {
  try {
    if (!url) throw new Error("URL is required");

    const res = await fetch(
      `https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items?token=${process.env.APIFY_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ directUrls: [url] }),
      },
    );

    if (!res.ok) {
      throw new Error(`Apify HTTP ${res.status}: ${res.statusText}`);
    }


    const items = await res.json();
    const item = Array.isArray(items) ? items[0] : items;
    if (!item) return { error: "No media found." };

    const childMedia = Array.isArray(item.childPosts)
      ? item.childPosts
        .flatMap(c => [
          c?.videoUrl,
          c?.displayUrl,
          c?.display_url,
        ])
        .filter(isHttpUrl)
      : [];

    const imageMedia = Array.isArray(item.images)
      ? item.images.filter(isHttpUrl)
      : [];

    const resourceMedia = Array.isArray(item.resources)
      ? item.resources.map(r => r?.url).filter(isHttpUrl)
      : [];


    const singleMedia = [item.videoUrl, item.displayUrl, item.display_url]
      .filter(isHttpUrl);


    const mediaUrls = dedupe([
      ...childMedia,
      ...imageMedia,
      ...resourceMedia,
      ...singleMedia,
    ]);

    const isCarousel =
      (item.type || "").toLowerCase() === "sidecar" || Boolean(item.isCarousel);


    const videoSet = new Set(
      [
        item.videoUrl,
        ...(Array.isArray(item.childPosts)
          ? item.childPosts.map(c => c?.videoUrl).filter(isHttpUrl)
          : []),
      ]
    );

    const media_details = mediaUrls.map((m) => ({
      url: m,
      type: videoSet.has(m) ? "video" : "image",
      thumbnail: videoSet.has(m)
        ? (item.thumbnailUrl || item.displayUrl || item.display_url || m)
        : m,
      is_carousel: isCarousel,
      video_view_count: videoSet.has(m) ? (item.videoViewCount ?? null) : null,
    }));

    const type = normalizeType({ item, requestUrl: url, isCarousel, media_details });

    const first = mediaUrls[0] || null;
    const thumbnail =
      pickHttp(
        item.thumbnailUrl,
        item.displayUrl,
        item.display_url,
        first,
      ) || null;

    const post_info = {
      owner_username: item.ownerUsername ?? null,
      owner_fullname: item.ownerFullName ?? null,
      is_verified: item.ownerIsVerified ?? false,
      caption: item.caption ?? null,
      likes: item.likesCount ?? 0,
      comment_count: item.commentsCount ?? null,
      timestamp: item.timestamp ?? null,
    };

    return {
      requestUrl: url,
      type,
      mediaUrl: first,
      mediaUrls,
      url_list: mediaUrls,
      thumbnail,
      quality: [],


      username: item.ownerUsername || null,
      fullName: item.ownerFullName || null,
      isVerified: !!item.ownerIsVerified,
      caption: item.caption ?? null,
      likes: item.likesCount ?? 0,
      comments: item.commentsCount ?? null,
      views: item.videoViewCount ?? 0,
      postedAt: item.timestamp ?? null,
      media_details,
      post_info,
    };
  } catch (err) {
    return { error: `Apify failed: ${err.message}` };
  }
}

/* ---------- helpers ---------- */
function isHttpUrl(u) {
  return typeof u === "string" && /^https?:\/\//.test(u);
}

function pickHttp(...candidates) {
  for (const c of candidates) {
    if (isHttpUrl(c)) return c;
  }
  return null;
}

function dedupe(arr) {
  const seen = new Set();
  const out = [];
  for (const v of arr) {
    if (isHttpUrl(v) && !seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

function normalizeType({ item, requestUrl, isCarousel, media_details }) {
  const u = requestUrl || "";
  const t = (item.type || "").toLowerCase();

  if (u.includes("/stories/")) return "story";
  if (u.includes("/reel/")) return "reel";
  if (u.includes("/tv/")) return "igtv";

  if (isCarousel) return "carousel";

  const hasVideo =
    (Array.isArray(media_details) && media_details.some(m => m?.type === "video")) ||
    t === "video" || t === "reel";
  if (hasVideo) return "video";


  const hasImage =
    (Array.isArray(item.images) && item.images.length > 0) ||
    isHttpUrl(item.displayUrl) ||
    isHttpUrl(item.display_url);
  if (hasImage) return "photo";

  return "viewer";
}
