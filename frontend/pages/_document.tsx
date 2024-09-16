import { Html, Head, Main, NextScript } from "next/document";

import {NextUIProvider} from '@nextui-org/react'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <NextUIProvider>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
      </NextUIProvider>
    </Html>
  );
}
