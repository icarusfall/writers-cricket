export default function MemberCard({ member }) {
  const dates =
    member.activeFrom || member.activeTo
      ? `${member.activeFrom ?? '?'}–${member.activeTo ?? 'present'}`
      : null

  return (
    <article className="p-4 border border-[var(--color-rule)] bg-[var(--color-cream)]">
      <h4 className="font-display text-lg leading-tight">
        {member.wiki ? (
          <a href={member.wiki} target="_blank" rel="noopener noreferrer" className="ext">
            {member.name}
          </a>
        ) : (
          member.name
        )}
      </h4>
      {member.role && (
        <p className="text-[14px] text-[var(--color-warm-grey)] mt-0.5">{member.role}</p>
      )}
      {dates && <p className="label mt-2">{dates}</p>}
      {member.notes && (
        <p className="text-[14px] mt-2 text-[var(--color-ink)] leading-snug">{member.notes}</p>
      )}
    </article>
  )
}
