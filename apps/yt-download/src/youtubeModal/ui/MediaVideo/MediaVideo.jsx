"use client";
import styles from "./MediaVideo.module.scss";

export default function MediaVideo({ src }) {
  if (!src) return <p>Invalid video URL</p>;

  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={`${src}?autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
