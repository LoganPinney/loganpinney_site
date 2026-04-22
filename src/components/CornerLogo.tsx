import Link from 'next/link'
import Image from 'next/image'

export default function CornerLogo() {
  return (
    <Link
      href="/"
      aria-label="Logan Pinney — home"
      className="fixed top-5 left-5 sm:top-6 sm:left-8 z-50 group"
    >
      <Image
        src="/LP_Logo_SVG.svg"
        alt="Logan Pinney"
        width={32}
        height={32}
        priority
        className="opacity-90 group-hover:opacity-100 transition"
      />
    </Link>
  )
}