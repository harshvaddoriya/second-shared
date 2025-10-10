"use client";

import React, { useState } from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import { handleShare } from "shared/hooks";
import { convert } from "@/utils/mp4tomp3Convert";
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
      console.log("Format type:", type);

      if (["audio", "mp3"].includes(type)) {
        console.log("Fetching MP4 for conversion...");
        const response = await fetch(
          `/api/fetchMp4?url=${encodeURIComponent(currentMediaUrl)}&format=mp4`
        );

        if (!response.ok) throw new Error("Failed to fetch MP4 file");

        const blob = await response.blob();
        console.log("Fetched MP4 blob:", blob);

        const convertedAudio = await convert(
          new File([blob], `video-${videoId || 1}.mp4`),
          "mp3"
        );

        const a = document.createElement("a");
        a.href = convertedAudio.data || convertedAudio;
        a.download = convertedAudio.name
          ? `${convertedAudio.name}.mp3`
          : `audio-${videoId}.mp3`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        console.log("Downloading MP4...");
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
      alert("File not ready yet. Try again in a few seconds.");
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
