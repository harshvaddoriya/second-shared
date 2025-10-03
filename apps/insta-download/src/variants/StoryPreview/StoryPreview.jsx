"use client";

import { useState, useEffect, useRef } from "react";
import {
  Swiper,
  SwiperSlide,
  Navigation,
} from "@/instaModal/ui/CustomSwiper/CustomSwiper";
import MediaGallery from "@/instaModal/ui/MediaGallery/MediaGallery";
import SwiperNavigation from "@/instaModal/ui/SwiperNavigation/SwiperNavigation";
import { handleShareAll, handleDownloadAll } from "shared/hooks";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "@/icons/index";
import styles from "./StoryPreview.module.scss";

export default function StoryPreview({ stories = [], data }) {
  const videoRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDuration, setActiveDuration] = useState(4000);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progressPaused, setProgressPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    console.log(
      "stories length:",
      Array.isArray(stories) ? stories.length : "not array"
    );
  }, [stories, data]);

  const flattenedStories = Array.isArray(stories)
    ? stories.reduce((acc, story) => {
        if (!story) return acc;

        acc.push(story);
        if (story.reel_media && Array.isArray(story.reel_media)) {
          acc.push(...story.reel_media);
        }
        return acc;
      }, [])
    : [];

  const mediaUrls = flattenedStories
    .map((story) => {
      if (!story) return null;

      const video = story.video_versions?.[0]?.url;
      if (video) {
        return video;
      }
      const image =
        story.image_versions2?.candidates?.[0]?.url ||
        story.display_resources?.[0]?.src ||
        story.image_versions?.standard_resolution?.url;

      if (image) {
        return image;
      }
      return null;
    })
    .filter(Boolean);

  useEffect(() => {
    if (!flattenedStories.length) return;

    const activeStory = flattenedStories[currentIndex];
    if (!activeStory) return;

    const isVideo = activeStory?.video_versions?.[0]?.url;
    if (isVideo) {
      const video = document.createElement("video");
      video.src = activeStory.video_versions[0].url;
      video.onloadedmetadata = () => {
        setActiveDuration(video.duration * 1000);
      };
      video.onerror = () => {
        console.error(
          "Video failed to load:",
          activeStory.video_versions[0].url
        );
        setActiveDuration(4000);
      };
    } else {
      setActiveDuration(4000);
    }
  }, [currentIndex, flattenedStories]);

  useEffect(() => {
    if (!isPlaying || !flattenedStories.length) return;

    const timer = setTimeout(() => {
      swiperInstance?.slideNext();
    }, activeDuration);
    return () => clearTimeout(timer);
  }, [activeDuration, swiperInstance, currentIndex, isPlaying]);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setProgressPaused(true);
    } else {
      videoRef.current.play();
      setProgressPaused(false);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <>
      <div className={styles.storyWrapper}>
        <div className={styles.progressRow}>
          {flattenedStories.map((_, idx) => (
            <div key={idx} className={styles.progressContainer}>
              <div
                className={`${styles.progressFill} ${
                  idx === currentIndex ? styles.animateFill : ""
                }`}
                style={{
                  animationDuration:
                    idx === currentIndex ? `${activeDuration}ms` : "0ms",
                  animationPlayState: progressPaused ? "paused" : "running",
                  width: idx < currentIndex ? "100%" : undefined,
                }}
              ></div>
            </div>
          ))}
        </div>

        <Swiper
          modules={[Navigation]}
          loop={false}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.activeIndex);

            const allVideos = swiper.slides.flatMap((slide) =>
              Array.from(slide.querySelectorAll("video"))
            );
            allVideos.forEach((vid) => {
              vid.pause();
              vid.muted = true;
            });

            const activeVideo =
              swiper.slides[swiper.activeIndex]?.querySelector("video");
            if (activeVideo) {
              activeVideo.currentTime = 0;
              activeVideo.muted = isMuted;
              activeVideo
                .play()
                .catch((err) => console.warn("Auto-play failed", err));
            }
          }}
          className={styles.storySwiper}
        >
          {flattenedStories.map((story, idx) => {
            if (!story) {
              return (
                <SwiperSlide key={idx}>
                  <div className={styles.storySlide}>
                    <div className={styles.storyPlaceholder}>
                      <p>Story content not available (null story)</p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }

            const video = story.video_versions?.[0]?.url;
            const image =
              story.image_versions2?.candidates?.[0]?.url ||
              story.display_resources?.[0]?.src ||
              story.image_versions?.standard_resolution?.url;

            return (
              <SwiperSlide key={idx}>
                <div className={styles.storySlide}>
                  {video ? (
                    <video
                      ref={idx === currentIndex ? videoRef : null}
                      src={video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className={styles.storyMedia}
                      onError={(e) => {
                        console.error("Video failed to load", video, e);
                      }}
                    />
                  ) : image ? (
                    <img
                      src={image}
                      alt={`story-${idx}`}
                      className={styles.storyMedia}
                      onError={(e) => {
                        const altImage =
                          story.display_resources?.[1]?.src ||
                          story.image_versions?.low_resolution?.url;
                        if (altImage && e.target.src !== altImage) {
                          e.target.src = altImage;
                        }
                      }}
                      onLoad={() =>
                        console.log("Image loaded successfully", image)
                      }
                    />
                  ) : (
                    <div className={styles.storyPlaceholder}>
                      <p>No media URL found</p>
                    </div>
                  )}

                  <div className={styles.storyTopBar}>
                    <div className={styles.storyUser}>
                      {story.user?.profile_pic_url && (
                        <img
                          src={story.user.profile_pic_url}
                          alt={story.user?.username || "User"}
                          className={styles.storyAvatar}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}
                      <span>@{story.user?.username || "unknown"}</span>
                    </div>

                    {video && idx === currentIndex && (
                      <div className={styles.controlButtons}>
                        <button
                          className={styles.muteButton}
                          onClick={toggleMute}
                        >
                          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                        </button>

                        <button
                          className={styles.playPauseButton}
                          onClick={togglePlayPause}
                        >
                          {isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <SwiperNavigation swiper={swiperInstance} />
      </div>

      {mediaUrls.length > 0 && (
        <div className={styles.shareDownload}>
          <button
            className={styles.shareBtn}
            onClick={() => handleDownloadAll(mediaUrls)}
          >
            Download All ({mediaUrls.length})
          </button>
          <button
            className={styles.shareBtn}
            onClick={() => handleShareAll(mediaUrls)}
          >
            Share All
          </button>
        </div>
      )}

      <MediaGallery mediaUrls={mediaUrls} />
    </>
  );
}
