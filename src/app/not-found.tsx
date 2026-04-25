import Link from 'next/link'
//import { siteConfig } from '@/config/site.config'

//const glow = siteConfig.effects.glowText ? 'glow-text' : ''
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Logan Pinney",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black">
      <iframe
        src="/games/error-404/"
        className="block h-screen w-full border-0"
        title="Error 404 — Target Not Found"
        allow="fullscreen"
      />
    </main>
  );
}