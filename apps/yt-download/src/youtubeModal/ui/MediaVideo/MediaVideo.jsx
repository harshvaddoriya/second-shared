"use client";
import styles from "./MediaVideo.module.scss";

export default function MediaVideo({ src }) {
  if (!src) return <p>Invalid video URL</p>;

  return (
    <div className={styles.videoWrapper}>
      <video src={src} controls autoPlay muted loop className={styles.video}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
