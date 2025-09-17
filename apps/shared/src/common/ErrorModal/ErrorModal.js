import React from "react";
import styles from "./styles.module.scss";

export default function ErrorModal({ errorMessage, onRetry, onClose }) {
    if (!errorMessage) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{errorMessage}</p>
                <div className={styles.actions}>
                    {onRetry && <button onClick={onRetry}>Retry</button>}
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

