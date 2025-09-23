// import styles from "./MediaVideo.module.scss";

// export default function MediaVideo({ src }) {
//   return (
//     <video
//       className={styles.video}
//       controls
//       playsInline
//       muted
//       autoPlay
//       loop
//       preload="metadata"
//     >
//       <source src={src} type="video/mp4" />
//       Your browser does not support the video tag.
//     </video>
//   );
// }
"use client";
import styles from "./MediaVideo.module.scss";

export default function MediaVideo({ src }) {
  if (!src) return <p>Invalid video URL</p>;

  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={src}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
