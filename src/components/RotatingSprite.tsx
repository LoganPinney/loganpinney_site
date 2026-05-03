import type { CSSProperties } from 'react'

export type RotatingSpriteProps = {
  src?: string
  frameCount?: number
  frameWidth?: number
  frameHeight?: number
  durationMs?: number
  scale?: number
  className?: string
  paused?: boolean
  reverse?: boolean
}

type RotatingSpriteStyle = CSSProperties & {
  '--sprite-url': string
  '--frame-width': string
  '--frame-height': string
  '--sheet-width': string
  '--duration': string
  '--frame-count': number
  '--scale': number
  '--sprite-play-state': 'paused' | 'running'
  '--sprite-direction': 'normal' | 'reverse'
  '--sprite-stage-height': string
}

export default function RotatingSprite({
  src = '/sprites/cyborg_walk.png',
  frameCount = 8,
  frameWidth = 256,
  frameHeight = 256,
  durationMs = 1200,
  scale = 2,
  className = '',
  paused = false,
  reverse = false,
}: RotatingSpriteProps) {
  const sheetWidth = frameWidth * frameCount
  const stageHeight = frameHeight * scale + 64

  const spriteStyle: RotatingSpriteStyle = {
    '--sprite-url': `url(${JSON.stringify(src)})`,
    '--frame-width': `${frameWidth}px`,
    '--frame-height': `${frameHeight}px`,
    '--sheet-width': `${sheetWidth}px`,
    '--duration': `${durationMs}ms`,
    '--frame-count': frameCount,
    '--scale': scale,
    '--sprite-play-state': paused ? 'paused' : 'running',
    '--sprite-direction': reverse ? 'reverse' : 'normal',
    '--sprite-stage-height': `${stageHeight}px`,
  }

  return (
    <div className={`rotating-sprite-stage ${className}`} style={spriteStyle}>
      <div className="rotating-sprite" aria-hidden="true" />
    </div>
  )
}
