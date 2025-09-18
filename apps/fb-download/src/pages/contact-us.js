import React from "react";
import Head from "next/head";
import { Contact, Footer, Header } from "@/shared";
import Images from "../../public/images/index";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
function ContactUs() {
    return (
        <><Head>
            <title>Contact - FacebookDL</title>
            <meta
                name="description"
                content="Get in touch with the FacebookDl support team."
            />
        </Head>
            <Header logo={Images.Logo} />
            <Contact />
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
