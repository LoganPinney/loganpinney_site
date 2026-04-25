import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import CornerLogo from '@/components/CornerLogo'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import { siteConfig } from '@/config/site.config'

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
    default: `${siteConfig.identity.name} — ${siteConfig.identity.title}`,
    template: `%s — ${siteConfig.identity.name}`,
  },
  description:
    'Data systems architect designing automation, integrations, and operational data infrastructure.',
  keywords: [
    'Logan Pinney',
    'Data Systems Architect',
    'Workflow Automation',
    'Airtable',
    'Workato',
    'Data Integration',
  ],
  authors: [{ name: siteConfig.identity.name }],
  creator: siteConfig.identity.name,
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'icon', url: '/LP_Logo_SVG.svg', type: 'image/svg+xml' },
  ],
  openGraph: {
    title: `${siteConfig.identity.name} — ${siteConfig.identity.title}`,
    description:
      'Data systems architect designing automation, integrations, and operational data infrastructure.',
    url: 'https://loganpinney.com',
    siteName: 'loganpinney.com',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.identity.name} — ${siteConfig.identity.title}`,
    description:
      'Data systems architect designing automation, integrations, and operational data infrastructure.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scanlines={siteConfig.effects.scanlines ? 'true' : 'false'}
    >
      <head>
        <ThemeProvider />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <CornerLogo />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
