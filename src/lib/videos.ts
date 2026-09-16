export const VIDEO_GROUPS = [
  {
    heading: "Land acquisition, site control and negotiations",
    playbook: {
      href: "/playbook/private-intro" as const,
      label: "Municipal Introduction",
    },
    items: [
      {
        id: "land",
        title: "Land acquisition",
        duration: "12:00",
        body: "How to walk a site and a seller before you are in love with the dirt.",
        available: true,
      },
    ],
  },
  {
    heading: "Contract business terms and working effectively with legal counsel",
    playbook: null,
    items: [
      {
        id: "contract",
        title: "Contract business terms",
        duration: "14:00",
        body: "What to fight for in the purchase agreement. Option versus close. The outs you will actually use. Counsel drafts. You set the business terms.",
        available: true,
      },
    ],
  },
  {
    heading: "Arranging meetings and identifying the right decision-makers",
    playbook: {
      href: "/playbook/private-intro" as const,
      label: "Municipal Introduction",
    },
    items: [
      {
        id: "intro",
        title: "Arranging the municipal introduction",
        duration: "09:00",
        body: "Who to call, in what order, and what to send ahead of a city manager meeting.",
        available: true,
      },
    ],
  },
  {
    heading: "Presenting your company’s experience to different audiences",
    playbook: {
      href: "/playbook/hearing" as const,
      label: "Public Hearing",
    },
    items: [
      {
        id: "rooms",
        title: "The same résumé, three rooms",
        duration: "16:00",
        body: "Staff, elected officials, and neighbors. Same track record. Three different asks.",
        available: true,
      },
    ],
  },
  {
    heading: "Preparing for public hearings and neighborhood opposition",
    playbook: {
      href: "/playbook/neighborhood" as const,
      label: "Neighborhood Meeting",
    },
    items: [
      {
        id: "opposition",
        title: "Hearings and neighborhood opposition",
        duration: "",
        body: "How to prepare the record, run the Q&A, and answer the arguments that show up at approval.",
        available: false,
      },
    ],
  },
  {
    heading: "Working with architects, contractors and syndicators",
    playbook: null,
    items: [
      {
        id: "partners",
        title: "Architects, contractors and syndicators",
        duration: "",
        body: "When to bring each specialist in, what to ask, and how to keep the relationship yours.",
        available: false,
      },
    ],
  },
  {
    heading: "Marketing, lease-up and development execution",
    playbook: null,
    items: [
      {
        id: "leaseup",
        title: "Marketing, lease-up and execution",
        duration: "",
        body: "What to put in place after the vote so the project still performs.",
        available: false,
      },
    ],
  },
] as const;
