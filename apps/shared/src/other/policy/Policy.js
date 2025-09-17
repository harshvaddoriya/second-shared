"use client"

import React from "react";
import styles from "./styles.module.scss";

export default function Policy({ pageData }) {

  const titleId = React.useId();

  if (!pageData) return <div className={styles.wrapper}>Page not found</div>;

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h3 id={titleId} className={styles.title}>{pageData.title}</h3>
          <p className={styles.description}>{pageData.description}</p>
        </header>

        <div className={styles.content} aria-labelledby={titleId}>
          {pageData.sections.map((section, idx) => (
            <div key={idx} className={styles.sectionContent}>
              <h3>{section.heading}</h3>
              <p>{section.text}</p>
              {section.list && (
                <ul>
                  {section.list.map((item, liIdx) => (
                    <li key={liIdx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <section className={styles.contact}>
            <h2>Contact Us</h2>
            <p>If you have any questions, please contact us:</p>
            <p>
              Email:{" "}
              <a
                href="mailto:resilient.tech001@gmail.com"
                className={styles.contactLink}
              >
                resilient.tech001@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
