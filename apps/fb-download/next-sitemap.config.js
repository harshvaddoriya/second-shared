/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || "https://second-shared-fb-download.vercel.app/",
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: "daily",
    priority: 0.7,
    exclude: ["/404", "/500"],
    robotsTxtOptions: {
        policies: [{ userAgent: "*", allow: "/" }],
    },
};

export default config;
