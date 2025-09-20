import dynamic from "next/dynamic";

//------------------ layout----------------//
export const Header = dynamic(
    () => import("shared/layout").then((mod) => mod.Header),
    { ssr: false }
);

export const Footer = dynamic(
    () => import("shared/layout").then((mod) => mod.Footer),
    { ssr: false }
);

// ----------------components---------------//
export const Downloader = dynamic(
    () => import("shared/components").then((mod) => mod.Downloader),
    { ssr: false }
);

export const MediaPreview = dynamic(
    () => import("shared/components").then((mod) => mod.MediaPreview),
    { ssr: false }
);

export const WhyUs = dynamic(
    () => import("shared/components").then((mod) => mod.WhyUs),
    { ssr: false }
);

// --------------------common---------------//
export const AboutProcess = dynamic(
    () => import("shared/common").then((mod) => mod.AboutProcess),
    { ssr: false }
);

export const DownloadDescription = dynamic(
    () => import("shared/common").then((mod) => mod.DownloadDescription),
    { ssr: false }
);

export const AppPromotion = dynamic(
    () => import("shared/common").then((mod) => mod.AppPromotion),
    { ssr: false }
);

export const FaqSection = dynamic(
    () => import("shared/common").then((mod) => mod.Faq),
    { ssr: false }
);

export const ErrorModal = dynamic(
    () => import("shared/common").then((mod) => mod.ErrorModal),
    { ssr: false }
);

export const InstallPopup = dynamic(
    () => import("shared/common").then((mod) => mod.InstallPopup),
    { ssr: false }
)


// --------------other--------------------- //
export const Contact = dynamic(
    () => import("shared/other").then((mod) => mod.Contact),
    { ssr: false }
);
export const Policy = dynamic(
    () => import("shared/other").then((mod) => mod.Policy),
    { ssr: false }
);
