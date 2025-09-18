import React from "react";
import Head from "next/head";
import { Contact, Footer, Header } from "@/shared";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import Images from "../../public/images/index";

function ContactUs() {
  return (
    <>
      <Head>
        <title>Contact - InstaDL</title>
        <meta
          name="description"
          content="Contact the InstaDL support team for help with Instagram downloads, troubleshooting, and any questions you may have."
        />
      </Head>

      <Header logo={Images.Logo} />
      <Contact />
      <Footer
        logo={Images.Logo}
        mainLinks={mainNavLinks}
        legalLinks={legalLinks}
      />
    </>
  );
}

export default ContactUs;
