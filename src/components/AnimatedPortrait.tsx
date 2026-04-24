'use client'

import Image from 'next/image'

type Props = {
  src?: string
  alt?: string
  className?: string
}

/**
 * Static portrait + lightweight CRT/radar overlays.
 * - Scanlines (CSS gradient, no JS)
 * - Rotating radar sweep (SVG, clipped to a circle)
 * - Subtle CRT flicker on the container
 * - Pulsing "REC" dot top-right
 *
 * Total animation cost is purely GPU compositing — no JS loop.
 * Respects prefers-reduced-motion (see globals.css).
 */
export default function AnimatedPortrait({
  src = '/about/portrait.png',
  alt = 'Logan Pinney',
  className = '',
}: Props) {
  return (
    <div
      className={`
        relative aspect-square w-full max-w-sm mx-auto
        overflow-hidden rounded-md portrait-flicker
        ${className}
      `}
    >
      {/* Portrait */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 80vw, 384px"
        priority
        className="object-cover"
      />

      {/* CRT scanlines */}
      <div
        className="pointer-events-none absolute inset-0 portrait-scanlines"
        aria-hidden="true"
      />

      {/* Radar sweep — clipped to a centered circle so the wedge feels
          like it’s rotating inside the green scope from the photo. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="portrait-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.55" />
          </linearGradient>
          <clipPath id="portrait-scope">
            <circle cx="50" cy="50" r="49" />
          </clipPath>
        </defs>
        <g clipPath="url(#portrait-scope)">
          <g className="portrait-radar-sweep">
            {/* 90° wedge from center, top-right quadrant */}
            <path
              d="M 50 50 L 50 0 A 50 50 0 0 1 100 50 Z"
              fill="url(#portrait-sweep)"
              style={{ mixBlendMode: 'screen' }}
            />
          </g>
        </g>
      </svg>

      {/* REC indicator dot */}
      <div
        className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[10px] tracking-widest"
        style={{ color: '#22c55e' }}
        aria-hidden="true"
      >
        <span
          className="portrait-dot inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: '#22c55e' }}
        />
        REC
      </div>
    </div>
  )
}
