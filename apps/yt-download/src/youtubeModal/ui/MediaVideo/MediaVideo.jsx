"use client";
import { useRef, useEffect } from "react";

export default function MediaVideo({ videoUrl, audioUrl }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    const sync = () => {
      if (Math.abs(video.currentTime - audio.currentTime) > 0.3) {
        audio.currentTime = video.currentTime;
      }
    };

    video.addEventListener("play", () => audio.play());
    video.addEventListener("pause", () => audio.pause());
    video.addEventListener("seeking", sync);
    video.addEventListener("timeupdate", sync);

    return () => {
      video.removeEventListener("play", () => audio.play());
      video.removeEventListener("pause", () => audio.pause());
      video.removeEventListener("seeking", sync);
      video.removeEventListener("timeupdate", sync);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        controls
        style={{ width: "100%", borderRadius: "8px" }}
      />
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
}
