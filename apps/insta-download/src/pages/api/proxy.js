export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Range, Content-Type");
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: "Missing URL parameter" });
    }

    if (!targetUrl.includes("scontent") && !targetUrl.includes("instagram")) {
        return res.status(400).json({ error: "Invalid URL" });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                "User-Agent":
                    req.headers["user-agent"] ||
                    "Mozilla/5.0 (compatible; InstagramDownloader/1.0)",
                Referer: "https://www.instagram.com/",
            },
        });

        if (!response.ok) {
            throw new Error(`Upstream server responded with ${response.status}`);
        }

        const contentType =
            response.headers.get("content-type") || "application/octet-stream";

        const ext = contentType.includes("jpeg")
            ? "jpg"
            : contentType.includes("png")
                ? "png"
                : contentType.includes("mp4")
                    ? "mp4"
                    : "bin";

        res.setHeader("Content-Type", contentType);
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="media.${ext}"`
        );

        const buffer = Buffer.from(await response.arrayBuffer());
        res.send(buffer);
    } catch (err) {
        res
            .status(500)
            .json({ error: "Failed to fetch media", details: err.message });
    }
}
