/* Type-color tokens — mapped to the new palette variables.
   These reference --color-* names, so palette swaps via [data-palette]
   automatically recolour the type badges across the site.
*/
export const TYPE_COLORS = {
  writers:       'var(--color-accent)',     /* cricket green */
  theatrical:    'var(--color-secondary)',  /* pavilion red */
  showbiz:       'var(--color-leather)',    /* leather brown */
  charity:       'var(--color-navy)',       /* faded navy */
  institutional: 'var(--color-ink-soft)',   /* warm grey-brown */
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
