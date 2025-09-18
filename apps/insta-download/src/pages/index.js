import Head from "next/head";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import { features } from "@/dataStore/whyUsData";
import { previewComponentMap } from "@/dataStore/mediaPreviewTypes";
import { steps, faqs } from "@/dataStore/faqContent";
import {
  Header,
  Footer,
  Downloader,
  AboutProcess,
  WhyUs,
  DownloadDescription,
  AppPromotion,
  FaqSection,
} from "@/shared";
import { sendGAEvent } from '@/utils/gaUtils';
import { downloadFacebookMedia } from "@/utils/api";
import Images from "../../public/images/index";

export default function Home() {
  const handlePasteEvent = ({ url }) => {
    console.log('PASTE EVENT CALLED:', url);
    sendGAEvent('paste_button_click', {
      url,
      app: 'sub-app',
    });
  };

  const handleDownloadEvent = ({ url }) => {
    console.log('Download EVENT CALLED:', url);
    sendGAEvent('download_button_click', {
      url,
      app: 'sub-app',
    });
  };
  return (
    <>
      <Head>
        <title>InstaDL - Free Video Downloader</title>
        <meta
          name="description"
          content="Download videos instantly from your favorite platforms for free."
        />
      </Head>

      <Header logo={Images.Logo} />

      <Downloader
        title="Instagram Downloader"
        subtitle="Download Instagram Videos, Reels, Stories & Photos"
        mainLinks={mainNavLinks}
        previewComponentMap={previewComponentMap}
        downloadFacebookMedia={downloadFacebookMedia}
        placeholder="Insert Instagram link here...."
        loadingMessage="Fetching Instagram media, please wait..."
        onDownloadClick={handleDownloadEvent}
        onPasteClick={handlePasteEvent}
      />

      <AppPromotion mobileImg={Images.mobile} />

      <AboutProcess
        image={Images.Download}
        title="Instagram Videos and Photos Download"
        description="InstaDl is an online web tool that helps you download Instagram Videos, Photos, Reels, and IGTV. InstaDl.app is designed to be easy to use on any device, such as a mobile phone, tablet, or computer."
        heading="How to Download Instagram Content?"
        smallDescription="You must follow these three easy steps to download video, reels, and photo from Instagram (IG, Insta). Follow the simple steps below."
        steps={steps}
      />

      <WhyUs
        title="Use InstaDl to download from Instagram."
        description="You can download videos in just two clicks, and the quality stays the same. Avoid using unreliable applications and appreciate the videos, even if they are of lower quality."
        features={features}
      />

      <DownloadDescription
        heading="InstaDl.app features"
        headingDescription="With InstaDl you can download any type of content from Instagram. With our tool, you can download Instagram videos, Reels, IGTV content, photos, and carousels."
        image={Images.videoImg2}
        title="Video Downloader"
        description="InstaDl.app supports Instagram video download for singular videos and multiple videos from carousels. InstaDl is designed to let you download Instagram videos from your own page."
        link="/video"
        secondImage={Images.DownloadTwo}
        secondTitle="Photos Downloader"
        secondDescription="Instagram photo download provided by InstaDl.app is a great tool for saving images from Instagram posts. With InstaDl, You can save either a single post image or multiple Instagram photos (carousel)."
        secondLink="/photo"
      />

      <DownloadDescription
        image={Images.videoImg1}
        title="Reels Downloader"
        description="Reels is a new video format that clones the principle of TikTok. Instagram Reels download with the help of InstaDl. Our Instagram Reels downloader lets you save your favorite Reels with ease."
        link="/reels"
        secondImage={Images.videoImg2}
        secondTitle="IGTV Downloader"
        secondDescription="IGTV is a long video type. If you can’t watch it now, you can download IGTV videos to your device to be sure that you can return to watching later, without the need to be online or in case the IGTV can be deleted."
        secondLink="/igtv"
      />

      <DownloadDescription
        image={Images.videoImg3}
        title="Carousel / Album Downloader"
        description="Carousel, also known as Album or Gallery posts type with multiple photos, videos, or mixed content. If you need to download multiple photos from Instagram, the InstaDl.app is the best to download gallery."
        link="/carousel"
      />

      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ answers common questions and worries about InstaDl.app, which is a tool to download public Instagram content. If your question isn’t covered, you can get in touch with us by sending an email through our contact page."
        image={Images.Download}
        faqs={faqs}
      />

      <Footer
        logo={Images.Logo}
        mainLinks={mainNavLinks}
        legalLinks={legalLinks}
        appName="InstaDl"
      />
    </>
  );
}
