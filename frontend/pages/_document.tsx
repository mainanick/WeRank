import { Html, Head, Main, NextScript } from "next/document";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export default function Document() {
  return (
    <Html lang="en">
      <Head />

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
    </Html>
  );
}
