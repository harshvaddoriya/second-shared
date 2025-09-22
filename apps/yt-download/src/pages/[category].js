import {
    Header,
    Footer,
    Downloader,
    AboutProcess,
    DownloadDescription,
    AppPromotion,
    FaqSection,
} from "@/shared";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import { previewComponentMap } from "@/dataStore/mediaPreviewTypes";
import { downloadYoutubeMedia } from "@/utils/api";
import Images from "../../public/images/index";
import PageNotFound from "@/components/PageNotFound/PageNotFound";


export default function CategoryPage({ content, category }) {

    if (!content) {
        return <PageNotFound />;
    }

    return (
        <>
            <Header logo={Images.Logo} />
            <Downloader
                title={content?.title}
                subtitle={content?.subtitle}
                mainLinks={mainNavLinks}
                previewComponentMap={previewComponentMap}
                downloadYoutubeMedia={downloadYoutubeMedia}
                placeholder={content?.placeholder}
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
                image={content?.about.image}
                title={content?.about.title}
                description={content?.about.description}
                heading={content?.about.heading}
                smallDescription={content?.about.smallDescription}
                steps={content?.about.steps}
                headingColor="#ff0000"
            />

            <DownloadDescription
                heading={content?.downloadDescription.heading}
                headingDescription={content?.downloadDescription.headingDescription}
                image={content?.downloadDescription.image}
                title={content?.downloadDescription.title}
                description={content?.downloadDescription.description}
                link={content?.downloadDescription.link}
                secondImage={content?.downloadDescription.secondImage}
                secondTitle={content?.downloadDescription.secondTitle}
                secondDescription={content?.downloadDescription.secondDescription}
                secondLink={content?.downloadDescription.secondLink}
                headingColor="#ff0000"
            />

            <FaqSection
                title="Frequently asked questions (FAQ)"
                intro={content?.faq.intro}
                image={content?.faq.image}
                faqs={content?.faq.items}
            />
            <Footer
                logo={Images.Logo}
                mainLinks={mainNavLinks}
                legalLinks={legalLinks}
                logoWidth={180}
                logoHeight={24}
                appName="YoutubeDl"
            />
        </>
    );
}

export async function getStaticPaths() {
    const { categoryContent } = await import("@/dataStore/categoryContent");

    const paths = Object.keys(categoryContent).map((category) => ({
        params: { category },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { categoryContent } = await import("@/dataStore/categoryContent");

    return {
        props: {
            content: categoryContent[params.category] || null,
            category: params.category,
        },
    };
}




