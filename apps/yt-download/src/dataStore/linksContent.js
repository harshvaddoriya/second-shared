import { FaVideo, FaImage, FaRegCalendarAlt, MdOutlineSlideshow } from "shared/icons";

const mainNavLinks = [
    {
        href: "/video",
        label: "Video",
        icon: <FaVideo />,
    },
    {
        href: "/photo",
        label: "Post",
        icon: <FaImage />,
    },
    {
        href: "/shorts",
        label: "Shorts",
        icon: <FaRegCalendarAlt />,
    },
];

const legalLinks = [
    { href: "/contact-us", label: "Contact" },
    { href: "/legal/privacy-policy", label: "Privacy Policy" },
    { href: "/legal/terms-and-conditions", label: "Terms & Conditions" },
    { href: "https://instagram-media-download.vercel.app/", label: "InstaDl" },
];
export { mainNavLinks, legalLinks };
