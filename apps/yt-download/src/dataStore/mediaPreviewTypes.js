import ShortsPreview from "@/variants/ShortsPreview/ShortsPreview";
import VideoPreview from "@/variants/VideoPreview/VideoPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
    shorts: (props) => <ShortsPreview {...props} />,
    photo: (props) => <PhotoPostPreview {...props} />,
    video: (props) => <VideoPreview {...props} />,
};



