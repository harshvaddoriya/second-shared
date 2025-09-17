import React from "react";
import { Contact, Footer, Header } from "@/shared";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import Images from "../../public/images/index";

function ContactUs() {
  return (
    <>
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
