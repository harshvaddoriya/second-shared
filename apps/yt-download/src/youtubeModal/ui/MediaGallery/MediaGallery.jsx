"use client";

import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
import { sendGAEvent } from "@/utils/gaUtils";
import { handleShare } from "shared/hooks";
import styles from "./MediaGallery.module.scss";

export default function MediaGallery({ mediaUrls = [], format }) {
  if (!mediaUrls.length) return null;

  const handleDownload = async (media, index) => {
    if (!media?.videoUrl) return;

    try {
      const res = await fetch(
        `/api/download?videoId=${media.videoUrl}&qualityId=${format.id}`
      );
      const fileData = await res.json();

      if (!fileData.file) throw new Error("File not ready yet");

      const a = document.createElement("a");
      a.href = fileData.file;
      a.download = `${format?.type || "video"}-${
        format?.quality || "default"
      }.mp4`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      sendGAEvent("download_media_click", {
        mediaCount: 1,
        currentIndex: index,
      });
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handleShareClick = (url) => {
    sendGAEvent("share_media_click", { mediaCount: mediaUrls.length });
    handleShare(url);
  };

  return (
    <div className={styles.galleryGrid}>
      {mediaUrls.map((media, idx) => (
        <div key={idx} className={styles.mediaItem}>
          <div className={styles.mediaWrapper}>
            <MediaVideo videoUrl={media.videoUrl} audioUrl={media.audioUrl} />
          </div>
          <div className={styles.actionButtons}>
            <button
              className={styles.shareBtn}
              onClick={() => handleDownload(media, idx)}
            >
              Download ({format?.type?.toUpperCase() || "MP4"})
            </button>
            <button
              className={styles.shareBtn}
              onClick={() => handleShareClick(media.videoUrl)}
            >
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
