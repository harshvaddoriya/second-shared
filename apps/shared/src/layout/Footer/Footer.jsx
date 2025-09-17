"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer({ logo, mainLinks = [], legalLinks = [], appName='InstaDl'}) {
  const currentYear = new Date().getFullYear();

  const renderLinks = (links) =>
    links.map((link, index) => (
      <span key={link.href} className={styles.linkWrapper}>
        <Link href={link.href} className={styles.link}>
          {link.label}
        </Link>
        {index < links.length - 1 && (
          <span className={styles.separator} aria-hidden="true">
            |
          </span>
        )}
      </span>
    ));

  return (
    <footer className={styles.footerRoot}>
      <div className={styles.container}>
        {logo && (
          <div className={styles.logo}>
            <Link href="/" aria-label="Homepage">
              <Image src={logo} alt="Logo" width={100} height={25} priority />
            </Link>
          </div>
        )}

        {mainLinks.length > 0 && (
          <div className={styles.navLinks} aria-label="Main navigation">
            {renderLinks(mainLinks)}
          </div>
        )}

        {legalLinks.length > 0 && (
          <div className={styles.footerLinks} aria-label="Legal and support">
            {renderLinks(legalLinks)}
          </div>
        )}
      </div>

      <div className={styles.copyright}>
        <span
          aria-label={`Copyright ${currentYear} Company. All rights reserved.`}
        >
          © {currentYear} {appName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
