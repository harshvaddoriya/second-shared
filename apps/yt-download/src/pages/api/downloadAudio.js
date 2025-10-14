import axios from "axios";

export default async function handler(req, res) {
  const { videoId, qualityId } = req.query;

  if (!videoId || !qualityId) {
    return res.status(400).json({ error: "Missing videoId or qualityId" });
  }

  try {
    const audioUrl = `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/download_audio/${videoId}?quality=${qualityId}`;

    const response = await axios.get(audioUrl, {
      responseType: "arraybuffer",
      headers: {
        "x-rapidapi-host": "youtube-video-fast-downloader-24-7.p.rapidapi.com",
        "x-rapidapi-key": "cfbce86b39msh497454a3d96e36dp10c908jsne1b0550288eb"
      },
    });

    res.setHeader("Content-Type", "audio/m4a");
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch audio" });
  }
}
