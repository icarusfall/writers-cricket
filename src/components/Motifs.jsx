// Small SVG marks for the Literary Cricket vintage redesign.
// Single-weight engraved feel; all motifs use currentColor by default.

export function Stumps({ size = 18, color = 'currentColor', ...rest }) {
  return (
    <svg viewBox="0 0 24 28" width={size} height={size * 28 / 24} fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" {...rest}>
      <line x1="6" y1="6" x2="6" y2="24" />
      <line x1="12" y1="6" x2="12" y2="24" />
      <line x1="18" y1="6" x2="18" y2="24" />
      <line x1="3" y1="5" x2="9" y2="5" strokeWidth="1.6" />
      <line x1="15" y1="5" x2="21" y2="5" strokeWidth="1.6" />
      <line x1="2" y1="25" x2="22" y2="25" strokeWidth="0.6" opacity="0.6" />
    </svg>
  )
}

export function CrossedBats({ size = 22, color = 'currentColor', ...rest }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" {...rest}>
      <g transform="rotate(28 16 16)">
        <rect x="14.6" y="3" width="2.8" height="12" rx="0.6" fill={color} opacity="0.9" />
        <line x1="16" y1="15" x2="16" y2="20" strokeWidth="1.6" />
        <line x1="14" y1="20" x2="18" y2="20" />
      </g>
      <g transform="rotate(-28 16 16)">
        <rect x="14.6" y="3" width="2.8" height="12" rx="0.6" fill={color} opacity="0.9" />
        <line x1="16" y1="15" x2="16" y2="20" strokeWidth="1.6" />
        <line x1="14" y1="20" x2="18" y2="20" />
      </g>
      <circle cx="16" cy="22" r="1.6" fill={color} />
    </svg>
  )
}

export function Fleuron({ size = 24, color = 'currentColor', ...rest }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill={color} {...rest}>
      <g transform="translate(16 16)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 -1.4 C 2.6 -3, 4.6 -6, 4.4 -10 C 2.2 -8.6, 0.4 -5.6, 0 -3.4 Z"
          />
        ))}
        <circle r="1.4" />
      </g>
    </svg>
  )
}

export function FleuronSimple({ size = 16, color = 'currentColor', width = 60, ...rest }) {
  return (
    <svg viewBox="0 0 60 16" width={width} height={size} fill="none" stroke={color} strokeWidth="0.9" {...rest}>
      <line x1="0" y1="8" x2="22" y2="8" />
      <line x1="38" y1="8" x2="60" y2="8" />
      <g fill={color} stroke="none">
        <circle cx="30" cy="8" r="1.4" />
        <circle cx="25" cy="8" r="0.7" />
        <circle cx="35" cy="8" r="0.7" />
      </g>
    </svg>
  )
}

export function Crest({ size = 56, color = 'currentColor', ...rest }) {
  return (
    <svg viewBox="0 0 64 80" width={size} height={size * 80 / 64} fill="none" stroke={color} strokeWidth="1.1" {...rest}>
      <path d="M8 8 L56 8 L56 38 Q56 60, 32 74 Q8 60, 8 38 Z" fill="none" stroke={color} strokeWidth="1.2" />
      <path d="M11 11 L53 11 L53 38 Q53 58, 32 70 Q11 58, 11 38 Z" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <g transform="translate(32 38)">
        <g transform="rotate(28)">
          <rect x="-1.4" y="-16" width="2.8" height="20" rx="0.6" fill={color} />
          <line x1="0" y1="4" x2="0" y2="11" stroke={color} strokeWidth="1.4" />
        </g>
        <g transform="rotate(-28)">
          <rect x="-1.4" y="-16" width="2.8" height="20" rx="0.6" fill={color} />
          <line x1="0" y1="4" x2="0" y2="11" stroke={color} strokeWidth="1.4" />
        </g>
        <circle cy="14" r="2.2" fill={color} />
      </g>
      <line x1="11" y1="22" x2="53" y2="22" stroke={color} strokeWidth="0.5" opacity="0.5" />
    </svg>
  )
}

export function LaurelSprig({ size = 22, color = 'currentColor', side = 'left', ...rest }) {
  const flip = side === 'right' ? 'scale(-1 1) translate(-32 0)' : ''
  return (
    <svg viewBox="0 0 32 24" width={size * 32 / 24} height={size} fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" {...rest}>
      <g transform={flip}>
        <path d="M2 12 Q 16 6, 30 12" />
        {[6, 10, 14, 18, 22, 26].map((x, i) => {
          const y = 12 - (i % 2 === 0 ? 3 : -3)
          return <ellipse key={x} cx={x} cy={y} rx="2.4" ry="1.2" transform={`rotate(${i % 2 === 0 ? -28 : 28} ${x} ${y})`} />
        })}
      </g>
    </svg>
  )
}

export function NumeralBadge({ n, size = 26, color = 'currentColor', ...rest }) {
  const roman = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][n - 1] || String(n)
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} {...rest}>
      <circle cx="16" cy="16" r="14.4" fill="none" stroke={color} strokeWidth="0.8" />
      <circle cx="16" cy="16" r="12.4" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <text x="16" y="21" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fill={color} fontStyle="italic">{roman}</text>
    </svg>
  )
}

export function ScorecardCorner({ size = 14, color = 'currentColor', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth="0.8" {...rest}>
      <path d="M2 12 L2 2 L12 2" />
      <path d="M5 9 L5 5 L9 5" opacity="0.55" />
      <circle cx="3.4" cy="3.4" r="0.6" fill={color} stroke="none" />
    </svg>
  )
}

/* a wrapper that applies hairline scorecard-style corner ornaments */
export function ScorecardFrame({ children, color = 'var(--color-ink-faint)', className = '', style }) {
  return (
    <div className={`scorecard ${className}`} style={{ position: 'relative', ...style }}>
      <ScorecardCorner color={color} style={{ position: 'absolute', top: 4, left: 4 }} />
      <ScorecardCorner color={color} style={{ position: 'absolute', top: 4, right: 4, transform: 'scaleX(-1)' }} />
      <ScorecardCorner color={color} style={{ position: 'absolute', bottom: 4, left: 4, transform: 'scaleY(-1)' }} />
      <ScorecardCorner color={color} style={{ position: 'absolute', bottom: 4, right: 4, transform: 'scale(-1, -1)' }} />
      {children}
    </div>
  )
}
