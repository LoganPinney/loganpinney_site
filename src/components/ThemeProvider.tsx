import { siteConfig } from '@/config/site.config'

/**
 * Server component that injects theme values from site.config.ts
 * into CSS custom properties on <html>. Also toggles scanline overlay.
 *
 * Renders a <style> tag with the current theme. Since this is a server
 * component, the CSS is inlined into the initial HTML — no FOUC.
 */
export default function ThemeProvider() {
  const t = siteConfig.theme
  const fx = siteConfig.effects

  const css = `
    :root {
      --accent: ${t.accent};
      --accent-dim: ${t.accentDim};
      --accent-glow: ${t.accentGlow};
      --success: ${t.success};
      --bg: ${t.bg};
      --bg-card: ${t.bgCard};
      --border: ${t.border};
      --border-hover: ${t.borderHover};
      --text: ${t.text};
      --text-dim: ${t.textDim};
      --text-faint: ${t.textFaint};
    }
  `.trim()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      {/* Script runs before hydration — sets data attrs for CSS toggles */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-scanlines','${fx.scanlines}');`,
        }}
      />
    </>
  )
}
