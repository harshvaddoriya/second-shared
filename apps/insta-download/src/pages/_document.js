import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#009ee2" />
        <meta name="google-site-verification" content="vo6aROJplApE9LALIdzeEzfpW_ZhiPTIjc8_9psVgTI" />
        <link rel="apple-touch-icon" href="/icons/icons-192.png" />
        <link rel="icon" href="/icons/icons-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZX6Z7ZRE1R"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZX6Z7ZRE1R');
          `,
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
