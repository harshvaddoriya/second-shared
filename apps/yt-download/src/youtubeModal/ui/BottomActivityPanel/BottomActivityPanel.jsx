"use client";

import React from "react";
import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import { handleShareAll, handleShare } from "shared/hooks";
import { sendGAEvent } from "@/utils/gaUtils";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const {
    mediaUrls = [],
    username,
    caption,
    currentMediaUrl,
    currentMediaIndex,
    likes,
    views,
    comments,
  } = data;

  const displayUsername = username || "Youtube_user";

  // Fixed download handler with blob approach
  const handleDownloadClick = async (single = true) => {
    if (single) {
      if (!currentMediaUrl) return;

      try {
        const res = await fetch(
          `/api/download?url=${encodeURIComponent(currentMediaUrl)}`
        );
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `video-1.mp4`;
        document.body.appendChild(a);
        a.click();
        a.remove();

        window.URL.revokeObjectURL(url);

        sendGAEvent("download_media_click", {
          mediaCount: 1,
          currentIndex: currentMediaIndex,
        });
      } catch (err) {
        console.error("Download failed:", err);
      }
    } else {
      for (let index = 0; index < mediaUrls.length; index++) {
        const url = mediaUrls[index];
        if (!url) continue;

        try {
          const res = await fetch(
            `/api/download?url=${encodeURIComponent(url)}`
          );
          const blob = await res.blob();
          const objectUrl = window.URL.createObjectURL(blob);

          const a = document.createElement("a");
          a.href = objectUrl;
          a.download = `video-${index + 1}.mp4`;
          document.body.appendChild(a);
          a.click();
          a.remove();

          window.URL.revokeObjectURL(objectUrl);
        } catch (err) {
          console.error(`Download failed for video ${index + 1}:`, err);
        }
      }

      sendGAEvent("download_media_click", {
        mediaCount: mediaUrls.length,
        currentIndex: -1,
      });
    }
  };

  const handleShareClick = () => {
    sendGAEvent("share_media_click", { mediaCount: mediaUrls.length });
    if (mediaUrls.length > 1) {
      handleShareAll(mediaUrls);
    } else {
      handleShare(currentMediaUrl);
    }
  };

  return (
    <div className={styles.bottomAcitivity}>
      <div className={styles.counterSection}>
        {caption && <PostCaption caption={caption} />}
        {(likes !== undefined ||
          views !== undefined ||
          comments !== undefined) && (
          <div className={styles.stats}>
            {likes !== undefined && (
              <span>
                <MdOutlineThumbUp size={18} /> {likes.toLocaleString()}
              </span>
            )}
            {views !== undefined && (
              <span>
                <MdOutlineRemoveRedEye size={18} /> {views.toLocaleString()}
              </span>
            )}
            {comments !== undefined && (
              <span>
                <MdOutlineComment size={18} /> {comments.toLocaleString()}
              </span>
            )}
          </div>
        )}

        <div className={styles.shareDownload}>
          <button
            className={styles.shareBtn}
            onClick={() => handleDownloadClick(mediaUrls.length === 1)}
          >
            {mediaUrls.length > 1
              ? `Download All (${mediaUrls.length})`
              : "Download"}
          </button>
          <button className={styles.shareBtn} onClick={handleShareClick}>
            {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React from "react";
// import {
//   MdOutlineRemoveRedEye,
//   MdOutlineThumbUp,
//   MdOutlineComment,
// } from "shared/icons";
// import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
// import {
//   handleShareAll,
//   handleDownloadAll,
//   handleDownload,
//   handleShare,
// } from "shared/hooks";
// import { sendGAEvent } from "@/utils/gaUtils";
// import styles from "./BottomActivityPanel.module.scss";

// export default function BottomActivityPanel({ data }) {
//   const {
//     mediaUrls = [],
//     username,
//     caption,
//     currentMediaUrl,
//     currentMediaIndex,
//     likes,
//     views,
//     comments,
//   } = data;

//   const displayUsername = username || "Youtube_user";

//   const handleDownloadClick = (single = true) => {
//     if (single) {
//       if (!currentMediaUrl) return;
//       const a = document.createElement("a");
//       a.href = `/api/download?url=${encodeURIComponent(currentMediaUrl)}`;
//       a.download = `video-1.mp4`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       sendGAEvent("download_media_click", {
//         mediaCount: 1,
//         currentIndex: currentMediaIndex,
//       });
//     } else {
//       mediaUrls.forEach((url, index) => {
//         if (!url) return;
//         const a = document.createElement("a");
//         a.href = `/api/download?url=${encodeURIComponent(url)}`;
//         a.download = `video-${index + 1}.mp4`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       });
//       sendGAEvent("download_media_click", {
//         mediaCount: mediaUrls.length,
//         currentIndex: -1,
//       });
//     }
//   };

//   const handleShareClick = () => {
//     sendGAEvent("share_media_click", { mediaCount: mediaUrls.length });
//     if (mediaUrls.length > 1) {
//       handleShareAll(mediaUrls);
//     } else {
//       handleShare(currentMediaUrl);
//     }
//   };

//   return (
//     <div className={styles.bottomAcitivity}>
//       <div className={styles.counterSection}>
//         {caption && <PostCaption caption={caption} />}
//         {(likes !== undefined ||
//           views !== undefined ||
//           comments !== undefined) && (
//           <div className={styles.stats}>
//             {likes !== undefined && (
//               <span>
//                 <MdOutlineThumbUp size={18} /> {likes.toLocaleString()}
//               </span>
//             )}
//             {views !== undefined && (
//               <span>
//                 <MdOutlineRemoveRedEye size={18} /> {views.toLocaleString()}
//               </span>
//             )}
//             {comments !== undefined && (
//               <span>
//                 <MdOutlineComment size={18} /> {comments.toLocaleString()}
//               </span>
//             )}
//           </div>
//         )}

//         <div className={styles.shareDownload}>
//           <button
//             className={styles.shareBtn}
//             onClick={() => handleDownloadClick(mediaUrls.length === 1)}
//           >
//             {mediaUrls.length > 1
//               ? `Download All (${mediaUrls.length})`
//               : "Download"}
//           </button>
//           <button className={styles.shareBtn} onClick={handleShareClick}>
//             {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
