"use client";

import { useState, useEffect } from "react";
import PostHeader from "@/youtubeModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/youtubeModal/ui/MediaSwiper/MediaSwiper";
import BottomActivityPanel from "@/youtubeModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/youtubeModal/ui/MediaGallery/MediaGallery";
import styles from "./PhotoPostPreview.module.scss";

export default function PhotoPostPreview({ userEnteredUrl, data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [postData, setPostData] = useState(data || null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setPostData(data);
      return;
    }
    if (!userEnteredUrl) return;

    (async () => {
      try {
        const res = await fetch(`/api/youtube`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: userEnteredUrl }),
        });

        const ytData = await res.json();

        if (res.ok) {
          setPostData({
            initials: ytData.initials,
            username: "Youtube User",
            fullName: "Youtube",
            title: ytData.title,
            mediaUrls: ytData.media?.map((item) => item.url) || [],
            likes: Math.floor(Math.random() * 1000),
            views: ytData.statistics?.viewCount || 0,
            ...ytData,
          });
        } else {
          throw new Error(ytData.error || "Something went wrong!");
        }
      } catch (err) {
        console.error("API call failed:", err);
        setError(err.message || "Unexpected error occurred");
      }
    })();
  }, [userEnteredUrl, data]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!postData) return <p>Loading...</p>;

  const mediaUrls = postData.mediaUrls || [];

  return (
    <>
      <div className={styles.post}>
        <PostHeader
          avatar={postData?.thumbnail}
          username={postData?.username || "Youtube User"}
          fullName={postData?.fullName || "Youtube User"}
          title={postData?.title}
          color="dark"
        />

        <MediaSwiper
          mediaUrls={mediaUrls}
          onSlideChange={(index) => setCurrentIndex(index)}
        />

        <BottomActivityPanel
          data={{
            ...postData,
            mediaUrls,
            currentMediaUrl: mediaUrls[currentIndex],
            currentMediaIndex: currentIndex,
          }}
        />
      </div>

      {mediaUrls.length > 0 && <MediaGallery mediaUrls={mediaUrls} />}
    </>
  );
}
