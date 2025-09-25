"use client";

import {
  MdOutlineRemoveRedEye,
  MdOutlineThumbUp,
  MdOutlineComment,
} from "shared/icons";
import PostCaption from "@/youtubeModal/ui/PostCaption/PostCaption";
import {
  handleShareAll,
  handleDownloadAll,
  handleDownload,
  handleShare,
} from "shared/hooks";
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

  // const handleDownloadClick = (url, index) => {
  //   if (!url || typeof url !== "string") return;

  //   const a = document.createElement("a");
  //   a.href =
  //     "https://rr4---sn-p5qs7nzr.googlevideo.com/videoplayback?expire=1758822488&ei=-CvVaK24B4TLsfIP3ryBiQg&ip=38.13.172.67&id=o-AM3O4Ag222VqpkWdKDaRiSP1WBs663sATEbVP5uAVX4k&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&met=1758800888%2C&mh=K9&mm=31%2C26&mn=sn-p5qs7nzr%2Csn-vgqsrnzz&ms=au%2Conr&mv=m&mvi=4&pl=22&rms=au%2Cau&initcwndbps=523750&bui=ATw7iSVFvVMBGQTSUAUEce9G2J7TvuCbEfYt8_kqAgg9UxWRjns-sBhu8KjKCRgOB1mD8bFedXYKACF4&spc=hcYD5efxicr8JYG0eQt7g6qzYP3hV88jG-pW3yvWJSO_ShcMfAg5gFPbI6RhanMAG6-3zg&vprv=1&svpuc=1&mime=video%2Fmp4&ns=m8vtw9mrC4U92baYtI-8YQUQ&rqh=1&gir=yes&clen=48202904&ratebypass=yes&dur=905.090&lmt=1758620704984639&mt=1758800233&fvip=1&fexp=51355912%2C51514994%2C51552689%2C51565116%2C51565682%2C51580968&c=WEB&sefc=1&txp=5538534&n=M13LwnWAbJWO3A&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgLaaAuKPmYN8AiM8uN638A1CikqUWgEcdUZ6jGn8dlOACIQCVv8b_ZHY-bwLaGoLA_Pq55MZVujRrObwE5fJlW3Uimw%3D%3D&lsparams=met%2Cmh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Crms%2Cinitcwndbps&lsig=APaTxxMwRgIhAI3nZD-FiJerCINnjhSMEiQR2hq8J0Zy3GGvl-RMEyj-AiEAqSGq7u062hY9iRc_G0z-jACqqTFjsa5HMIOT_1J1BFQ%3D&pot=MnQEBRYBYqAlowQ9gzyJJ_WL_SfJAjXgvn2MAEaM3ioXdVHTvm0n5VAhzREO7J3UAzFdknbBDMgBzsbGcoQCdH6iVw3N4Z79bmJ4UR_69thvyqOGsaYgrV1PPJ7qQ_vygL5nrq5YBJmZzAYjaKGI1Vd7YXkOOw%3D%3D&range=0-";
  //   a.download = `video-${index + 1}.mp4`;
  //   document.body.appendChild(a);
  //   a.click();
  //   a.remove();
  // };
  const handleDownloadClick = (url, index) => {
    if (!url || typeof url !== "string") return;

    const a = document.createElement("a");
    a.href = `/api/download?url=${encodeURIComponent(url)}`;
    a.download = `video-${index + 1}.mp4`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // const handleDownloadClick = (m, index) => {
  //   if (!m || typeof m !== "string") return;

  //   const a = document.createElement("a");
  //   a.href = m;
  //   a.download = `video-${index + 1}.mp4`;
  //   a.click();
  // };

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
            onClick={
              () => handleDownloadClick(currentMediaUrl, currentMediaIndex)
              // <a href="/"></a>
            }
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
