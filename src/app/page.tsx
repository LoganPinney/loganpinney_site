'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HomePage() {
  // ref to measure scroll progress over entire page
  const targetRef = useRef<null | HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  // fade out the name from scrollYProgress 0 → 0.2
  const nameOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const nameY = useTransform(scrollYProgress, [0, 0.2], [0, -100])

  // fade in the buttons from scrollYProgress 0.2 → 0.4
  const buttonsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const buttonsY = useTransform(scrollYProgress, [0.2, 0.4], [20, 0])

  // staggered children animation for buttons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  }
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div
      ref={targetRef}
      className="relative min-h-screen w-full bg-black text-white overflow-x-hidden"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source src="/BG.mp4" type="video/mp4" /> 
    
      </video>

      {/* Centered Name */}
      <motion.h1
        style={{ opacity: nameOpacity, y: nameY }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl font-extrabold tracking-tight"
      >
        LOGAN PINNEY
      </motion.h1>

      {/* Staggered Buttons */}
      <motion.div
        style={{ opacity: buttonsOpacity, y: buttonsY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4"
      >
        {[
          { label: 'Mentor', href: '#mentor' },
          { label: 'Developer', href: '#developer' },
          { label: 'Worldbuilder', href: '#worldbuilder' },
        ].map((btn) => (
          <motion.a
            key={btn.label}
            variants={buttonVariants}
            href={btn.href}
            className="bg-white text-black px-6 py-3 rounded-md text-sm font-semibold hover:bg-gray-200 transition"
          >
            {btn.label}
          </motion.a>
        ))}
      </motion.div>

      {/* Content Sections */}
      <section id="mentor" className="h-screen flex items-center justify-center bg-gray-900">
        <h2 className="text-4xl font-bold">1:1 Mentorship</h2>
      </section>

      <section id="developer" className="h-screen flex items-center justify-center bg-gray-800">
        <h2 className="text-4xl font-bold">Contract Development</h2>
      </section>

      <section
        id="worldbuilder"
        className="h-screen flex items-center justify-center bg-gray-700"
      >
        <h2 className="text-4xl font-bold">World Building & Curriculum</h2>
      </section>
    </div>
  )
}
