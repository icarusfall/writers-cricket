import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { TYPE_COLORS, TYPE_LABELS, isActive } from '../lib/teamHelpers.js'
import { Crest, ScorecardCorner } from './Motifs.jsx'

function firstSentences(text, count) {
  if (!text) return ''
  const parts = text.match(/[^.!?]+[.!?]+/g) ?? [text]
  return parts.slice(0, count).join(' ').trim()
}

export default function TeamList() {
  const teams = [...data.teams].sort((a, b) => a.founded - b.founded)

  return (
    <section>
      <header className="mb-10 text-center">
        <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>Plate the Second</span>
        <h2 className="serif-display mt-2" style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 500 }}>
          <span className="italic-display" style={{ fontStyle: 'italic' }}>The Clubs</span>, in order of founding.
        </h2>
      </header>

      <ul className="grid gap-px bg-[var(--color-rule)] border border-[var(--color-rule)] sm:grid-cols-2">
        {teams.map((team, idx) => (
          <li key={team.id} className="bg-[var(--color-paper)] relative">
            <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', top: 4, left: 4, zIndex: 1 }} />
            <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', top: 4, right: 4, transform: 'scaleX(-1)', zIndex: 1 }} />
            <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', bottom: 4, left: 4, transform: 'scaleY(-1)', zIndex: 1 }} />
            <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(-1, -1)', zIndex: 1 }} />

            <Link
              to={`/teams/${team.id}`}
              className="plain block p-7 hover:bg-[var(--color-paper-deep)] transition-colors h-full"
            >
              <div className="flex items-start gap-4">
                <Crest size={36} color={TYPE_COLORS[team.type]} />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="smallcaps" style={{ letterSpacing: '0.22em' }}>№ {String(idx + 1).padStart(2, '0')}</p>
                    <span className="smallcaps" style={{ color: TYPE_COLORS[team.type], letterSpacing: '0.22em' }}>
                      {TYPE_LABELS[team.type]}
                    </span>
                  </div>
                  <h3 className="serif-display leading-tight mt-1" style={{ fontSize: 26, fontWeight: 500 }}>
                    <span className="italic-display" style={{ fontStyle: 'italic' }}>{team.name}</span>
                  </h3>
                  <p className="label mt-1">
                    {team.founded}—{team.dissolved ?? 'present'}
                    {isActive(team) && <span className="ml-2 dot-active" />}
                  </p>
                </div>
              </div>

              <p className="italic-display mt-3 text-[var(--color-ink-soft)]" style={{ fontStyle: 'italic', fontSize: 14 }}>
                Founded by {team.founder}.
              </p>
              <p className="mt-3 text-[15px] leading-snug">
                {firstSentences(team.description, 2)}
              </p>
              <p className="smallcaps mt-4" style={{ letterSpacing: '0.22em' }}>
                {team.members.length} listed members
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
