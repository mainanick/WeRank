import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'

import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WeRank',
  description: 'Rank Higher',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" cross-origin />
        <link
          href="https://fonts.googleapis.com/css2?family=Suez+One&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
