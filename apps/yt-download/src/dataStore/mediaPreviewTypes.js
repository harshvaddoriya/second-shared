import ShortsPreview from "@/variants/ShortsPreview/ShortsPreview";
import VideoPreview from "@/variants/VideoPreview/VideoPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
    shorts: (props) => <ShortsPreview {...props} />,
    photo: (props) => <PhotoPostPreview {...props} />,
    post: (props) => <PhotoPostPreview {...props} />,
    video: (props) => <VideoPreview {...props} />,
};

export default function MediaPreview({ url, mediaData }) {
    const type = mediaData?.detectedType || getMediaTypeFromUrl(url);
    const PreviewComponent = previewComponentMap[type];

    if (!PreviewComponent) return <div>Unsupported media type</div>;

    return <PreviewComponent mediaData={mediaData} url={url} />;
}
