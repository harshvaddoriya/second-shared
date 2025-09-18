"use client";

import { useState, useRef } from "react";
import { handleShare, handleDownload } from "shared/hooks";
import { FaVolumeUp, FaVolumeMute } from "@/icons/index";
import styles from "./ReelPreview.module.scss";

export default function ReelPreview({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  const getTruncatedText = (text, maxLength = 80) => {
    if (!text) return "Reels caption";
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? text.substring(0, lastSpace) : truncated;
  };

  const toggleCaption = () => setIsExpanded(!isExpanded);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={data.mediaUrl}
        poster={`/api/proxy?url=${encodeURIComponent(data.thumbnail)}`}
        controls
        muted={isMuted}
        autoPlay
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      <div className={styles.overlayContent}>
        <div className={styles.leftContent}>
          <p className={styles.username}>
            @{data.username || "Instagram User"}
          </p>

          <div className={styles.caption} onClick={toggleCaption}>
            {isExpanded ? (
              <>
                {data.caption || "Reels caption"}
                <span className={styles.showMore}> ... less</span>
              </>
            ) : (
              <>
                {getTruncatedText(data.caption)}
                {(data.caption || "").length > 80 && (
                  <>
                    <span>...</span>
                    <span className={styles.showMore}> ... more</span>
                  </>
                )}
                {(data.caption || "").length <= 80 && (
                  <span className={styles.showMore}> ... more</span>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.rightContent}>
          <button className={styles.muteButton} onClick={toggleMute}>
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      <div className={styles.shareDownload}>
        <button
          className={styles.innerBtn}
          onClick={() => handleDownload(data?.mediaUrls[0], 0)}
        >
          Download
        </button>
        <button
          className={styles.innerBtn}
          onClick={() => handleShare(data?.mediaUrls[0])}
        >
          Share
        </button>
      </div>
    </div>
  );
}
