// src/components/Nav.tsx
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="bg-black text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Logan Pinney
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/book">Book</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
