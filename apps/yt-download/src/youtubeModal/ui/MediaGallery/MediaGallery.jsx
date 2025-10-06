"use client";

import { isVideo } from "@/utils/constHelper";
import MediaImage from "@/youtubeModal/ui/MediaImage/MediaImage";
import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
import { handleShare } from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import { convert } from "@/utils/mp4tomp3Convert";
import styles from "./MediaGallery.module.scss";

export default function MediaGallery({ mediaUrls = [], format = "mp4" }) {
  if (!mediaUrls.length) return null;

  const handleDownload = async (url, index) => {
    if (!url) return;

    try {
      if (format === "mp4") {
        const a = document.createElement("a");
        a.href = `/api/download?url=${encodeURIComponent(url)}&format=mp4`;
        a.download = `media-${index + 1}.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (format === "mp3") {
        const response = await fetch(
          `/api/download?url=${encodeURIComponent(url)}&format=mp4`
        );
        const blob = await response.blob();

        const convertedAudio = await convert(
          new File([blob], `video-${index + 1}.mp4`),
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
        currentIndex: index,
      });
    } catch (error) {
      console.error(`Error downloading media #${index + 1}:`, error);
    }
  };

  const handleShareClick = (url) => {
    if (!url) return;
    sendGAEvent("share_media_click", { mediaCount: mediaUrls.length });
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
              Download ({format.toUpperCase()})
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
