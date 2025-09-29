"use client";

import { useMemo } from "react";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaVideo from "../../youtubeModal/ui/MediaVideo/MediaVideo";
import styles from "./PlayListPreview.module.scss";
import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";

export default function PlayListPreview({ data, error, playlist = [] }) {
  const mainVideo = playlist.items?.[0] || data;

  const postData = useMemo(() => {
    if (!mainVideo) return null;

    const mediaUrls =
      mainVideo.media?.map((item) => item.url).filter(Boolean) || [];

    return {
      id: mainVideo.id,
      title: mainVideo.title,
      description: mainVideo.description,
      thumbnail: mainVideo.thumbnail,
      mediaUrls,
      statistics: mainVideo.statistics || {},
      initials: mainVideo.initials || mainVideo.title?.charAt(0) || "Y",
      username: mainVideo.channel?.name || "Youtube User",
      fullName: mainVideo.channel?.name || "Youtube",
      likes: parseInt(mainVideo.statistics?.likeCount) || 0,
      views: parseInt(mainVideo.statistics?.viewCount) || 0,
      comments: parseInt(mainVideo.statistics?.commentCount) || 0,
    };
  }, [mainVideo]);

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

      {playlist.items?.length > 1 && (
        <MediaGallery
          mediaUrls={playlist.items
            .slice(1)
            .map((video) => video.media?.[0]?.url)
            .filter(Boolean)}
        />
      )}
    </div>
  );
}
