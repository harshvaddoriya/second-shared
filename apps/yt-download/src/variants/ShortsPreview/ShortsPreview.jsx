"use client";

import { useState, useRef, useMemo } from "react";
import { handleShare, handleDownload } from "shared/hooks";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
  MdOutlineShare,
} from "react-icons/md";
import styles from "./ShortsPreview.module.scss";

export default function ShortsPreview({ data, error }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const postData = useMemo(() => {
    if (!data) return null;
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      mediaUrls: data.media?.map((item) => item.url).filter(Boolean) || [],
      statistics: data.statistics || {},
      username: data.username || "Youtube User",
      caption: data.description || data.caption || "Shorts caption",
      likes: parseInt(data.statistics?.likeCount) || 0,
      views: parseInt(data.statistics?.viewCount) || 0,
      comments: parseInt(data.statistics?.commentCount) || 0,
    };
  }, [data]);

  if (error) {
    return (
      <div className={styles.reelContainer}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className={styles.reelContainer}>
        <p>No reels data available</p>
      </div>
    );
  }

  const mediaUrls = postData.mediaUrls || [];
  const mediaUrl = postData.mediaUrls[0];

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleEnded = () => setIsPlaying(false);

  const toggleCaption = () => setIsExpanded(!isExpanded);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVideoToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getTruncatedText = (text, maxLength = 80) => {
    if (!text) return "Shorts caption";
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    return lastSpace > 0 ? text.substring(0, lastSpace) : truncated;
  };

  return (
    <div className={styles.reelContainer}>
      <video
        ref={videoRef}
        className={styles.video}
        src={mediaUrl}
        controls
        muted={isMuted}
        autoPlay
        loop
        playsInline
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      <div className={styles.topLeftControls}>
        <button onClick={handleVideoToggle} className={styles.controlBtn}>
          {isPlaying ? <BsPauseFill size={22} /> : <BsFillPlayFill size={22} />}
        </button>
        <button onClick={toggleMute} className={styles.controlBtn}>
          {isMuted ? <FaVolumeMute size={22} /> : <FaVolumeUp size={22} />}
        </button>
      </div>

      <div className={styles.centerRightActions}>
        <button>
          <MdOutlineThumbUp size={22} />
          <span>{postData.likes}</span>
        </button>
        <button>
          <MdOutlineComment size={22} />
          <span>{postData.comments}</span>
        </button>
        <button>
          <MdOutlineRemoveRedEye size={22} />
          <span>{postData.views}</span>
        </button>
        <button onClick={() => handleShare(postData.mediaUrls[0])}>
          <MdOutlineShare size={22} />
          <span>Share</span>
        </button>
      </div>

      <div className={styles.overlayContent}>
        <div className={styles.leftContent}>
          <p className={styles.username}>@{postData.username}</p>
          <div className={styles.caption} onClick={toggleCaption}>
            {isExpanded ? (
              <>
                {postData.caption}
                <span className={styles.showMore}> ... less</span>
              </>
            ) : (
              <>
                {getTruncatedText(postData.caption)}
                {(postData.caption || "").length > 80 && (
                  <>
                    <span>...</span>
                    <span className={styles.showMore}> ... more</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.bottomOption}>
        <BottomActivityPanel
          data={{
            mediaUrls,
            currentMediaUrl: mediaUrls[0],
            currentMediaIndex: 0,
          }}
        />
      </div>
    </div>
  );
}
