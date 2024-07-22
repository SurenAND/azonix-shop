import { AuthContextProvider } from "@/src/context/authContext";
import "@/src/lib/i18next";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// css
import "@/styles/globals.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
      refetchInterval: false,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {getLayout(<Component {...pageProps} />)}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
