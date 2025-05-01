// src/components/Nav.tsx
import Image from 'next/image'   // at the top

{/* Section nav (inside the hero) */}
<ul className="flex items-center gap-10 ...">
  {/* LP icon as the first li */}
  <li>
    <a href="#top" className="block">
      <Image
        src="/lp_logo_SVG.svg"      // put file in /public
        alt="Logan Pinney"
        width={28}
        height={28}
        priority
      />
    </a>
  </li>

  {/* existing links */}
  {sectionLinks.map(({ label, href }) => (
    <li key={label}>
      <a href={href} className="hover:text-white transition">
        {label}
      </a>
    </li>
  ))}
</ul>