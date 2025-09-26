"use client";
import styles from "./MediaVideo.module.scss";

export default function MediaVideo({ src }) {
  if (!src) return <p>Invalid video URL</p>;

  return (
    <div className={styles.videoWrapper}>
      <video
        src={src}
        autoPlay
        muted
        controls
        playsInline
        style={{ width: "100%", borderRadius: "8px" }}
      />
    </div>
  );
}
