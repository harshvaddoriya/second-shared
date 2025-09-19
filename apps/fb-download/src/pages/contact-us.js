import React from "react";
import Head from "next/head";
import { Contact, Footer, Header } from "@/shared";
import Images from "../../public/images/index";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
function ContactUs() {
    return (
        <>
            <Head>
                <title>Contact - FacebookDL</title>
                <meta
                    name="description"
                    content="Get in touch with the FacebookDl support team."
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ContactPage",
                            name: "Contact - FacebookDL",
                            description: "Get in touch with the FacebookDL support team.",
                            url: "https://facebook-media-download.vercel.app/contact-us",
                        }),
                    }}
                />
            </Head>
            <Header logo={Images.Logo} />
            <main style={{ flex: 1 }}>
                <Contact />
            </main>
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

export default ContactUs;
