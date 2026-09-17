export type NextPlay = {
  title: string;
  body: string;
  cta: string;
  to: string;
};

type DealHint = {
  id: number;
  name: string;
  stage: string;
  next_milestone?: string | null;
};

type ChecklistHint = {
  deal_id?: number;
  slug: string;
  title: string;
  status: string;
};

type ItemHint = {
  deal_id: number;
  slug: string;
  label: string;
  status: string;
  section?: string | null;
};

export function lockerNextPlay(input: {
  onboardingComplete: boolean;
  followedStates?: string[];
  deals: DealHint[];
  checklists: ChecklistHint[];
  outstanding: ItemHint[];
}): NextPlay {
  if (!input.onboardingComplete) {
    return {
      title: "Build your developer profile.",
      body: "A short profile makes Equipment, letters, and QB Access more useful. You can skip optional fields.",
      cta: "Open profile",
      to: "/hq/onboarding",
    };
  }
  if (input.followedStates !== undefined && input.followedStates.length === 0) {
    return {
      title: "Choose the three states to monitor.",
      body: "Field Pass watches QAP, scoring, application, and deadline changes for up to three states. Save those choices to your account.",
      cta: "Choose states",
      to: "/hq/onboarding",
    };
  }
  if (!input.deals.length) {
    return {
      title: "Add your first deal.",
      body: "Deal Profiles are the connective tissue. Enter what you know; leave the rest blank.",
      cta: "Add a deal",
      to: "/hq/deals?new=1",
    };
  }
  const awarded = input.deals.find((d) => d.stage === "Awarded");
  if (awarded) {
    const hasPost = input.checklists.some(
      (c) => (c.deal_id ?? awarded.id) === awarded.id && c.slug === "post-award",
    );
    if (!hasPost) {
      return {
        title: "Open the Post-Award Checklist.",
        body: `${awarded.name} is marked Awarded. Track closing and compliance items against the applicable QAP and counsel.`,
        cta: "Open next play",
        to: `/hq/equipment?deal=${awarded.id}&resource=post-award`,
      };
    }
  }
  const env = input.outstanding.find(
    (i) =>
      /env/i.test(i.label) ||
      i.section === "Site" ||
      i.label.toLowerCase().includes("environmental"),
  );
  const dealForEnv = env
    ? input.deals.find((d) => d.id === env.deal_id)
    : undefined;
  if (env && dealForEnv && /pre-application|site controlled|evaluating/i.test(dealForEnv.stage)) {
    return {
      title: "Complete remaining environmental items before application submission.",
      body: `${dealForEnv.name}: ${env.label}. Confirm current requirements against the applicable QAP, HFA guidance, lender, investor, and counsel requirements.`,
      cta: "Open next play",
      to: `/hq/equipment?deal=${dealForEnv.id}&resource=${env.slug}`,
    };
  }
  const first = input.outstanding[0];
  if (first) {
    const deal = input.deals.find((d) => d.id === first.deal_id) ?? input.deals[0];
    return {
      title: first.label,
      body: `Outstanding on ${deal.name}. This is an obvious incomplete item from your checklist — not a legal determination of what is required.`,
      cta: "Open next play",
      to: `/hq/equipment?deal=${deal.id}&resource=${first.slug}`,
    };
  }
  const deal = input.deals[0];
  return {
    title: deal.next_milestone
      ? `Next milestone: ${deal.next_milestone}`
      : `Keep ${deal.name} moving.`,
    body: "Work the pre-application checklist, Letter Builder, or Ask the QB. Confirm current requirements against the applicable QAP, HFA guidance, lender, investor, and counsel requirements.",
    cta: "Open next play",
    to: `/hq/equipment?deal=${deal.id}&resource=pre-application`,
  };
}

export function dealNextPlay(
  deal: DealHint,
  checklists: ChecklistHint[],
  outstanding: ItemHint[],
): NextPlay {
  return lockerNextPlay({
    onboardingComplete: true,
    deals: [deal],
    checklists,
    outstanding,
  });
}
