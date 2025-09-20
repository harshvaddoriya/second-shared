import ReelPreview from "@/variants/ShortsPreview/ShortsPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
    reel: (props) => <ReelPreview {...props} />,
    photo: (props) => <PhotoPostPreview {...props} />,
    video: (props) => <PhotoPostPreview {...props} />,
};



