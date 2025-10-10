import { convert } from "@/utils/mp4tomp3Convert";

export async function downloadMp3FromMp4Url(url, filename) {
    try {
        const response = await fetch(`/api/fetchmp4?url=${encodeURIComponent(url)}`);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        const wavBlob = await convert(audioBuffer);

        const link = document.createElement("a");
        link.href = URL.createObjectURL(wavBlob);
        link.download = `${filename}.mp3`;
        link.click();
    } catch (error) {
        console.error("Error converting to MP3:", error);
        alert("Failed to convert to MP3. Try again.");
    }
}
