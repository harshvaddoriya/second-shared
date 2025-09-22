"use client";
import Image from "next/image";
import { FaDownload } from "@/icons";
import styles from "./AppPromotion.module.scss";
import { usePwaInstall } from "@/hooks";

export default function AppPromotion({
  mobileImg,
  appHeight = 400,
  promoText = "",
}) {
  const { isInstallable, install } = usePwaInstall();

  return (
    <section
      className={styles.promo}
      aria-labelledby="app-promo-heading"
      role="region"
    >
      <div className={styles.container}>
        <div className={styles.leftSection}>
          {mobileImg && (
            <div className={styles.imageWrapper}>
              <Image
                src={mobileImg}
                alt="Mobile phone displaying app interface"
                height={appHeight}
                width={500}
                className={styles.phoneImage}
                priority
              />
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h2 id="app-promo-heading">Download our mobile app</h2>
          <p>{promoText}</p>

          <button
            className={styles.installBtn}
            type="button"
            aria-label="Install mobile app"
            onClick={install}
            disabled={!isInstallable}
          >
            <FaDownload size={18} />
            Install now
          </button>
        </div>
      </div>
    </section>
  );
}
