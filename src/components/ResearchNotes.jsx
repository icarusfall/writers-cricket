import { FleuronSimple, Fleuron } from './Motifs.jsx'

const gaps = [
  { title: 'Heartaches CC membership', body: 'Tim Rice has kept the playing roster largely private through his annual Heartaches Cricketer\'s Almanack. Reviews and excerpts of Oh, What a Circus may yield further names.' },
  { title: 'Stoppard at the Gaieties', body: 'Hermione Lee names Stoppard as a Gaieties wicketkeeper. Period and frequency unconfirmed.' },
  { title: 'Newspaper teams', body: 'The Gaieties played "The Guardian" — was this a regular paper team? Did the Observer, Telegraph, Times, or Spectator field sides?' },
  { title: 'Publishing house teams', body: 'The original Authors XI played the Publishers at Lord\'s. Do Bloomsbury, Faber or Penguin still field sides?' },
  { title: '1940s–60s Authors', body: 'Documentation is thinnest for the Blunden revival. Cricket Country (1944) and Alec Waugh\'s memoirs are the obvious places to look.' },
  { title: 'Old Lazarusians', body: 'O\'Toole\'s side is barely documented online. Biographies and theatrical memoirs may help.' },
  { title: "Paul Getty's XI at Wormsley", body: 'A venue and a side; arguably belongs as its own node.' },
  { title: 'Cross-team players', body: 'Matching names across rosters is laborious and rewarding. The Crossovers view is built directly from the data; new entries surface as the JSON grows.' },
]

export default function ResearchNotes() {
  return (
    <section className="prose-like">
      <header className="mb-10 text-center">
        <span className="smallcaps" style={{ letterSpacing: '0.22em' }}>Plate the Last</span>
        <h2 className="serif-display mt-2" style={{ fontSize: 'clamp(28px, 4vw, 40px)', lineHeight: 1.05, fontWeight: 500 }}>
          <span className="italic-display" style={{ fontStyle: 'italic' }}>Methodology</span>, sources, and the gaps that remain.
        </h2>
        <div className="flex justify-center mt-5">
          <FleuronSimple size={12} width={120} color="var(--color-ink-faint)" />
        </div>
      </header>

      <div className="grid md:grid-cols-[1fr_2fr] gap-12">
        <aside>
          <h3 className="smallcaps mb-3" style={{ letterSpacing: '0.22em' }}>In a sentence</h3>
          <p className="italic-display text-[15px] leading-relaxed text-[var(--color-ink-soft)]" style={{ fontStyle: 'italic' }}>
            A field guide to literary and theatrical cricket teams in England — who played, when,
            against whom, and where to read more — inspired by a passing reference in Hermione Lee's
            biography of Tom Stoppard.
          </p>
        </aside>

        <div className="space-y-10">
          <section>
            <h3 className="serif-display italic-display" style={{ fontSize: 24, fontStyle: 'italic', fontWeight: 500 }}>What's here</h3>
            <p className="dropcap mt-2">
              Each team has its founding date, its founder, its members where known, the sources we
              used, and a list of the teams it has played, evolved from, or revived. The data lives in
              a single JSON file that grows as the research grows.
            </p>
          </section>

          <section>
            <h3 className="serif-display italic-display" style={{ fontSize: 24, fontStyle: 'italic', fontWeight: 500 }}>What isn't</h3>
            <p>
              No scorecards, no photographs (yet), and no claim to completeness. This is a research
              tool in motion. The roster on each team page is what the public sources allow, not a
              full historical roll.
            </p>
          </section>

          <section>
            <h3 className="serif-display italic-display mb-4" style={{ fontSize: 24, fontStyle: 'italic', fontWeight: 500 }}>Open research questions</h3>
            <ul className="space-y-5 rule pt-5">
              {gaps.map((g) => (
                <li key={g.title}>
                  <p className="serif-display italic-display leading-tight" style={{ fontSize: 18, fontStyle: 'italic', fontWeight: 500 }}>{g.title}</p>
                  <p className="text-[15px] text-[var(--color-ink-soft)] mt-1">{g.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="serif-display italic-display" style={{ fontSize: 24, fontStyle: 'italic', fontWeight: 500 }}>Citation</h3>
            <p>
              If you'd like to cite this site, please link to it directly and date your reference —
              the data updates as we find more.
            </p>
          </section>
        </div>
      </div>

      <div className="flex justify-center mt-16 text-[var(--color-ink-faint)]">
        <Fleuron size={22} color="var(--color-ink-faint)" />
      </div>
    </section>
  )
}
