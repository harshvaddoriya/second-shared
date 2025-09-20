import { Contact, Footer, Header } from "@/shared";
import Images from "../../public/images/index";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
function ContactUs() {
    return (
        <>
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
