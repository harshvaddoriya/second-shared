import Image from "next/image";
import styles from "./PostHeader.module.scss";

export default function PostHeader({ username, avatar }) {
  const displayName = username || "Instagram_User";

  let initials = "";
  if (displayName === "Instagram_User") {
    initials = "IU";
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

      <span className={styles.username}>{displayName}</span>
    </div>
  );
}
