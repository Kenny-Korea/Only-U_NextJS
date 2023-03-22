import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import "../styles/navbar.css";
import "../styles/modal.css";
import Layout from "@/components/layout/layout";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRef, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  // TODO. 왜 queryClient를 변수로 선언하면 제대로 동작하지 않는지?
  // const queryClient = useRef(new QueryClient());
  // const queryClient = new QueryClient();
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <QueryClientProvider client={queryClient}> */}
        <Provider store={store}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools position="top-right" />
          </Hydrate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
