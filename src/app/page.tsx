// src/app/page.tsx

'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
//import Link from 'next/link'

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const onScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 100)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    controls.start({
      opacity: scrolled ? 0 : 1,
      y: scrolled ? -100 : 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    })
  }, [scrolled, controls])

  return (
    <div className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="h-screen w-full flex items-center justify-center relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/BG.mp4" type="video/mp4" />
        </video>

        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={controls}
          className="z-10 text-center px-4"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold mb-6">
            LOGAN PINNEY
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Mentor. Developer. World Builder.
          </p>
        </motion.div>
      </section>

      {/* CONTENT REVEAL SECTION */}
      <section className="px-6 py-20 max-w-4xl mx-auto space-y-16">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/5 p-6 rounded-md shadow text-white"
          >
            <h2 className="text-2xl font-semibold mb-2">Section {i + 1}</h2>
            <p className="text-gray-300">
              This could be your services, courses, or about sections. Each fades
              in as it enters view, just like on MidJourney’s homepage.
            </p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}
