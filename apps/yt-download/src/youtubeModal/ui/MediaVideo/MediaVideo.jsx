"use client";
import { useRef } from "react";
import { useAudioVideoSync } from "@/utils/useAudioVideoSync";

export default function MediaVideo({ videoUrl, audioUrl, className }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useAudioVideoSync(videoRef, audioRef);

  return (
    <div style={{ width: "100%" }}>
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        loop
        playsInline
        className={className}
        style={{ width: "100%", borderRadius: "8px" }}
      />
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}
    </div>
  );
}
