"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { handleShare } from "shared/hooks";
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
import DownloadOptions from "@/youtubeModal/ui/DownloadOptions/DownloadOptions";
import { useAudioVideoSync } from "@/utils/useAudioVideoSync";

export default function ShortsPreview({ data, error }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [format, setFormat] = useState(null);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const selectedVideo = useMemo(() => {
    if (!data?.media || !format) return null;
    const match = data.media.find((item) => item.id === format.id);
    return match?.url || data.media[0]?.url;
  }, [data, format]);

  console.log(selectedMedia, "shorts url sending fro mp3 conversion");
  console.log(data.media, "getting media data for shprts url");

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
      likes: parseInt(data.statistics?.likeCount) || "like",
      views: parseInt(data.statistics?.viewCount) || "views",
      comments: parseInt(data.statistics?.commentCount) || "comments",
    };
  }, [data]);

  if (error)
    return (
      <div className={styles.reelContainer}>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );

  if (!postData)
    return (
      <div className={styles.reelContainer}>
        <p>No shorts data available</p>
      </div>
    );

  const mediaUrl = postData.mediaUrls[0];
  const audioUrl = data.firstAudio?.url;

  useAudioVideoSync(videoRef, audioRef);

  const toggleMute = () => {
    const newMuted = !isMuted;
    if (videoRef.current) videoRef.current.muted = newMuted;
    if (audioRef.current) audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const handleVideoToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {audioUrl && <audio ref={audioRef} src={audioUrl} muted={isMuted} />}

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
          <div
            className={styles.caption}
            onClick={() => setIsExpanded(!isExpanded)}
          >
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

      <div className={styles.downloadOption}>
        <DownloadOptions
          videoId={data.id}
          format={format}
          setFormat={setFormat}
        />
      </div>
      <div className={styles.bottomOption}>
        <BottomActivityPanel
          data={{
            mediaUrls: data.media?.map((item) => item.url) || [],
            mediaUrlsWithQuality: data.media || [],
            currentMediaUrl: selectedVideo,
            firstAudioUrl: data.firstAudio?.url,
            currentMediaIndex: 0,
          }}
          format={format}
          videoId={data.id}
        />
      </div>
    </div>
  );
}
