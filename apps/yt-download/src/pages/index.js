// import { useState } from "react";
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
  FaqSection
} from "@/shared";
import { downloadYoutubeMedia } from "@/utils/api";
import Images from "../../public/images/index";

export default function Home() {
  // const [popupVisible, setPopupVisible] = useState(true);

  // const handlePasteEvent = ({ url }) => {
  //   sendGAEvent('paste_button_click', {
  //     url,
  //     app: 'sub-app',
  //   });
  // };

  // const handleDownloadEvent = ({ url }) => {
  //   sendGAEvent('download_button_click', {
  //     url,
  //     app: 'sub-app',
  //   });
  // };

  return (
    <>
      {/* <Head>
        <title>YoutubeDL - Free Video Downloader</title>
        <meta
          name="description"
          content="Download videos instantly from your favorite platforms for free."
        />
        <link rel="canonical" href="https://instagram-media-download.vercel.app/" />
      </Head> */}

      <Header logo={Images.Logo} />

      {/* <InstallPopup
        isVisible={popupVisible}
        onClose={() => setPopupVisible(false)}
        buttonColor="#0866ff"
        hoverColor="#2563eb"
      /> */}

      <Downloader
        title="Youtube Downloader"
        subtitle="Download Youtube Videos, Shorts & Photos"
        mainLinks={mainNavLinks}
        previewComponentMap={previewComponentMap}
        downloadYoutubeMedia={downloadYoutubeMedia}
        placeholder="Insert Youtube link here..."
        loadingMessage="Fetching Youtube media, please wait..."
        buttonGradient="linear-gradient(315deg, #ff4d4d, #ff0000)"
      // onDownloadClick={handleDownloadEvent}
      // onPasteClick={handlePasteEvent}
      />

      <AppPromotion
        mobileImg={Images.mobile}
        appHeight={377}
        promoText="Download your favorite photos, videos, and shorts in a single tap! Enjoy fast, HD downloads free of watermarks with our app."
      />

      <AboutProcess
        image={Images.Download}
        title="Youtube Videos and Shorts Download"
        description="YoutubeDl is an online web tool that helps you download Youtube Videos, Photos, Shorts. YoutubeDl.app is designed to be easy to use on any device, such as a mobile, tablet, or in your computer."
        heading="How to Download Youtube Content?"
        smallDescription="You must follow these three easy steps to download video, short and photo from Youtube. Follow the simple steps below for best results."
        steps={steps}
        headingColor="#ff0000"
      />
      <WhyUs
        title="Use YoutubeDl to download from Youtube"
        description="You can download videos in just two clicks, and the quality stays the same. Avoid using unreliable applications and appreciate the videos, even if they are of lower quality."
        features={features}
        headingColor="#ff0000"
      />
      <DownloadDescription
        heading="Features of YoutubeDl"
        headingDescription="With YoutubeDl you can download any type of content from Youtube. Our service includes a video downloader along with support for Shorts and photos."
        image={Images.videoImg2}
        title="Video Downloader"
        description="YoutubeDl.app supports downloading YouTube videos easily. It is designed to help you save videos directly from YouTube to your device."
        link="/video"
        secondImage={Images.DownloadTwo}
        secondTitle="Photos Downloader"
        secondDescription="Youtube photo download provided by YoutubeDl.app is a great tool for saving images from Youtube posts. With YoutubeDl, You can save either a single post image or multiple Youtube photos."
        secondLink="/photo"
        headingColor="#ff0000"
      />
      <DownloadDescription
        image={Images.videoImg1}
        title="Shorts Downloader"
        description="Shorts are engaging videos designed for quick viewing. With YoutubeDl, you can easily download your favorite Shorts and save them directly to your device for offline viewing."
        link="/shorts"
        headingColor="#ff0000"
      />
      <FaqSection
        title="Frequently asked questions (FAQ)"
        intro="This FAQ answers common questions and worries about YoutubeDl.app, which is a tool to download Youtube content.If your question isn’t covered, you can get in touch with us by sending an email through our contact page."
        image={Images.Download}
        faqs={faqs}
        headingColor="#ff0000"
      />
      <Footer
        logo={Images.Logo}
        mainLinks={mainNavLinks}
        legalLinks={legalLinks}
        logoWidth={180}
        logoHeight={25}
        appName="YoutubeDl"
      />
    </>
  );
}
