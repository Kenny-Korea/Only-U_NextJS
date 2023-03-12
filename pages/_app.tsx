import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import "../styles/navbar.css";
import Layout from "@/components/layout/layout";
import { Provider } from "react-redux";
import { store } from "@/state/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
