import { Mp3Encoder } from "lamejs";

export async function webmToMp3(webmBlob) {
    // Decode WebM audio to AudioBuffer
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const channels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const mp3Encoder = new Mp3Encoder(channels, sampleRate, 128);

    const mp3Data = [];
    const maxSamples = 1152;

    // Encode each channel to MP3
    for (let ch = 0; ch < channels; ch++) {
        const samples = audioBuffer.getChannelData(ch);
        for (let i = 0; i < samples.length; i += maxSamples) {
            const chunk = samples.subarray(i, i + maxSamples);
            const mp3buf = mp3Encoder.encodeBuffer(chunk);
            if (mp3buf.length > 0) mp3Data.push(mp3buf);
        }
    }

    const mp3buf = mp3Encoder.flush();
    if (mp3buf.length > 0) mp3Data.push(mp3buf);

    // Create MP3 blob and return object URL
    const blob = new Blob(mp3Data, { type: "audio/mp3" });
    return URL.createObjectURL(blob);
}
