"use client";

import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "shared/icons";
import styles from "./DownloadOptions.module.scss";

export default function DownloadOptions({ format, setFormat, videoId }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayType = (type) =>
    String(type).toLowerCase() === "audio" ? "mp3" : "mp4";

  useEffect(() => {
    if (!videoId) return;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/downloadOptions?videoId=${videoId}`);
        const data = await res.json();

        const audioOption = data.firstAudio
          ? {
              id: data.firstAudio.id,
              type: "audio",
              quality: data.firstAudio.quality || "128kbps",
            }
          : null;

        const allOptions = audioOption ? [...data, audioOption] : data;

        const uniqueByQuality = [];
        const seen = new Set();
        allOptions.forEach((item) => {
          if (!seen.has(item.quality + item.type)) {
            seen.add(item.quality + item.type);
            uniqueByQuality.push(item);
          }
        });

        uniqueByQuality.sort((a, b) => {
          const qa = parseInt(a.quality) || 0;
          const qb = parseInt(b.quality) || 0;
          return qb - qa;
        });

        setOptions(uniqueByQuality);

        if (!format && uniqueByQuality.length > 0) {
          setFormat(uniqueByQuality[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [videoId]);

  const handleSelect = (option) => {
    setFormat(option);
    setOpen(false);
  };

  return (
    <div className={styles.downloadOptions}>
      <div className={styles.dropdown} onClick={() => setOpen((prev) => !prev)}>
        <span>
          {format
            ? `${displayType(format.type)}-${format.quality || ""}`
            : loading
            ? "Loading..."
            : "Select Format"}
        </span>
        <span className={styles.arrow}>
          {open ? <FiChevronUp /> : <FiChevronDown />}
        </span>
      </div>

      {open && !loading && (
        <div className={styles.dropdownMenu}>
          {options.map((opt) => (
            <div
              key={opt.id}
              className={styles.option}
              onClick={() => handleSelect(opt)}
            >
              <span className={styles.type}>{displayType(opt.type)}</span>
              {opt.quality && (
                <span className={styles.quality}>{opt.quality}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
