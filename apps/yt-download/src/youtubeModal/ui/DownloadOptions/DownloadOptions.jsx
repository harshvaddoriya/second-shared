"use client";

import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "shared/icons";
import styles from "./DownloadOptions.module.scss";

export default function DownloadOptions({ format, setFormat, videoId }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const fetchOptions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/downloadOptions?videoId=${videoId}`);
        const data = await res.json(); // [{id, type, quality}, ...]

        // Remove duplicate qualities, keep first occurrence
        const uniqueByQuality = [];
        const seen = new Set();
        data.forEach((item) => {
          if (!seen.has(item.quality)) {
            seen.add(item.quality);
            uniqueByQuality.push(item);
          }
        });

        // Sort descending by quality (assume numeric)
        uniqueByQuality.sort((a, b) => {
          const qa = parseInt(a.quality) || 0;
          const qb = parseInt(b.quality) || 0;
          return qb - qa;
        });

        setOptions(uniqueByQuality);

        // Set initial format to highest quality
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
            ? `${format.type}-${format.quality || ""}`
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
              <span className={styles.type}>{opt.type}</span>
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
