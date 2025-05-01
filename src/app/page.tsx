'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HomePage() {
  const target = useRef<HTMLDivElement>(null)

  // Measure scroll progress across the whole page
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start start', 'end end'],
  })

  // HERO animation – fades + scales away the moment the user scrolls
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  // Sticky nav appears as soon as hero begins to leave the screen
  const navOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])

  return (
    <main
      ref={target}
      className="relative min-h-screen w-full bg-black text-white overflow-x-hidden snap-y snap-mandatory"
    >
      {/* Sticky navigation */}
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 w-full z-40 flex items-center justify-center py-4 backdrop-blur-lg bg-black/40"
      >
        <ul className="flex gap-6 text-sm tracking-wide uppercase">
          <li>
            <a href="#mentor" className="hover:text-gray-300 transition">
              Mentor
            </a>
          </li>
          <li>
            <a href="#developer" className="hover:text-gray-300 transition">
              Developer
            </a>
          </li>
          <li>
            <a href="#worldbuilder" className="hover:text-gray-300 transition">
              Worldbuilder
            </a>
          </li>
        </ul>
      </motion.nav>

      {/* HERO section */}
      <section className="snap-start h-screen relative flex flex-col items-center justify-center">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          poster="/bg-fallback.jpg"
        >
          <source src="/BG.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay to improve contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <motion.h1
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center text-6xl lg:text-8xl font-extrabold tracking-tight leading-none"
        >
          LOGAN PINNEY
        </motion.h1>

        <motion.a
          style={{ opacity: heroOpacity }}
          href="#mentor"
          className="relative z-10 mt-10 inline-block bg-white text-black px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-gray-200 transition"
        >
          Explore
        </motion.a>
      </section>

      {/* CONTENT SECTIONS */}
      <section
        id="mentor"
        className="snap-start h-screen flex items-center justify-center bg-[#111]"
      >
        <h2 className="text-4xl font-bold">1&nbsp;:&nbsp;1 Mentorship</h2>
      </section>

      <section
        id="developer"
        className="snap-start h-screen flex items-center justify-center bg-[#181818]"
      >
        <h2 className="text-4xl font-bold">Contract Development</h2>
      </section>

      <section
        id="worldbuilder"
        className="snap-start h-screen flex items-center justify-center bg-[#1e1e1e]"
      >
        <h2 className="text-4xl font-bold">World Building&nbsp;&amp;&nbsp;Curriculum</h2>
      </section>
    </main>
  )
}
