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
import { downloadFacebookMedia } from "@/utils/api";
import Images from "../../public/images/index";
import { sendGAEvent } from '@/utils/gaUtils';
import PageNotFound from "@/components/PageNotFound/PageNotFound";


export default function CategoryPage({ content }) {

    if (!content) {
        return <PageNotFound />;
    }
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
            <Header logo={Images.Logo} />
            <Downloader
                title={content?.title}
                subtitle={content?.subtitle}
                mainLinks={mainNavLinks}
                previewComponentMap={previewComponentMap}
                downloadFacebookMedia={downloadFacebookMedia}
                placeholder={content?.placeholder}
                loadingMessage="Fetching Facebook media, please wait..."
                onDownloadClick={handleDownloadEvent}
                onPasteClick={handlePasteEvent}
            />
            <AppPromotion mobileImg={Images.mobile} appHeight={377} />
            <AboutProcess
                image={content?.about.image}
                title={content?.about.title}
                description={content?.about.description}
                heading={content?.about.heading}
                smallDescription={content?.about.smallDescription}
                steps={content?.about.steps}
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
                appName="FacebookDl"
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
        },
    };
}




