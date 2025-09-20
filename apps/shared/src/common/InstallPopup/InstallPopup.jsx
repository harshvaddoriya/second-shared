"use client";
import React from "react";
import styles from "./styles.module.scss";
import { usePwaInstall } from "@/hooks/usePwaInstall/usePwaInstall";

export default function InstallPopup({
  isVisible,
  onClose,
  buttonColor = "#e63946",
  hoverColor = "#d62828",
}) {
  const { isInstallable, install } = usePwaInstall();

  if (!isVisible || !isInstallable) return null;

  return (
    <div className={styles.overlay}>
      <div
        className={styles.popup}
        style={{ "--btn-color": buttonColor, "--btn-hover": hoverColor }}
      >
        <h2>Download our App</h2>
        <p>Download faster and more conveniently with our mobile/web app!</p>
        <div className={styles.actions}>
          <button onClick={install} className={styles.installBtn}>
            INSTALL APP
          </button>
          <button onClick={onClose} className={styles.laterBtn}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
