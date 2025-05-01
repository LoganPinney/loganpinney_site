// src/components/Nav.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#contact' },
] as const

export default function Nav() {
  return (
    <nav className="bg-black/70 backdrop-blur-md text-white px-6 py-3 fixed top-0 inset-x-0 z-40">
      <ul className="max-w-7xl mx-auto flex items-center gap-10 text-xs sm:text-sm font-semibold uppercase tracking-wider">
        {/* LP icon */}
        <li>
          <Link href="#top" className="block">
            <Image
              src="/LP_Logo_SVG.svg" // place file in /public
              alt="Logan Pinney"
              width={28}
              height={28}
              priority
            />
          </Link>
        </li>

        {/* section anchors */}
        {sectionLinks.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className="hover:text-gray-300 transition">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
