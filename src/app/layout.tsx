import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import CornerLogo from '@/components/CornerLogo'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://loganpinney.com'),
  title: {
    default: 'Logan Pinney — Data Systems Architect',
    template: '%s — Logan Pinney',
  },
  description:
    'Data systems architect designing automation, integrations, and operational data infrastructure. Currently at Riot Games.',
  keywords: [
    'Logan Pinney',
    'Data Systems Architect',
    'Workflow Automation',
    'Airtable',
    'Workato',
    'Data Integration',
    'Riot Games',
  ],
  authors: [{ name: 'Logan Pinney' }],
  creator: 'Logan Pinney',
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/LP_Logo_SVG.svg', type: 'image/svg+xml' },
  ],
  openGraph: {
    title: 'Logan Pinney — Data Systems Architect',
    description:
      'Data systems architect designing automation, integrations, and operational data infrastructure. Currently at Riot Games.',
    url: 'https://loganpinney.com',
    siteName: 'loganpinney.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logan Pinney — Data Systems Architect',
    description:
      'Data systems architect designing automation, integrations, and operational data infrastructure.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-neutral-950 text-neutral-200 font-sans antialiased min-h-screen flex flex-col">
        <CornerLogo />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
