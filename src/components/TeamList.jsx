import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { TYPE_COLORS, TYPE_LABELS, isActive } from '../lib/teamHelpers.js'

function firstSentences(text, count) {
  if (!text) return ''
  const parts = text.match(/[^.!?]+[.!?]+/g) ?? [text]
  return parts.slice(0, count).join(' ').trim()
}

export default function TeamList() {
  const teams = [...data.teams].sort((a, b) => a.founded - b.founded)

  return (
    <section>
      <header className="mb-10">
        <p className="label mb-2">The teams</p>
        <h2 className="text-3xl md:text-4xl font-display">Ten clubs, in order of founding.</h2>
      </header>

      <ul className="grid gap-px bg-[var(--color-rule)] border border-[var(--color-rule)] sm:grid-cols-2">
        {teams.map((team) => (
          <li key={team.id} className="bg-[var(--color-cream)]">
            <Link
              to={`/teams/${team.id}`}
              className="plain block p-6 hover:bg-[var(--color-cream-deep)] transition-colors h-full"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl leading-snug">{team.name}</h3>
                  <p className="label mt-1">
                    {team.founded}—{team.dissolved ?? 'present'}
                    {isActive(team) && <span className="ml-2 dot-active" />}
                  </p>
                </div>
                <span
                  className="label whitespace-nowrap px-2 py-0.5 rounded-sm"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${TYPE_COLORS[team.type]} 12%, transparent)`,
                    color: TYPE_COLORS[team.type],
                  }}
                >
                  {TYPE_LABELS[team.type]}
                </span>
              </div>
              <p className="mt-2 text-[13px] text-[var(--color-warm-grey)] italic">
                Founded by {team.founder}.
              </p>
              <p className="mt-3 text-[15px] leading-snug text-[var(--color-ink)]">
                {firstSentences(team.description, 2)}
              </p>
              <p className="label mt-4">{team.members.length} listed members</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
