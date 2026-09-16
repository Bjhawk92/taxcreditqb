export const DECKS = [
  {
    slug: "private-intro",
    n: "01",
    name: "Private Introduction",
    call: "Opening drive",
    room: "City Manager, P&Z, council, economic development",
    when: "Exploring a market. You need a read on support, location, and incentives — before a public fight.",
    job: "Pre-snap. Credibility. Who you are. What you have delivered. Why staff should take the next snap.",
    href: "/playbook/private-intro" as const,
  },
  {
    slug: "hearing",
    n: "02",
    name: "Public Hearing",
    call: "Game day",
    room: "Planning commission, council, packed chambers",
    when: "A specific site is in the public process. The record is the product.",
    job: "Red zone. Site facts. LIHTC in plain language. Myths the defense will show — answered before they blitz.",
    href: "/playbook/hearing" as const,
  },
  {
    slug: "neighborhood",
    n: "03",
    name: "Neighborhood Meeting",
    call: "Walkthrough",
    room: "Adjacent owners, associations, community rooms",
    when: "The people who live there will decide the temperature of the hearing.",
    job: "Film session with the crowd. Know the questions before they are asked. Script the answers.",
    href: "/playbook/neighborhood" as const,
  },
] as const;

export const INTRO_OUTLINE = [
  {
    n: "01",
    title: "Who we are / where we have delivered",
    body: "Company bio and history. Not a vision book. Proof the sponsor exists as an operator.",
  },
  {
    n: "02",
    title: "Product quality",
    body: "Construction, management, residents. Photo slots labeled for authentic project photography — not stock.",
  },
  {
    n: "03",
    title: "How we work with staff",
    body: "Who answers the phone. What we send before we ask. How we treat a City Manager’s calendar.",
  },
  {
    n: "04",
    title: "What we are looking for in this market",
    body: "Support, location, incentives. Honest about the ask. No surprise annexation in slide 18.",
  },
  {
    n: "05",
    title: "What we are not asking for today",
    body: "Staff time is the scarce asset. This meeting is a read, not a vote.",
  },
] as const;

export const MYTHS = [
  {
    line: "This is public housing.",
    fact: "LIHTC is private capital + a tax credit. Privately owned, privately managed, with income and rent limits in a recorded restriction.",
    slide: "One diagram: who owns it, who lives there, who inspects it.",
  },
  {
    line: "It will hurt property values.",
    fact: "The hearing does not need a speech. It needs the studies you will actually cite, and the comparable product — not a theory of neighborhoods.",
    slide: "Three comps. One sentence each. No appendix dump on the screen.",
  },
  {
    line: "Traffic / schools / crime.",
    fact: "Name the numbers the city already uses. Traffic memo. School district letter. Police and fire if they will send one. Do not freelance.",
    slide: "The city’s own metrics, not yours.",
  },
  {
    line: "They never finish.",
    fact: "Show closed work. Lender, syndicator, placed-in-service. A rendering is not a track record.",
    slide: "Delivered product. Dates. Addresses.",
  },
  {
    line: "Nobody local can live there.",
    fact: "Income bands, AMI, who actually qualifies in this county. Say the rents. Do not hide them in a footnote.",
    slide: "Rent table vs. the market they already know.",
  },
] as const;

export const OBJECTIONS = [
  {
    concern: "Density / height / ‘out of scale’",
    mean: "They are afraid the block changes and they were not asked.",
    show: "Context elevations. What is next door. What you already cut.",
    never: "‘You don’t understand urbanism.’",
  },
  {
    concern: "Property values",
    mean: "They are pricing their house in public.",
    show: "Comps and the restriction that keeps it residential, maintained, and privately managed.",
    never: "‘The data says you should be grateful.’",
  },
  {
    concern: "Traffic and parking",
    mean: "They already lose the street at 5 p.m.",
    show: "The city’s trip gen, on-site parking, and what you will not do to their curb.",
    never: "‘It’s not that many cars.’",
  },
  {
    concern: "Crime / ‘those people’",
    mean: "This is the one they will not say cleanly. You still have to answer it cleanly.",
    show: "Screening, management, lighting, who is on-site. Product, not a sermon.",
    never: "A lecture about bias from the podium.",
  },
  {
    concern: "Process / ‘railroaded’",
    mean: "They think the deal is already done.",
    show: "The calendar. What is still a vote. How to comment. Your phone number.",
    never: "‘This is a formality.’",
  },
] as const;
