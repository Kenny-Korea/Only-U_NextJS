import Layout from "@/components/layout/layout";
import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import "../styles/navbar.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
