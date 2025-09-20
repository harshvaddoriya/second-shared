"use client";
import dynamic from "next/dynamic";

const PageNotFound = dynamic(() => import("@/components/PageNotFound/PageNotFound"), { ssr: false });

export default function Custom404() {
    return <PageNotFound />;
}
