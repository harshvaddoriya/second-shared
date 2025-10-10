"use client";

import React, { useState } from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import { handleShareAll, handleShare } from "shared/hooks";
import { downloadMp3FromMp4Url } from "@/utils/mp4tomp3Convert";
import { sendGAEvent } from "@/utils/gaUtils";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data, format, videoId }) {
  const { caption, currentMediaUrl, likes, views, comments } = data;
  const [converting, setConverting] = useState(false);

  // const handleDownloadClick = async () => {
  //   if (!format?.id || !videoId) return;
  //   setConverting(true);
  //   try {
  //     const res = await fetch(
  //       `/api/download?videoId=${videoId}&qualityId=${format.id}`
  //     );
  //     const data = await res.json();
  //     if (!data.file) throw new Error("File not ready yet");

  //     if (format.type.toLowerCase() === "audio") {
  //       await downloadMp3FromMp4Url(data.file, `audio-${format.quality}`);
  //     } else {
  //       const a = document.createElement("a");
  //       a.href = data.file;
  //       a.download = `${format.type}-${format.quality || "video"}.mp4`;
  //       document.body.appendChild(a);
  //       a.click();
  //       a.remove();
  //     }
  //   } catch (err) {
  //     console.error("Download failed:", err);
  //     alert("File not ready yet. Try again in a few seconds.");
  //   } finally {
  //     setConverting(false);
  //   }
  // };

  const handleDownloadClick = async () => {
    if (!format?.id || !videoId) return;

    try {
      const res = await fetch(
        `/api/download?videoId=${videoId}&qualityId=${format.id}`
      );
      const data = await res.json();

      if (!data.file) throw new Error("File not ready yet");

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

  const handleShareClick = () => {
    sendGAEvent("share_media_click", { mediaCount: 1 });
    handleShare(currentMediaUrl);
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
          <button className={styles.shareBtn} onClick={handleDownloadClick}>
            {format
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
