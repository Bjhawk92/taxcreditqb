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
    consult: "30-minute huddle",
    launchLabel: "Playbook membership",
  },
  cta: {
    ask: "Ask the QB",
    play: "Call in the play",
    playbook: "Open the playbook",
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
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
  disclaimer:
    "Tax Credit QB is not a law firm, not a syndicator, not your co-GP, and not a substitute for local land-use counsel. Meeting support is not lobbying unless a separate engagement says so. Deck templates are educational and must be adapted to the site, the QAP, and the jurisdiction. Financial models are prepared by Alkaline Advisors unless otherwise stated. Tax Credit QB does not guarantee approvals, tax-credit awards, financing, or project outcomes. You remain the developer and owner of your opportunity.",
} as const;

export const NAV = [
  {
    label: "Playbook",
    to: "/playbook",
    blurb: "Presentation templates and tools for the meetings that matter.",
    tab: "navy",
  },
  {
    label: "Film Room",
    to: "/videos",
    blurb: "Short clips. Real examples. Practical insight for the next deal.",
    tab: "blue",
  },
  {
    label: "Huddle",
    to: "/access",
    blurb: "One-on-one advice for your next decision.",
    tab: "gold",
  },
  {
    label: "Sideline",
    to: "/desk",
    blurb: "Experienced support before, during and after your meeting.",
    tab: "green",
  },
  {
    label: "Advisory",
    to: "/advisory",
    blurb: "Strategy and hands-on support across your development.",
    tab: "burgundy",
  },
  {
    label: "About",
    to: "/about",
    blurb: "Meet Brett Johnson and the experience behind Tax Credit QB.",
    tab: "slate",
  },
  {
    label: "Team HQ",
    to: "/hq",
    blurb: "Client portal for membership, files and project work.",
    tab: "hq",
  },
] as const;

export const FOOTER_NAV = [
  { label: "Playbook", to: "/playbook" },
  { label: "Huddle", to: "/access" },
  { label: "Sideline", to: "/desk" },
  { label: "Advisory", to: "/advisory" },
  { label: "About", to: "/about" },
  { label: "Team HQ", to: "/hq" },
  { label: "Film Room", to: "/videos" },
  { label: "For Partners", to: "/for-partners" },
  { label: "Call in the play", to: "/inquiry" },
  { label: "Contact", to: "/contact" },
  { label: "Legal", to: "/legal" },
] as const;

export const NEEDS = [
  { value: "private-intro", label: "Opening drive — private intro deck" },
  { value: "hearing", label: "Game day — public hearing deck" },
  { value: "neighborhood", label: "Walkthrough — neighborhood deck" },
  { value: "three-pack", label: "Full three-play package" },
  { value: "in-the-room", label: "Put the QB in the game" },
  { value: "modeling", label: "LIHTC modeling (Alkaline Advisors)" },
  { value: "intro-architect", label: "Architect — add a blocker" },
  { value: "intro-gc", label: "Contractor — add a blocker" },
  { value: "intro-syndicator", label: "Syndicator introduction" },
  { value: "not-sure", label: "Not sure — huddle with us" },
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
