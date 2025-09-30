import ShortsPreview from "@/variants/ShortsPreview/ShortsPreview";
import VideoPreview from "@/variants/VideoPreview/VideoPreview";
//import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";
import PlayListPreview from "@/variants/PlayListPreview/PlayListPreview";
// import { getMediaTypeFromUrl } from "@/utils/api";

console.log("it is here------------");

export const previewComponentMap = {
    playlist: (props) => <PlayListPreview {...props} />,
    shorts: (props) => <ShortsPreview {...props} />,
    // photo: (props) => <PhotoPostPreview {...props} />,
    // post: (props) => <PhotoPostPreview {...props} />,
    video: (props) => <VideoPreview {...props} />,

};

// export default function MediaPreview({ url, mediaData }) {
//     console.log("media preview add data----------");
//     const type = mediaData?.detectedType || getMediaTypeFromUrl(url);
//     const PreviewComponent = previewComponentMap[type];
//     console.log("second step in media preview");
//     if (!PreviewComponent) return <div>Unsupported media type</div>;

//     return <PreviewComponent mediaData={mediaData} url={url} />;
// }
