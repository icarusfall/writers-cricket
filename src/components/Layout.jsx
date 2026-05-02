import { NavLink } from 'react-router-dom'
import { Crest, FleuronSimple, LaurelSprig } from './Motifs.jsx'

const navItems = [
  { to: '/', label: 'Timeline', end: true },
  { to: '/teams', label: 'Teams' },
  { to: '/connections', label: 'Connections' },
  { to: '/crossovers', label: 'Crossovers' },
  { to: '/about', label: 'About' },
]

export default function Layout({ children }) {
  return (
    <div className="min-h-full flex flex-col">
      {/* ── Almanack title-page masthead ── */}
      <header className="text-center px-6 pt-8 pb-5 border-b border-[var(--color-rule)]">
        <NavLink to="/" className="plain block">
          {/* eyebrow */}
          <div className="mx-auto max-w-[880px] mb-4 flex items-center justify-between text-[var(--color-ink-faint)]">
            <span className="smallcaps">No. i</span>
            <FleuronSimple size={10} width={50} color="var(--color-ink-faint)" />
            <span className="smallcaps">Vol. I · MMXXVI</span>
          </div>

          {/* crest */}
          <div className="flex justify-center mb-1">
            <Crest size={56} color="var(--color-ink)" />
          </div>

          {/* nameplate */}
          <div className="mx-auto max-w-[880px] relative border-y border-[var(--color-ink)] py-3">
            <div className="absolute top-1 inset-x-0 border-t border-[var(--color-rule)]" />
            <div className="absolute bottom-1 inset-x-0 border-t border-[var(--color-rule)]" />

            <p className="smallcaps italic-display mb-1" style={{ letterSpacing: '0.18em', color: 'var(--color-ink-faint)' }}>
              An Almanack of
            </p>
            <h1 className="serif-display leading-[0.95]" style={{ fontSize: 'clamp(40px, 7vw, 60px)', margin: 0 }}>
              <span className="italic-display" style={{ fontStyle: 'italic' }}>Literary</span>{' '}
              <span style={{ fontVariant: 'small-caps', letterSpacing: '0.04em' }}>Cricket</span>
            </h1>
            <p className="italic-display mt-2 text-[var(--color-ink-soft)]" style={{ fontStyle: 'italic', fontSize: 15 }}>
              A Field Guide to the Theatrical &amp; Authorial Elevens of England
            </p>
          </div>

          {/* sub-line */}
          <div className="flex items-center justify-center gap-3 mt-3 text-[var(--color-ink-faint)]">
            <LaurelSprig size={16} color="var(--color-ink-faint)" side="left" />
            <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>
              Anno cricketensis · MDCCCXLVIII — MMXXVI
            </span>
            <LaurelSprig size={16} color="var(--color-ink-faint)" side="right" />
          </div>
        </NavLink>

        {/* nav */}
        <nav className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `plain smallcaps !text-[11px] ${
                  isActive
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]'
                }`
              }
              style={{ letterSpacing: '0.22em' }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-12">{children}</div>
      </main>

      <footer className="border-t border-[var(--color-rule)] mt-16">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col md:flex-row gap-2 md:justify-between text-[var(--color-ink-faint)]">
          <p className="smallcaps">A research project · work in progress</p>
          <p className="smallcaps">Compiled with care · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
