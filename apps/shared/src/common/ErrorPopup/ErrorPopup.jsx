"use client";

import styles from "./ErrorPopup.module.scss";
import { userFriendlyMessage } from "@/hooks/errorHelper/errorHelper";

export default function ErrorPopup({ message, onClose, onRetry }) {
  if (!message) return null;

  const displayMessage = userFriendlyMessage(message);

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.helpCard}>
        <h4>Get an Error</h4>
        <p>{displayMessage}</p>
        <div className={styles.helpActions}>
          {onRetry && (
            <button onClick={onRetry} className={styles.refreshButton}>
              <svg viewBox="0 0 16 16" className={styles.refreshIcon}>
                <path d="M8 3V1.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .4.2l2.6 3.5a.5.5 0 0 1 0 .6l-2.6 3.5a.5.5 0 0 1-.4.2.5.5 0 0 1-.5-.5V6a5 5 0 1 0 4.5 2.8.5.5 0 0 1 .9.4A6 6 0 1 1 8 3z" />
              </svg>
              Try again
            </button>
          )}
          <button onClick={onClose} className={styles.supportButton}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
