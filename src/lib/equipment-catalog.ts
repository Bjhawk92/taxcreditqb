export type AccessKind =
  | "free"
  | "account"
  | "playbook"
  | "huddle"
  | "purchase"
  | "custom";

export type EquipmentItem = {
  slug: string;
  name: string;
  blurb: string;
  access: AccessKind;
  accessLabel: string;
  href: string;
  interactive?: boolean;
};

export const EQUIPMENT_PACKAGES: readonly EquipmentItem[] = [
  {
    slug: "qap-directory",
    name: "All 50 States’ QAPs",
    blurb:
      "Official housing-agency resources for Qualified Allocation Plans, allocation requirements, and application information.",
    access: "free",
    accessLabel: "Free",
    href: "/tools#qap",
  },
  {
    slug: "presentation-builder",
    name: "Presentation Builder",
    blurb:
      "Assemble the project facts, images, documents, and audience details needed to build the strongest case.",
    access: "account",
    accessLabel: "Account required",
    href: "/playbook/builder",
    interactive: true,
  },
  {
    slug: "pre-application",
    name: "Pre-Application Checklist",
    blurb:
      "Track the work that typically happens before a LIHTC application is submitted. Confirm items against the applicable QAP and HFA guidance.",
    access: "playbook",
    accessLabel: "Playbook member",
    href: "/hq/equipment?resource=pre-application",
    interactive: true,
  },
  {
    slug: "post-award",
    name: "Post-Award Checklist",
    blurb:
      "Move from award toward closing. Track obvious outstanding items without treating the list as legal advice.",
    access: "playbook",
    accessLabel: "Playbook member",
    href: "/hq/equipment?resource=post-award",
    interactive: true,
  },
  {
    slug: "letter-builder",
    name: "Letter Builder",
    blurb:
      "Generate municipal, partner, and support-letter drafts from a Deal Profile. Edit before you send.",
    access: "playbook",
    accessLabel: "Playbook member",
    href: "/hq/letters",
    interactive: true,
  },
  {
    slug: "custom-lihtc-model",
    name: "Custom LIHTC Model",
    blurb:
      "Institutional-quality LIHTC financial modeling customized to your deal, built by Alkaline Advisors and available through Tax Credit QB.",
    access: "custom",
    accessLabel: "Custom pricing",
    href: "/tools/modeling",
    interactive: true,
  },
];
