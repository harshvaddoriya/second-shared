"use client";

import React, { useState } from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import { handleShare } from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data, format, videoId }) {
  const { caption, currentMediaUrl, likes, views, comments } = data;
  const [converting, setConverting] = useState(false);

  const handleDownloadClick = async () => {
    if (!format || !videoId) return;
    setConverting(true);
    try {
      const type = format.type?.toLowerCase() || "";
      if (type === "audio") {
        let videoUrl = data.currentMediaUrl;
        if (videoUrl.includes("/shorts/")) {
          videoUrl = videoUrl.replace("/shorts/", "/watch?v/");
        }
        const res = await fetch(`/api/downloadMp3?videoUrl=${encodeURIComponent(videoUrl)}`);

        if (!res.ok) throw new Error("Failed to fetch MP3");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audio-${videoId}.mp3`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        // const a = document.createElement("a");
        // a.href = `/api/downloadMp3?videoUrl=${encodeURIComponent(videoUrl)}`;
        // a.download = `audio-${videoId}.mp3`;
        // document.body.appendChild(a);
        // a.click();
        // a.remove();
      } else {
        const res = await fetch(
          `/api/download?videoId=${videoId}&qualityId=${format.id}`
        );
        const fileData = await res.json();
        if (!fileData.file) throw new Error("File not ready yet");
        const a = document.createElement("a");
        a.href = fileData.file;
        a.download = `${type || "video"}-${format.quality || "default"}.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }

      sendGAEvent("download_media_click", {
        mediaCount: 1,
        currentVideoId: videoId,
      });
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setConverting(false);
    }
  };

  const handleShareClick = () => {
    sendGAEvent("share_media_click", { mediaCount: 1 });
    handleShare(currentMediaUrl);
  };

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.counterSection}>
        {caption && <PostCaption caption={caption} />}

        {(likes || views || comments) && (
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

        <div className={styles.shareDownload}>
          <button
            className={styles.shareBtn}
            onClick={handleDownloadClick}
            disabled={converting}
          >
            {converting
              ? "Converting..."
              : format
              ? `Download (${format.type}-${format.quality || ""})`
              : "Select Quality"}
          </button>

          <button className={styles.shareBtn} onClick={handleShareClick}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
