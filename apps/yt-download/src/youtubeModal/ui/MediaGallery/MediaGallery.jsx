"use client";

import { isVideo } from "@/utils/constHelper";
import MediaImage from "@/youtubeModal/ui/MediaImage/MediaImage";
import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
import { handleShare, handleDownload } from "shared/hooks";
import styles from "./MediaGallery.module.scss";

export default function MediaGallery({ mediaUrls = [] }) {
  if (!mediaUrls.length) return null;

  if (mediaUrls.length > 1) {
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
              <button onClick={() => handleDownload(url)}>Download</button>
              <button onClick={() => handleShare(url)}>Share</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
