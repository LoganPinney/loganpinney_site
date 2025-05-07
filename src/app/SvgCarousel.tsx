// SvgCarousel.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion, useScroll, useTransform } from 'framer-motion'

// Array of your SVG image paths
const svgs = [
  '/svgs/CGSpectrum_Logo.svg',
  '/svgs/coursera-logo-white-rgb.svg',
  '/svgs/Epic_Games_logo.svg',
  '/svgs/Hollows_Logo.svg',
  '/svgs/School_of_Motion_Logo.svg',
]

export default function SvgCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const fadeIn = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <motion.section
      id="svg-carousel"
      ref={containerRef}
      style={{ opacity: fadeIn }}
      className="max-w-4xl mx-auto py-16 px-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-8">Our Clients & Partners</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={24}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 }
        }}
      >
        {svgs.map((src, idx) => (
          <SwiperSlide key={idx} className="flex justify-center">
            <Image
              src={src}
              alt={`logo-${idx}`}
              width={64}
              height={64}
              className="object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  )
}