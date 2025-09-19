import Head from "next/head";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import { features } from "@/dataStore/whyUsData";
import { steps, faqs } from "@/dataStore/faqContent";
import { previewComponentMap } from "@/dataStore/mediaPreviewTypes";
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
    sendGAEvent('paste_button_click', {
      url,
      app: 'sub-app',
    });
  };

  const handleDownloadEvent = ({ url }) => {
    sendGAEvent('download_button_click', {
      url,
      app: 'sub-app',
    });
  };

  return (
    <>
      <Head>
        <title>FacebookDL - Free Video Downloader</title>
        <meta
          name="description"
          content="Download videos instantly from your favorite platforms for free."
        />
        <link rel="canonical" href="https://instagram-media-download.vercel.app/" />
      </Head>
      <Header logo={Images.Logo} />

      <Downloader
        title="Facebook Downloader"
        subtitle="Download Facebook Videos, Reels, Stories & Photos"
        mainLinks={mainNavLinks}
        previewComponentMap={previewComponentMap}
        downloadFacebookMedia={downloadFacebookMedia}
        placeholder="Insert Facebook link here..."
        loadingMessage="Fetching Facebook media, please wait..."
        onDownloadClick={handleDownloadEvent}
        onPasteClick={handlePasteEvent}
      />

      <AppPromotion mobileImg={Images.mobile} appHeight={377} />
      <AboutProcess
        image={Images.Download}
        title="Facebook Videos and Photos Download"
        description="FacebookDl is an online web tool that helps you download Facebook Videos, Photos, Reels, Story. FacebookDl.app is designed to be easy to use on any device, such as a mobile phone, tablet, or computer."
        heading="How to Download Facebook Content?"
        smallDescription="You must follow these three easy steps to download video, reels, story and photo from Facebook. Follow the simple steps below."
        steps={steps}
      />
      <WhyUs
        title="Use FacebookDl to download from Facebook"
        description="You can download videos in just two clicks, and the quality stays the same. Avoid using unreliable applications and appreciate the videos, even if they are of lower quality."
        features={features}
      />
      <DownloadDescription
        heading="Features of FacebookDl"
        headingDescription="With FacebookDl you can download any type of content from Facebook. Our service includes a video downloader along with support for Reels, Stories, and photos."
        image={Images.videoImg2}
        title="Video Downloader"
        description="FacebookDl.app supports Facebook video download for videos. FacebookDl is created to enable you to download videos from your personal page."
        link="/video"
        secondImage={Images.DownloadTwo}
        secondTitle="Photos Downloader"
        secondDescription="Facebook photo download provided by FacebookDl.app is a great tool for saving images from Facebook posts. With FacebookDl, You can save either a single post image or multiple Facebook photos."
        secondLink="/photo"
      />
      <DownloadDescription
        image={Images.videoImg1}
        title="Reels Downloader"
        description="Reels represents a modern video style designed for quick, engaging clips.Facebook Reels download with the help of FacebookDl. Our Facebook Reels downloader can help you to save your favorite Reels videos."
        link="/reels"
        secondImage={Images.videoImg3}
        secondTitle="Story Downloader"
        secondDescription="Story is a long video type. If you can’t watch it now, you can download Story videos to your device to be sure that you can return to watching later, without the need to be online or in case the Story can be deleted."
        secondLink="/story"
      />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ answers common questions and worries about FacebookDl.app, which is a tool to download public Facebook content.If your question isn’t covered, you can get in touch with us by sending an email through our contact page."
        image={Images.Download}
        faqs={faqs}
      />
      <Footer
        logo={Images.Logo}
        mainLinks={mainNavLinks}
        legalLinks={legalLinks}
        logoWidth={180}
        logoHeight={24}
        appName="FacebookDl"
      />
    </>
  );
}
