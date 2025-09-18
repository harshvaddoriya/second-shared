'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-ZX6Z7ZRE1R';

export default function Analytics() {
    useEffect(() => {
        if (!window.gtag) return;


        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: window.location.pathname,
        });

    }, []);

    return null;
}
