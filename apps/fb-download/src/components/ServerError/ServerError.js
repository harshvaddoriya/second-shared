"use client";

import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import {
    Header, Footer
} from "@/shared";
import Images from "../../../public/images/index";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";

export default function Custom500() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => {
            document.body.classList.add(styles.loaded);
        }, 100);
        return () => clearTimeout(timer);
    }, []);


    if (!mounted) return null;

    return (
        <div className={styles.pageContainer}>
            <Header logo={Images.Logo} />
            <main className={styles.mainContent}>
                <div className={styles.errorContainer}>
                    <div className={styles.illustrationContainer}>
                        <div className={styles.backgroundElements}>
                            <div className={styles.floatingElement} style={{ '--delay': '0s' }}>💙</div>
                            <div className={styles.floatingElement} style={{ '--delay': '1s' }}>👍</div>
                            <div className={styles.floatingElement} style={{ '--delay': '2s' }}>❤️</div>
                            <div className={styles.floatingElement} style={{ '--delay': '0.5s' }}>😢</div>
                            <div className={styles.floatingElement} style={{ '--delay': '1.5s' }}>🔍</div>
                            <div className={styles.floatingElement} style={{ '--delay': '2.5s' }}>📱</div>
                        </div>

                        <div className={styles.mainIllustration}>
                            <svg viewBox="0 0 400 300" className={styles.errorSvg}>
                                <defs>
                                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="rgba(66, 103, 178, 0.2)" />
                                        <stop offset="100%" stopColor="rgba(66, 103, 178, 0)" />
                                    </radialGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <circle cx="200" cy="150" r="120" fill="url(#glowGradient)" />

                                <rect x="150" y="80" width="100" height="140" rx="12" fill="#2d4f99" />
                                <rect x="155" y="85" width="90" height="130" rx="8" fill="#E8F4FD" />

                                <path d="M160 100 L240 180" stroke="#ff6b6b" strokeWidth="2" opacity="0.7" />
                                <path d="M180 85 L220 200" stroke="#ff6b6b" strokeWidth="1.5" opacity="0.6" />
                                <path d="M170 120 L235 160" stroke="#ff6b6b" strokeWidth="1" opacity="0.5" />

                                <g transform="translate(175, 120)">
                                    <circle cx="25" cy="25" r="20" fill="#4267B2" opacity="0.3" />
                                    <path d="M15 45V25h5v-3c0-4 2-6 6-6h4v5h-3c-1 0-2 1-2 2v2h5l-1 5h-4v20h-5z" fill="#4267B2" opacity="0.6" />
                                </g>


                                <g className={styles.sadFace}>
                                    <circle cx="200" cy="240" r="25" fill="#FFE4B5" stroke="#4267B2" strokeWidth="2" />
                                    <circle cx="190" cy="230" r="2" fill="#4267B2" />
                                    <circle cx="210" cy="230" r="2" fill="#4267B2" />
                                    <path d="M185 250 Q200 245 215 250" stroke="#4267B2" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </g>

                                <text x="80" y="60" className={styles.floatingNumber} fill="#4267B2" opacity="0.6">5</text>
                                <text x="320" y="80" className={styles.floatingNumber} fill="#4267B2" opacity="0.6">0</text>
                                <text x="300" y="200" className={styles.floatingNumber} fill="#4267B2" opacity="0.6">0</text>
                            </svg>
                        </div>

                        <div className={styles.glitchText}>
                            <span className={styles.glitch} data-text="500">500</span>
                        </div>
                    </div>

                    <div className={styles.contentSection}>
                        <div className={styles.errorContent}>
                            <h1 className={styles.errorTitle}>
                                Internal Server Error
                            </h1>
                            <p className={styles.errorDescription}>
                                Oops! Something went wrong on our server.
                                Please try again later, or contact support if the problem persists.
                            </p>

                            <div className={styles.helpSection}>
                                <div className={styles.helpCard}>
                                    <h4>Need help?</h4>
                                    <p>If you think this is a mistake, try refreshing the page or contact our support team.</p>
                                    <div className={styles.helpActions}>
                                        <button
                                            onClick={() => window.location.href = '/'}
                                            className={styles.supportButton}
                                        >
                                            Back to Home
                                        </button>

                                        <button
                                            onClick={() => window.location.reload()}
                                            className={styles.refreshButton}
                                        >
                                            <svg viewBox="0 0 16 16" className={styles.refreshIcon}>
                                                <path d="M8 3V1.5a.5.5 0 0 1 .5-.5.5.5 0 0 1 .4.2l2.6 3.5a.5.5 0 0 1 0 .6l-2.6 3.5a.5.5 0 0 1-.4.2.5.5 0 0 1-.5-.5V6a5 5 0 1 0 4.5 2.8.5.5 0 0 1 .9.4A6 6 0 1 1 8 3z" />
                                            </svg>
                                            Refresh Page
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer
                logo={Images.Logo}
                mainLinks={mainNavLinks}
                legalLinks={legalLinks}
                logoWidth={180}
                logoHeight={24}
                appName="FacebookDl"
            />
        </div>
    );
};



