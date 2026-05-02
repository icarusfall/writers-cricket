import { ScorecardCorner } from './Motifs.jsx'

export default function MemberCard({ member }) {
  const dates =
    member.activeFrom || member.activeTo
      ? `${member.activeFrom ?? '?'}–${member.activeTo ?? 'present'}`
      : null

  return (
    <article className="relative p-4 border border-[var(--color-rule)] bg-[var(--color-paper)]">
      <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', top: 3, left: 3 }} />
      <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', top: 3, right: 3, transform: 'scaleX(-1)' }} />
      <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', bottom: 3, left: 3, transform: 'scaleY(-1)' }} />
      <ScorecardCorner color="var(--color-ink-faint)" style={{ position: 'absolute', bottom: 3, right: 3, transform: 'scale(-1, -1)' }} />

      <h4 className="serif-display italic-display leading-tight" style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 500 }}>
        {member.wiki ? (
          <a href={member.wiki} target="_blank" rel="noopener noreferrer" className="ext">
            {member.name}
          </a>
        ) : (
          member.name
        )}
      </h4>
      {member.role && (
        <p className="text-[14px] text-[var(--color-ink-soft)] mt-0.5">{member.role}</p>
      )}
      {dates && <p className="label mt-2">{dates}</p>}
      {member.notes && (
        <p className="text-[14px] mt-2 leading-snug">{member.notes}</p>
      )}
    </article>
  )
}
