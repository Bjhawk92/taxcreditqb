export type ChecklistTemplate = {
  slug: string;
  title: string;
  nextPlay: string;
  sections: { name: string; items: { key: string; label: string }[] }[];
};

export const CHECKLISTS: readonly ChecklistTemplate[] = [
  {
    slug: "pre-application",
    title: "Pre-Application Checklist",
    nextPlay: "Complete remaining pre-application items before submission.",
    sections: [
      {
        name: "Site",
        items: [
          { key: "site-control", label: "Site control documented" },
          { key: "zoning", label: "Zoning / land-use path identified" },
          { key: "env", label: "Environmental review started" },
          { key: "survey", label: "Survey / ALTA ordered or in hand" },
        ],
      },
      {
        name: "Program",
        items: [
          { key: "qap", label: "Current QAP and scoring reviewed" },
          { key: "ami", label: "AMI mix and set-asides drafted" },
          { key: "support", label: "Letters of support identified" },
        ],
      },
      {
        name: "Team",
        items: [
          { key: "architect", label: "Architect engaged" },
          { key: "gc", label: "Contractor path identified" },
          { key: "model", label: "Financial model in progress" },
        ],
      },
      {
        name: "Approvals",
        items: [
          { key: "city", label: "Municipal introduction completed" },
          { key: "neighborhood", label: "Neighborhood outreach planned" },
        ],
      },
    ],
  },
  {
    slug: "post-award",
    title: "Post-Award Checklist",
    nextPlay: "Your application is marked Awarded. Open the Post-Award Checklist.",
    sections: [
      {
        name: "Closing",
        items: [
          { key: "award-letter", label: "Award letter received and filed" },
          { key: "equity", label: "Syndicator / equity path confirmed" },
          { key: "debt", label: "Construction and permanent debt terms" },
          { key: "closing-checklist", label: "Closing checklist with counsel" },
        ],
      },
      {
        name: "Construction",
        items: [
          { key: "permits", label: "Permits in process" },
          { key: "ntp", label: "Notice to proceed targeted" },
        ],
      },
      {
        name: "Compliance",
        items: [
          { key: "lura", label: "Land-use restriction path" },
          { key: "8609", label: "Placed-in-service / 8609 plan" },
        ],
      },
    ],
  },
  {
    slug: "deal",
    title: "Deal Checklist",
    nextPlay: "Close outstanding items on the Deal Checklist.",
    sections: [
      {
        name: "Core",
        items: [
          { key: "name", label: "Project name and location confirmed" },
          { key: "type", label: "Deal type recorded" },
          { key: "units", label: "Unit count recorded" },
          { key: "stage", label: "Current stage kept current" },
        ],
      },
      {
        name: "Dates",
        items: [
          { key: "app-due", label: "Application due date (if applicable)" },
          { key: "closing", label: "Expected closing (if applicable)" },
          { key: "pis", label: "Placed-in-service target (if applicable)" },
        ],
      },
    ],
  },
  {
    slug: "site-control",
    title: "Site Control Checklist",
    nextPlay: "Document site control before application submission.",
    sections: [
      {
        name: "Control",
        items: [
          { key: "psa", label: "Purchase agreement, option, or ground lease" },
          { key: "term", label: "Control term covers the application window" },
          { key: "title", label: "Title path identified" },
        ],
      },
      {
        name: "Diligence",
        items: [
          { key: "env-phase1", label: "Phase I environmental (if applicable)" },
          { key: "survey", label: "Survey ordered or in hand" },
        ],
      },
    ],
  },
];
