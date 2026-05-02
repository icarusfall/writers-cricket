import { Link } from 'react-router-dom'
import data from '../data/teams.json'
import { TYPE_COLORS, TYPE_LABELS, isActive, teamRange } from '../lib/teamHelpers.js'
import { Fleuron, FleuronSimple } from './Motifs.jsx'

const START = 1840
const END = new Date().getFullYear() + 2
const ROW_HEIGHT = 38
const ROW_GAP = 8
const LEFT_PAD = 240
const RIGHT_PAD = 32
const TOP_PAD = 96
const BOTTOM_PAD = 28

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
      {/* section header — almanack plate */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center gap-3">
          <FleuronSimple size={11} width={50} color="var(--color-ink-faint)" />
          <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>Plate the First</span>
          <FleuronSimple size={11} width={50} color="var(--color-ink-faint)" />
        </div>
        <h2 className="serif-display mt-3" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.05, fontWeight: 500 }}>
          <span className="italic-display" style={{ fontStyle: 'italic' }}>A Chronicle</span> of the Elevens,
          <br className="hidden md:block" />
          <span className="italic-display" style={{ fontStyle: 'italic' }}> from Grace</span> to <span className="italic-display" style={{ fontStyle: 'italic' }}>the present day</span>.
        </h2>
        <p className="italic-display mt-3 text-[var(--color-ink-soft)] max-w-xl mx-auto" style={{ fontStyle: 'italic' }}>
          Ten clubs, charted in the manner of a printed ledger. Hover any bar for dates;
          click for the team’s entry, its members and its sources.
        </p>
      </header>

      <div className="rule-hair pt-4">
        {/* legend */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
          {Object.entries(TYPE_LABELS).map(([k, label]) => (
            <span key={k} className="smallcaps inline-flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5" style={{ backgroundColor: TYPE_COLORS[k] }} />
              {label}
            </span>
          ))}
          <span className="smallcaps inline-flex items-center gap-2">
            <span className="dot-active" /> still playing
          </span>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width="100%"
            style={{ minWidth: 760 }}
            role="img"
            aria-label="A chronicle of literary and theatrical cricket teams"
          >
            <defs>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="4" stroke="var(--color-paper)" strokeWidth="0.8" />
              </pattern>
            </defs>

            {/* era bands as printed strips */}
            {data.eras.map((era, i) => {
              const x = yearToX(era.from)
              const w = yearToX(Math.min(era.to, END)) - x
              const tone = i % 2 === 0 ? 'var(--color-paper-deep)' : 'transparent'
              return (
                <g key={era.id}>
                  <rect
                    x={x}
                    y={TOP_PAD - 22}
                    width={w}
                    height={height - TOP_PAD - BOTTOM_PAD + 32}
                    fill={tone}
                    opacity="0.55"
                  />
                  <text
                    x={x + w / 2}
                    y={TOP_PAD - 54}
                    textAnchor="middle"
                    fontFamily="var(--font-sc)"
                    fontSize="10.5"
                    fill="var(--color-ink-soft)"
                    style={{ letterSpacing: '0.22em', textTransform: 'uppercase' }}
                  >
                    {era.label}
                  </text>
                  <line x1={x} x2={x} y1={TOP_PAD - 42} y2={TOP_PAD - 24} stroke="var(--color-rule)" strokeWidth="0.5" />
                </g>
              )
            })}

            {/* outer chart frame */}
            <line x1={LEFT_PAD} x2={width - RIGHT_PAD} y1={TOP_PAD - 24} y2={TOP_PAD - 24} stroke="var(--color-ink)" strokeWidth="1" />
            <line x1={LEFT_PAD} x2={width - RIGHT_PAD} y1={TOP_PAD - 21} y2={TOP_PAD - 21} stroke="var(--color-ink)" strokeWidth="0.4" />
            <line x1={LEFT_PAD} x2={width - RIGHT_PAD} y1={height - BOTTOM_PAD + 6} y2={height - BOTTOM_PAD + 6} stroke="var(--color-ink)" strokeWidth="1" />

            {/* decade ticks */}
            {decadeTicks.map((y) => {
              const major = y % 50 === 0
              return (
                <g key={y}>
                  <line
                    x1={yearToX(y)}
                    x2={yearToX(y)}
                    y1={TOP_PAD - 24}
                    y2={height - BOTTOM_PAD + 6}
                    stroke="var(--color-rule-hair)"
                    strokeWidth={major ? 0.7 : 0.35}
                  />
                  <text
                    x={yearToX(y)}
                    y={TOP_PAD - 10}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    fill="var(--color-ink-faint)"
                  >
                    {y}
                  </text>
                </g>
              )
            })}

            {/* team rows */}
            {teams.map((team, i) => {
              const range = teamRange(team)
              const x = yearToX(range.from)
              const x2 = yearToX(range.to)
              const y = TOP_PAD + i * (ROW_HEIGHT + ROW_GAP)
              const color = TYPE_COLORS[team.type]
              return (
                <g key={team.id}>
                  {/* row hairline */}
                  <line x1={LEFT_PAD} x2={width - RIGHT_PAD} y1={y + ROW_HEIGHT} y2={y + ROW_HEIGHT} stroke="var(--color-rule-hair)" strokeWidth="0.5" />

                  {/* lane label */}
                  <text
                    x={LEFT_PAD - 14}
                    y={y + ROW_HEIGHT / 2 + 2}
                    textAnchor="end"
                    fontFamily="var(--font-display)"
                    fontStyle="italic"
                    fontSize="15"
                    fill="var(--color-ink)"
                  >
                    {team.name}
                  </text>
                  <text
                    x={LEFT_PAD - 14}
                    y={y + ROW_HEIGHT / 2 + 14}
                    textAnchor="end"
                    fontFamily="var(--font-mono)"
                    fontSize="9"
                    fill="var(--color-ink-faint)"
                  >
                    {team.founded}{team.dissolved ? `–${team.dissolved}` : '–'}
                  </text>

                  <Link to={`/teams/${team.id}`}>
                    <rect
                      x={x}
                      y={y + 8}
                      width={Math.max(5, x2 - x)}
                      height={ROW_HEIGHT - 16}
                      fill={color}
                      opacity="0.92"
                      rx="1"
                    >
                      <title>{team.name} — {team.founded}–{team.dissolved ?? 'present'}</title>
                    </rect>
                    {/* engraved hatch */}
                    <rect
                      x={x}
                      y={y + 8}
                      width={Math.max(5, x2 - x)}
                      height={ROW_HEIGHT - 16}
                      fill="url(#hatch)"
                      opacity="0.18"
                      pointerEvents="none"
                    />
                    {/* end caps */}
                    <line x1={x} x2={x} y1={y + 6} y2={y + ROW_HEIGHT - 6} stroke="var(--color-ink)" strokeWidth="0.7" />
                    {team.dissolved && (
                      <line x1={x2} x2={x2} y1={y + 6} y2={y + ROW_HEIGHT - 6} stroke="var(--color-ink)" strokeWidth="0.7" />
                    )}
                    {isActive(team) && (
                      <>
                        <polygon
                          points={`${x2 - 6},${y + 8} ${x2 + 4},${y + ROW_HEIGHT / 2} ${x2 - 6},${y + ROW_HEIGHT - 8}`}
                          fill={color}
                        />
                        <circle cx={x2 + 10} cy={y + ROW_HEIGHT / 2} r={3} fill="var(--color-accent)" />
                      </>
                    )}
                  </Link>
                </g>
              )
            })}
          </svg>
        </div>

        {/* footer ornament */}
        <div className="flex items-center justify-center gap-3 mt-8 text-[var(--color-ink-faint)]">
          <span className="flex-none w-20 border-t border-[var(--color-rule)]" />
          <Fleuron size={20} color="var(--color-ink-faint)" />
          <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>
            {teams.length} elevens · {data.connections.length} connections traced
          </span>
          <Fleuron size={20} color="var(--color-ink-faint)" />
          <span className="flex-none w-20 border-t border-[var(--color-rule)]" />
        </div>
      </div>
    </section>
  )
}
