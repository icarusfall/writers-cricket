import { NavLink } from 'react-router-dom'

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
      <header className="border-b border-[var(--color-rule)]">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <NavLink to="/" className="plain">
              <h1 className="text-3xl md:text-4xl font-display leading-tight">
                Literary Cricket
              </h1>
              <p className="label mt-1">A field guide, 1887 — present</p>
            </NavLink>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `plain label !text-[12px] ${
                    isActive
                      ? 'text-[var(--color-cricket-green)]'
                      : 'text-[var(--color-warm-grey)] hover:text-[var(--color-ink)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-[1100px] mx-auto px-6 py-12">{children}</div>
      </main>

      <footer className="border-t border-[var(--color-rule)] mt-16">
        <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col md:flex-row gap-2 md:justify-between text-[var(--color-warm-grey)]">
          <p className="label">A research project — work in progress</p>
          <p className="label">Compiled with care · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}
