'use client'

import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion, useScroll, useTransform } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Logan's guidance completely transformed my Unreal Engine workflow.",
    author: 'Alex R., Game Developer'
  },
  {
    quote: 'One of the most knowledgeable mentors I have ever worked with.',
    author: 'Samantha K., 3D Artist'
  },
  {
    quote: 'Clear, concise, and inspirational teaching style.',
    author: 'Daniel T., Student'
  }
]

export default function TestimonialCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const fadeIn = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <motion.section
      id="testimonial-carousel"
      ref={containerRef}
      style={{ opacity: fadeIn }}
      className="max-w-3xl mx-auto py-16 px-4"
    >
      <h2 className="text-2xl font-semibold text-center mb-8">Testimonials</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={32}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
      >
        {testimonials.map(({ quote, author }, idx) => (
          <SwiperSlide key={idx} className="text-center">
            <blockquote className="italic max-w-xl mx-auto text-lg">
              “{quote}”
            </blockquote>
            <p className="mt-4 font-semibold">{author}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  )
}

