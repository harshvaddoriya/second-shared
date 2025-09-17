
import React from "react";
import { Footer, Header, FaqSection } from "@/shared";
import { mainFaq } from "@/dataStore/faqContent";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import Images from "../../public/images/index";

export const metadata = {
    title: "Faq - InstaDL",
    description:
        "Find answers to the most frequently asked questions about InstaDL, including downloads, formats, privacy, and troubleshooting.",
};

function Faq() {
    return (
        <>
            <Header logo={Images.Logo} />
            <FaqSection
                title="FAQ - frequently asked question"
                intro="You’re here on this page, so you might be looking for help with downloading Instagram photos and videos. Let’s go through the most common questions people have about instadl.app and the answers."
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
