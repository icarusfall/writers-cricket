import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { CONNECTION_LABELS, teamById } from '../lib/teamHelpers.js'
import { FleuronSimple, NumeralBadge } from './Motifs.jsx'

const ORDER = ['evolved', 'revival', 'rivalry', 'fixture', 'historical']

export default function ConnectionGraph() {
  const grouped = ORDER.map((type) => ({
    type,
    items: data.connections.filter((c) => c.type === type),
  })).filter((g) => g.items.length > 0)

  return (
    <section>
      <header className="mb-10 text-center">
        <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>Plate the Third</span>
        <h2 className="serif-display mt-2" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.05, fontWeight: 500 }}>
          How <span className="italic-display" style={{ fontStyle: 'italic' }}>the teams overlap</span>, evolve, and play each other.
        </h2>
        <p className="italic-display mt-3 text-[var(--color-ink-soft)] max-w-xl mx-auto" style={{ fontStyle: 'italic' }}>
          Cricket is a sociable sport, and literary cricket especially so.
          The same names recur; one team grows out of another; rivalries congeal into annual fixtures.
        </p>
      </header>

      <div className="space-y-14">
        {grouped.map((group, gi) => (
          <section key={group.type}>
            <div className="flex items-center gap-3 mb-5">
              <NumeralBadge n={gi + 1} size={32} color="var(--color-accent)" />
              <h3 className="serif-display italic-display" style={{ fontSize: 24, fontStyle: 'italic', margin: 0, fontWeight: 500 }}>
                {CONNECTION_LABELS[group.type]}
              </h3>
              <span className="flex-1 border-t border-[var(--color-rule-hair)]" />
              <FleuronSimple size={12} width={50} color="var(--color-ink-faint)" />
            </div>

            <ul className="space-y-6">
              {group.items.map((c, i) => {
                const a = teamById(data.teams, c.from)
                const b = teamById(data.teams, c.to)
                if (!a || !b) return null
                return (
                  <li key={i} className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-x-4 gap-y-1">
                    <Link to={`/teams/${a.id}`} className="plain serif-display italic-display sm:text-right" style={{ fontSize: 18, fontStyle: 'italic' }}>
                      {a.name}
                    </Link>
                    <span className="text-center text-[var(--color-ink-faint)] smallcaps" style={{ letterSpacing: '0.22em' }}>—v—</span>
                    <Link to={`/teams/${b.id}`} className="plain serif-display italic-display" style={{ fontSize: 18, fontStyle: 'italic' }}>
                      {b.name}
                    </Link>
                    {(c.label || c.notes) && (
                      <p className="sm:col-span-3 text-[14px] text-[var(--color-ink-faint)] sm:text-center mt-1">
                        {c.label}
                        {c.notes && (
                          <em className="block sm:inline sm:before:content-['_—_']">"{c.notes}"</em>
                        )}
                      </p>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </section>
  )
}
