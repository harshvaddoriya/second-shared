import React from "react";
import Head from "next/head";
import { Footer, Header, Policy } from "@/shared";
import legalPagesData from "@/dataStore/legalPagesContent";
import { mainNavLinks, legalLinks } from "@/dataStore/linksContent";
import Images from "../../../public/images/index";

export default function PolicyPage({ pageData }) {
    if (!pageData) return <div>Page not found</div>;

    const title = pageData
        ? `${pageData.title} - FacebookDL`
        : "Page Not Found - FacebookDL";
    const description =
        pageData?.description || "The page you are looking for does not exist."

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Head>
            <Header logo={Images.Logo} />
            <Policy pageData={pageData} />;
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

export async function getStaticPaths() {
    if (!legalPagesData) {
        throw new Error("legalPagesData is undefined! Check your import.");
    }

    const paths = Object.keys(legalPagesData).map((slug) => ({
        params: { slug },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const pageData = legalPagesData[params.slug] || null;
    return { props: { pageData } };
}
