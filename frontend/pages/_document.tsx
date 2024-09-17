import { Html, Head, Main, NextScript } from "next/document";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <body className="antialiased">
            <Main />
            <ReactQueryDevtools
              buttonPosition="bottom-right"
              client={queryClient}
            />
            <NextScript />
          </body>
        </QueryClientProvider>
      </NextUIProvider>
    </Html>
  );
}
