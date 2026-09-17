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

export const NAV = [
  {
    label: "Playbook",
    to: "/playbook",
    blurb: "Presentation templates, outreach resources, and the Presentation Builder.",
    tab: "navy",
  },
  {
    label: "Film Room",
    to: "/videos",
    blurb: "Educational videos and deal breakdowns.",
    tab: "blue",
  },
  {
    label: "Tools",
    to: "/tools",
    blurb: "State QAP links, Presentation Builder, and housing-agency resources.",
    tab: "tools",
  },
  {
    label: "Work With Us",
    to: "/access",
    blurb: "Questions, huddles, meeting support, and project advisory.",
    tab: "gold",
  },
  {
    label: "About",
    to: "/about",
    blurb: "Meet Brett Johnson and the experience behind Tax Credit QB.",
    tab: "slate",
  },
] as const;

export const WORK_NAV = [
  { label: "Ask the QB", to: "/register", blurb: "Submit a private deal question." },
  { label: "Huddle", to: "/access", blurb: "Live virtual strategy sessions." },
  { label: "Meeting Support", to: "/desk", blurb: "Preparation and participation in the room." },
  { label: "Project Advisory", to: "/advisory", blurb: "Strategy and hands-on support across a development." },
  { label: "Partner Support", to: "/for-partners", blurb: "For syndicators and consultants." },
] as const;

export const FOOTER_NAV = [
  { label: "Playbook", to: "/playbook" },
  { label: "Presentation Builder", to: "/playbook/builder" },
  { label: "Film Room", to: "/videos" },
  { label: "Tools", to: "/tools" },
  { label: "Ask the QB", to: "/register" },
  { label: "Huddle", to: "/access" },
  { label: "Meeting Support", to: "/desk" },
  { label: "Project Advisory", to: "/advisory" },
  { label: "Partner Support", to: "/for-partners" },
  { label: "About", to: "/about" },
  { label: "Get the Playbook", to: "/register" },
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
  { value: "in-the-room", label: "Meeting participation or support" },
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
