"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";
import DownloadOptions from "@/youtubeModal/ui/DownloadOptions/DownloadOptions";
import styles from "./PlayListPreview.module.scss";

export default function PlayListPreview({ data, error }) {
  const [format, setFormat] = useState("mp4");
  const videoRef = useRef(null);

  if (error) {
    return (
      <div className={styles.post}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  const items = data?.items || [];
  if (!items.length) {
    return (
      <div className={styles.post}>
        <p>No media available</p>
      </div>
    );
  }

  const postData = useMemo(() => {
    const firstItem = items[0];
    return {
      id: data.playlistUrl,
      title: data.title,
      description: firstItem?.description || "",
      thumbnail: firstItem?.thumbnail || "",
      items,
      mediaUrls: items.map((item) => item.videoUrl).filter(Boolean),
      username: firstItem?.channel?.name || "YouTube User",
      fullName: firstItem?.channel?.name || "YouTube",
      likes: parseInt(firstItem?.statistics?.likeCount) || 0,
      views: parseInt(firstItem?.statistics?.viewCount) || 0,
      comments: parseInt(firstItem?.statistics?.commentCount) || 0,
    };
  }, [data, items]);
  console.log(items.map((i) => i.videoUrl));
  const firstVideoUrl = postData.mediaUrls[0];
  const galleryUrls = postData.mediaUrls;

  useEffect(() => {
    if (videoRef.current && firstVideoUrl) {
      videoRef.current.src = firstVideoUrl;
    }
  }, [firstVideoUrl]);

  return (
    <div className={styles.post}>
      {firstVideoUrl ? (
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
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

      <div className={styles.downloadOption}>
        <DownloadOptions format={format} setFormat={setFormat} />
      </div>
      <div className={styles.bottomOption}>
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
          format={format}
        />
      </div>

      {galleryUrls.length > 0 && (
        <MediaGallery
          mediaUrls={galleryUrls}
          format={format}
          onDownload={(url, index) =>
            handleDownloadClick(mediaUrls.length === 1)
          }
        />
      )}
    </div>
  );
}
