export const TYPE_COLORS = {
  writers: 'var(--color-cricket-green)',
  theatrical: 'var(--color-pavilion-red)',
  showbiz: 'var(--color-leather)',
  charity: 'var(--color-faded-navy)',
  institutional: 'var(--color-warm-grey)',
}

export const TYPE_LABELS = {
  writers: 'Writers',
  theatrical: 'Theatrical',
  showbiz: 'Showbiz',
  charity: 'Charity',
  institutional: 'Institutional',
}

export const CONNECTION_LABELS = {
  evolved: 'Evolved from',
  revival: 'Revived as',
  rivalry: 'Rivalry',
  fixture: 'Fixture',
  historical: 'Historical link',
}

export function teamById(teams, id) {
  return teams.find((t) => t.id === id)
}

export function teamRange(team) {
  const to = team.dissolved ?? new Date().getFullYear()
  return { from: team.founded, to }
}

export function isActive(team) {
  return team.dissolved == null
}
