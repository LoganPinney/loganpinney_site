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
          I&apos;m Logan&nbsp;Pinney—game developer, world‑builder and mentor. I help artists and studios
          harness Unreal Engine to craft immersive real‑time experiences. This site is a living hub
          for my projects, tutorials and contract work.
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
