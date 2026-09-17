export const DECKS = [
  {
    slug: "private-intro",
    n: "01",
    name: "Municipal Introduction",
    call: "Read the field",
    room: "City managers, planning directors, and council members",
    when: "Exploring a market. You need a read on support, location, and incentives — before a public process.",
    job: "Understand the municipality’s priorities, demonstrate your credibility, and identify potential obstacles before asking for a formal decision.",
    href: "/playbook/private-intro" as const,
  },
  {
    slug: "neighborhood",
    n: "02",
    name: "Neighborhood Meeting",
    call: "Read the defense",
    room: "Adjacent owners, associations, and community audiences",
    when: "The people who live there will decide the temperature of the hearing.",
    job: "Uncover the concerns, misconceptions, and arguments creating resistance. Determine what evidence the team needs and prepare credible responses before those issues reach the formal approval process.",
    href: "/playbook/neighborhood" as const,
  },
  {
    slug: "hearing",
    n: "03",
    name: "Public Hearing",
    call: "Make the winning case",
    room: "Planning commission, council, and residents",
    when: "A specific site is in the public process. The record is the product.",
    job: "Bring the facts, preparation, and development story together. Address the defense’s strongest arguments and give decision-makers credible reasons to support the project.",
    href: "/playbook/hearing" as const,
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
    body: "Construction, management, residents. Include authentic project photography — not stock.",
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

export const OUTREACH_EMAILS = [
  {
    name: "Municipal Introduction",
    body: "An initial introduction to city managers, planning staff, housing officials, economic-development representatives, and elected officials.",
  },
  {
    name: "Nonprofit Partner Introduction",
    body: "Outreach to local nonprofit organizations whose mission, community knowledge, or services may align with the proposed development.",
  },
  {
    name: "Community Organization Introduction",
    body: "An introduction to neighborhood associations, chambers of commerce, civic organizations, faith-based groups, and other community stakeholders.",
  },
  {
    name: "Service-Provider Outreach",
    body: "Initial communication with organizations that may provide resident services, referrals, programming, or other support.",
  },
  {
    name: "Employer and Institutional Outreach",
    body: "Outreach to major employers, school districts, healthcare systems, colleges, and other institutions that understand local workforce and housing needs.",
  },
  {
    name: "Financial and Development Partner Introduction",
    body: "Professional introductions to lenders, syndicators, architects, contractors, consultants, and other potential members of the development team.",
  },
  {
    name: "Meeting Follow-Up",
    body: "Post-meeting emails that confirm what was discussed, document commitments, answer outstanding questions, and establish the next play.",
  },
] as const;

export const OUTREACH_LETTERS = [
  {
    name: "Municipal Letter of Support",
    body: "Support from a mayor, city administrator, council member, planning official, housing department, or other local-government representative.",
  },
  {
    name: "Housing Authority Letter of Support",
    body: "Support addressing local housing needs, waiting lists, affordability gaps, or the proposed development’s role in the community.",
  },
  {
    name: "Economic-Development Letter of Support",
    body: "Support explaining how the development advances workforce housing, investment, redevelopment, or broader community objectives.",
  },
  {
    name: "Nonprofit Letter of Support",
    body: "Support from a local nonprofit based on community needs, the population it serves, or the development’s alignment with its mission.",
  },
  {
    name: "Resident-Service Partner Letter",
    body: "Support from an organization expected to provide services, education, health resources, transportation assistance, workforce programming, or resident referrals.",
  },
  {
    name: "Neighborhood or Community Association Letter",
    body: "Support from an organized neighborhood, homeowners association, civic group, or other community-based organization.",
  },
  {
    name: "Chamber or Business Organization Letter",
    body: "Support connecting the development to workforce recruitment, employee retention, economic growth, or local housing demand.",
  },
  {
    name: "Major Employer Letter",
    body: "Support describing the need for quality housing that is affordable to employees working in the market.",
  },
  {
    name: "Healthcare or Educational Institution Letter",
    body: "Support from hospitals, health systems, school districts, colleges, or universities identifying local housing needs among employees, students, families, or the broader community.",
  },
  {
    name: "Faith-Based Organization Letter",
    body: "Support from a church or faith-based organization familiar with local families, housing pressures, and community needs.",
  },
  {
    name: "Social-Service Organization Letter",
    body: "Support from organizations serving seniors, veterans, people with disabilities, families, or other populations relevant to the development.",
  },
  {
    name: "Continuum of Care or Supportive-Housing Letter",
    body: "Support for developments serving people experiencing homelessness or residents requiring coordinated services.",
  },
  {
    name: "Development-Team Letter",
    body: "Support from experienced architects, contractors, property managers, consultants, or financial partners confirming the team’s capacity and readiness.",
  },
  {
    name: "General Community Letter of Support",
    body: "A flexible framework for stakeholders who support the development but do not fit one of the more specialized categories.",
  },
] as const;

export const OUTREACH_GROUPS = [
  {
    id: "emails",
    name: "Introduction and Outreach Emails",
    items: OUTREACH_EMAILS,
  },
  {
    id: "letters",
    name: "Letters of Support",
    items: OUTREACH_LETTERS,
  },
] as const;

export const OUTREACH_INTRO = {
  title: "Build support before the opening whistle.",
  body: "The strongest development strategies begin before the formal matchup. Introduce the project, identify potential allies, build credible community support, and make it easier for the right voices to stand behind the deal.",
} as const;
