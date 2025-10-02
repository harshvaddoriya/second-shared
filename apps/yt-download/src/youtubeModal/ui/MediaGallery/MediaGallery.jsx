"use client";

import { isVideo } from "@/utils/constHelper";
import MediaImage from "@/youtubeModal/ui/MediaImage/MediaImage";
import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
import { handleShare } from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import styles from "./MediaGallery.module.scss";

export default function MediaGallery({ mediaUrls = [] }) {
  if (!mediaUrls.length) return null;

  const handleDownload = (url, index) => {
    if (!url) return;

    sendGAEvent("download_media_click", {
      mediaCount: mediaUrls.length,
      currentIndex: index,
    });

    const a = document.createElement("a");
    a.href = `/api/download?url=${encodeURIComponent(url)}`;
    a.download = `video-${index + 1}.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleShareClick = (url) => {
    sendGAEvent("share_media_click", { mediaCount: mediaUrls.length });
    if (!url) return;
    handleShare(url);
  };

  return (
    <div className={styles.galleryGrid}>
      {mediaUrls.filter(Boolean).map((url, idx) => (
        <div key={idx} className={styles.mediaItem}>
          <div className={styles.mediaWrapper}>
            {isVideo(url) ? (
              <MediaVideo src={url} />
            ) : (
              <MediaImage src={url} alt={`Media ${idx + 1}`} />
            )}
          </div>
          <div className={styles.actionButtons}>
            <button
              className={styles.shareBtn}
              onClick={() => handleDownload(url, idx)}
            >
              Download
            </button>
            <button
              className={styles.shareBtn}
              onClick={() => handleShareClick(url)}
            >
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
