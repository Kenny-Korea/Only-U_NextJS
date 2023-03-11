import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        {/* 파비콘 */}
        <link rel="icon" href="../../OnlyU-192.png" />
        <link rel="apple-touch-icon" href="../../OnlyU-192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
