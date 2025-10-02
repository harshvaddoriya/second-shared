
export const isVideo = (url) => {
    if (!url) return false;
    if (/\.(mp4|webm|ogg)(\?.*)?$/.test(url)) return true;
    if (url.includes("videoplayback") || url.includes("googlevideo.com")) return true;
    return false;
};

export const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/.test(url);
