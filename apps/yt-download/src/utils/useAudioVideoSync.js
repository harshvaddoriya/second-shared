import { useEffect } from "react";

export const useAudioVideoSync = (videoRef, audioRef) => {
    useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video || !audio) return;

        const sync = () => {
            if (Math.abs(video.currentTime - audio.currentTime) > 0.3) {
                audio.currentTime = video.currentTime;
            }
        };

        const playHandler = () => audio.play();
        const pauseHandler = () => audio.pause();

        video.addEventListener("play", playHandler);
        video.addEventListener("pause", pauseHandler);
        video.addEventListener("seeking", sync);
        video.addEventListener("timeupdate", sync);

        return () => {
            video.removeEventListener("play", playHandler);
            video.removeEventListener("pause", pauseHandler);
            video.removeEventListener("seeking", sync);
            video.removeEventListener("timeupdate", sync);
        };
    }, [videoRef, audioRef]);
};
