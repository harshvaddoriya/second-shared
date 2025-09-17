"use client";

import { useState, useEffect } from "react";
import PostHeader from "@/facebookModal/ui/PostHeader/PostHeader";
import MediaSwiper from "@/facebookModal/ui/MediaSwiper/MediaSwiper";
import BottomActivityPanel from "@/facebookModal/ui/BottomActivityPanel/BottomActivityPanel";
import MediaGallery from "@/facebookModal/ui/MediaGallery/MediaGallery";
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
        if (
          userEnteredUrl.includes("facebook.com") ||
          userEnteredUrl.includes("fb.watch")
        ) {
          const mediaType = userEnteredUrl.includes("/videos/")
            ? "video"
            : "photo";
          const res = await fetch(`/api/facebook/${mediaType}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: userEnteredUrl }),
          });
          const fbData = await res.json();

          if (res.ok) {
            setPostData({
              initials: fbData.initials,
              username: "Facebook User",
              fullName: "Facebook",
              title: fbData.title,
              mediaUrls: fbData.media?.map((item) => item.url) || [
                fbData.media?.[0]?.url,
              ],
              ...fbData,
              likes: Math.floor(Math.random() * 1000),
              views: Math.floor(Math.random() * 10000),
            });
          } else {
            throw new Error(fbData.error || "Something went wrong!");
          }
        }
      } catch (err) {
        console.error("API call failed:", err);
        setError(err.message || "Unexpected error occurred");
      }
    })();
  }, [userEnteredUrl, data]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!postData) return <p>Loading...</p>;

  const mediaUrls =
    postData.mediaUrls ||
    (postData.media ? postData.media.map((item) => item.url) : []);

  return (
    <>
      <div className={styles.post}>
        <PostHeader
          avatar={postData?.initials}
          username={postData?.username || "Facebook User"}
          fullName={postData?.fullName || "Facebook User"}
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
