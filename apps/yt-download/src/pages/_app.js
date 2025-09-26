import Script from "next/script";
import dynamic from "next/dynamic";
import ErrorBoundry from "@/components/ErrorBoundry/ErrorBoundry";
import Analytics from "@/components/Analytics/Analytics";
import "@/styles/globals.css";

const GA_MEASUREMENT_ID = "G-KQJSYWZ2D0";

const ClientOnly = dynamic(() => import("@/components/ClientOnly/ClientOnly"), {
  ssr: false,
});

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundry>
      <ClientOnly>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                debug_mode: true,  
              });
            `,
          }}
        />
        <Analytics />
        <Component {...pageProps} />
      </ClientOnly>
    </ErrorBoundry>
  );
}
