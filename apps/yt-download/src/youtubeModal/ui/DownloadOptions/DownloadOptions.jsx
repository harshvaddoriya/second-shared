"use client";

import styles from "./DownloadOptions.module.scss";

export default function DownloadOptions({ format, setFormat }) {
  return (
    <div className={styles.downloadOptions}>
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className={styles.select}
      >
        <option value="mp4">MP4</option>
        <option value="mp3">MP3</option>
      </select>
    </div>
  );
}
