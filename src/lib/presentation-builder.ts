export const BUILDER_INTRO = {
  eyebrow: "Presentation Builder",
  title: "Bring us the deal. We’ll build the game plan.",
  sub: "Organize the facts, images, documents, audience details, and supporting evidence Tax Credit QB needs to understand the field and build the strongest case for your development. Work through the guided process at your own pace, save your progress, and submit everything when the assignment is ready to be scoped.",
  note: "The Presentation Builder organizes your materials and prepares the assignment for review. Completing the builder does not automatically order a finished presentation. Tax Credit QB reviews the information, establishes the strategy, confirms the scope, fee, schedule, and deliverables, and then develops the final presentation.",
} as const;

export const BUILDER_TYPES = [
  {
    name: "Municipal Introduction",
    body: "Introduce the developer, establish credibility, understand local priorities, and evaluate governmental support before requesting a formal decision.",
  },
  {
    name: "Neighborhood Meeting",
    body: "Introduce the development and team, explain the plans, uncover community concerns, and prepare for the questions likely to arise during the approval process.",
  },
  {
    name: "Public Hearing",
    body: "Build a clear, site-specific case for the development and prepare the team to address questions from elected officials, planning commissioners, and residents.",
  },
  {
    name: "Investor or Syndicator Presentation",
    body: "Present the sponsor, opportunity, development strategy, financial structure, team, risks, and execution plan.",
  },
  {
    name: "Lender Presentation",
    body: "Organize the project facts, financing request, development budget, collateral, team experience, schedule, and repayment strategy.",
  },
  {
    name: "Project Overview",
    body: "Create a clear, versatile presentation that can be adapted for prospective partners, community stakeholders, and other interested parties.",
  },
  {
    name: "Complete Three-Presentation Package",
    body: "Develop coordinated Municipal Introduction, Neighborhood Meeting, and Public Hearing presentations around one consistent project story.",
  },
  {
    name: "Custom Presentation",
    body: "Build a presentation for an audience, assignment, or objective that does not fit one of the standard categories.",
  },
] as const;

export const BUILDER_STEPS = [
  {
    n: "01",
    title: "Choose the Matchup",
    body: "Select the presentation, meeting, and audience.",
  },
  {
    n: "02",
    title: "Set the Game Situation",
    body: "Identify the project stage, upcoming decision, deadline, and desired outcome.",
  },
  {
    n: "03",
    title: "Tell the Development Story",
    body: "Explain the opportunity, community need, site, benefits, and essential message.",
  },
  {
    n: "04",
    title: "Enter the Deal Facts",
    body: "Provide the development program, approvals, financing, and team information.",
  },
  {
    n: "05",
    title: "Assemble the Assets",
    body: "Organize plans, renderings, maps, photographs, studies, and letters of support.",
  },
  {
    n: "06",
    title: "Read the Defense",
    body: "Identify likely objections, known resistance, sensitive subjects, and competing arguments.",
  },
  {
    n: "07",
    title: "Define the Win",
    body: "Clarify what the presentation must accomplish.",
  },
  {
    n: "08",
    title: "Review the Game Plan",
    body: "Review the organized Presentation Brief before submitting the assignment.",
  },
] as const;

export const BUILDER_INFO = [
  {
    name: "Project Basics",
    items: [
      "Project name and location",
      "Developer and ownership entity",
      "Primary contact",
      "Development type",
      "LIHTC structure",
      "Number and type of units",
      "Current development stage",
      "Meeting date",
      "Presentation deadline",
    ],
  },
  {
    name: "Development Program",
    items: [
      "Unit and bedroom mix",
      "Income and rent restrictions",
      "Building size and design",
      "Density and parking",
      "Amenities",
      "Resident services",
      "Accessibility",
      "Sustainability",
      "Property-management plan",
    ],
  },
  {
    name: "Site and Approvals",
    items: [
      "Acreage and existing conditions",
      "Current and requested zoning",
      "Comprehensive-plan designation",
      "Adjacent land uses",
      "Access and transportation",
      "Transit",
      "Utilities",
      "Approval history",
      "Remaining approvals",
      "Incentives and governmental participation",
    ],
  },
  {
    name: "Financial Information",
    items: [
      "Total development cost",
      "Sources and uses",
      "LIHTC equity",
      "Construction financing",
      "Permanent financing",
      "Soft funds",
      "Local participation",
      "Developer equity",
      "Economic impact",
    ],
  },
  {
    name: "Developer and Team",
    items: [
      "Company history",
      "Leadership biographies",
      "Years of experience",
      "Communities completed",
      "Units developed",
      "Markets served",
      "Awards and qualifications",
      "Relevant local experience",
      "Comparable developments",
      "Property-management experience",
      "Architects, contractors, consultants, and financial partners",
    ],
  },
  {
    name: "Audience and Strategy",
    items: [
      "Intended audience",
      "Purpose of the meeting",
      "Desired outcome",
      "Known supporters",
      "Subjects that should not be emphasized publicly",
    ],
  },
  {
    name: "The Defense",
    items: [
      "Known concerns",
      "Existing resistance",
      "Organized opposition",
      "Common misconceptions",
      "Likely objections",
      "Competing arguments",
      "Sensitive subjects",
      "Available supporting evidence",
      "Questions the team must be prepared to answer",
    ],
  },
  {
    name: "Images and Documents",
    items: [
      "Company and project logos",
      "Site plans",
      "Renderings",
      "Floor plans",
      "Elevations",
      "Aerial imagery",
      "Parcel and zoning maps",
      "Location maps",
      "Amenity images",
      "Comparable-property photographs",
      "Completed-development photographs",
      "Team headshots",
      "Market studies",
      "Traffic studies",
      "Letters of support",
      "Existing presentations",
      "Brand guidelines",
      "Other supporting documents",
    ],
  },
] as const;

export const FINANCIAL_DESIGNATIONS = [
  "Public",
  "For Tax Credit QB review only",
  "Do not include in the presentation",
] as const;

export const IMAGE_FIELDS = [
  "Caption",
  "Location",
  "Date",
  "Photographer or source",
  "Permission to use",
  "What the image is intended to demonstrate",
] as const;

export const BUILDER_BENEFITS = [
  "Keep project information in one organized location",
  "Separate public information from confidential materials",
  "Identify the intended audience and desired outcome",
  "Organize images and documents by purpose",
  "Document known concerns and likely objections",
  "Provide supporting evidence and source information",
  "Review the completed Presentation Brief before submission",
  "Reduce scattered emails and unidentified attachments",
] as const;

export const ASSET_FOLDERS = [
  "Branding",
  "Site and Location",
  "Plans and Renderings",
  "Development Team",
  "Comparable Properties",
  "Market Evidence",
  "Community Support",
  "Financial Information",
  "Existing Presentations",
  "Other Supporting Documents",
] as const;

export const COMMUNITY_SUPPORT_ASSETS = [
  "Municipal letters of support",
  "Housing-authority letters",
  "Economic-development letters",
  "Nonprofit letters of support",
  "Resident-service partner letters",
  "Neighborhood or community-organization letters",
  "Chamber and business-organization letters",
  "Major-employer letters",
  "Healthcare and educational-institution letters",
  "Faith-based organization letters",
  "Social-service organization letters",
  "Supportive-housing or Continuum of Care letters",
  "General community letters of support",
] as const;

export const BRIEF_ITEMS = [
  "Presentation type",
  "Intended audience",
  "Meeting objective",
  "Project summary",
  "Development facts",
  "Strongest supporting arguments",
  "Known objections",
  "Available evidence",
  "Uploaded assets",
  "Missing information",
  "Requested schedule",
  "Confidentiality designations",
] as const;

export const BUILDER_SERVICES = [
  {
    name: "Customize a Playbook Template",
    price: "Starting at $1,500",
    body: "Adapt an existing Tax Credit QB presentation framework to the client’s company, project, site, audience, and supporting information.",
    cta: "Call the next play",
    intent: "presentation-customization",
  },
  {
    name: "Build a Custom Presentation",
    price: "Starting at $3,000",
    body: "Develop a presentation specifically around the assignment, including its audience, strategy, development facts, visual assets, and anticipated questions.",
    cta: "Bring in the QB",
    intent: "custom-presentation",
  },
  {
    name: "Complex Assignment or Meeting Campaign",
    price: "Custom scope",
    body: "For multiple presentations, extensive research, public-approval campaigns, compressed schedules, or assignments requiring meeting preparation and participation.",
    cta: "Call the next play",
    intent: "presentation-campaign",
  },
] as const;

export const REVIEW_STEPS = [
  "Tax Credit QB reviews the Presentation Brief and submitted materials.",
  "Missing information and strategic questions are identified.",
  "The scope, fee, schedule, and deliverables are confirmed.",
  "The client approves the assignment before production begins.",
  "Tax Credit QB develops the presentation.",
  "The client reviews the draft within the agreed revision allowance.",
  "Final presentation files are delivered.",
] as const;

export const WORKSPACE_STAGES = [
  "Intake Started",
  "Information Needed",
  "Assets Received",
  "Scope Under Review",
  "Proposal Delivered",
  "In Production",
  "Client Review",
  "Final Presentation Delivered",
] as const;
