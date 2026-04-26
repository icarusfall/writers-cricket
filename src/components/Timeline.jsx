import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { TYPE_COLORS, TYPE_LABELS, isActive, teamRange } from '../lib/teamHelpers.js'

const START = 1880
const END = new Date().getFullYear() + 2
const ROW_HEIGHT = 38
const ROW_GAP = 8
const LEFT_PAD = 220
const RIGHT_PAD = 24
const TOP_PAD = 72
const BOTTOM_PAD = 24

export default function Timeline() {
  const teams = [...data.teams].sort((a, b) => a.founded - b.founded)
  const width = 1100
  const innerWidth = width - LEFT_PAD - RIGHT_PAD
  const yearToX = (y) => LEFT_PAD + ((y - START) / (END - START)) * innerWidth

  const decadeTicks = []
  for (let y = Math.ceil(START / 10) * 10; y <= END; y += 10) decadeTicks.push(y)

  const height = TOP_PAD + teams.length * (ROW_HEIGHT + ROW_GAP) + BOTTOM_PAD

  return (
    <section>
      <header className="mb-8">
        <p className="label mb-2">A timeline</p>
        <h2 className="text-3xl md:text-4xl font-display leading-tight">
          A field guide to literary cricket in England,<br />from W.G. Grace to the present.
        </h2>
        <p className="mt-4 text-[var(--color-warm-grey)] max-w-2xl">
          Eleven-a-side, with footnotes. Hover any bar for dates; click through for the full team page,
          its members, its sources, and the matches it played.
        </p>
      </header>

      <div className="rule pt-6">
        <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6 label">
          {Object.entries(TYPE_LABELS).map(([k, label]) => (
            <span key={k} className="inline-flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ backgroundColor: TYPE_COLORS[k] }}
              />
              {label}
            </span>
          ))}
          <span className="inline-flex items-center gap-2">
            <span className="dot-active" /> still playing
          </span>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            style={{ minWidth: 760 }}
            role="img"
            aria-label="Timeline of literary and theatrical cricket teams"
          >
            {data.eras.map((era) => {
              const x = yearToX(era.from)
              const w = yearToX(Math.min(era.to, END)) - x
              return (
                <g key={era.id}>
                  <rect
                    x={x}
                    y={TOP_PAD - 20}
                    width={w}
                    height={height - TOP_PAD - BOTTOM_PAD + 40}
                    fill="var(--color-cream-deep)"
                    opacity="0.55"
                  />
                  <text
                    x={x + 8}
                    y={TOP_PAD - 26}
                    className="label"
                    fill="var(--color-warm-grey)"
                    fontFamily="var(--font-mono)"
                    fontSize="10"
                    style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    {era.label}
                  </text>
                </g>
              )
            })}

            {decadeTicks.map((y) => (
              <g key={y}>
                <line
                  x1={yearToX(y)}
                  x2={yearToX(y)}
                  y1={TOP_PAD - 8}
                  y2={height - BOTTOM_PAD}
                  stroke="var(--color-rule)"
                  strokeWidth="1"
                />
                <text
                  x={yearToX(y)}
                  y={TOP_PAD - 14}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="10"
                  fill="var(--color-warm-grey)"
                >
                  {y}
                </text>
              </g>
            ))}

            {teams.map((team, i) => {
              const range = teamRange(team)
              const x = yearToX(range.from)
              const x2 = yearToX(range.to)
              const y = TOP_PAD + i * (ROW_HEIGHT + ROW_GAP)
              const color = TYPE_COLORS[team.type]
              return (
                <g key={team.id}>
                  <text
                    x={LEFT_PAD - 12}
                    y={y + ROW_HEIGHT / 2 + 4}
                    textAnchor="end"
                    fontFamily="var(--font-display)"
                    fontSize="14"
                    fill="var(--color-ink)"
                  >
                    {team.name}
                  </text>
                  <Link to={`/teams/${team.id}`}>
                    <rect
                      x={x}
                      y={y + 6}
                      width={Math.max(4, x2 - x)}
                      height={ROW_HEIGHT - 12}
                      fill={color}
                      opacity="0.85"
                      rx="2"
                    >
                      <title>
                        {team.name} — {team.founded}–{team.dissolved ?? 'present'}
                      </title>
                    </rect>
                    {isActive(team) && (
                      <circle
                        cx={x2 + 8}
                        cy={y + ROW_HEIGHT / 2}
                        r={4}
                        fill="var(--color-cricket-green)"
                      />
                    )}
                    <text
                      x={x + 6}
                      y={y + ROW_HEIGHT / 2 + 4}
                      fontFamily="var(--font-mono)"
                      fontSize="10"
                      fill="var(--color-cream)"
                    >
                      {team.founded}
                    </text>
                  </Link>
                </g>
              )
            })}
          </svg>
        </div>

        <p className="label mt-6">
          {teams.length} teams charted · {data.connections.length} connections traced
        </p>
      </div>
    </section>
  )
}
