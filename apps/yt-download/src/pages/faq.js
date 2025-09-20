import { Footer, Header, FaqSection } from "@/shared";
import { mainFaq } from "@/dataStore/faqContent";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import Images from "../../public/images/index";

function Faq() {

    return (
        <>
            <Header logo={Images.Logo} />
            <FaqSection
                title="FAQ - frequently asked question"
                intro="You’re here on this page, so you might be looking for help with downloading Youtube Photos and videos. Let’s go through the most common questions people have about YoutubeDl.app and the answers."
                faqs={mainFaq}
            />
            <Footer
                logo={Images.Logo}
                mainLinks={mainNavLinks}
                legalLinks={legalLinks}
                logoWidth={180}
                logoHeight={24}
            />
        </>
    );
}

export default Faq;
