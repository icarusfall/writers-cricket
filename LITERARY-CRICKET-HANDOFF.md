# Literary Cricket — Handoff Document for Claude Code

## Project Summary

An interactive, explorable research tool mapping literary and theatrical cricket teams in England from 1887 to the present day. The tool tracks teams, their members, the connections and rivalries between them, and links out to primary sources. It's a research project — data-dense but aesthetically beautiful — inspired by a passage in Hermione Lee's biography of Tom Stoppard about writers' cricket.

The site should be deployable to **Vercel** (the developer's standard hosting). It's a static React site with no backend — all data lives in a JSON file that can be updated as research continues.

---

## Design Direction

### Aesthetic: Light, airy, editorial — summer cricket on a village green

**NOT** the typical dark-themed AI-generated app. This should feel like a well-designed spread in a literary magazine, or the typography of a Wisden almanack.

- **Background:** Cream / off-white (`#FAF8F2` or similar warm paper tones)
- **Text:** Near-black for body (`#1a1a1a`), warm greys for secondary text
- **Accents:** Cricket-green (`#2D5A3D`), old leather brown (`#8B6914`), pavilion red (`#8B3A3A`), faded navy (`#2D3A5A`)
- **Typography:**
  - Headlines: A distinctive serif — Playfair Display, or something with character
  - Body: A readable serif — Source Serif 4, Libre Baskerville, or similar
  - Data/labels: A clean mono — JetBrains Mono at small sizes
- **Overall feel:** Generous whitespace, restrained colour, precise typography. Think London Review of Books meets Wisden. No gradients, no glows, no dark backgrounds. Light and confident.
- **Texture:** Subtle — maybe a faint paper grain on the background, thin ruled lines as dividers (like a scorecard). Nothing heavy.

### Layout principles

- Max-width container (~1100px), centred
- Generous padding and line-height
- Cards/panels with very subtle borders, no heavy shadows
- External links styled with a discreet arrow (↗), opening in new tabs
- Active/still-playing teams should have a subtle green indicator dot
- The whole thing should feel like a pleasure to browse slowly

---

## Architecture

### Stack

- **React** (Vite scaffolding)
- **Tailwind CSS** for utility styling (but with custom CSS where needed for the editorial feel)
- **D3.js** for the timeline visualisation (or a lighter alternative if D3 is overkill)
- **No backend** — pure static site
- **Deploy to Vercel** via `vercel` CLI or GitHub integration

### File structure

```
literary-cricket/
├── public/
├── src/
│   ├── data/
│   │   └── teams.json          # All research data (single source of truth)
│   ├── components/
│   │   ├── Layout.jsx           # Header, footer, max-width container
│   │   ├── Timeline.jsx         # Horizontal timeline with swim lanes
│   │   ├── TeamList.jsx         # Grid of team cards
│   │   ├── TeamDetail.jsx       # Expanded view of a single team
│   │   ├── MemberCard.jsx       # Individual member with links
│   │   ├── ConnectionGraph.jsx  # Network/relationship diagram
│   │   └── ResearchNotes.jsx    # Gaps and methodology notes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── vercel.json
```

### Routing

Use React Router with hash routing (works well on Vercel static deploys):

- `/` — Landing with timeline overview
- `/teams` — Grid of all teams
- `/teams/:teamId` — Individual team detail page
- `/connections` — Network view of relationships
- `/about` — Research notes, methodology, gaps

### Data model

All data lives in `src/data/teams.json`. Here's the schema:

```json
{
  "teams": [
    {
      "id": "gaieties",
      "name": "Gaieties CC",
      "founded": 1937,
      "dissolved": null,
      "founder": "Lupino Lane",
      "type": "theatrical",
      "description": "Long-form text about the team...",
      "sources": [
        "Hermione Lee, Tom Stoppard: A Life (2020)",
        "New Statesman, Sept 2022"
      ],
      "links": [
        { "label": "Gaieties CC website", "url": "https://www.gaieties.net/newpage" },
        { "label": "Harold Pinter cricket page", "url": "http://www.haroldpinter.org/cricket/index.shtml" }
      ],
      "members": [
        {
          "name": "Harold Pinter",
          "role": "Chairman (1972–2008)",
          "activeFrom": 1963,
          "activeTo": 2008,
          "wiki": "https://en.wikipedia.org/wiki/Harold_Pinter",
          "notes": "Joined in the 1960s. Fierce competitor. Stopped playing but continued umpiring."
        },
        {
          "name": "Tom Stoppard",
          "role": "Wicketkeeper (unconfirmed — source: Hermione Lee biography)",
          "activeFrom": null,
          "activeTo": null,
          "wiki": "https://en.wikipedia.org/wiki/Tom_Stoppard",
          "notes": "Mentioned in Lee biography as playing for the Gaieties. Dates and role TBC."
        }
      ]
    }
  ],
  "connections": [
    {
      "from": "gaieties",
      "to": "heartaches",
      "type": "rivalry",
      "label": "Regular fixture — Gaieties usually won",
      "notes": "Pinter described dismissing the Heartaches for 81 as giving them 'a really good drubbing'"
    }
  ],
  "crossovers": [
    {
      "person": "Arthur Conan Doyle",
      "teams": ["allahakbarries", "authors-original"],
      "notes": "Captain of the Authors, star player for the Allahakbarries"
    },
    {
      "person": "Dan Stevens",
      "teams": ["authors-modern"],
      "notes": "Played for the Authors in 2012-13 season while filming Downton Abbey"
    }
  ]
}
```

**Team types** (used for colour-coding):
- `writers` — teams composed of authors/writers (green tones)
- `theatrical` — theatre/actor teams (warm red/brown tones)
- `showbiz` — broader entertainment (amber tones)
- `charity` — charity teams like Lord's Taverners (navy tones)
- `institutional` — parliamentary, corporate, etc. (cool grey tones)

**Connection types:**
- `evolved` — one team grew out of another
- `revival` — later revival of a dormant team
- `rivalry` — regular competitive fixture
- `fixture` — occasional match
- `historical` — shared historical tradition

---

## Features to Build

### 1. Timeline View (landing page)

A horizontal timeline showing teams as swim lanes. Each team is a horizontal bar spanning its active years. Clicking a bar navigates to the team detail page.

- Year axis along the top with decade markers
- Era labels as subtle background bands (Victorian/Edwardian, Interwar, Pinter era, Modern revival)
- Teams sorted by founding date
- Still-active teams have an open-ended arrow or fade
- Hover shows team name and date range
- Click navigates to team detail

### 2. Team List View

A grid of team cards showing:
- Team name (large serif)
- Date range
- Type badge
- Founder
- Member count
- Active/dissolved indicator

Clicking a card navigates to team detail.

### 3. Team Detail Page

Full-page view for a single team:
- Name, dates, founder, type
- Long description (editorial prose)
- External links (to club websites, Wikipedia, articles)
- Source citations
- Member grid — each member as a small card with:
  - Name (linked to Wikipedia if available)
  - Role in the team
  - Active dates (if known)
  - Brief notes
- Related connections (which teams they played against, evolved from, etc.)

### 4. Connections View

A network diagram or structured list showing relationships between teams. Two possible implementations:
- **Simple (MVP):** Styled list grouped by connection type
- **Ambitious:** Force-directed D3 graph with teams as nodes and connections as edges, coloured by type

Start with the simple version, make it look great.

### 5. Research Notes / About Page

Honest accounting of:
- What we know and don't know
- Key gaps in the data
- Sources used
- Methodology
- How to contribute (eventually)

### 6. Cross-reference: People who played for multiple teams

A view or filter showing individuals who appear on more than one team's roster. This is one of the most interesting analytical features — it shows how the literary cricket world is networked.

---

## Data to Include (from research already done)

### Teams

1. **Allahakbarries** (1887–1913) — J.M. Barrie's team. Members: Barrie, Conan Doyle, Wodehouse, Milne, Kipling, Hornung, Jerome K. Jerome, H.G. Wells, Chesterton, Mason, E.V. Lucas, Maurice Hewlett, George Llewelyn Davies.

2. **Authors XI Original** (1899–1912) — Captained by Conan Doyle. Offshoot of Allahakbarries. Played at Lord's vs Publishers and Actors. Members: Conan Doyle, Hornung, Wodehouse, Milne, Barrie, Snaith, Hesketh-Prichard.

3. **Authors XI Blunden revival** (c.1940–1968) — Captained by Edmund Blunden. Members: Blunden, Alec Waugh, John Moore, Thomas Armstrong. Guest professionals: Len Hutton, Denis Compton, Douglas Jardine, Richie Benaud, Neville Cardus.

4. **Lord's Taverners** (1950–present) — Founded by actors at Lord's Tavern pub. Charity team mixing celebrities with pro cricketers. Founding members: Martin Boddey, John Mills, Jack Hawkins. Later: Harry Secombe, Prince Charles.

5. **Gaieties CC** (1937–present) — Founded by Lupino Lane. Harold Pinter chairman 1972–2008. Tom Stoppard reportedly wicketkeeper. Captains include Shomit Dutta (2006–), Jonathan Smith (2002), John Gleasure (2001). Members from haroldpinter.org roster: Ben Nealon, Nick Cowley, Charlton Lamb, Ian McKinnon, Richard Wyse, Edward Hughes, Roger Davidson, Inigo Thomas, Winston Stafford, Peter Swaab, Ian Cartmill, Dominic Perks, Ossie Gooding, Nathan Lamb, Tom Falkus, James Handford, Martin Smith, Joe Ireland, Steve Marians, Matthew Burton. Written up by Robert Winder & Ian Smith.

6. **Heartaches CC** (1973–present) — Founded by Tim Rice. Over 750 matches. Named after Elvis song. Presidents: Tony Lewis, Tom Graveney, Allan Lamb, David Gower, Chris Cowdrey, Mark Nicholas. Rice published private annual Heartaches Cricketer's Almanack. Regular opponent of Gaieties. Tours to Cornwall annually. First match was against Bill Heath's Gentlemen.

7. **Old Lazarusians** (c.1983–c.2005) — Peter O'Toole's team. Mascot: plastic vulture called Lazarus. Members: O'Toole, Tim Ackroyd, Michael Neilson. Barely documented.

8. **Authors XI Modern** (2012–present) — Revived by Charlie Campbell (captain, literary agent) and Nicholas Hogg (vice-captain, novelist). Motto: "Praeter ingenium nihil". Sponsors: Christie's (2012), Rathbones (2019). Full roster: Sebastian Faulks, Tom Holland, James Holland, Peter Frankopan, Richard Beard, Anthony McGowan, William Fiennes, Jon Hotten, Matt Thacker, Adam Rutherford, Andy Zaltzman, Kamila Shamsie, Amol Rajan, Alex Preston, Ed Smith, Dan Stevens, Matthew Parker, Thomas Penn, Mirza Waheed, Jonathan Wilson, Chris Hemmings, Tim Beard, Sam Carter, Joe Craig, Ben Falk, Nick Campion, David Owen. Tours: India (2013, 2015), Sri Lanka (2014, 2016), Rome (2015), Iceland, Corfu (2018).

9. **Actors XI** (c.2018–present) — Captained by Damian Lewis. Annual fixture vs Authors at Arundel Castle. 2025 roster: Lewis, Derek Horsham, Ben Willbond, Owen Edmonds, Dan Tuite, Mikhail Sen, Iain Glen, Alastair Whatley, Alex Price, Ant Jardine, Nathan Lee. 2020 roster also included: Gwyn Jones, Paul Lichtenstern, Peter Sandys-Clarke, Lachlan Nieboer, Geoff Streatfeild.

10. **Lords & Commons CC** (1848–present) — Parliamentary team. Plays at Vincent Square. Has played the Dutch Parliament. John Wisden once appeared as a ringer. 1970s/80s players included Tom King, John Redwood, Michael Cocks. Brian Johnston played in 1933.

### Connections

- Allahakbarries → Authors Original (shared players, offshoot)
- Authors Original → Authors Blunden (post-war revival)
- Authors Blunden → Authors Modern (2012 revival, 100 years on)
- Gaieties ↔ Heartaches (regular rivalry fixture)
- Gaieties ↔ Lord's Taverners (Pinter memorial match, Lord's 2009)
- Authors Modern ↔ Actors (annual match at Arundel Castle)
- Authors Modern ↔ Lord's Taverners (celebrity match, 2019)
- Authors Modern ↔ Lords & Commons (regular fixture)
- Authors Modern ↔ Heartaches (match at Arundel)
- Authors Original ↔ Publishers/Actors (historical Lord's fixtures)

### Known opponents not yet given their own entries

- The Guardian cricket team (played the Gaieties/Harold Pinter XI)
- Paul Getty XI (played the Gaieties)
- Peter O'Toole's XI (played the Gaieties, distinct from Lazarusians?)
- Bill Heath's Gentlemen (played Heartaches' first match, 1973)
- Groucho Club (played the Gaieties)
- Hampstead CC (played the Gaieties)
- Royal Household (plays the Authors)
- Eton College (plays the Authors)
- The Vatican XI (played the Authors in Rome, 2015)
- Japan national team (beaten by the Authors in London, 2013)
- Rajasthan Royals (played the Authors, 2013)
- Shepperton Ladies (played the Authors, Kamila Shamsie's match)
- Punch XI (historical — mentioned as having their own eleven)
- Maharanah of Udaipur's XI (played the Gaieties)

---

## Research Gaps to Fill (future work)

These are the areas where sub-agent web searches (using the Anthropic API with web search tool) would be most productive:

1. **Heartaches CC membership** — Tim Rice's autobiography *Oh, What a Circus* may list players. His private almanack is not online. Search for reviews, excerpts, interviews mentioning Heartaches players.

2. **Stoppard and the Gaieties** — Confirm from Hermione Lee's biography. What role? What period? Who else from the theatrical world played?

3. **Newspaper cricket teams** — Did the Guardian, Observer, Telegraph, Times, or Spectator field regular teams? The Gaieties played "The Guardian" — was this a formal team?

4. **Publishing house teams** — The original Authors played "the Publishers" at Lord's. Do modern publishers (Bloomsbury, Faber, Penguin) still field teams?

5. **The 1940s-60s Authors** — Very thin documentation. Edmund Blunden's cricket writings, Alec Waugh's memoirs may have more.

6. **Old Lazarusians** — Almost nothing online beyond one Pitchero memoir. O'Toole biographies may have more.

7. **Paul Getty's XI** — Getty was a famous cricket patron. His team at Wormsley played all sorts of sides. Worth documenting as a venue/team node.

8. **Cross-team players** — Who played for more than one of these teams? This requires matching names across rosters.

---

## Deployment Notes

- Scaffold with `npm create vite@latest literary-cricket -- --template react`
- Add Tailwind: `npm install -D tailwindcss @tailwindcss/vite`
- Add D3 if using: `npm install d3`
- Add React Router: `npm install react-router-dom`
- For Vercel: add `vercel.json` with SPA rewrite:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- Deploy with `vercel` CLI or connect GitHub repo

---

## Summary for Claude Code

Build a beautiful, light-themed, editorial-style React site that visualises literary cricket teams and their connections. The data is provided in this document — start by creating the `teams.json` from the data above, then build the components. Prioritise:

1. Getting the design right (light, airy, editorial, NOT dark themed)
2. Clean data model in JSON
3. Timeline view as the landing page
4. Team detail pages with member rosters and external links
5. Connections view showing relationships

The site should feel like a pleasure to browse — think Wisden meets London Review of Books. It's a research tool, but a beautiful one.
