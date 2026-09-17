import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { CHECKLISTS } from "@/lib/checklists";
import { getSql } from "@/lib/db";
import { entitlementsFor, remaining } from "@/lib/entitlements";

async function companyIdFor(userId: string) {
  const sql = await getSql();
  const rows = await sql.query<{ company_id: number }>(
    `select company_id from company_members where user_id = $1 order by created_at asc limit 1`,
    [userId],
  );
  return rows[0]?.company_id ?? null;
}

async function dealOwned(userId: string, dealId: number) {
  const sql = await getSql();
  const rows = await sql.query<{ id: number }>(
    `select id from deals where id = $1 and user_id = $2`,
    [dealId, userId],
  );
  return Boolean(rows[0]);
}

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
    }>(
      `select plan, consult_allowance, consult_used, questions_used, renewal_date, is_admin,
              company, onboarding_complete, first_name, last_name
       from hq_members where user_id = $1`,
      [userId],
    );
    let member = members[0];
    if (!member) {
      const first = user?.name?.split(" ")[0] ?? null;
      await sql.query(
        `insert into hq_members (user_id, is_admin, consult_allowance, first_name)
         values ($1, false, 0, $2)
         on conflict (user_id) do nothing`,
        [userId, first],
      );
      const again = await sql.query<typeof member>(
        `select plan, consult_allowance, consult_used, questions_used, renewal_date, is_admin,
                company, onboarding_complete, first_name, last_name
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
      `select id, name, city, state, deal_type, stage, next_milestone
       from deals where user_id = $1 and archived = false order by updated_at desc limit 12`,
      [userId],
    );
    const documents = await sql.query<{
      id: number;
      name: string;
      doc_type: string;
      deal_id: number | null;
      created_at: string;
      format: string | null;
    }>(
      `select id, name, doc_type, deal_id, created_at, format
       from locker_documents where user_id = $1 and archived = false
       order by updated_at desc limit 8`,
      [userId],
    );
    const checklists = await sql.query<{
      id: number;
      title: string;
      status: string;
      deal_id: number;
      updated_at: string;
    }>(
      `select id, title, status, deal_id, updated_at from deal_checklists
       where user_id = $1 order by updated_at desc limit 8`,
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
       where user_id = $1 order by updated_at desc limit 5`,
      [userId],
    );
    const questionUsed = questions.length
      ? (
          await sql.query<{ n: number }>(
            `select count(*)::int as n from hq_questions where user_id = $1
             and created_at >= date_trunc('month', now())`,
            [userId],
          )
        )[0]?.n ?? 0
      : 0;
    const huddleUsed = member?.consult_used ?? 0;
    const firstName =
      member?.first_name || user?.name?.split(" ")[0] || "there";
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
      deals,
      documents,
      checklists,
      questions,
      huddles,
      models,
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
      `select id, name, city, state, deal_type, stage, unit_count, next_milestone
       from deals where user_id = $1 and archived = false order by updated_at desc`,
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
};

export const getDeal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number }) => ({ id: Number(data.id) }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql.query<DealRow>(
      `select id, name, address, city, state, county, hfa, deal_type, unit_count, stage,
              programs, ami_set_asides, next_milestone
       from deals where id = $1 and user_id = $2`,
      [data.id, context.userId],
    );
    const deal = rows[0] ?? null;
    if (!deal) return { deal: null, checklists: [], documents: [], models: [] };
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
       where deal_id = $1 and user_id = $2 and archived = false order by updated_at desc`,
      [data.id, context.userId],
    );
    const models = await sql.query<{
      id: number;
      status: string;
      updated_at: string;
    }>(
      `select id, status, updated_at from model_requests where deal_id = $1 and user_id = $2 order by id desc`,
      [data.id, context.userId],
    );
    return { deal, checklists, documents, models };
  });

export const saveDeal = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: Record<string, string | number | undefined | null>) => data)
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const name = String(data.name ?? "").trim();
    if (!name) return { ok: false as const, error: "Project name is required." };
    const companyId = await companyIdFor(context.userId);
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
      application_due: String(data.application_due ?? "").trim() || null,
      expected_award: String(data.expected_award ?? "").trim() || null,
      award_date: String(data.award_date ?? "").trim() || null,
      expected_closing: String(data.expected_closing ?? "").trim() || null,
      expected_construction_start:
        String(data.expected_construction_start ?? "").trim() || null,
      expected_completion: String(data.expected_completion ?? "").trim() || null,
      placed_in_service: String(data.placed_in_service ?? "").trim() || null,
    };
    const id = Number(data.id) || 0;
    if (id) {
      if (!(await dealOwned(context.userId, id))) {
        return { ok: false as const, error: "Deal not found." };
      }
      await sql.query(
        `update deals set name=$2, address=$3, city=$4, state=$5, county=$6, hfa=$7,
         deal_type=$8, unit_count=$9, stage=$10, programs=$11, ami_set_asides=$12,
         next_milestone=$13, application_due=$14, expected_award=$15, award_date=$16,
         expected_closing=$17, expected_construction_start=$18, expected_completion=$19,
         placed_in_service=$20, updated_at=now()
         where id=$1 and user_id=$21`,
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
          context.userId,
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
    if (!(await dealOwned(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    const template = CHECKLISTS.find((c) => c.slug === data.slug);
    if (!template) return { ok: false as const, error: "Unknown checklist." };
    const sql = await getSql();
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
    (data: { itemId: number; status: string; notes?: string; responsible?: string }) => ({
      itemId: Number(data.itemId),
      status: data.status,
      notes: data.notes?.trim() || null,
      responsible: data.responsible?.trim() || null,
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
       where i.id = $1 and c.user_id = $2`,
      [data.itemId, context.userId],
    );
    if (!owned[0]) return { ok: false as const, error: "Item not found." };
    await sql.query(
      `update deal_checklist_items set status = $2, notes = coalesce($3, notes),
       responsible = coalesce($4, responsible), updated_at = now() where id = $1`,
      [data.itemId, data.status, data.notes, data.responsible],
    );
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
    if (!(await dealOwned(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    if (!data.name || !data.body.trim()) {
      return { ok: false as const, error: "Letter needs a name and body." };
    }
    const sql = await getSql();
    const companyId = await companyIdFor(context.userId);
    const created = await sql.query<{ id: number }>(
      `insert into locker_documents (user_id, company_id, deal_id, name, doc_type, format, body, equipment_slug)
       values ($1,$2,$3,$4,'letter','txt',$5,'letter-builder') returning id`,
      [context.userId, companyId, data.dealId, data.name, data.body],
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
      created_at: string;
      updated_at: string;
      body: string | null;
    }>(
      `select id, name, doc_type, format, deal_id, created_at, updated_at, body
       from locker_documents where user_id = $1 and archived = false
       order by updated_at desc`,
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
       where id = $1 and user_id = $2`,
      [data.id, context.userId],
    );
    return { ok: true as const };
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
    if (!(await dealOwned(context.userId, data.dealId))) {
      return { ok: false as const, error: "Deal not found." };
    }
    const sql = await getSql();
    const companyId = await companyIdFor(context.userId);
    const status = data.submit ? "submitted" : "draft";
    const payload = JSON.stringify(data.intake);
    if (data.id) {
      const owned = await sql.query<{ id: number }>(
        `select id from model_requests where id = $1 and user_id = $2`,
        [data.id, context.userId],
      );
      if (!owned[0]) return { ok: false as const, error: "Request not found." };
      await sql.query(
        `update model_requests set intake = $2::jsonb, status = $3,
         submitted_at = case when $3 = 'submitted' then now() else submitted_at end,
         updated_at = now() where id = $1`,
        [data.id, payload, status],
      );
      return { ok: true as const, id: data.id };
    }
    const created = await sql.query<{ id: number }>(
      `insert into model_requests (user_id, company_id, deal_id, status, intake, submitted_at)
       values ($1,$2,$3,$4,$5::jsonb, case when $4 = 'submitted' then now() else null end)
       returning id`,
      [context.userId, companyId, data.dealId, status, payload],
    );
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
    }>(
      `select id, deal_id, status, submitted_at, updated_at from model_requests
       where user_id = $1 order by updated_at desc`,
      [context.userId],
    );
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
    }>(
      `select first_name, last_name, phone, company, plan from hq_members where user_id = $1`,
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
    const user = await sql.query<{ email: string | null; name: string | null }>(
      `select email, name from "user" where id = $1`,
      [context.userId],
    );
    return {
      member: member[0] ?? null,
      profile: profile[0] ?? null,
      company,
      email: user[0]?.email ?? null,
      name: user[0]?.name ?? null,
    };
  });
