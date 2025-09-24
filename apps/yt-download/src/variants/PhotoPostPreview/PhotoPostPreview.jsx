import { useState, useEffect } from "react";
import { downloadYoutubeMedia } from "@/utils/api";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/youtubeModal/ui/MediaSwiper/MediaSwiper";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";
import styles from "./PhotoPostPreview.module.scss";

export default function PhotoPostPreview({ userEnteredUrl }) {
  const [data, setData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userEnteredUrl) return;

    (async () => {
      try {
        const ytData = await downloadYoutubeMedia(userEnteredUrl);
        setData(ytData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch YouTube data");
      }
    })();
  }, [userEnteredUrl]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!data) return <p>Loading...</p>;

  const { media, detectedType, title, thumbnail } = data;
  const mediaUrls = media?.map((m) => m.url) || [];

  return (
    <div className={styles.post}>
      <PostHeader
        avatar={thumbnail}
        username="Youtube User"
        fullName="Youtube"
        title={title}
        color="dark"
      />

      {detectedType === "post" ? (
        <MediaSwiper mediaUrls={mediaUrls} onSlideChange={setCurrentIndex} />
      ) : (
        <iframe
          src={mediaUrls[0]}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.videoIframe}
        />
      )}

      <BottomActivityPanel
        data={{
          ...data,
          mediaUrls,
          currentMediaUrl: mediaUrls[currentIndex],
          currentMediaIndex: currentIndex,
        }}
      />

      {mediaUrls.length > 0 && <MediaGallery mediaUrls={mediaUrls} />}
    </div>
  );
}
