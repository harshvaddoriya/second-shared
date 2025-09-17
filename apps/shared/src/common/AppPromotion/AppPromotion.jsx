"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaDownload } from "@/icons/index";
import styles from "./AppPromotion.module.scss";

export default function AppPromotion({ mobileImg, appHeight = 400 }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIos(/iphone|ipad|ipod/.test(userAgent));

    // Listen for beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else if (isIos) {
      alert("To install this app on iOS: Tap Share → Add to Home Screen");
    } else {
      alert("PWA installation is not supported on this browser.");
    }
  };

  return (
    <section className={styles.promo} aria-labelledby="app-promo-heading">
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
          <p>
            Download your favorite photos, videos, Reels, and stories in a
            single tap! Enjoy fast, HD downloads free of watermarks with our
            app.
          </p>

          <button
            className={styles.installBtn}
            type="button"
            aria-label="Install mobile app"
            onClick={handleInstallClick}
            disabled={!isInstallable && !isIos}
          >
            <FaDownload size={18} />
            {isInstallable
              ? "Install Now"
              : isIos
              ? "Tap Share → Add to Home Screen"
              : "Install not supported"}
          </button>
        </div>
      </div>
    </section>
  );
}
