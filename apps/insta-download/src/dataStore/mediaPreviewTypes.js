import ReelPreview from "@/variants/ReelPreview/ReelPreview";
import StoryPreview from "@/variants/StoryPreview/StoryPreview";
import PhotoPostPreview from "@/variants/PhotoPostPreview/PhotoPostPreview";

export const previewComponentMap = {
  reel: (props) => <ReelPreview {...props} />,
  reels: (props) => <ReelPreview {...props} />,
  video: (props) => <ReelPreview {...props} />,

  story: (props) => {
    const stories = props.data?.medias || [];
    return <StoryPreview stories={Array.isArray(stories) ? stories : []} {...props} />;
  },

  stories: (props) => {
    const stories = props.data?.medias || [];
    return <StoryPreview stories={Array.isArray(stories) ? stories : []} {...props} />;
  },

  photo: (props) => <PhotoPostPreview {...props} />,
  viewer: (props) => <PhotoPostPreview {...props} />,
  igtv: (props) => <PhotoPostPreview {...props} />,
  carousel: (props) => <PhotoPostPreview {...props} />,
};