"use client";

import { useMemo, useEffect, useRef } from "react";
import Hls from "hls.js"; // npm install hls.js
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";
import styles from "./PlayListPreview.module.scss";

export default function PlayListPreview({ data, error }) {
  const videoRef = useRef(null);

  if (error) {
    return (
      <div className={styles.post}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  const items = data.downloadInfo?.items || [];
  if (!items.length) {
    return (
      <div className={styles.post}>
        <p>No media available</p>
      </div>
    );
  }

  const postData = useMemo(() => {
    const title = data.downloadInfo?.title || "Untitled";
    const thumbnail = items[0]?.thumbnail || "";
    const description = items[0]?.description || "";

    return {
      id: data.playlistUrl,
      title,
      description,
      thumbnail,
      items,
      mediaUrls: items.map((item) => item.videoUrl).filter(Boolean),
      username: items[0]?.channel?.name || "YouTube User",
      fullName: items[0]?.channel?.name || "YouTube",
      likes: parseInt(items[0]?.statistics?.likes) || 0,
      views: parseInt(items[0]?.statistics?.views) || 0,
      comments: parseInt(items[0]?.statistics?.comments) || 0,
    };
  }, [data, items]);

  const firstVideoUrl = postData.mediaUrls[0];
  const galleryUrls = postData.items
    .slice(1)
    .map((item) => item.videoUrl)
    .filter(Boolean);

  // --- Setup HLS playback ---
  useEffect(() => {
    if (videoRef.current && firstVideoUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(firstVideoUrl);
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = firstVideoUrl;
      }
    }
  }, [firstVideoUrl]);

  return (
    <div className={styles.post}>
      <h1>{postData.title}</h1>

      {firstVideoUrl ? (
        <video
          ref={videoRef}
          controls
          autoPlay={false}
          poster={postData.thumbnail}
          style={{ width: "100%", maxHeight: "500px" }}
        />
      ) : (
        <div style={{ padding: "10px", textAlign: "center" }}>
          <p>No video URL available</p>
          {postData.thumbnail && (
            <img
              src={postData.thumbnail}
              alt={postData.title}
              style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
            />
          )}
        </div>
      )}

      <PostHeader
        avatar={postData.avatar}
        username={postData.username}
        fullName={postData.fullName}
        title={postData.title}
        color="dark"
      />

      <BottomActivityPanel
        data={{
          mediaUrls: postData.mediaUrls,
          username: postData.username,
          caption: postData.description,
          currentMediaUrl: firstVideoUrl,
          currentMediaIndex: 0,
          likes: postData.likes,
          views: postData.views,
          comments: postData.comments,
        }}
      />

      {galleryUrls.length > 0 && <MediaGallery mediaUrls={galleryUrls} />}
    </div>
  );
}

// "use client";

// import { useMemo } from "react";
// import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
// import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
// import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
// import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";
// import styles from "./PlayListPreview.module.scss";

// export default function PlayListPreview({ data, error }) {
//   console.log("PlayListPreview rendering:", data);
//   const videoRef = useRef(null);

//   if (error) {
//     return (
//       <div className={styles.post}>
//         <p style={{ color: "red" }}>Error: {error}</p>
//       </div>
//     );
//   }

//   // --- Normalize media items ---
//   const items = data.downloadInfo?.items || [];
//   if (!items.length) {
//     return (
//       <div className={styles.post}>
//         <p>No media available</p>
//       </div>
//     );
//   }

//   const postData = useMemo(() => {
//     const title = data.downloadInfo?.title || "Untitled";
//     const thumbnail = items[0]?.thumbnail || "";
//     const description = items[0]?.description || "";

//     return {
//       id: data.playlistUrl,
//       title,
//       description,
//       thumbnail,
//       items,
//       mediaUrls: items.map((item) => item.url).filter(Boolean),
//       username: items[0]?.channel?.name || "YouTube User",
//       fullName: items[0]?.channel?.name || "YouTube",
//       likes: parseInt(items[0]?.statistics?.likes) || 0,
//       views: parseInt(items[0]?.statistics?.views) || 0,
//       comments: parseInt(items[0]?.statistics?.comments) || 0,
//     };
//   }, [data, items]);

//   const firstVideoUrl = postData.mediaUrls[0];
//   const galleryUrls = postData.items
//     .slice(1)
//     .map((item) => item.url)
//     .filter(Boolean);

//   return (
//     <div className={styles.post}>
//       <h1>{postData.title}</h1>

//       {firstVideoUrl ? (
//         <MediaVideo src={firstVideoUrl} />
//       ) : (
//         <div style={{ padding: "10px", textAlign: "center" }}>
//           <p>No video URL available</p>
//           {postData.thumbnail && (
//             <img
//               src={postData.thumbnail}
//               alt={postData.title}
//               style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
//             />
//           )}
//         </div>
//       )}

//       <PostHeader
//         avatar={postData.avatar}
//         username={postData.username}
//         fullName={postData.fullName}
//         title={postData.title}
//         color="dark"
//       />

//       <BottomActivityPanel
//         data={{
//           mediaUrls: postData.mediaUrls,
//           username: postData.username,
//           caption: postData.description,
//           currentMediaUrl: firstVideoUrl,
//           currentMediaIndex: 0,
//           likes: postData.likes,
//           views: postData.views,
//           comments: postData.comments,
//         }}
//       />

//       {galleryUrls.length > 0 && <MediaGallery mediaUrls={galleryUrls} />}
//     </div>
//   );
// }
