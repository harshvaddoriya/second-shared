"use client";

import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import {
  handleShareAll,
  handleDownloadAll,
  handleDownload,
  handleShare,
} from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const {
    mediaUrls = [],
    username,
    caption,
    currentMediaUrl,
    currentMediaIndex,
  } = data;

  const displayUsername = username || "Youtube_user";

  const handleDownloadClick = () => {
    sendGAEvent("download_media_click", { mediaCount: mediaUrls.length });
    if (mediaUrls.length > 1) {
      handleDownloadAll(mediaUrls);
    } else {
      handleDownload(currentMediaUrl, currentMediaIndex);
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
        {caption && (
          <PostCaption username={displayUsername} caption={caption} />
        )}

        <div className={styles.shareDownload}>
          <button className={styles.shareBtn} onClick={handleDownloadClick}>
            {mediaUrls.length > 1
              ? `Download All (${mediaUrls.length})`
              : "Download"}
          </button>
          <button className={styles.shareBtn} onClick={handleShareClick}>
            {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}
