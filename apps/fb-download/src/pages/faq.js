import React from "react";
import Head from "next/head";
import { Footer, Header, FaqSection } from "@/shared";
import { mainFaq } from "@/dataStore/faqContent";
import Images from "../../public/images/index";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";

function Faq() {
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": mainFaq.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
    return (
        <>
            <Head>
                <title>Faq - FacebookDL</title>
                <meta
                    name="description"
                    content="Find answers to the most frequently asked questions about FacebookDl, including downloads, formats, privacy, and troubleshooting."
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
                />
            </Head>
            <Header logo={Images.Logo} />
            <FaqSection
                title="FAQ - frequently asked question"
                intro="You’re here on this page, so you might be looking for help with downloading Facebook Photos and videos. Let’s go through the most common questions people have about FacebookDl.app and the answers."
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
