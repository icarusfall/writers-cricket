import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { teamById } from '../lib/teamHelpers.js'
import { FleuronSimple } from './Motifs.jsx'

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
    name: c.person, teams: c.teams, notes: c.notes,
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
      <header className="mb-10 text-center">
        <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>Plate the Fourth</span>
        <h2 className="serif-display mt-2" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.05, fontWeight: 500 }}>
          The same names, <span className="italic-display" style={{ fontStyle: 'italic' }}>again and again</span>.
        </h2>
        <p className="italic-display mt-3 text-[var(--color-ink-soft)] max-w-xl mx-auto" style={{ fontStyle: 'italic' }}>
          Players who turned out for more than one of these clubs.
          The literary cricket world is smaller than it looks.
        </p>
        <div className="flex justify-center mt-5">
          <FleuronSimple size={12} width={120} color="var(--color-ink-faint)" />
        </div>
      </header>

      <ul className="rule pt-4 divide-y divide-[var(--color-rule-hair)]">
        {crossovers.map((p) => (
          <li key={p.name} className="py-5 grid sm:grid-cols-[1fr_2fr] gap-2">
            <div>
              <p className="serif-display italic-display leading-tight" style={{ fontSize: 20, fontStyle: 'italic', fontWeight: 500 }}>
                {p.wiki ? (
                  <a href={p.wiki} target="_blank" rel="noopener noreferrer" className="ext">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </p>
              <p className="smallcaps mt-1">{p.teams.length} teams</p>
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
                <p className="italic-display text-[14px] text-[var(--color-ink-faint)] mt-2" style={{ fontStyle: 'italic' }}>
                  {p.notes}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {crossovers.length === 0 && (
        <p className="text-[var(--color-ink-faint)]">
          No crossovers detected yet — research in progress.
        </p>
      )}
    </section>
  )
}
