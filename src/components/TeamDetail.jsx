import { Link, useParams } from 'react-router-dom'
import data from '../data/teams.json'
import MemberCard from './MemberCard.jsx'
import {
  CONNECTION_LABELS,
  TYPE_COLORS,
  TYPE_LABELS,
  isActive,
  teamById,
} from '../lib/teamHelpers.js'

export default function TeamDetail() {
  const { teamId } = useParams()
  const team = teamById(data.teams, teamId)

  if (!team) {
    return (
      <section>
        <p className="label">Not found</p>
        <h2 className="font-display text-3xl mt-2">No team by that name.</h2>
        <p className="mt-4">
          <Link to="/teams">Back to the team list</Link>
        </p>
      </section>
    )
  }

  const related = data.connections
    .map((c) => {
      if (c.from === team.id) return { ...c, otherId: c.to, direction: 'to' }
      if (c.to === team.id) return { ...c, otherId: c.from, direction: 'from' }
      return null
    })
    .filter(Boolean)

  const opponents = data.knownOpponents.filter((o) => o.playedBy.includes(team.id))

  return (
    <article>
      <p className="label mb-4">
        <Link to="/teams" className="plain text-[var(--color-warm-grey)] hover:text-[var(--color-ink)]">
          ← All teams
        </Link>
      </p>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="label px-2 py-0.5 rounded-sm"
            style={{
              backgroundColor: `color-mix(in srgb, ${TYPE_COLORS[team.type]} 12%, transparent)`,
              color: TYPE_COLORS[team.type],
            }}
          >
            {TYPE_LABELS[team.type]}
          </span>
          <span className="label">
            {team.founded}—{team.dissolved ?? 'present'}
          </span>
          {isActive(team) && (
            <span className="label inline-flex items-center gap-2">
              <span className="dot-active" /> still playing
            </span>
          )}
        </div>
        <h2 className="font-display text-4xl md:text-5xl leading-tight">{team.name}</h2>
        <p className="mt-3 text-[var(--color-warm-grey)]">Founded by {team.founder}.</p>
      </header>

      <div className="grid md:grid-cols-[1fr_280px] gap-12">
        <div>
          <p className="text-[18px] leading-relaxed">{team.description}</p>

          {team.links?.length > 0 && (
            <section className="mt-10">
              <h3 className="label mb-3">Further afield</h3>
              <ul className="space-y-2">
                {team.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ext"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-10">
            <h3 className="label mb-4">The Roster · {team.members.length}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {team.members.map((m, i) => (
                <MemberCard key={`${m.name}-${i}`} member={m} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          {related.length > 0 && (
            <section>
              <h3 className="label mb-3">Connections</h3>
              <ul className="space-y-3">
                {related.map((c, i) => {
                  const other = teamById(data.teams, c.otherId)
                  if (!other) return null
                  return (
                    <li key={i} className="text-[14px]">
                      <p className="label">{CONNECTION_LABELS[c.type]}</p>
                      <Link to={`/teams/${other.id}`} className="font-display text-lg block leading-tight">
                        {other.name}
                      </Link>
                      {c.label && (
                        <p className="text-[var(--color-warm-grey)] mt-0.5">{c.label}</p>
                      )}
                      {c.notes && (
                        <p className="text-[var(--color-warm-grey)] italic mt-0.5">"{c.notes}"</p>
                      )}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {opponents.length > 0 && (
            <section>
              <h3 className="label mb-3">Known opponents</h3>
              <ul className="space-y-1.5 text-[14px]">
                {opponents.map((o) => (
                  <li key={o.name}>
                    <span>{o.name}</span>
                    {o.notes && (
                      <span className="text-[var(--color-warm-grey)] block text-[12px]">
                        {o.notes}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {team.sources?.length > 0 && (
            <section>
              <h3 className="label mb-3">Sources</h3>
              <ul className="space-y-2 text-[13px] text-[var(--color-warm-grey)] italic">
                {team.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </article>
  )
}
