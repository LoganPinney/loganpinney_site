'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'

type SpriteConfig = {
  id: string
  label: string
  src: string
  frames: number
  frameWidth: number
  frameHeight: number
  fps: number
}

type SpriteWidget = {
  addSprite: (sprite: SpriteConfig) => void
  setSprite: (id: string) => void
  destroy: () => void
}

declare global {
  interface Window {
    SpriteAnimator?: {
      mount: (
        target: string | Element,
        options: { sprites: SpriteConfig[]; defaultId?: string }
      ) => SpriteWidget
    }
    spriteWidget?: SpriteWidget
  }
}

const sprites: SpriteConfig[] = [
  {
    id: 'beholder',
    label: 'Beholder',
    src: '/sprite_widget/sprites/BEHOLDER.png',
    frames: 8,
    frameWidth: 256,
    frameHeight: 256,
    fps: 8,
  },
]

const widgetTheme = {
  '--sa-bg': 'var(--bg-card)',
  '--sa-panel': '#050505',
  '--sa-border': 'var(--border-hover)',
  '--sa-ink': 'var(--text)',
  '--sa-muted': 'var(--text-dim)',
  '--sa-accent': 'var(--accent)',
} as CSSProperties

function ensureWidgetStyles() {
  if (document.querySelector('link[data-sprite-widget-styles="true"]')) {
    return
  }

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/sprite_widget/sprite-widget.css'
  link.dataset.spriteWidgetStyles = 'true'
  document.head.appendChild(link)
}

export default function SpriteWidgetClient() {
  const rootRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<SpriteWidget | null>(null)

  const mountWidget = useCallback(() => {
    if (!rootRef.current || !window.SpriteAnimator || widgetRef.current) {
      return
    }

    const widget = window.SpriteAnimator.mount(rootRef.current, {
      sprites,
      defaultId: 'beholder',
    })

    widgetRef.current = widget
    window.spriteWidget = widget
  }, [])

  useEffect(() => {
    ensureWidgetStyles()
    mountWidget()

    return () => {
      widgetRef.current?.destroy()
      widgetRef.current = null
      delete window.spriteWidget
    }
  }, [mountWidget])

  return (
    <>
      <Script
        src="/sprite_widget/sprite-widget.js"
        strategy="afterInteractive"
        onLoad={mountWidget}
      />
      <div ref={rootRef} style={widgetTheme} />
    </>
  )
}
