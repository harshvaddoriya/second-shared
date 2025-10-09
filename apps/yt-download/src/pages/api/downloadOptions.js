import axios from "axios";

export default async function handler(req, res) {
    const { videoId } = req.query;

    if (!videoId) {
        return res.status(400).json({ error: "Missing videoId" });
    }

    try {
        const options = {
            method: "GET",
            url: `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/get_available_quality/${videoId}`,
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY_DOWNLOAD,
                "x-rapidapi-host": "youtube-video-fast-downloader-24-7.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);

        const data = response.data.map((item) => ({
            id: item.id,
            type: item.type,
            quality: item.quality,
        }));

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch download options" });
    }
}
