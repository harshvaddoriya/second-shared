"use client";

import { useState, useMemo } from "react";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaVideo from "../../youtubeModal/ui/MediaVideo/MediaVideo";
import DownloadOptions from "@/youtubeModal/ui/DownloadOptions/DownloadOptions";
import styles from "./VideoPreview.module.scss";

export default function VideoPreview({ data, error }) {
  const [format, setFormat] = useState(null);

  const selectedVideo = useMemo(() => {
    if (!data?.media || !format) return null;

    const match = data.media.find((item) => item.id === format.id);

    return match?.url || data.media[0]?.url;
  }, [data, format]);

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
      {mediaUrls.length > 0 && data.firstAudio ? (
        <MediaVideo videoUrl={selectedVideo} audioUrl={data.firstAudio.url} />
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
        username={postData?.username || "Youtube User"}
        fullName={postData.fullName || "Youtube User"}
        title={postData.title}
        color="dark"
      />

      <div className={styles.downloadOption}>
        <DownloadOptions
          videoId={data.id}
          format={format}
          setFormat={setFormat}
        />
      </div>

      <div className={styles.bottomOption}>
        <BottomActivityPanel
          data={{
            mediaUrls: data.media?.map((item) => item.url) || [],
            mediaUrlsWithQuality: data.media || [],
            username: postData.username,
            caption: postData.description,
            currentMediaUrl: selectedVideo,
            firstAudioUrl: data.firstAudio?.url,
            currentMediaIndex: 0,
            likes: postData.likes,
            views: postData.views,
            comments: postData.comments,
          }}
          format={format}
          videoId={data.id}
        />
      </div>
    </div>
  );
}
