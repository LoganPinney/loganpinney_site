'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { UserPlus, LogIn, Compass, Info, Briefcase, Mail, type LucideIcon } from 'lucide-react'


export default function HomePage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ['start start', 'end end'] })

  /* ───────────────────────────────── Animations */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  /* ───────────────────────────────── Primary CTAs */
  const primaryActions = [
    { label: 'Sign Up', href: '#signup', Icon: UserPlus, badge: 'bg-emerald-600' },
    { label: 'Log In', href: '#login', Icon: LogIn, badge: 'bg-amber-500' },
    { label: 'Explore', href: '#about', Icon: Compass, badge: 'bg-fuchsia-700' },
  ]

  /* ───────────────────────────────── Section links */
  const sectionLinks = [
    { label: 'About', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <main ref={rootRef} className="relative min-h-screen w-full bg-black text-white overflow-x-hidden scroll-smooth">
      {/* ───────── HERO */}
      <section className="h-screen relative flex flex-col items-center justify-center text-center px-6">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          poster="/BG_Backup_01.jpg"
        >
           {/* mobile first – fires when viewport ≤ 640 px */}
          <source src="/BG_mobile.mp4" type="video/mp4" media="(max-width: 640px)" />

            {/* default / desktop */}
          <source src="/BG_Desktop.mp4" type="video/mp4" />
        </video>
       
        {/* Contrast overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center gap-8 translate-y-[200px]"
        >
          {/* CTA pills */}
          <div className="flex gap-px bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-full shadow-lg overflow-hidden">
            {primaryActions.map(({ label, href, Icon, badge }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium hover:bg-white/10 transition whitespace-nowrap"
              >
                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${badge}`}></span>
                <Icon size={14} className="opacity-80" />
                {label}
              </a>
            ))}
          </div>

          {/* Section nav */}
          <ul className="flex gap-10 font-semibold text-xs sm:text-sm uppercase tracking-wider text-gray-300">
            {sectionLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="hover:text-white transition">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ───────── CONTENT SECTIONS */}
      <Section id="about" Icon={Info} title="About">
  <p>
    <strong><a href="#" target="_blank" rel="noopener noreferrer">Logan Pinney – Unreal Engine Instructor, Mentor, and World-Building Specialist</a></strong>
  </p>
  <p>
    Logan Pinney is a professional Unreal Engine developer, educator, and mentor with deep expertise in 
    <strong> game development, world building, cinematics, and 3D animation</strong>. 
    Holding a <strong><a href="https://www.cs.queensu.ca/" target="_blank" rel="noopener noreferrer">Computer Science degree from Queen&apos;s University</a></strong>, 
    Logan blends technical skill with creative storytelling to help students and studios master real-time workflows.
  </p>
  <p>
    He currently serves as an 
    <strong><a href="https://www.unrealengine.com/en-US/training-academic-partners" target="_blank" rel="noopener noreferrer">Unreal Engine Authorized Instructor</a></strong> and 
    <strong><a href="https://www.cgspectrum.com/courses/virtual-production#courses" target="_blank" rel="noopener noreferrer"> mentor at CG Spectrum</a></strong>, where he teaches beginner to advanced courses in 
    <strong><a href="https://www.unrealengine.com/" target="_blank" rel="noopener noreferrer">Unreal Engine 5, Unreal Editor for Fortnite (UEFN)</a></strong>, and real-time production pipelines. 
    With a proven track record, Logan has guided thousands of students through 
    <strong>industry-ready Unreal Engine training programs</strong>.
  </p>
  <p>
    Logan is also the creator of the high-rated Coursera course 
    <em><a href="https://www.coursera.org/learn/unreal-engine-fundamentals?specialization=epic-games-game-design-professional-certificate" target="_blank" rel="noopener noreferrer">&quot;Unreal Engine Fundamentals&quot;</a></em>, designed for beginners to build a strong foundation in real-time 3D development. 
    His <strong><a href="https://www.youtube.com/channel/UCjmjChQVBFbgtTAYnJrp1JA" target="_blank" rel="noopener noreferrer">YouTube channel</a></strong> offers accessible tutorials on 
    <strong> Unreal Engine, UEFN, and game development tools</strong>, helping aspiring developers of all ages gain practical skills.
  </p>
  <p>
    In addition to his teaching roles, Logan works as a 
    <strong><a href="https://kitbash3d.com/" target="_blank" rel="noopener noreferrer"> KitBash3D Ambassador</a></strong>, where he has contributed to the 
     quality assurance of over 40 production-ready asset kits used in world-building for games, film, and virtual production.
  </p>
  <p>
    Whether you&apos;re an indie dev, studio team, or solo creator looking to 
    <strong>learn Unreal Engine</strong>, 
    <strong>master world building</strong>, or 
    <strong> level up your real-time 3D skills</strong>, 
    Logan&apos;s mission is to empower and equip you with the tools to succeed.
  </p>
</Section>

      <Section id="careers" Icon={Briefcase} title="Careers">
        <p>
          I&apos;m currently expanding the team on a handful of short‑term, remote contracts. If you&apos;re
          a sharp technical artist or a Rust / Web3 engineer, drop your reel or GitHub. Let&apos;s build
          cool things without the corporate baggage.
        </p>
      </Section>

      <Section id="contact" Icon={Mail} title="Contact">
        <p>
          For mentorship, dev inquiries or press, reach out at{' '}
          <a href="mailto:info@loganpinney.com" className="underline hover:text-gray-300">
            info@loganpinney.com
          </a>
          . You can also find me in the #support channel of my Discord server.
        </p>
      </Section>

      {/* ───────── FOOTER */}
      <footer className="mt-24 pb-8 text-center text-xs text-gray-400 space-x-6">
        <a href="/terms" className="hover:text-gray-300">
          Terms of Service
        </a>
        <a href="/privacy" className="hover:text-gray-300">
          Privacy Policy
        </a>
      </footer>
    </main>
  )
}

/*──────────────────────────────────────────────────────────*/
interface SectionProps {
  id: string
  Icon: LucideIcon
  title: string
  children: React.ReactNode
}

function Section({ id, Icon, title, children }: SectionProps) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-6 py-24">
      <hr className="border-gray-700/40 mb-8" />
      <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-semibold mb-6">
        <Icon size={20} className="text-indigo-400" />
        {title}
      </h2>
      <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">{children}</div>
    </section>
  )
}
