"use client";

import { useMemo } from "react";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaVideo from "../../youtubeModal/ui/MediaVideo/MediaVideo";
import styles from "./VideoPreview.module.scss";

export default function VideoPreview({ data, error }) {
  const postData = useMemo(() => {
    if (!data) return null;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      mediaUrls: data.media?.map((item) => item.url).filter(Boolean) || [],
      statistics: data.statistics || {},
      initials: data.initials || data.title?.charAt(0) || "Y",
      username: "Youtube User",
      fullName: "Youtube",
      likes: parseInt(data.statistics?.likeCount) || 0,
      views: parseInt(data.statistics?.viewCount) || 0,
      comments: parseInt(data.statistics?.commentCount) || 0,
    };
  }, [data]);

  console.log("MEDIA OBJECT:", data.media);

  if (error) {
    return (
      <div className={styles.post}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className={styles.post}>
        <p>No video data available</p>
      </div>
    );
  }

  const mediaUrls = postData.mediaUrls || [];

  return (
    <div className={styles.post}>
      {mediaUrls.length > 0 ? (
        <MediaVideo src={mediaUrls[0]} />
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
          mediaUrls,
          username: postData.username,
          caption: postData.description,
          currentMediaUrl: mediaUrls[0],
          currentMediaIndex: 0,
          likes: postData.likes,
          views: postData.views,
          comments: postData.comments,
        }}
      />
    </div>
  );
}
