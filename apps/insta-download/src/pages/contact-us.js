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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Contact - InstaDL",
              description: "Get in touch with the InstaDL support team.",
              url: "https://instagram-media-download.vercel.app/contact-us",
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
      />
    </>
  );
}

export default ContactUs;
