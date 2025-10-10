"use client";

import { useState, useMemo } from "react";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";
import DownloadOptions from "@/youtubeModal/ui/DownloadOptions/DownloadOptions";
import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
import styles from "./PlayListPreview.module.scss";

export default function PlayListPreview({ data, error }) {
  const [format, setFormat] = useState(null);

  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  const items = data?.items || [];
  if (!items.length) return <div>No media available</div>;

  const firstItem = items[0];

  const postData = useMemo(
    () => ({
      id: data.playlistUrl,
      title: data.title,
      description: firstItem.description || "",
      thumbnail: firstItem.thumbnail || "",
      items,
      username: firstItem.channel?.name || "YouTube User",
      fullName: firstItem.channel?.name || "YouTube",
      likes: parseInt(firstItem.statistics?.likeCount) || 0,
      views: parseInt(firstItem.statistics?.viewCount) || 0,
      comments: parseInt(firstItem.statistics?.commentCount) || 0,
    }),
    [data, firstItem]
  );

  const selectedVideo = useMemo(
    () => ({
      videoUrl: firstItem.videoUrl,
      audioUrl: firstItem.audioUrl || null,
    }),
    [firstItem]
  );

  const firstVideoUrl = selectedVideo.videoUrl;
  const audioUrl = selectedVideo.audioUrl;

  const galleryMedia = useMemo(() => {
    return items.map((item) => ({
      videoUrl: item.videoUrl,
      audioUrl: item.audioUrl || null,
    }));
  }, [items]);

  return (
    <div className={styles.post}>
      {firstVideoUrl && (
        <MediaVideo videoUrl={firstVideoUrl} audioUrl={audioUrl} />
      )}

      <PostHeader
        avatar={postData.avatar}
        username={postData.username}
        fullName={postData.fullName}
        title={postData.title}
        color="dark"
      />

      <div className={styles.downloadOption}>
        <DownloadOptions
          videoId={firstItem.id}
          format={format}
          setFormat={setFormat}
          options={firstItem.formats}
        />
      </div>

      <div className={styles.bottomOption}>
        <BottomActivityPanel
          data={{
            mediaUrls: items.map((i) => i.videoUrl),
            username: postData.username,
            caption: postData.description,
            currentMediaUrl: firstVideoUrl,
            currentMediaIndex: 0,
            likes: postData.likes,
            views: postData.views,
            comments: postData.comments,
          }}
          format={format}
          videoId={firstItem.id}
        />
      </div>

      {galleryMedia.length > 0 && (
        <MediaGallery mediaUrls={galleryMedia} format={format} />
      )}
    </div>
  );
}
