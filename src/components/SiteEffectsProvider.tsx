'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type SiteEffectName = 'matrix';

type TriggerOptions = {
  durationMs?: number;
};

type SiteEffectsContextValue = {
  activeEffect: SiteEffectName | null;
  triggerEffect: (effect: SiteEffectName, options?: TriggerOptions) => void;
  stopEffect: (effect?: SiteEffectName) => void;
};

const SiteEffectsContext = createContext<SiteEffectsContextValue | null>(null);

export function useSiteEffects() {
  const context = useContext(SiteEffectsContext);

  if (!context) {
    throw new Error('useSiteEffects must be used inside SiteEffectsProvider');
  }

  return context;
}

export default function SiteEffectsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeEffect, setActiveEffect] = useState<SiteEffectName | null>(null);
  const [glitching, setGlitching] = useState(false);
  const effectTimer = useRef<number | null>(null);
  const glitchTimer = useRef<number | null>(null);

  const clearEffectTimer = useCallback(() => {
    if (effectTimer.current) {
      window.clearTimeout(effectTimer.current);
      effectTimer.current = null;
    }
  }, []);

  const clearGlitchTimer = useCallback(() => {
    if (glitchTimer.current) {
      window.clearTimeout(glitchTimer.current);
      glitchTimer.current = null;
    }
  }, []);

  const stopEffect = useCallback(
    (effect?: SiteEffectName) => {
      if (effect && activeEffect !== effect) return;

      clearEffectTimer();
      clearGlitchTimer();
      setGlitching(false);
      setActiveEffect(null);
    },
    [activeEffect, clearEffectTimer, clearGlitchTimer]
  );

  const triggerEffect = useCallback(
    (effect: SiteEffectName, options?: TriggerOptions) => {
      clearEffectTimer();
      clearGlitchTimer();

      setActiveEffect(effect);
      setGlitching(true);

      glitchTimer.current = window.setTimeout(() => {
        setGlitching(false);
      }, 900);

      if (options?.durationMs) {
        effectTimer.current = window.setTimeout(() => {
          setActiveEffect(null);
        }, options.durationMs);
      }
    },
    [clearEffectTimer, clearGlitchTimer]
  );

  useEffect(() => {
    return () => {
      clearEffectTimer();
      clearGlitchTimer();
    };
  }, [clearEffectTimer, clearGlitchTimer]);

  return (
    <SiteEffectsContext.Provider
      value={{ activeEffect, triggerEffect, stopEffect }}
    >
      <div className={glitching ? 'site-glitch-pulse' : undefined}>
        {children}
      </div>
      {activeEffect === 'matrix' ? <MatrixRainOverlay /> : null}
    </SiteEffectsContext.Provider>
  );
}

function MatrixRainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!canvas || reduceMotion.matches) return;

    const activeCanvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) return;
    const activeContext = context;

    const glyphs = '01<>/{}[]#$%&+-=';
    const fontSize = 16;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let animationFrame = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;
      columns = Math.ceil(width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -height)
      );

      activeCanvas.width = Math.floor(width * dpr);
      activeCanvas.height = Math.floor(height * dpr);
      activeCanvas.style.width = `${width}px`;
      activeCanvas.style.height = `${height}px`;

      activeContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      activeContext.font = `${fontSize}px var(--font-mono), monospace`;
    }

    function draw() {
      activeContext.fillStyle = 'rgba(0, 0, 0, 0.12)';
      activeContext.fillRect(0, 0, width, height);
      activeContext.fillStyle = 'rgba(0, 230, 118, 0.72)';
      activeContext.shadowColor = 'rgba(0, 230, 118, 0.35)';
      activeContext.shadowBlur = 8;

      for (let index = 0; index < drops.length; index++) {
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = index * fontSize;
        const y = drops[index] * fontSize;

        activeContext.fillText(glyph, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[index] = 0;
        }

        drops[index] += 1;
      }

      animationFrame = window.requestAnimationFrame(draw);
    }

    resize();
    draw();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain-overlay"
      aria-hidden="true"
    />
  );
}
