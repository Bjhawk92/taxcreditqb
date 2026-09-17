export const SITE = {
  name: "Tax Credit QB",
  short: "QB",
  domain: "taxcreditqb.com",
  tagline: "You own the deal. We QB it.",
  edge: "Your winning edge.",
  pronunciation: "tax-credit quarterback",
  emails: {
    info: "info@taxcreditqb.com",
    brett: "brett@taxcreditqb.com",
  },
  access: {
    price: "TBD",
    cadence: "/mo",
    consult: "virtual strategy session",
    launchLabel: "Playbook membership",
  },
  cta: {
    ask: "Ask the QB",
    play: "Call the next play",
    playbook: "Get the Playbook",
    bring: "Bring in the QB",
  },
  proof: [
    { value: "70", label: "Communities" },
    { value: "5,000+", label: "Units developed, built & stabilized" },
    { value: "Nine", label: "States" },
    { value: "20+", label: "Years experience" },
    { value: "Brett Johnson", label: "Founder" },
  ] as const,
  alkaline: {
    name: "Alkaline Advisors",
    href: "https://www.alkaline-advisors.com",
  },
  social: [] as { label: string; href: string }[],
  disclaimer:
    "Tax Credit QB is not a law firm, not a syndicator, not your co-GP, and not a substitute for local land-use counsel. Meeting support is not lobbying unless a separate engagement says so. Deck templates are educational and must be adapted to the site, the QAP, and the jurisdiction. Financial models are prepared by Alkaline Advisors unless otherwise stated. Tax Credit QB does not guarantee approvals, tax-credit awards, financing, or project outcomes. You remain the developer and owner of your opportunity.",
} as const;

export const WORK_LABEL = "QB Access" as const;

export const NAV = [
  {
    label: "Playbook",
    to: "/playbook",
    blurb: "Templates, presentations, outreach resources, and practical guidance.",
    tab: "navy",
  },
  {
    label: "Equipment",
    to: "/tools",
    blurb: "Practical resources, QAP directory, and development references.",
    tab: "tools",
  },
  {
    label: "Game Plans",
    to: "/game-plans",
    blurb: "Compare memberships, pricing, benefits, and access.",
    tab: "gold",
  },
  {
    label: WORK_LABEL,
    to: "/access",
    blurb: "Ask the QB, huddles, presentations, meeting support, and advisory.",
    tab: "burgundy",
  },
  {
    label: "About",
    to: "/about",
    blurb: "Meet Brett Johnson and the experience behind Tax Credit QB.",
    tab: "slate",
  },
  {
    label: "Locker Room",
    to: "/hq",
    blurb: "Secure member dashboard for deals, Field Pass, Equipment, and billing.",
    tab: "green",
  },
] as const;

export const SIGN_SERVICES = [
  {
    label: "Ask the QB",
    to: "/register" as const,
    blurb: "Get a direct answer to a focused deal question.",
    body: "Submit a specific development question and receive practical guidance grounded in real LIHTC development experience.",
    cta: "Ask the QB",
  },
  {
    label: "Schedule a Huddle",
    to: "/huddle" as const,
    blurb: "Read the defense. Call the next play.",
    body: "Bring your questions, concerns, or upcoming decisions to a private strategy session with Brett Johnson.",
    cta: "Schedule a huddle",
  },
  {
    label: "Presentation Builder",
    to: "/playbook/builder" as const,
    blurb: "Bring us the deal. We’ll build the game plan.",
    body: "Organize the project facts, images, documents, audience details, and supporting evidence Tax Credit QB needs to scope and develop your presentation.",
    cta: "Explore the Builder",
  },
  {
    label: "Meeting Support",
    to: "/desk" as const,
    blurb: "Bring the QB onto the field.",
    body: "Prepare the speakers, strengthen the game plan, and add experienced support for a municipal meeting, neighborhood meeting, public hearing, negotiation, or financial discussion.",
    cta: "Explore meeting support",
  },
  {
    label: "Project Advisory",
    to: "/advisory" as const,
    blurb: "Keep the whole deal moving downfield.",
    body: "Bring Tax Credit QB alongside your team for assignments that extend beyond one question, presentation, or meeting.",
    cta: "Explore project advisory",
  },
  {
    label: "Partner Support",
    to: "/for-partners" as const,
    blurb: "You keep the sponsor. We QB the field.",
    body: "Support emerging developers through the municipal, community, presentation, and execution challenges that can determine whether a strong deal moves forward.",
    cta: "Explore partner support",
  },
] as const;

export const WORK_NAV = [
  { label: "Ask the QB", to: "/register", blurb: "Get a direct answer to a focused deal question." },
  { label: "Schedule a Huddle", to: "/huddle", blurb: "Read the defense. Call the next play." },
  { label: "Presentation Builder", to: "/playbook/builder", blurb: "Bring us the deal. We’ll build the game plan." },
  { label: "Meeting Support", to: "/desk", blurb: "Bring the QB onto the field." },
  { label: "Project Advisory", to: "/advisory", blurb: "Keep the whole deal moving downfield." },
  { label: "Partner Support", to: "/for-partners", blurb: "You keep the sponsor. We QB the field." },
  { label: "Call the next play", to: "/inquiry", blurb: "Tell us what the deal needs and we’ll help call the next play." },
] as const;

export const FOOTER_NAV = [
  { label: "Playbook", to: "/playbook" },
  { label: "Equipment", to: "/tools" },
  { label: "Game Plans", to: "/game-plans" },
  { label: "QB Access", to: "/access" },
  { label: "About", to: "/about" },
  { label: "Locker Room", to: "/hq" },
  { label: "Film Room", to: "/videos" },
  { label: "Presentation Builder", to: "/playbook/builder" },
  { label: "Ask the QB", to: "/register" },
  { label: "Schedule a Huddle", to: "/huddle" },
  { label: "Meeting Support", to: "/desk" },
  { label: "Project Advisory", to: "/advisory" },
  { label: "Partner Support", to: "/for-partners" },
  { label: "Call the next play", to: "/inquiry" },
  { label: "Contact", to: "/contact" },
  { label: "Legal", to: "/legal" },
] as const;


export const NEEDS = [
  { value: "private-intro", label: "Municipal introduction and city strategy" },
  { value: "hearing", label: "Public-hearing presentation" },
  { value: "neighborhood", label: "Neighborhood-meeting presentation" },
  { value: "three-pack", label: "Complete three-presentation package" },
  { value: "presentation-builder", label: "Presentation Builder" },
  { value: "presentation-customization", label: "Customize a Playbook template (starting at $1,500)" },
  { value: "custom-presentation", label: "Build a custom presentation (starting at $3,000)" },
  { value: "presentation-campaign", label: "Complex assignment or meeting campaign" },
  { value: "in-the-room", label: "Meeting preparation or participation" },
  { value: "ask-the-qb", label: "Ask the QB" },
  { value: "huddle", label: "Huddle" },
  { value: "modeling", label: "LIHTC modeling through Alkaline Advisors" },
  { value: "intro-architect", label: "Architectural support or introduction" },
  { value: "intro-gc", label: "Contractor support or introduction" },
  { value: "intro-syndicator", label: "Syndicator introduction" },
  { value: "advisory", label: "Project advisory" },
  { value: "not-sure", label: "Not sure—I need help calling the next play" },
] as const;

export const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as
  | string
  | undefined;
export const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as
  | string
  | undefined;
export const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK as
  | string
  | undefined;
