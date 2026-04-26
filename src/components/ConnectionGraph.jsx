import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { CONNECTION_LABELS, teamById } from '../lib/teamHelpers.js'

const ORDER = ['evolved', 'revival', 'rivalry', 'fixture', 'historical']

export default function ConnectionGraph() {
  const grouped = ORDER.map((type) => ({
    type,
    items: data.connections.filter((c) => c.type === type),
  })).filter((g) => g.items.length > 0)

  return (
    <section>
      <header className="mb-10">
        <p className="label mb-2">Connections</p>
        <h2 className="text-3xl md:text-4xl font-display leading-tight">
          How the teams overlap, evolve, and play each other.
        </h2>
        <p className="mt-4 text-[var(--color-warm-grey)] max-w-2xl">
          Cricket is a sociable sport, and literary cricket especially so. The same names recur;
          one team grows out of another; rivalries congeal into annual fixtures.
        </p>
      </header>

      <div className="space-y-12">
        {grouped.map((group) => (
          <section key={group.type}>
            <h3 className="font-display text-2xl mb-1">{CONNECTION_LABELS[group.type]}</h3>
            <div className="rule pt-4">
              <ul className="space-y-5">
                {group.items.map((c, i) => {
                  const a = teamById(data.teams, c.from)
                  const b = teamById(data.teams, c.to)
                  if (!a || !b) return null
                  return (
                    <li key={i} className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-x-4 gap-y-1">
                      <Link to={`/teams/${a.id}`} className="font-display text-lg sm:text-right">
                        {a.name}
                      </Link>
                      <span className="label text-center text-[var(--color-warm-grey)]">
                        ↔
                      </span>
                      <Link to={`/teams/${b.id}`} className="font-display text-lg">
                        {b.name}
                      </Link>
                      {(c.label || c.notes) && (
                        <p className="sm:col-span-3 text-[14px] text-[var(--color-warm-grey)] sm:text-center mt-1">
                          {c.label}
                          {c.notes && (
                            <em className="block sm:inline sm:before:content-['_—_']">
                              "{c.notes}"
                            </em>
                          )}
                        </p>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}
