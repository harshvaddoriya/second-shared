"use client"

import React from "react";
import styles from "./styles.module.scss";

export const metadata = {
  title: "Contact - InstaDL",
  description: "Get in touch with the InstaDL support team.",
};

export default function Page() {
  const headingId = React.useId();

  return (
    <main className={styles.ContactWrapper}>
      <div className={styles.container}>
        <h3 id={headingId} className={styles.heading}>
          Contact Us
        </h3>
        <div className={styles.content} aria-labelledby={headingId}>
          <p>
            To know more about the ways we can help, don’t hesitate to get in touch with our team.
          </p>
          <p>
            Contact our team via email:{" "}
            <a
              href="mailto:resilient.tech001@gmail.com"
              className={styles.link}
              aria-label="Send email to support at instadl.app"
            >
              resilient.tech001@gmail.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
