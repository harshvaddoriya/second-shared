"use client";

import { useState, useMemo } from "react";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import styles from "./ShortsPreview.module.scss";

export default function ShortsPreview({ data, error }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const postData = useMemo(() => {
    if (!data) return null;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      mediaUrls: data.media?.map((item) => item.url).filter(Boolean) || [],
      statistics: data.statistics || {},
      initials: data.title?.charAt(0) || "Y",
      username: "Youtube User",
      fullName: "Youtube",
      likes: parseInt(data.statistics?.likeCount) || 0,
      views: parseInt(data.statistics?.viewCount) || 0,
      comments: parseInt(data.statistics?.commentCount) || 0,
    };
  }, [data]);

  if (error) {
    return (
      <div className={styles.reelContainer}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className={styles.reelContainer}>
        <p>No shorts data available</p>
      </div>
    );
  }

  const mediaUrl = postData.mediaUrls[0] || "";
  const caption = postData.title || "Shorts caption";

  const getTruncatedText = (text, maxLength = 80) => {
    if (!text) return "Shorts caption";
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? text.substring(0, lastSpace) : truncated;
  };

  const toggleCaption = () => setIsExpanded(!isExpanded);

  return (
    <div className={styles.reelContainer}>
      <div className={styles.videoContainer}>
        <iframe
          src={mediaUrl}
          title={postData.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.video}
        />

        <div className={styles.overlayContent}>
          <div className={styles.leftContent}>
            <div className={styles.caption} onClick={toggleCaption}>
              {isExpanded ? (
                <>
                  {caption}
                  <span className={styles.showMore}> ... less</span>
                </>
              ) : (
                <>
                  {getTruncatedText(caption)}
                  {caption.length > 80 && (
                    <>
                      <span>...</span>
                      <span className={styles.showMore}> more</span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomActivityPanel
        data={{
          mediaUrls: postData.mediaUrls,
          currentMediaUrl: mediaUrl,
          currentMediaIndex: 0,
          likes: postData.likes,
          views: postData.views,
          comments: postData.comments,
          username: postData.username,
          caption: postData.description,
        }}
      />
    </div>
  );
}
