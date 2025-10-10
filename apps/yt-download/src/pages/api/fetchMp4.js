import axios from "axios";

export default async function handler(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const contentType = response.headers["content-type"] || "video/mp4";

        res.setHeader("Content-Type", contentType);
        res.send(Buffer.from(response.data, "binary"));
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch MP4 file" });
    }
}
