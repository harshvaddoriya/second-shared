import ShortsPreview from "@/variants/ShortsPreview/ShortsPreview";
import VideoPreview from "@/variants/VideoPreview/VideoPreview";
import PlayListPreview from "@/variants/PlayListPreview/PlayListPreview";

export const previewComponentMap = {
    playlist: (props) => <PlayListPreview {...props} />,
    shorts: (props) => <ShortsPreview {...props} />,
    video: (props) => <VideoPreview {...props} />,
};


