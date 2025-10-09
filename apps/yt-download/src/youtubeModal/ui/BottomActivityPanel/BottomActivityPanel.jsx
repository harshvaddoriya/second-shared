"use client";

import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import { handleShareAll, handleShare } from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data, format, videoId }) {
  // Destructure relevant data from post
  const {
    caption,
    mediaUrlsWithQuality = [],
    currentMediaUrl,
    likes,
    views,
    comments,
  } = data;

  // -----------------------------
  // Download button click handler
  // -----------------------------
  // Downloads video based on selected format
  const handleDownloadClick = async () => {
    if (!format?.id || !videoId) return;

    try {
      // Call backend API to get downloadable video URL
      const res = await fetch(
        `/api/download?videoId=${videoId}&qualityId=${format.id}`
      );
      const data = await res.json();

      if (!data.file) throw new Error("File not ready yet");

      // Create temporary <a> element to trigger browser download
      const a = document.createElement("a");
      a.href = data.file;
      a.download = `${format.type}-${format.quality || "video"}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Download failed:", err);
      alert("File not ready yet. Try again in a few seconds.");
    }
  };

  // -----------------------------
  // Share button click handler
  // -----------------------------
  const handleShareClick = () => {
    // Send analytics event
    sendGAEvent("share_media_click", {
      mediaCount: mediaUrlsWithQuality.length,
    });

    // If multiple media, share all; otherwise share single
    if (mediaUrlsWithQuality.length > 1)
      handleShareAll(mediaUrlsWithQuality.map((m) => m.url));
    else handleShare(currentMediaUrl);
  };

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.counterSection}>
        {/* Display post caption */}
        {caption && <PostCaption caption={caption} />}

        {/* Display likes, views, comments stats if available */}
        {(likes !== undefined || views !== undefined || comments !== undefined) && (
          <div className={styles.stats}>
            {likes !== undefined && (
              <span>
                <MdOutlineThumbUp size={18} /> {likes.toLocaleString()}
              </span>
            )}
            {views !== undefined && (
              <span>
                <MdOutlineRemoveRedEye size={18} /> {views.toLocaleString()}
              </span>
            )}
            {comments !== undefined && (
              <span>
                <MdOutlineComment size={18} /> {comments.toLocaleString()}
              </span>
            )}
          </div>
        )}

        {/* Share and Download buttons */}
        <div className={styles.shareDownload}>
          {/* Download button */}
          <button className={styles.shareBtn} onClick={handleDownloadClick}>
            {format
              ? `Download (${format.type}-${format.quality || ""})`
              : "Select Quality"}
          </button>

          {/* Share button */}
          <button className={styles.shareBtn} onClick={handleShareClick}>
            {mediaUrlsWithQuality.length > 1
              ? `Share All (${mediaUrlsWithQuality.length})`
              : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
