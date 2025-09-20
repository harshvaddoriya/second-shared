"use client";

import { useState } from "react";
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Pagination,
} from "@/youtubeModal/ui/CustomSwiper/CustomSwiper";
import SwiperNavigation from "@/youtubeModal/ui/SwiperNavigation/SwiperNavigation";
import { isVideo } from "@/utils/constHelper";
import MediaImage from "@/youtubeModal/ui/MediaImage/MediaImage";
import MediaVideo from "@/youtubeModal/ui/MediaVideo/MediaVideo";
import styles from "./MediaSwiper.module.scss";

export default function MediaSwiper({ mediaUrls = [], onSlideChange }) {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
      >
        {mediaUrls.filter(Boolean).map((url, idx) => (
          <SwiperSlide key={idx}>
            <div className={styles.imageWrapper}>
              {isVideo(url) ? (
                <MediaVideo src={url} />
              ) : (
                <MediaImage src={url} alt={`Slide ${idx + 1}`} />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperNavigation swiper={swiperInstance} />
    </div>
  );
}
