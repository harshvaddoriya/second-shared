"use client";
import dynamic from "next/dynamic";

const ServerError = dynamic(() => import("@/components/ServerError/ServerError"), { ssr: false });

export default function Custom500() {
  return <ServerError />;
}
