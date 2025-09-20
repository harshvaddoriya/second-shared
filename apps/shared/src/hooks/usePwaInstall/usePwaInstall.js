"use client";

import { useEffect, useState } from "react";

export function usePwaInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const checkInstalled = () => {
            if (window.matchMedia("(display-mode: standalone)").matches) return true;
            if (window.navigator.standalone === true) return true; // iOS Safari
            return false;
        };
        if (checkInstalled()) {
            setIsInstalled(true);
            return;
        }

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const install = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setIsInstalled(true);
            }
            setDeferredPrompt(null);
            setIsInstallable(false);
        } else {
            alert("Please install this app using your browser options.");
        }
    };

    return { isInstallable, isInstalled, install };
}
