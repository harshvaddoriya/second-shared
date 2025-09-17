"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header({ logo }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="Homepage">
          {logo && <Image src={logo} alt="Logo" className={styles.logoImage} />}
        </Link>
        <nav aria-label="Header navigation">
          <Link href="/faq" className={styles.link}>
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
