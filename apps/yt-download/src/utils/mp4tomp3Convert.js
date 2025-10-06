export function convert(videoBlob, targetAudioFormat = "mp3") {
    return new Promise((resolve, reject) => {
        try {
            targetAudioFormat = targetAudioFormat.toLowerCase();
            const reader = new FileReader();

            reader.onload = function () {
                const contentType = "audio/" + targetAudioFormat;
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const sampleRate = 16000;
                const numberOfChannels = 1;
                const videoBuffer = reader.result;

                audioContext.decodeAudioData(videoBuffer)
                    .then((decodedAudio) => {
                        const duration = decodedAudio.duration;
                        const offlineCtx = new OfflineAudioContext(numberOfChannels, sampleRate * duration, sampleRate);
                        const source = offlineCtx.createBufferSource();
                        source.buffer = decodedAudio;
                        source.connect(offlineCtx.destination);
                        source.start();
                        return offlineCtx.startRendering();
                    })
                    .then((renderedBuffer) => {
                        const waveData = createWaveFileData(renderedBuffer);
                        const b64Data = btoa(uint8ToString(waveData));
                        const blob = getBlobFromBase64Data(b64Data, contentType);
                        const blobUrl = URL.createObjectURL(blob);

                        resolve({
                            name: "video",
                            format: targetAudioFormat,
                            data: blobUrl,
                        });
                    })
                    .catch((err) => reject(err));
            };

            reader.readAsArrayBuffer(videoBlob);
        } catch (e) {
            reject(e);
        }
    });
}


function createWaveFileData(audioBuffer) {
    const frameLength = audioBuffer.length;
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const bitsPerSample = 16;
    const byteRate = sampleRate * numberOfChannels * bitsPerSample / 8;
    const blockAlign = numberOfChannels * bitsPerSample / 8;
    const wavDataByteLength = frameLength * numberOfChannels * 2;
    const headerByteLength = 44;
    const totalLength = headerByteLength + wavDataByteLength;

    const waveFileData = new Uint8Array(totalLength);

    const subChunk1Size = 16;
    const subChunk2Size = wavDataByteLength;
    const chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);

    writeString("RIFF", waveFileData, 0);
    writeInt32(chunkSize, waveFileData, 4);
    writeString("WAVE", waveFileData, 8);
    writeString("fmt ", waveFileData, 12);

    writeInt32(subChunk1Size, waveFileData, 16);
    writeInt16(1, waveFileData, 20);
    writeInt16(numberOfChannels, waveFileData, 22);
    writeInt32(sampleRate, waveFileData, 24);
    writeInt32(byteRate, waveFileData, 28);
    writeInt16(blockAlign, waveFileData, 32);
    writeInt16(bitsPerSample, waveFileData, 34);

    writeString("data", waveFileData, 36);
    writeInt32(subChunk2Size, waveFileData, 40);

    writeAudioBuffer(audioBuffer, waveFileData, 44);

    return waveFileData;
}

function writeString(s, a, offset) {
    for (let i = 0; i < s.length; ++i) {
        a[offset + i] = s.charCodeAt(i);
    }
}

function writeInt16(n, a, offset) {
    n = Math.floor(n);
    a[offset] = n & 0xff;
    a[offset + 1] = (n >> 8) & 0xff;
}

function writeInt32(n, a, offset) {
    n = Math.floor(n);
    a[offset] = n & 0xff;
    a[offset + 1] = (n >> 8) & 0xff;
    a[offset + 2] = (n >> 16) & 0xff;
    a[offset + 3] = (n >> 24) & 0xff;
}

function writeAudioBuffer(audioBuffer, a, offset) {
    const n = audioBuffer.length;
    const channels = audioBuffer.numberOfChannels;

    for (let i = 0; i < n; ++i) {
        for (let k = 0; k < channels; ++k) {
            const buffer = audioBuffer.getChannelData(k);
            let sample = buffer[i] * 32768.0;
            if (sample < -32768) sample = -32768;
            if (sample > 32767) sample = 32767;
            writeInt16(sample, a, offset);
            offset += 2;
        }
    }
}

function uint8ToString(buf) {
    let out = '';
    for (let i = 0; i < buf.length; i++) {
        out += String.fromCharCode(buf[i]);
    }
    return out;
}

function getBlobFromBase64Data(b64Data, contentType, sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
}
