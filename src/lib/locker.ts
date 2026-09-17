import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { CHECKLISTS } from "@/lib/checklists";
import { MODEL_STATUSES } from "@/lib/deal-fields";
import { getSql } from "@/lib/db";
import { entitlementsFor, remaining } from "@/lib/entitlements";
import { lockerNextPlay } from "@/lib/next-play";

async function companyIdFor(userId: string) {
  const sql = await getSql();
  const rows = await sql.query<{ company_id: number }>(
    `select company_id from company_members where user_id = $1 order by created_at asc limit 1`,
    [userId],
  );
  return rows[0]?.company_id ?? null;
}

async function dealVisible(userId: string, dealId: number) {
  const sql = await getSql();
  const rows = await sql.query<{ id: number }>(
    `select d.id from deals d
     where d.id = $2 and (
       d.user_id = $1
       or (
         d.company_id is not null
         and exists (
           select 1 from company_members cm
           where cm.company_id = d.company_id and cm.user_id = $1
         )
       )
     )`,
    [userId, dealId],
  );
  return Boolean(rows[0]);
}

async function isAdminUser(userId: string) {
  const sql = await getSql();
  const rows = await sql.query<{ is_admin: boolean }>(
    `select is_admin from hq_members where user_id = $1`,
    [userId],
  );
  return Boolean(rows[0]?.is_admin);
}

async function notify(
  userId: string,
  kind: string,
  title: string,
  body: string,
  href?: string,
) {
  const sql = await getSql();
  const prefs = await sql.query<{ notify_nonessential: boolean }>(
    `select notify_nonessential from hq_members where user_id = $1`,
    [userId],
  );
  const essential = ["model_delivered", "model_info", "billing", "verify"].includes(
    kind,
  );
  if (!essential && prefs[0] && prefs[0].notify_nonessential === false) return;
  await sql.query(
    `insert into locker_notifications (user_id, kind, title, body, href)
     values ($1,$2,$3,$4,$5)`,
    [userId, kind, title, body, href ?? null],
  );
}

export const getLockerSession = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const users = await sql.query<{
      email: string | null;
      emailVerified: boolean;
      name: string | null;
    }>(
      `select email, "emailVerified" as "emailVerified", name from "user" where id = $1`,
      [context.userId],
    );
    const members = await sql.query<{
      is_admin: boolean;
      onboarding_complete: boolean;
      first_name: string | null;
      plan: string | null;
    }>(
      `select is_admin, onboarding_complete, first_name, plan from hq_members where user_id = $1`,
      [context.userId],
    );
    const user = users[0];
    const member = members[0];
    return {
      isAdmin: Boolean(member?.is_admin),
      emailVerified: Boolean(user?.emailVerified),
      email: user?.email ?? null,
      onboardingComplete: Boolean(member?.onboarding_complete),
      firstName: member?.first_name || user?.name?.split(" ")[0] || null,
      plan: member?.plan ?? null,
    };
  });

export const getLockerHome = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const userId = context.userId;
    const users = await sql.query<{
      name: string | null;
      email: string | null;
      emailVerified: boolean;
    }>(`select name, email, "emailVerified" as "emailVerified" from "user" where id = $1`, [
      userId,
    ]);
    const user = users[0];
    const members = await sql.query<{
      plan: string | null;
      consult_allowance: number;
      consult_used: number;
      questions_used: number;
      renewal_date: string | null;
      is_admin: boolean;
      company: string | null;
      onboarding_complete: boolean;
      first_name: string | null;
      last_name: string | null;
      notify_nonessential: boolean;
    }>(
      `select plan, consult_allowance, consult_used, questions_used, renewal_date, is_admin,
              company, onboarding_complete, first_name, last_name, notify_nonessential
       from hq_members where user_id = $1`,
      [userId],
    );
    let member = members[0];
    if (!member) {
      const first = user?.name?.split(" ")[0] ?? null;
      const lastFromName = user?.name?.split(" ").slice(1).join(" ") || null;
      await sql.query(
        `insert into hq_members (user_id, is_admin, consult_allowance, first_name, last_name)
         values ($1, false, 0, $2, $3)
         on conflict (user_id) do nothing`,
        [userId, first, lastFromName],
      );
      const again = await sql.query<typeof member>(
        `select plan, consult_allowance, consult_used, questions_used, renewal_date, is_admin,
                company, onboarding_complete, first_name, last_name, notify_nonessential
         from hq_members where user_id = $1`,
        [userId],
      );
      member = again[0];
    }
    const entitlements = entitlementsFor(member?.plan);
    const deals = await sql.query<{
      id: number;
      name: string;
      city: string | null;
      state: string | null;
      deal_type: string | null;
      stage: string;
      next_milestone: string | null;
    }>(
      `select d.id, d.name, d.city, d.state, d.deal_type, d.stage, d.next_milestone
       from deals d
       where d.archived = false and (
         d.user_id = $1
         or (
           d.company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = d.company_id and cm.user_id = $1
           )
         )
       )
       order by d.updated_at desc limit 12`,
      [userId],
    );
    const progress = await sql.query<{
      deal_id: number;
      complete: number;
      countable: number;
    }>(
      `select c.deal_id,
              count(*) filter (where i.status = 'complete')::int as complete,
              count(*) filter (where i.status <> 'na')::int as countable
       from deal_checklists c
       join deal_checklist_items i on i.checklist_id = c.id
       join deals d on d.id = c.deal_id
       where d.user_id = $1 or (
         d.company_id is not null
         and exists (
           select 1 from company_members cm
           where cm.company_id = d.company_id and cm.user_id = $1
         )
       )
       group by c.deal_id`,
      [userId],
    );
    const progressByDeal: Record<number, number> = {};
    for (const row of progress) {
      progressByDeal[row.deal_id] =
        row.countable > 0 ? Math.round((row.complete / row.countable) * 100) : 0;
    }
    const documents = await sql.query<{
      id: number;
      name: string;
      doc_type: string;
      deal_id: number | null;
      created_at: string;
      format: string | null;
    }>(
      `select d.id, d.name, d.doc_type, d.deal_id, d.created_at, d.format
       from locker_documents d
       where d.archived = false and (
         d.user_id = $1
         or (
           d.company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = d.company_id and cm.user_id = $1
           )
         )
       )
       order by d.updated_at desc limit 8`,
      [userId],
    );
    const checklists = await sql.query<{
      id: number;
      title: string;
      status: string;
      slug: string;
      deal_id: number;
      updated_at: string;
    }>(
      `select c.id, c.title, c.status, c.slug, c.deal_id, c.updated_at
       from deal_checklists c
       join deals d on d.id = c.deal_id
       where d.archived = false and (
         d.user_id = $1
         or (
           d.company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = d.company_id and cm.user_id = $1
           )
         )
       )
       order by c.updated_at desc limit 8`,
      [userId],
    );
    const outstanding = await sql.query<{
      deal_id: number;
      slug: string;
      label: string;
      status: string;
      section: string | null;
    }>(
      `select c.deal_id, c.slug, i.label, i.status, i.section
       from deal_checklist_items i
       join deal_checklists c on c.id = i.checklist_id
       join deals d on d.id = c.deal_id
       where i.status in ('not_started', 'in_progress')
         and (
           d.user_id = $1
           or (
             d.company_id is not null
             and exists (
               select 1 from company_members cm
               where cm.company_id = d.company_id and cm.user_id = $1
             )
           )
         )
       order by i.id
       limit 12`,
      [userId],
    );
    const questions = await sql.query<{
      id: number;
      body: string;
      status: string;
      created_at: string;
    }>(
      `select id, body, status, created_at from hq_questions
       where user_id = $1 order by id desc limit 5`,
      [userId],
    );
    const huddles = await sql.query<{
      id: number;
      question: string;
      status: string;
      scheduled_at: string | null;
      created_at: string;
    }>(
      `select id, question, status, scheduled_at, created_at from hq_huddles
       where user_id = $1 order by id desc limit 5`,
      [userId],
    );
    const models = await sql.query<{
      id: number;
      status: string;
      deal_id: number | null;
      updated_at: string;
    }>(
      `select id, status, deal_id, updated_at from model_requests
       where user_id = $1
          or (
            company_id is not null
            and exists (
              select 1 from company_members cm
              where cm.company_id = model_requests.company_id and cm.user_id = $1
            )
          )
       order by updated_at desc limit 5`,
      [userId],
    );
    const notifications = await sql.query<{
      id: number;
      kind: string;
      title: string;
      body: string | null;
      href: string | null;
      read_at: string | null;
      created_at: string;
    }>(
      `select id, kind, title, body, href, read_at, created_at
       from locker_notifications where user_id = $1
       order by created_at desc limit 8`,
      [userId],
    );
    const questionUsed =
      (
        await sql.query<{ n: number }>(
          `select count(*)::int as n from hq_questions where user_id = $1
           and created_at >= date_trunc('month', now())`,
          [userId],
        )
      )[0]?.n ?? 0;
    const huddleUsed = member?.consult_used ?? 0;
    const firstName =
      member?.first_name || user?.name?.split(" ")[0] || "there";
    const dealsWithProgress = deals.map((d) => ({
      ...d,
      progress: progressByDeal[d.id] ?? null,
    }));
    const nextPlay = lockerNextPlay({
      onboardingComplete: Boolean(member?.onboarding_complete),
      deals: dealsWithProgress,
      checklists,
      outstanding,
    });
    return {
      firstName,
      email: user?.email ?? null,
      emailVerified: Boolean(user?.emailVerified),
      onboardingComplete: Boolean(member?.onboarding_complete),
      isAdmin: Boolean(member?.is_admin),
      entitlements,
      usage: {
        questionsUsed: questionUsed,
        questionsRemaining: remaining(questionUsed, entitlements.askQuestionsPerMonth),
        huddlesUsed: huddleUsed,
        huddlesRemaining: remaining(huddleUsed, entitlements.huddleSessionsPerMonth),
        renewalDate: member?.renewal_date ?? null,
        plan: member?.plan ?? null,
      },
      nextPlay,
      deals: dealsWithProgress,
      documents,
      checklists,
      questions,
      huddles,
      models,
      notifications,
    };
  });

export const saveDeveloperProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      firstName?: string;
      lastName?: string;
      companyName?: string;
      website?: string;
      address?: string;
      city?: string;
      state?: string;
      phone?: string;
      email?: string;
      statesActive?: string;
      developmentsCompleted?: string;
      unitsDeveloped?: string;
      experience?: string[];
      skip?: boolean;
    }) => data,
  )
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const userId = context.userId;
    await sql.query(
      `insert into hq_members (user_id, consult_allowance, first_name, last_name, phone, onboarding_complete, company)
       values ($1, 0, $2, $3, $4, true, $5)
       on conflict (user_id) do update set
         first_name = coalesce(excluded.first_name, hq_members.first_name),
         last_name = coalesce(excluded.last_name, hq_members.last_name),
         phone = coalesce(excluded.phone, hq_members.phone),
         company = coalesce(excluded.company, hq_members.company),
         onboarding_complete = true`,
      [
        userId,
        data.firstName?.trim() || null,
        data.lastName?.trim() || null,
        data.phone?.trim() || null,
        data.companyName?.trim() || null,
      ],
    );
    if (data.skip) return { ok: true as const };
    let companyId = await companyIdFor(userId);
    if (data.companyName?.trim()) {
      if (companyId) {
        await sql.query(
          `update companies set name = $2, website = $3, address = $4, city = $5, state = $6, phone = $7, email = $8
           where id = $1`,
          [
            companyId,
            data.companyName.trim(),
            data.website?.trim() || null,
            data.address?.trim() || null,
            data.city?.trim() || null,
            data.state?.trim() || null,
            data.phone?.trim() || null,
            data.email?.trim() || null,
          ],
        );
      } else {
        const created = await sql.query<{ id: number }>(
          `insert into companies (name, website, address, city, state, phone, email, created_by)
           values ($1,$2,$3,$4,$5,$6,$7,$8) returning id`,
          [
            data.companyName.trim(),
            data.website?.trim() || null,
            data.address?.trim() || null,
            data.city?.trim() || null,
            data.state?.trim() || null,
            data.phone?.trim() || null,
            data.email?.trim() || null,
            userId,
          ],
        );
        companyId = created[0]?.id ?? null;
        if (companyId) {
          await sql.query(
            `insert into company_members (company_id, user_id, role)
             values ($1, $2, 'owner') on conflict do nothing`,
            [companyId, userId],
          );
        }
      }
    }
    await sql.query(
      `insert into developer_profiles (user_id, company_id, states_active, developments_completed, units_developed, experience)
       values ($1,$2,$3,$4,$5,$6)
       on conflict (user_id) do update set
         company_id = excluded.company_id,
         states_active = excluded.states_active,
         developments_completed = excluded.developments_completed,
         units_developed = excluded.units_developed,
         experience = excluded.experience,
         updated_at = now()`,
      [
        userId,
        companyId,
        data.statesActive?.trim() || null,
        data.developmentsCompleted?.trim() || null,
        data.unitsDeveloped?.trim() || null,
        (data.experience ?? []).join(","),
      ],
    );
    return { ok: true as const };
  });

export const listDeals = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql.query<{
      id: number;
      name: string;
      city: string | null;
      state: string | null;
      deal_type: string | null;
      stage: string;
      unit_count: string | null;
      next_milestone: string | null;
    }>(
      `select d.id, d.name, d.city, d.state, d.deal_type, d.stage, d.unit_count, d.next_milestone
       from deals d
       where d.archived = false and (
         d.user_id = $1
         or (
           d.company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = d.company_id and cm.user_id = $1
           )
         )
       )
       order by d.updated_at desc`,
      [context.userId],
    );
  });

export type DealRow = {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  county: string | null;
  hfa: string | null;
  deal_type: string | null;
  unit_count: string | null;
  stage: string;
  programs: string | null;
  ami_set_asides: string | null;
  next_milestone: string | null;
  application_due: string | null;
  expected_award: string | null;
  award_date: string | null;
  expected_closing: string | null;
  expected_construction_start: string | null;
  expected_completion: string | null;
  placed_in_service: string | null;
};

export const getDeal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    if (!(await dealVisible(context.userId, data.id))) {
      return {
        deal: null,
        checklists: [],
        documents: [],
        models: [],
        outstanding: [],
        questions: [],
        huddles: [],
      };
    }
    const rows = await sql.query<DealRow>(
      `select id, name, address, city, state, county, hfa, deal_type, unit_count, stage,
              programs, ami_set_asides, next_milestone,
              application_due, expected_award, award_date, expected_closing,
              expected_construction_start, expected_completion, placed_in_service
       from deals where id = $1`,
      [data.id],
    );
    const deal = rows[0] ?? null;
    if (!deal) {
      return {
        deal: null,
        checklists: [],
        documents: [],
        models: [],
        outstanding: [],
        questions: [],
        huddles: [],
      };
    }
    const checklists = await sql.query<{
      id: number;
      slug: string;
      title: string;
      status: string;
    }>(`select id, slug, title, status from deal_checklists where deal_id = $1`, [
      data.id,
    ]);
    const documents = await sql.query<{
      id: number;
      name: string;
      doc_type: string;
      created_at: string;
    }>(
      `select id, name, doc_type, created_at from locker_documents
       where deal_id = $1 and archived = false order by updated_at desc`,
      [data.id],
    );
    const models = await sql.query<{
      id: number;
      status: string;
      updated_at: string;
      submitted_at: string | null;
    }>(
      `select id, status, updated_at, submitted_at from model_requests where deal_id = $1 order by id desc`,
      [data.id],
    );
    const outstanding = await sql.query<{
      deal_id: number;
      slug: string;
      label: string;
      status: string;
      section: string | null;
    }>(
      `select c.deal_id, c.slug, i.label, i.status, i.section
       from deal_checklist_items i
       join deal_checklists c on c.id = i.checklist_id
       where c.deal_id = $1 and i.status in ('not_started', 'in_progress')
       order by i.id limit 12`,
      [data.id],
    );
    const questions = await sql.query<{
      id: number;
      body: string;
      status: string;
      created_at: string;
    }>(
      `select id, body, status, created_at from hq_questions
       where deal_id = $1 and user_id = $2 order by id desc limit 8`,
      [data.id, context.userId],
    );
    const huddles = await sql.query<{
      id: number;
      question: string;
      status: string;
      scheduled_at: string | null;
      created_at: string;
    }>(
      `select id, question, status, scheduled_at, created_at from hq_huddles
       where deal_id = $1 and user_id = $2 order by id desc limit 8`,
      [data.id, context.userId],
    );
    return { deal, checklists, documents, models, outstanding, questions, huddles };
  });

export const saveDeal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: Record<string, string | number | undefined | null>) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const name = String(data.name ?? "").trim();
    if (!name) return { ok: false as const, error: "Project name is required." };
    const companyId = await companyIdFor(context.userId);
    const dateField = (v: unknown) => {
      const s = String(v ?? "").trim();
      return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null;
    };
    const fields = {
      name,
      address: String(data.address ?? "").trim() || null,
      city: String(data.city ?? "").trim() || null,
      state: String(data.state ?? "").trim() || null,
      county: String(data.county ?? "").trim() || null,
      hfa: String(data.hfa ?? "").trim() || null,
      deal_type: String(data.deal_type ?? "").trim() || null,
      unit_count: String(data.unit_count ?? "").trim() || null,
      stage: String(data.stage ?? "").trim() || "Evaluating Site",
      programs: String(data.programs ?? "").trim() || null,
      ami_set_asides: String(data.ami_set_asides ?? "").trim() || null,
      next_milestone: String(data.next_milestone ?? "").trim() || null,
      application_due: dateField(data.application_due),
      expected_award: dateField(data.expected_award),
      award_date: dateField(data.award_date),
      expected_closing: dateField(data.expected_closing),
      expected_construction_start: dateField(data.expected_construction_start),
      expected_completion: dateField(data.expected_completion),
      placed_in_service: dateField(data.placed_in_service),
    };
    const id = Number(data.id) || 0;
    if (id) {
      if (!(await dealVisible(context.userId, id))) {
        return { ok: false as const, error: "Deal not found." };
      }
      await sql.query(
        `update deals set name=$2, address=$3, city=$4, state=$5, county=$6, hfa=$7,
         deal_type=$8, unit_count=$9, stage=$10, programs=$11, ami_set_asides=$12,
         next_milestone=$13, application_due=$14, expected_award=$15, award_date=$16,
         expected_closing=$17, expected_construction_start=$18, expected_completion=$19,
         placed_in_service=$20, updated_at=now()
         where id=$1`,
        [
          id,
          fields.name,
          fields.address,
          fields.city,
          fields.state,
          fields.county,
          fields.hfa,
          fields.deal_type,
          fields.unit_count,
          fields.stage,
          fields.programs,
          fields.ami_set_asides,
          fields.next_milestone,
          fields.application_due,
          fields.expected_award,
          fields.award_date,
          fields.expected_closing,
          fields.expected_construction_start,
          fields.expected_completion,
          fields.placed_in_service,
        ],
      );
      return { ok: true as const, id };
    }
    const created = await sql.query<{ id: number }>(
      `insert into deals (user_id, company_id, name, address, city, state, county, hfa,
        deal_type, unit_count, stage, programs, ami_set_asides, next_milestone,
        application_due, expected_award, award_date, expected_closing,
        expected_construction_start, expected_completion, placed_in_service)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
       returning id`,
      [
        context.userId,
        companyId,
        fields.name,
        fields.address,
        fields.city,
        fields.state,
        fields.county,
        fields.hfa,
        fields.deal_type,
        fields.unit_count,
        fields.stage,
        fields.programs,
        fields.ami_set_asides,
        fields.next_milestone,
        fields.application_due,
        fields.expected_award,
        fields.award_date,
        fields.expected_closing,
        fields.expected_construction_start,
        fields.expected_completion,
        fields.placed_in_service,
      ],
    );
    return { ok: true as const, id: created[0]?.id };
  });

export const getOrCreateChecklist = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { dealId: number; slug: string }) => ({
    dealId: Number(data.dealId),
    slug: data.slug.trim(),
  }))
  .handler(async ({ context, data }) => {
    if (!(await dealVisible(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    const sql = await getSql();
    const member = await sql.query<{ plan: string | null }>(
      `select plan from hq_members where user_id = $1`,
      [context.userId],
    );
    if (!entitlementsFor(member[0]?.plan).premiumEquipment) {
      return {
        ok: false as const,
        error: "This Equipment is included with The Playbook.",
        gated: true as const,
      };
    }
    const template = CHECKLISTS.find((c) => c.slug === data.slug);
    if (!template) return { ok: false as const, error: "Unknown checklist." };
    let rows = await sql.query<{ id: number; status: string }>(
      `select id, status from deal_checklists where deal_id = $1 and slug = $2`,
      [data.dealId, data.slug],
    );
    let checklistId = rows[0]?.id;
    if (!checklistId) {
      const created = await sql.query<{ id: number }>(
        `insert into deal_checklists (deal_id, user_id, slug, title, status)
         values ($1,$2,$3,$4,'in_progress') returning id`,
        [data.dealId, context.userId, template.slug, template.title],
      );
      checklistId = created[0]?.id;
      if (!checklistId) return { ok: false as const, error: "Could not create checklist." };
      for (const section of template.sections) {
        for (const item of section.items) {
          await sql.query(
            `insert into deal_checklist_items (checklist_id, item_key, label, section, status)
             values ($1,$2,$3,$4,'not_started') on conflict do nothing`,
            [checklistId, item.key, item.label, section.name],
          );
        }
      }
    }
    const items = await sql.query<{
      id: number;
      item_key: string;
      label: string;
      section: string | null;
      status: string;
      responsible: string | null;
      due_date: string | null;
      notes: string | null;
    }>(
      `select id, item_key, label, section, status, responsible, due_date, notes
       from deal_checklist_items where checklist_id = $1 order by id`,
      [checklistId],
    );
    return { ok: true as const, checklistId, title: template.title, items };
  });

export const setChecklistItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      itemId: number;
      status: string;
      notes?: string;
      responsible?: string;
      dueDate?: string;
    }) => ({
      itemId: Number(data.itemId),
      status: data.status,
      notes: data.notes?.trim() || null,
      responsible: data.responsible?.trim() || null,
      dueDate: data.dueDate?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    const allowed = ["not_started", "in_progress", "complete", "na"];
    if (!allowed.includes(data.status)) {
      return { ok: false as const, error: "Unknown status." };
    }
    const sql = await getSql();
    const owned = await sql.query<{ id: number }>(
      `select i.id from deal_checklist_items i
       join deal_checklists c on c.id = i.checklist_id
       join deals d on d.id = c.deal_id
       where i.id = $1 and (
         d.user_id = $2
         or (
           d.company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = d.company_id and cm.user_id = $2
           )
         )
       )`,
      [data.itemId, context.userId],
    );
    if (!owned[0]) return { ok: false as const, error: "Item not found." };
    await sql.query(
      `update deal_checklist_items set status = $2, notes = coalesce($3, notes),
       responsible = coalesce($4, responsible), due_date = coalesce($5, due_date),
       updated_at = now() where id = $1`,
      [data.itemId, data.status, data.notes, data.responsible, data.dueDate],
    );
    const parent = await sql.query<{ id: number }>(
      `select checklist_id as id from deal_checklist_items where id = $1`,
      [data.itemId],
    );
    if (parent[0]) {
      const stats = await sql.query<{ complete: number; countable: number }>(
        `select count(*) filter (where status = 'complete')::int as complete,
                count(*) filter (where status <> 'na')::int as countable
         from deal_checklist_items where checklist_id = $1`,
        [parent[0].id],
      );
      const st = stats[0];
      const status =
        st && st.countable > 0 && st.complete >= st.countable
          ? "complete"
          : "in_progress";
      await sql.query(`update deal_checklists set status = $2, updated_at = now() where id = $1`, [
        parent[0].id,
        status,
      ]);
    }
    return { ok: true as const };
  });

export const saveLetter = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: { dealId: number; letterType: string; name: string; body: string }) => ({
      dealId: Number(data.dealId),
      letterType: data.letterType.trim(),
      name: data.name.trim(),
      body: data.body,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await dealVisible(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    if (!data.name || !data.body.trim()) {
      return { ok: false as const, error: "Letter needs a name and body." };
    }
    const sql = await getSql();
    const member = await sql.query<{ plan: string | null }>(
      `select plan from hq_members where user_id = $1`,
      [context.userId],
    );
    if (!entitlementsFor(member[0]?.plan).premiumEquipment) {
      return {
        ok: false as const,
        error: "This Equipment is included with The Playbook.",
        gated: true as const,
      };
    }
    const companyId = await companyIdFor(context.userId);
    const created = await sql.query<{ id: number }>(
      `insert into locker_documents (user_id, company_id, deal_id, name, doc_type, format, body, equipment_slug)
       values ($1,$2,$3,$4,'letter','doc',$5,'letter-builder') returning id`,
      [context.userId, companyId, data.dealId, data.name, data.body],
    );
    await notify(
      context.userId,
      "document",
      "Letter saved",
      data.name,
      "/hq/documents",
    );
    return { ok: true as const, id: created[0]?.id };
  });

export const listDocuments = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql.query<{
      id: number;
      name: string;
      doc_type: string;
      format: string | null;
      deal_id: number | null;
      deal_name: string | null;
      created_at: string;
      updated_at: string;
      body: string | null;
    }>(
      `select d.id, d.name, d.doc_type, d.format, d.deal_id, p.name as deal_name,
              d.created_at, d.updated_at, d.body
       from locker_documents d
       left join deals p on p.id = d.deal_id
       where d.archived = false and (
         d.user_id = $1
         or (
           d.company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = d.company_id and cm.user_id = $1
           )
         )
       )
       order by d.updated_at desc`,
      [context.userId],
    );
  });

export const archiveDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `update locker_documents set archived = true, updated_at = now()
       where id = $1 and (
         user_id = $2
         or (
           company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = locker_documents.company_id and cm.user_id = $2
           )
         )
       )`,
      [data.id, context.userId],
    );
    return { ok: true as const };
  });

export const duplicateDocument = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql.query<{
      id: number;
      user_id: string;
      company_id: number | null;
      deal_id: number | null;
      name: string;
      doc_type: string;
      format: string | null;
      body: string | null;
      equipment_slug: string | null;
    }>(
      `select id, user_id, company_id, deal_id, name, doc_type, format, body, equipment_slug
       from locker_documents where id = $1 and archived = false`,
      [data.id],
    );
    const doc = rows[0];
    if (!doc) return { ok: false as const, error: "Document not found." };
    if (doc.deal_id && !(await dealVisible(context.userId, doc.deal_id))) {
      return { ok: false as const, error: "Document not found." };
    }
    if (doc.user_id !== context.userId && !doc.company_id) {
      return { ok: false as const, error: "Document not found." };
    }
    const created = await sql.query<{ id: number }>(
      `insert into locker_documents (user_id, company_id, deal_id, name, doc_type, format, body, equipment_slug, parent_id)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id`,
      [
        context.userId,
        doc.company_id,
        doc.deal_id,
        `${doc.name} (copy)`,
        doc.doc_type,
        doc.format,
        doc.body,
        doc.equipment_slug,
        doc.id,
      ],
    );
    return { ok: true as const, id: created[0]?.id };
  });

export const saveModelRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      id?: number;
      dealId: number;
      intake: Record<string, string>;
      submit?: boolean;
    }) => ({
      id: data.id ? Number(data.id) : undefined,
      dealId: Number(data.dealId),
      intake: data.intake,
      submit: Boolean(data.submit),
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await dealVisible(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    const sql = await getSql();
    const companyId = await companyIdFor(context.userId);
    const status = data.submit ? "submitted" : "draft";
    const payload = JSON.stringify(data.intake);
    if (data.id) {
      const owned = await sql.query<{ id: number; status: string }>(
        `select id, status from model_requests where id = $1 and user_id = $2`,
        [data.id, context.userId],
      );
      if (!owned[0]) return { ok: false as const, error: "Request not found." };
      if (owned[0].status === "delivered") {
        return {
          ok: false as const,
          error: "Delivered models are not overwritten. Start a revision request instead.",
        };
      }
      await sql.query(
        `update model_requests set intake = $2::jsonb, status = $3,
         submitted_at = case when $3 = 'submitted' then now() else submitted_at end,
         updated_at = now() where id = $1`,
        [data.id, payload, status],
      );
      if (data.submit) {
        await notify(
          context.userId,
          "model_submitted",
          "Model request submitted",
          "Tax Credit QB received your Alkaline Advisors intake.",
          "/hq/modeling",
        );
      }
      return { ok: true as const, id: data.id };
    }
    const created = await sql.query<{ id: number }>(
      `insert into model_requests (user_id, company_id, deal_id, status, intake, submitted_at)
       values ($1,$2,$3,$4,$5::jsonb, case when $4 = 'submitted' then now() else null end)
       returning id`,
      [context.userId, companyId, data.dealId, status, payload],
    );
    if (data.submit) {
      await notify(
        context.userId,
        "model_submitted",
        "Model request submitted",
        "Tax Credit QB received your Alkaline Advisors intake.",
        "/hq/modeling",
      );
    }
    return { ok: true as const, id: created[0]?.id };
  });

export const listModelRequests = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql.query<{
      id: number;
      deal_id: number | null;
      status: string;
      submitted_at: string | null;
      updated_at: string;
      customer_notes: string | null;
      customer_visible_notes: string | null;
    }>(
      `select id, deal_id, status, submitted_at, updated_at, customer_notes, customer_visible_notes
       from model_requests
       where user_id = $1
          or (
            company_id is not null
            and exists (
              select 1 from company_members cm
              where cm.company_id = model_requests.company_id and cm.user_id = $1
            )
          )
       order by updated_at desc`,
      [context.userId],
    );
  });

export const getModelRequest = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql.query<{
      id: number;
      deal_id: number | null;
      status: string;
      intake: Record<string, string> | null;
      submitted_at: string | null;
      updated_at: string;
      customer_notes: string | null;
      customer_visible_notes: string | null;
    }>(
      `select id, deal_id, status, intake, submitted_at, updated_at, customer_notes, customer_visible_notes
       from model_requests where id = $1 and (
         user_id = $2
         or (
           company_id is not null
           and exists (
             select 1 from company_members cm
             where cm.company_id = model_requests.company_id and cm.user_id = $2
           )
         )
       )`,
      [data.id, context.userId],
    );
    const row = rows[0];
    if (!row) return { request: null, files: [] };
    const files = await sql.query<{
      id: number;
      name: string;
      file_type: string | null;
      version: number;
      created_at: string;
    }>(
      `select id, name, file_type, version, created_at from locker_files
       where model_request_id = $1
         and (
           user_id = $2
           or (
             company_id is not null
             and exists (
               select 1 from company_members cm
               where cm.company_id = locker_files.company_id and cm.user_id = $2
             )
           )
         )
       order by version desc, id desc`,
      [data.id, context.userId],
    );
    return { request: row, files };
  });

export const getAccountProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const member = await sql.query<{
      first_name: string | null;
      last_name: string | null;
      phone: string | null;
      company: string | null;
      plan: string | null;
      notify_nonessential: boolean;
    }>(
      `select first_name, last_name, phone, company, plan, notify_nonessential from hq_members where user_id = $1`,
      [context.userId],
    );
    const profile = await sql.query<{
      states_active: string | null;
      developments_completed: string | null;
      units_developed: string | null;
      experience: string | null;
      company_id: number | null;
    }>(
      `select states_active, developments_completed, units_developed, experience, company_id
       from developer_profiles where user_id = $1`,
      [context.userId],
    );
    const company = profile[0]?.company_id
      ? (
          await sql.query<{
            name: string;
            website: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            phone: string | null;
            email: string | null;
          }>(
            `select name, website, address, city, state, phone, email from companies where id = $1`,
            [profile[0].company_id],
          )
        )[0]
      : null;
    const user = await sql.query<{
      email: string | null;
      name: string | null;
      emailVerified: boolean;
    }>(
      `select email, name, "emailVerified" as "emailVerified" from "user" where id = $1`,
      [context.userId],
    );
    const companyId = profile[0]?.company_id ?? null;
    const companyMembers = companyId
      ? await sql.query<{
          user_id: string;
          role: string;
          email: string | null;
          name: string | null;
        }>(
          `select cm.user_id, cm.role, u.email, u.name
           from company_members cm
           left join "user" u on u.id = cm.user_id
           where cm.company_id = $1
           order by cm.created_at`,
          [companyId],
        )
      : [];
    return {
      member: member[0] ?? null,
      profile: profile[0] ?? null,
      company,
      companyMembers,
      email: user[0]?.email ?? null,
      name: user[0]?.name ?? null,
      emailVerified: Boolean(user[0]?.emailVerified),
    };
  });

export const persistSignupName = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { firstName?: string; lastName?: string }) => ({
    firstName: data.firstName?.trim() || null,
    lastName: data.lastName?.trim() || null,
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `insert into hq_members (user_id, consult_allowance, first_name, last_name)
       values ($1, 0, $2, $3)
       on conflict (user_id) do update set
         first_name = coalesce(excluded.first_name, hq_members.first_name),
         last_name = coalesce(excluded.last_name, hq_members.last_name)`,
      [context.userId, data.firstName, data.lastName],
    );
    return { ok: true as const };
  });

export const savePresentationBrief = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { dealId: number }) => ({ dealId: Number(data.dealId) }))
  .handler(async ({ context, data }) => {
    if (!(await dealVisible(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    const sql = await getSql();
    const rows = await sql.query<DealRow>(
      `select id, name, address, city, state, county, hfa, deal_type, unit_count, stage,
              programs, ami_set_asides, next_milestone,
              application_due, expected_award, award_date, expected_closing,
              expected_construction_start, expected_completion, placed_in_service
       from deals where id = $1`,
      [data.dealId],
    );
    const deal = rows[0];
    if (!deal) return { ok: false as const, error: "Deal not found." };
    const companyId = await companyIdFor(context.userId);
    const body = [
      `Presentation Builder brief`,
      `Project: ${deal.name}`,
      `Location: ${[deal.city, deal.state].filter(Boolean).join(", ") || "TBD"}`,
      deal.address ? `Site: ${deal.address}` : null,
      deal.deal_type ? `Deal type: ${deal.deal_type}` : null,
      deal.unit_count ? `Units: ${deal.unit_count}` : null,
      `Stage: ${deal.stage}`,
      deal.hfa ? `HFA: ${deal.hfa}` : null,
      deal.next_milestone ? `Next milestone: ${deal.next_milestone}` : null,
      "",
      "This brief reuses Deal Profile facts for a presentation assignment. It is not a finished deck.",
    ]
      .filter((line) => line !== null)
      .join("\n");
    const created = await sql.query<{ id: number }>(
      `insert into locker_documents (user_id, company_id, deal_id, name, doc_type, format, body, equipment_slug)
       values ($1,$2,$3,$4,'presentation','txt',$5,'presentation-builder') returning id`,
      [context.userId, companyId, deal.id, `Presentation brief — ${deal.name}`, body],
    );
    await notify(
      context.userId,
      "document",
      "Presentation brief saved",
      deal.name,
      "/hq/documents",
    );
    return { ok: true as const, id: created[0]?.id };
  });

export const saveAccountPrefs = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { notifyNonessential: boolean }) => ({
    notifyNonessential: Boolean(data.notifyNonessential),
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `insert into hq_members (user_id, consult_allowance, notify_nonessential)
       values ($1, 0, $2)
       on conflict (user_id) do update set notify_nonessential = excluded.notify_nonessential`,
      [context.userId, data.notifyNonessential],
    );
    return { ok: true as const };
  });

export const markNotificationRead = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql.query(
      `update locker_notifications set read_at = now()
       where id = $1 and user_id = $2 and read_at is null`,
      [data.id, context.userId],
    );
    return { ok: true as const };
  });

export const listAdminModelRequests = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    if (!(await isAdminUser(context.userId))) return { admin: false as const, rows: [] };
    const sql = await getSql();
    const rows = await sql.query<{
      id: number;
      user_id: string;
      deal_id: number | null;
      status: string;
      submitted_at: string | null;
      updated_at: string;
      customer_notes: string | null;
      provider_notes_internal: string | null;
      customer_visible_notes: string | null;
      email: string | null;
      deal_name: string | null;
    }>(
      `select r.id, r.user_id, r.deal_id, r.status, r.submitted_at, r.updated_at,
              r.customer_notes, r.provider_notes_internal, r.customer_visible_notes,
              u.email, d.name as deal_name
       from model_requests r
       left join "user" u on u.id = r.user_id
       left join deals d on d.id = r.deal_id
       order by r.updated_at desc
       limit 80`,
    );
    return { admin: true as const, rows };
  });

export const setModelRequestStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      id: number;
      status: string;
      customerVisibleNotes?: string;
      internalNotes?: string;
    }) => ({
      id: Number(data.id),
      status: data.status.trim(),
      customerVisibleNotes: data.customerVisibleNotes?.trim() || null,
      internalNotes: data.internalNotes?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!MODEL_STATUSES.includes(data.status as (typeof MODEL_STATUSES)[number])) {
      return { ok: false as const, error: "Unknown status." };
    }
    const sql = await getSql();
    const owned = await sql.query<{ id: number; user_id: string; status: string }>(
      `select id, user_id, status from model_requests where id = $1`,
      [data.id],
    );
    const row = owned[0];
    if (!row) return { ok: false as const, error: "Request not found." };
    await sql.query(
      `update model_requests set status = $2,
         customer_visible_notes = coalesce($3, customer_visible_notes),
         provider_notes_internal = coalesce($4, provider_notes_internal),
         updated_at = now()
       where id = $1`,
      [data.id, data.status, data.customerVisibleNotes, data.internalNotes],
    );
    if (data.status === "delivered") {
      await notify(
        row.user_id,
        "model_delivered",
        "Financial model delivered",
        "A deliverable from Alkaline Advisors is available in My Locker.",
        "/hq/modeling",
      );
    }
    if (data.status === "information_needed") {
      await notify(
        row.user_id,
        "model_info",
        "Model information needed",
        data.customerVisibleNotes || "Additional information is needed to continue modeling.",
        "/hq/modeling",
      );
    }
    return { ok: true as const };
  });

export const deliverModelRecord = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: { requestId: number; name: string; fileType?: string }) => ({
      requestId: Number(data.requestId),
      name: data.name.trim(),
      fileType: data.fileType?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!data.name) return { ok: false as const, error: "File name is required." };
    const sql = await getSql();
    const rows = await sql.query<{
      id: number;
      user_id: string;
      company_id: number | null;
      deal_id: number | null;
    }>(`select id, user_id, company_id, deal_id from model_requests where id = $1`, [
      data.requestId,
    ]);
    const req = rows[0];
    if (!req) return { ok: false as const, error: "Request not found." };
    const versionRow = await sql.query<{ v: number }>(
      `select coalesce(max(version), 0)::int as v from locker_files where model_request_id = $1`,
      [data.requestId],
    );
    const version = (versionRow[0]?.v ?? 0) + 1;
    const doc = await sql.query<{ id: number }>(
      `insert into locker_documents (user_id, company_id, deal_id, name, doc_type, format, equipment_slug)
       values ($1,$2,$3,$4,'financial_model',$5,'custom-lihtc-model') returning id`,
      [req.user_id, req.company_id, req.deal_id, data.name, data.fileType],
    );
    await sql.query(
      `insert into locker_files (user_id, company_id, deal_id, model_request_id, document_id, name, file_type, resource_type, version)
       values ($1,$2,$3,$4,$5,$6,$7,'model_deliverable',$8)`,
      [
        req.user_id,
        req.company_id,
        req.deal_id,
        req.id,
        doc[0]?.id ?? null,
        data.name,
        data.fileType,
        version,
      ],
    );
    await sql.query(
      `update model_requests set status = 'delivered', updated_at = now() where id = $1`,
      [req.id],
    );
    await notify(
      req.user_id,
      "model_delivered",
      "Financial model delivered",
      `${data.name} (v${version}) is in My Documents. Prior versions are retained.`,
      "/hq/documents",
    );
    return { ok: true as const, version };
  });
