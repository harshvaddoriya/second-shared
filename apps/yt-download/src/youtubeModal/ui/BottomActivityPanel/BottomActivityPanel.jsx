"use client";

import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import {
  handleShareAll,
  handleDownloadAll,
  handleDownload,
  handleShare,
} from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import { convert } from "@/utils/mp4tomp3Convert";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data, format = "mp4" }) {
  const {
    mediaUrls = [],
    caption,
    currentMediaUrl,
    currentMediaIndex,
    likes,
    views,
    comments,
  } = data;

  const handleDownloadClick = async () => {
    if (!currentMediaUrl) return;

    if (format === "mp4") {
      const a = document.createElement("a");
      a.href = `/api/download?url=${encodeURIComponent(
        currentMediaUrl
      )}&format=mp4`;

      a.download = `media-${currentMediaIndex + 1}.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else if (format === "mp3") {
      const response = await fetch(
        `/api/download?url=${encodeURIComponent(currentMediaUrl)}&format=mp4`
      );
      const blob = await response.blob();

      const convertedAudio = await convert(
        new File([blob], "video.mp4"),
        "mp3"
      );

      const a = document.createElement("a");
      a.href = convertedAudio.data;
      a.download = `${convertedAudio.name}.mp3`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }

    sendGAEvent("download_media_click", {
      mediaCount: 1,
      currentIndex: currentMediaIndex,
    });
  };

  const handleDownloadAllClick = async () => {
    if (!mediaUrls?.length) return;

    sendGAEvent("download_media_click", {
      mediaCount: mediaUrls.length,
    });

    for (let i = 0; i < mediaUrls.length; i++) {
      const url = mediaUrls[i];

      try {
        if (format === "mp4") {
          const a = document.createElement("a");
          a.href = `/api/download?url=${encodeURIComponent(url)}&format=mp4`;
          a.download = `media-${i + 1}.mp4`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else if (format === "mp3") {
          const response = await fetch(
            `/api/download?url=${encodeURIComponent(url)}&format=mp4`
          );
          const blob = await response.blob();

          const convertedAudio = await convert(
            new File([blob], `Audio-${i + 1}.mp4`),
            "mp3"
          );

          const a = document.createElement("a");
          a.href = convertedAudio.data;
          a.download = `${convertedAudio.name}.mp3`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      } catch (error) {
        console.error(`Error downloading file #${i + 1}:`, error);
      }
    }
  };

  const handleShareClick = () => {
    sendGAEvent("share_media_click", { mediaCount: mediaUrls.length });
    if (mediaUrls.length > 1) {
      handleShareAll(mediaUrls);
    } else {
      handleShare(currentMediaUrl);
    }
  };

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.counterSection}>
        {caption && <PostCaption caption={caption} />}
        {(likes !== undefined ||
          views !== undefined ||
          comments !== undefined) && (
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
            onClick={
              mediaUrls.length > 1
                ? handleDownloadAllClick
                : handleDownloadClick
            }
          >
            {mediaUrls.length > 1
              ? `Download All (${mediaUrls.length})`
              : `Download (${format.toUpperCase()})`}
          </button>

          <button className={styles.shareBtn} onClick={handleShareClick}>
            {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
