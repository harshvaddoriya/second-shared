"use client";

import React from "react";
import styles from "./styles.module.scss";

export default function WhyUs({ title, description, features }) {
  const titleId = React.useId();

  return (
    <section className={styles.wrapper} aria-labelledby={titleId}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 id={titleId} className={styles.title}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map(({ icon: Icon, heading, text }, index) => (
            <article key={index} className={styles.feature}>
              <Icon
                aria-hidden="true"
                focusable="false"
                className={styles.icon}
              />
              <h4 className={styles.featureTitle}>{heading}</h4>
              <p className={styles.featureDescription}>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
