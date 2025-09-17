import Link from "next/link";
import Image from "next/image";
import { FaDownload } from "@/icons/index";
import styles from "./AppPromotion.module.scss";

export default function AppPromotion({ mobileImg, appHeight = 400 }) {
  return (
    <section
      className={styles.promo}
      aria-labelledby="app-promo-heading"
      role="region"
    >
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.imageWrapper}>
            {mobileImg && (
              <Image
                src={mobileImg}
                alt="Mobile phone displaying Instagram app interface with downloaded content"
                height={appHeight}
                width={500}
                className={styles.phoneImage}
                priority
              />
            )}
          </div>
        </div>
        <div className={styles.content}>
          <h2 id="app-promo-heading">Download with mobile app</h2>
          <p>
            Download your favorite photos, videos Reels and story in a single
            tap!Enjoy fast, HD downloads free of watermarks with our app—an
            excellent option for Social Media content.
          </p>
          <Link href="/">
            <button
              className={styles.installBtn}
              type="button"
              aria-label="Install mobile app for downloading Instagram content"
            >
              <FaDownload size={18} />
              Install now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
