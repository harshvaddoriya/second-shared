import Image from "next/image";
import styles from "./PostHeader.module.scss";

export default function PostHeader({
  username,
  avatar,

  title,
  color = "dark",
}) {
  const displayName = username || "Youtube_User";

  let initials = "";
  if (displayName === "Youtube_User") {
    initials = "YTU";
  } else {
    initials = displayName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <div className={styles.header}>
      {title && <h3 className={styles.videoTitle}>{title}</h3>}
      <div className={styles.heading}>
        {avatar ? (
          <Image
            src={avatar}
            alt={displayName}
            width={35}
            height={35}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.initials}>{initials}</div>
        )}

        <span
          className={`${styles.username} ${
            color === "light" ? styles.light : styles.dark
          }`}
        >
          {displayName}
        </span>
      </div>
    </div>
  );
}
