import type { AppProps } from "next/app";
import "../styles/tailwind.css";
import "../styles/navbar.css";
import "../styles/modal.css";
import Layout from "@/components/layout/layout";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools position="bottom-right" />
        </Provider>
      </QueryClientProvider>
    </>
  );
}
