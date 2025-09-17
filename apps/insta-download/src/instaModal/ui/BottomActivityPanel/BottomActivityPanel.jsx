"use client";

import React from "react";
import PostCaption from "@/instaModal/ui/PostCaption/PostCaption";
import { formatNumber, handleShareAll, handleDownloadAll } from "shared/hooks";
import { FaRegHeart, FaRegComment, FaRegEye } from "@/icons/index";
import styles from "./BottomActivityPanel.module.scss";

export default function BottomActivityPanel({ data }) {
  const {
    mediaUrls = [],
    likes = 0,
    views = 0,
    username,
    caption,
    comments = 0,
  } = data;

  const hasLikes = likes > 0;
  const hasViews = views > 0;
  const hasComments = comments > 0;

  const formattedLikes = hasLikes ? formatNumber(likes) : null;
  const formattedViews = hasViews ? formatNumber(views) : null;
  const formattedComments = hasComments ? formatNumber(comments) : null;

  const hasCounters = formattedLikes || formattedViews || formattedComments;
  const hasCaption = Boolean(caption);

  return (
    <div className={styles.bottomAcitivity}>
      {(hasLikes || hasViews || hasComments) && (
        <div className={styles.acitivityDetails}>
          <div className={styles.insideAcitivity}>
            {hasLikes && <FaRegHeart />}
            {hasViews && <FaRegEye />}
            {hasComments && <FaRegComment />}
          </div>
        </div>
      )}

      {hasCounters && (
        <div className={styles.counterSection}>
          <p>
            {formattedLikes && `${formattedLikes} likes`}
            {formattedLikes && formattedViews ? " • " : ""}
            {formattedViews && `${formattedViews} views`}
            {(formattedLikes || formattedViews) && formattedComments
              ? " • "
              : ""}
            {formattedComments && `${formattedComments} comments`}
          </p>
        </div>
      )}

      {hasCaption && (
        <PostCaption
          username={username ?? "instagram_user"}
          caption={caption}
        />
      )}

      <div className={styles.shareDownload}>
        <button
          className={styles.shareBtn}
          onClick={() => handleDownloadAll(mediaUrls)}
        >
          {mediaUrls.length > 1
            ? `Download All (${mediaUrls.length})`
            : "Download"}
        </button>
        <button
          className={styles.shareBtn}
          onClick={() => handleShareAll(mediaUrls)}
        >
          {mediaUrls.length > 1 ? `Share All (${mediaUrls.length})` : "Share"}
        </button>
      </div>
    </div>
  );
}
