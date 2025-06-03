// src/app/layout.tsx

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Logan Pinney – Unreal Engine Mentor & Creator',
  description:
    'Courses, mentorship, and contract development in Unreal Engine',
    icons: [
      { rel: 'icon', url: '/LP_Logo_SVG.svg', type: 'image/svg+xml' }, // main
      { rel: 'shortcut icon', url: '/favicon.ico' },          // fallback for Safari
          ],
    openGraph: {
    title: 'Logan Pinney',
    description:
      'Courses, mentorship, and contract development in Unreal Engine',
    url: 'https://loganpinney.com',
    siteName: 'loganpinney.com',
    images: [
      {
        url: '/BG.jpg', // Put in public folder
        width: 1200,
        height: 630,
        alt: 'Logan Pinney Portfolio Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logan Pinney',
    description:
      'Courses, mentorship, and contract development in Unreal Engine',
    images: ['/BG.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7475424188654327"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <Nav />
        <main className="min-h-screen px-4 sm:px-12 pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
