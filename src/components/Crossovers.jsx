import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { teamById } from '../lib/teamHelpers.js'

function buildCrossovers() {
  const seen = new Map()
  for (const team of data.teams) {
    for (const m of team.members) {
      const key = m.name
      if (!seen.has(key)) seen.set(key, { name: m.name, wiki: m.wiki, teams: new Set() })
      seen.get(key).teams.add(team.id)
    }
  }
  const derived = [...seen.values()]
    .filter((p) => p.teams.size > 1)
    .map((p) => ({ ...p, teams: [...p.teams] }))

  const explicit = data.crossovers.map((c) => ({
    name: c.person,
    teams: c.teams,
    notes: c.notes,
  }))

  const merged = [...derived]
  for (const e of explicit) {
    const existing = merged.find((m) => m.name === e.name)
    if (existing) {
      existing.notes = existing.notes ?? e.notes
      const set = new Set([...existing.teams, ...e.teams])
      existing.teams = [...set]
    } else {
      merged.push(e)
    }
  }
  return merged.sort((a, b) => b.teams.length - a.teams.length || a.name.localeCompare(b.name))
}

export default function Crossovers() {
  const crossovers = buildCrossovers()

  return (
    <section>
      <header className="mb-10">
        <p className="label mb-2">Crossovers</p>
        <h2 className="text-3xl md:text-4xl font-display leading-tight">
          The same names, again and again.
        </h2>
        <p className="mt-4 text-[var(--color-warm-grey)] max-w-2xl">
          Players who turned out for more than one of these clubs. The literary cricket world is
          smaller than it looks.
        </p>
      </header>

      <ul className="rule pt-4 divide-y divide-[var(--color-rule)]">
        {crossovers.map((p) => (
          <li key={p.name} className="py-4 grid sm:grid-cols-[1fr_2fr] gap-2">
            <div>
              <p className="font-display text-xl leading-tight">
                {p.wiki ? (
                  <a href={p.wiki} target="_blank" rel="noopener noreferrer" className="ext">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </p>
              <p className="label mt-1">{p.teams.length} teams</p>
            </div>
            <div>
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {p.teams.map((id) => {
                  const team = teamById(data.teams, id)
                  if (!team) return null
                  return (
                    <li key={id}>
                      <Link to={`/teams/${id}`}>{team.name}</Link>
                    </li>
                  )
                })}
              </ul>
              {p.notes && (
                <p className="text-[14px] text-[var(--color-warm-grey)] italic mt-2">
                  {p.notes}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {crossovers.length === 0 && (
        <p className="text-[var(--color-warm-grey)]">
          No crossovers detected yet — research in progress.
        </p>
      )}
    </section>
  )
}
