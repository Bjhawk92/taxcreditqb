import { SITE } from "@/lib/site";

/**
 * Pricing & membership source of truth.
 * Edit prices, allowances, copy, Stripe links, and the $29 enrollment cap here.
 */
export const FILM_ENROLLMENT_CAP = {
  /** Owner switch. Leave false until a real cap is in force. */
  enabled: false,
  limit: 25,
  enrolled: 0,
} as const;

export function filmRoomJoinOpen() {
  if (!FILM_ENROLLMENT_CAP.enabled) return true;
  return FILM_ENROLLMENT_CAP.enrolled < FILM_ENROLLMENT_CAP.limit;
}

export const STRIPE_LINKS = {
  film: import.meta.env.VITE_STRIPE_LINK_FILM as string | undefined,
  playbook: import.meta.env.VITE_STRIPE_LINK_PLAYBOOK as string | undefined,
  huddle: import.meta.env.VITE_STRIPE_LINK_HUDDLE as string | undefined,
};

export type PriceKind = "fixed" | "starting" | "custom" | "monthly";

export type MembershipPlan = {
  id: "film" | "playbook" | "huddle";
  name: string;
  price: number;
  period: string;
  tagline: string;
  description: string;
  includes: readonly string[];
  guidelines?: readonly string[];
  clarify?: readonly string[];
  cta: string;
  intent: string;
  stripeKey: keyof typeof STRIPE_LINKS;
};

export const MEMBERSHIPS: readonly MembershipPlan[] = [
  {
    id: "film",
    name: "Film Room + Ask the QB",
    price: 29,
    period: "/month",
    tagline:
      "Designed for developers who want practical guidance without scheduled consulting calls.",
    description:
      "Designed for developers who want practical guidance without scheduled consulting calls.",
    includes: [
      "Full Film Room access",
      "Educational walkthroughs and real-world samples",
      "Up to three private deal questions per month",
      "Brief written or recorded responses within three business days",
      "No live consultation sessions",
    ],
    cta: "Enter the Film Room",
    intent: "membership-film",
    stripeKey: "film",
  },
  {
    id: "playbook",
    name: "The Playbook",
    price: 295,
    period: "/month",
    tagline:
      "Designed for developers who want proven resources plus direct monthly access to an experienced quarterback.",
    description:
      "Designed for developers who want proven resources plus direct monthly access to an experienced quarterback.",
    includes: [
      "Everything in Film Room, plus:",
      "Downloadable templates and checklists",
      "One 30-minute virtual strategy session each month",
      "Practical guidance on positioning and advancing a deal",
    ],
    cta: "Get the Playbook",
    intent: "membership-playbook",
    stripeKey: "playbook",
  },
  {
    id: "huddle",
    name: "The Huddle",
    price: 795,
    period: "/month",
    tagline:
      "Designed for developers who want consistent strategic access and more hands-on monthly guidance.",
    description:
      "Designed for developers who want consistent strategic access and more hands-on monthly guidance.",
    includes: [
      "Everything in The Playbook, plus:",
      "Up to four private deal questions per month",
      "Two 45-minute virtual strategy sessions each month",
      "One monthly deal or presentation review",
      "10% discount on separately scoped professional services",
    ],
    cta: "Join the Huddle",
    intent: "membership-huddle",
    stripeKey: "huddle",
  },
];

export const MEMBERSHIP_DETAILS =
  "Memberships are billed monthly and may be canceled at any time. Benefits are limited to one named subscriber, do not roll over, and end upon cancellation. Each submitted question must address one issue and be limited to 250 words. Extensive research, document review, financial modeling, custom production, additional calls, meeting attendance, and other professional services are quoted separately.";

export const MEMBERSHIP_TERMS = [
  "Month-to-month memberships.",
  "Cancel before the next renewal to stop future billing.",
  "Consulting sessions, questions, and reviews do not roll over.",
  "Sessions are scheduled subject to availability.",
  "Subscriptions do not include meeting attendance or custom production.",
  "Each membership is for one named subscriber; team access can be discussed separately.",
  "Client-specific questions and answers remain private. Obtain permission before using any client example in educational content.",
  "Downloaded templates may be adapted for the subscriber’s own company and projects but may not be resold or redistributed.",
  "Access to the online library ends when the subscription ends.",
] as const;

export type ServiceItem = {
  id: string;
  name: string;
  priceLabel: string;
  kind: PriceKind;
  description: string;
  extras?: readonly string[];
  note?: string;
  cta: string;
  intent: string;
};

export type ServiceGroup = {
  id: string;
  name: string;
  items: readonly ServiceItem[];
};

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    id: "strategy",
    name: "Strategy & presentations",
    items: [
      {
        id: "strategy-session",
        name: "Deal Strategy Session",
        priceLabel: "$350",
        kind: "fixed",
        description:
          "A focused, 60-minute virtual conversation about your deal, challenge, or next decision.",
        extras: [
          "Includes a short intake and a concise written summary of the recommended next play.",
          "Extensive advance review is quoted separately.",
        ],
        cta: "Call the next play",
        intent: "strategy-session",
      },
      {
        id: "presentation-customization",
        name: "Presentation Customization",
        priceLabel: "Starting at $1,500",
        kind: "starting",
        description:
          "Turn an existing Tax Credit QB presentation framework into a deck for your company or project.",
        extras: [
          "Base scope: client-supplied facts and assets, up to 20 slides, and two consolidated revision rounds.",
        ],
        cta: "Call the next play",
        intent: "presentation-customization",
      },
      {
        id: "custom-presentation",
        name: "Custom Presentation",
        priceLabel: "Starting at $3,000",
        kind: "starting",
        description:
          "Build the story, structure, and visuals around your audience and the decision you need.",
        extras: [
          "For municipal introductions, public hearings, neighborhood meetings, and other development presentations.",
          "Includes a strategy discussion, custom narrative and design, and a preparation call.",
          "Slide count and revision rounds are defined in the proposal.",
        ],
        cta: "Bring in the QB",
        intent: "custom-presentation",
      },
    ],
  },
  {
    id: "marketing",
    name: "Company & project marketing",
    items: [
      {
        id: "brand",
        name: "Company Positioning & Logo Design",
        priceLabel: "Custom quote",
        kind: "custom",
        description: "Give your company a clear story and a professional identity.",
        extras: [
          "Services may include positioning, company biography, logo design, visual direction, and credentials materials.",
          "Deliverables are defined in advance.",
        ],
        cta: "Discuss Your Brand",
        intent: "company-brand",
      },
      {
        id: "marketing-plan",
        name: "Marketing Plan",
        priceLabel: "Custom quote",
        kind: "custom",
        description: "Know who you need to reach, what to say, and where to focus.",
        extras: [
          "May include audience priorities, messaging, channel selection, launch schedule, and recommended marketing budget.",
          "Content production and campaign management are separately scoped.",
        ],
        cta: "Plan Your Marketing",
        intent: "marketing-plan",
      },
      {
        id: "social",
        name: "Social Media Launch",
        priceLabel: "Custom quote",
        kind: "custom",
        description:
          "Build a professional presence that supports your company and projects.",
        extras: [
          "May include profile setup, branded graphics, content themes, and an initial batch of posts.",
          "Ongoing posting, community management, paid campaign management, and advertising spend are separate.",
        ],
        cta: "Build Your Social Presence",
        intent: "social-launch",
      },
      {
        id: "community-comms",
        name: "Community Communication Package",
        priceLabel: "Starting at $1,500",
        kind: "starting",
        description:
          "Give neighbors clear, consistent information about the proposed development.",
        extras: [
          "Base package includes a project flyer, neighborhood FAQ, and meeting invitation, using client-approved project information.",
          "Printing, mailing, distribution, and additional materials are separate.",
        ],
        cta: "Prepare Your Community Materials",
        intent: "community-comms",
      },
    ],
  },
  {
    id: "websites",
    name: "Websites",
    items: [
      {
        id: "company-site",
        name: "Company Website",
        priceLabel: "Starting at $5,000",
        kind: "starting",
        description: "Build confidence before the first conversation.",
        extras: [
          "A custom website presenting the company, leadership, track record, capabilities, and projects, with inquiry functionality and basic analytics.",
          "Page count, content development, integrations, and revision rounds are defined in the proposal.",
        ],
        cta: "Discuss Your Company Website",
        intent: "company-website",
      },
      {
        id: "project-site",
        name: "Project & Neighborhood Website",
        priceLabel: "Starting at $5,000",
        kind: "starting",
        description:
          "Give the community a place to learn, ask questions, and stay informed.",
        extras: [
          "Project overview and development team information.",
          "Approved renderings, plans, and project imagery.",
          "Available meeting information and project updates.",
          "Public FAQ.",
          "Private neighborhood question submission form.",
          "Inquiry tracking so the team can organize and respond to concerns.",
          "Basic visitor and engagement analytics.",
        ],
        note:
          "Private submissions are reviewed; answers may be published selectively to the public FAQ. This is not an unmoderated public comment board. Hosting, domain registration, ongoing updates, answering submissions, and moderation are scoped separately. Response responsibilities are agreed upon before launch. We do not identify anonymous visitors or offer tracking beyond the analytics setup.",
        cta: "Discuss Your Project Website",
        intent: "project-website",
      },
    ],
  },
  {
    id: "meetings",
    name: "Meeting & deal support",
    items: [
      {
        id: "virtual-meeting",
        name: "Virtual Meeting Support",
        priceLabel: "Starting at $750",
        kind: "starting",
        description:
          "Bring experienced development judgment into the conversation.",
        extras: [
          "May include preparation and participation in a municipal, neighborhood, landowner, or project-team meeting.",
          "The quote specifies preparation time, meeting duration, and Brett’s role.",
        ],
        cta: "Bring in the QB",
        intent: "virtual-meeting",
      },
      {
        id: "in-person-meeting",
        name: "In-Person Meeting Support",
        priceLabel: "Starting at $2,500 per meeting day",
        kind: "starting",
        description:
          "An experienced voice beside your team when the assignment needs it.",
        extras: [
          "May include public speaking, presentations, Q&A, negotiations, and project-team support.",
          "Preparation, travel time, travel expenses, and additional meetings are specified separately.",
        ],
        cta: "Bring in the QB",
        intent: "in-person-meeting",
      },
      {
        id: "modeling",
        name: "LIHTC Modeling & Feasibility",
        priceLabel: "Custom quote",
        kind: "custom",
        description:
          "Connect your development strategy with specialized financial modeling.",
        extras: [
          `Modeling is provided in collaboration with ${SITE.alkaline.name}.`,
          "Scope, fees, deliverables, and the responsible provider are identified in the proposal.",
          "Memberships do not include modeling.",
        ],
        cta: "Call the next play",
        intent: "modeling",
      },
    ],
  },
];

export const RETAINERS = [
  {
    id: "retainer-marketing",
    name: "Marketing & Communications",
    priceLabel: "Custom monthly retainer",
    description:
      "Continued support for company positioning, websites, presentations, social content, and project communications.",
    intent: "retainer-marketing",
  },
  {
    id: "retainer-advisory",
    name: "Development Advisory & Meeting Support",
    priceLabel: "Custom monthly retainer",
    description:
      "Continued involvement in deal strategy, landowner discussions, municipal relationships, neighborhood engagement, and team coordination.",
    intent: "retainer-advisory",
  },
] as const;

export const SPEAKING_CALLOUT =
  "More than 20 years of experience presenting before city officials, neighborhood groups, and public audiences—including high-stakes hearings. Brett brings a developer’s understanding of the project and works alongside your legal and technical team.";

export const PRICING_FAQ = [
  {
    q: "Which membership is right for me?",
    a: "Film Room + Ask the QB is for video breakdowns and written answers to specific deal questions. Playbook adds editable presentation templates and one 30-minute virtual session each month. Huddle is for active deals that need recurring conversations, more questions, a monthly review, and preferred pricing on extra work. Custom services and retainers are available whether or not you subscribe.",
  },
  {
    q: "What counts as an Ask the QB question?",
    a: "One specific issue per submission, up to 250 words. One brief clarification is included with the answer. A new issue counts as another question. Questions reset each month and do not roll over.",
  },
  {
    q: "What if my question requires research or document review?",
    a: "That work sits outside the question allowance. Document review, research, financial modeling, calls, and custom deliverables are discussed and quoted before anything begins. Additional work is never billed automatically.",
  },
  {
    q: "Can I hire Tax Credit QB without subscribing?",
    a: "Yes. Strategy sessions, presentations, websites, meeting support, modeling, and retainers do not require a membership.",
  },
  {
    q: "Are presentation templates the same as a custom-built deck?",
    a: "No. Membership templates are editable frameworks. A custom presentation is built around your company, site, and audience, with scope and fees agreed in a proposal.",
  },
  {
    q: "What does a focused document review include?",
    a: "Huddle members receive one focused review each month of a presentation up to 15 slides or a document up to five pages. You receive comments and recommendations. Rewriting, redesign, legal review, and financial model review are separate.",
  },
  {
    q: "What does “starting at” mean?",
    a: "The published figure is the base for the described scope. Slide count, revision rounds, travel, third-party work, and additional materials can change the fee. We quote before work begins.",
  },
  {
    q: "Are travel and third-party expenses included?",
    a: "No, unless the proposal says so. Travel, lodging, advertising spend, modeling by Alkaline Advisors, and other third-party fees are identified separately.",
  },
  {
    q: "Who answers neighborhood questions submitted through a project website?",
    a: "Response responsibilities are agreed before launch. Tax Credit QB does not automatically monitor or answer submissions unless that work is in the scoped engagement.",
  },
  {
    q: "Is financial modeling included?",
    a: `No. Modeling is a separately quoted collaboration with ${SITE.alkaline.name}. It is not part of any membership.`,
  },
  {
    q: "Can my team share a membership?",
    a: "Each membership is for one named subscriber. Team access can be discussed separately.",
  },
  {
    q: "What happens when I cancel?",
    a: "Cancel before the next renewal to stop future billing. Access to the online library ends when the subscription ends. Unused questions, sessions, and reviews do not roll over.",
  },
] as const;

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function stripeFor(plan: MembershipPlan) {
  const url = STRIPE_LINKS[plan.stripeKey]?.trim();
  return url || undefined;
}

export const SERVICE_NEEDS = [
  { value: "membership-film", label: "Membership — Film Room + Ask the QB ($29/mo)" },
  { value: "membership-playbook", label: "Membership — Playbook ($295/mo)" },
  { value: "membership-huddle", label: "Membership — Huddle ($795/mo)" },
  { value: "strategy-session", label: "Deal Strategy Session ($350)" },
  { value: "presentation-customization", label: "Presentation Customization (starting at $1,500)" },
  { value: "custom-presentation", label: "Custom Presentation (starting at $3,000)" },
  { value: "presentation-builder", label: "Presentation Builder" },
  { value: "presentation-campaign", label: "Complex assignment or meeting campaign" },
  { value: "company-brand", label: "Company positioning & logo" },
  { value: "marketing-plan", label: "Marketing plan" },
  { value: "social-launch", label: "Social media launch" },
  { value: "community-comms", label: "Community communication package" },
  { value: "company-website", label: "Company website" },
  { value: "project-website", label: "Project & neighborhood website" },
  { value: "virtual-meeting", label: "Virtual meeting support" },
  { value: "in-person-meeting", label: "In-person meeting support" },
  { value: "modeling", label: "LIHTC modeling (Alkaline Advisors)" },
  { value: "retainer-marketing", label: "Retainer — marketing & communications" },
  { value: "retainer-advisory", label: "Retainer — development advisory & meeting support" },
] as const;
