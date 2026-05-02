import { Link, useParams } from 'react-router-dom'
import data from '../data/teams.json'
import MemberCard from './MemberCard.jsx'
import { Crest, FleuronSimple, Fleuron } from './Motifs.jsx'
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
        <p className="smallcaps">Not found</p>
        <h2 className="serif-display text-3xl mt-2 italic-display" style={{ fontStyle: 'italic' }}>No team by that name.</h2>
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
  const accent = TYPE_COLORS[team.type]

  return (
    <article>
      <p className="smallcaps mb-6">
        <Link to="/teams" className="plain text-[var(--color-ink-faint)] hover:text-[var(--color-ink)]">
          ← All teams
        </Link>
      </p>

      {/* Title block — almanack section opener */}
      <header className="mb-10 text-center">
        <div className="flex justify-center mb-3">
          <Crest size={56} color={accent} />
        </div>
        <p className="smallcaps" style={{ letterSpacing: '0.22em', color: accent }}>
          {TYPE_LABELS[team.type]} · {team.founded}–{team.dissolved ?? 'present'}
          {isActive(team) && <span className="ml-2 dot-active" />}
        </p>
        <h2 className="serif-display mt-2" style={{ fontSize: 'clamp(34px, 5vw, 52px)', lineHeight: 1.05, fontWeight: 500 }}>
          <span className="italic-display" style={{ fontStyle: 'italic' }}>{team.name}</span>
        </h2>
        <p className="italic-display mt-3 text-[var(--color-ink-soft)]" style={{ fontStyle: 'italic' }}>
          Founded by {team.founder}.
        </p>
        <div className="flex justify-center mt-5">
          <FleuronSimple size={12} width={120} color="var(--color-ink-faint)" />
        </div>
      </header>

      <div className="grid md:grid-cols-[1fr_280px] gap-12">
        <div>
          <p className="dropcap text-[18px] leading-relaxed">{team.description}</p>

          {team.links?.length > 0 && (
            <section className="mt-10">
              <h3 className="smallcaps mb-3" style={{ letterSpacing: '0.22em' }}>Further afield</h3>
              <ul className="space-y-2">
                {team.links.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="ext">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h3 className="smallcaps" style={{ letterSpacing: '0.22em' }}>The Roster · {team.members.length}</h3>
              <FleuronSimple size={10} width={60} color="var(--color-ink-faint)" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {team.members.map((m, i) => (
                <MemberCard key={`${m.name}-${i}`} member={m} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-10">
          {related.length > 0 && (
            <section>
              <h3 className="smallcaps mb-3" style={{ letterSpacing: '0.22em' }}>Connections</h3>
              <ul className="space-y-3">
                {related.map((c, i) => {
                  const other = teamById(data.teams, c.otherId)
                  if (!other) return null
                  return (
                    <li key={i} className="text-[14px]">
                      <p className="smallcaps">{CONNECTION_LABELS[c.type]}</p>
                      <Link to={`/teams/${other.id}`} className="plain serif-display italic-display block leading-tight" style={{ fontSize: 18, fontStyle: 'italic' }}>
                        {other.name}
                      </Link>
                      {c.label && <p className="text-[var(--color-ink-faint)] mt-0.5">{c.label}</p>}
                      {c.notes && <p className="italic-display text-[var(--color-ink-faint)] mt-0.5" style={{ fontStyle: 'italic' }}>"{c.notes}"</p>}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {opponents.length > 0 && (
            <section>
              <h3 className="smallcaps mb-3" style={{ letterSpacing: '0.22em' }}>Known opponents</h3>
              <ul className="space-y-1.5 text-[14px]">
                {opponents.map((o) => (
                  <li key={o.name}>
                    <span>{o.name}</span>
                    {o.notes && (
                      <span className="text-[var(--color-ink-faint)] block text-[12px]">{o.notes}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {team.sources?.length > 0 && (
            <section>
              <h3 className="smallcaps mb-3" style={{ letterSpacing: '0.22em' }}>Sources</h3>
              <ul className="space-y-2 text-[13px] italic-display text-[var(--color-ink-faint)]" style={{ fontStyle: 'italic' }}>
                {team.sources.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>

      <div className="flex justify-center mt-16 text-[var(--color-ink-faint)]">
        <Fleuron size={22} color="var(--color-ink-faint)" />
      </div>
    </article>
  )
}
