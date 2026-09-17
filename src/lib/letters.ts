export const LETTER_TYPES = [
  {
    id: "municipal-intro",
    name: "Municipal Introduction",
    body: (d: LetterDeal) =>
      `Dear ${d.audience || "City Manager"},\n\nI am writing to introduce ${d.company || "our firm"} and ${d.name}, a proposed affordable housing community in ${d.city || "[city]"}, ${d.state || "[state]"}. We would welcome the opportunity to learn how the municipality views housing need, location, and potential support before any formal request.\n\n${d.deal_type ? `The development is currently contemplated as ${d.deal_type}. ` : ""}${d.unit_count ? `The current program is approximately ${d.unit_count} units. ` : ""}\n\nWe remain the developer and decision-maker. This letter is an introduction, not a request for a vote.\n\nSincerely,\n${d.signatory || "[Name]"}`,
  },
  {
    id: "support-request",
    name: "Letter of Support Request",
    body: (d: LetterDeal) =>
      `Dear ${d.audience || "Colleague"},\n\nWe are preparing ${d.name} in ${d.city || "[city]"}, ${d.state || "[state]"}, and respectfully request a letter of support describing local housing need and the role this community can play.\n\nAny letter should speak from your organization's knowledge of the community. We will not ask you to advocate beyond your mission.\n\nThank you for considering this request.\n\nSincerely,\n${d.signatory || "[Name]"}`,
  },
  {
    id: "follow-up",
    name: "Meeting Follow-Up",
    body: (d: LetterDeal) =>
      `Dear ${d.audience || "Colleague"},\n\nThank you for the time on ${d.name}. This note confirms what we discussed and the next play we understood from the conversation.\n\nProject: ${d.name}\nLocation: ${[d.city, d.state].filter(Boolean).join(", ") || "[location]"}\nCurrent stage: ${d.stage || "[stage]"}\n\nPlease let us know if we missed an item or if additional information would be useful.\n\nSincerely,\n${d.signatory || "[Name]"}`,
  },
] as const;

export type LetterDeal = {
  name: string;
  city?: string | null;
  state?: string | null;
  deal_type?: string | null;
  unit_count?: string | null;
  stage?: string | null;
  company?: string | null;
  audience?: string | null;
  signatory?: string | null;
};
