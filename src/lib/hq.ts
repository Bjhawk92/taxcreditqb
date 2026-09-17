import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { SITE } from "@/lib/site";

const ADMIN_EMAILS = [
  SITE.emails.brett,
  SITE.emails.info,
  "brett@caveblue.com",
].map((e) => e.toLowerCase());

const QUESTION_STATUSES = ["submitted", "awaiting information", "answered"] as const;
const HUDDLE_STATUSES = ["submitted", "accepted", "completed", "declined"] as const;
const MEETING_STATUSES = ["submitted", "accepted", "declined"] as const;
const FILE_STATUSES = ["draft", "for review", "approved", "final"] as const;

async function emailFor(userId: string) {
  try {
    const sql = await getSql();
    const rows = await sql.query<{ email: string | null }>(
      `select email from "user" where id = $1`,
      [userId],
    );
    return rows[0]?.email ?? null;
  } catch {
    return null;
  }
}

async function ensureMember(userId: string) {
  const sql = await getSql();
  const email = await emailFor(userId);
  const admin = email ? ADMIN_EMAILS.includes(email.toLowerCase()) : false;
  await sql.query(
    `insert into hq_members (user_id, is_admin, consult_allowance)
     values ($1, $2, 0)
     on conflict (user_id) do update set is_admin = hq_members.is_admin or excluded.is_admin`,
    [userId, admin],
  );
}

async function isAdminUser(userId: string) {
  await ensureMember(userId);
  const sql = await getSql();
  const rows = await sql.query<{ is_admin: boolean }>(
    `select is_admin from hq_members where user_id = $1`,
    [userId],
  );
  return Boolean(rows[0]?.is_admin);
}

export const getHqHome = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await ensureMember(context.userId);
    const sql = await getSql();
    const members = await sql.query<{
      plan: string | null;
      consult_allowance: number;
      consult_used: number;
      renewal_date: string | null;
      is_admin: boolean;
      company: string | null;
    }>(
      `select plan, consult_allowance, consult_used, renewal_date, is_admin, company
       from hq_members where user_id = $1`,
      [context.userId],
    );
    const member = members[0];
    const huddles = await sql.query<{
      id: number;
      question: string;
      status: string;
      created_at: string;
      scheduled_at: string | null;
      meeting_link: string | null;
      notes: string | null;
      action_items: string | null;
    }>(
      `select id, question, status, created_at, scheduled_at, meeting_link, notes, action_items
       from hq_huddles where user_id = $1 order by id desc limit 12`,
      [context.userId],
    );
    const questions = await sql.query<{
      id: number;
      body: string;
      status: string;
      project_name: string | null;
      answer: string | null;
      created_at: string;
    }>(
      `select id, body, status, project_name, answer, created_at from hq_questions
       where user_id = $1 order by id desc limit 20`,
      [context.userId],
    );
    const meetings = await sql.query<{
      id: number;
      meeting_type: string;
      status: string;
      meeting_at: string | null;
      location: string | null;
      created_at: string;
    }>(
      `select id, meeting_type, status, meeting_at, location, created_at from hq_meetings
       where user_id = $1 order by id desc limit 12`,
      [context.userId],
    );
    const projects = await sql.query<{
      id: number;
      name: string;
      location: string | null;
      scope: string | null;
      status: string;
      next_milestone: string | null;
    }>(
      `select id, name, location, scope, status, next_milestone
       from hq_projects where user_id = $1 order by id desc`,
      [context.userId],
    );
    const messages = await sql.query<{
      id: number;
      body: string;
      status: string;
      project_name: string | null;
      created_at: string;
    }>(
      `select id, body, status, project_name, created_at from hq_messages
       where user_id = $1 order by id desc limit 12`,
      [context.userId],
    );
    const files = await sql.query<{
      id: number;
      project_name: string | null;
      name: string;
      format: string | null;
      status: string;
      version: string | null;
      created_at: string;
    }>(
      `select id, project_name, name, format, status, version, created_at
       from hq_files where user_id = $1 order by id desc limit 20`,
      [context.userId],
    );
    return {
      membership: member
        ? {
            plan: member.plan,
            company: member.company,
            consultAllowance: member.consult_allowance,
            consultUsed: member.consult_used,
            consultRemaining: Math.max(
              0,
              member.consult_allowance - member.consult_used,
            ),
            renewalDate: member.renewal_date,
            isAdmin: member.is_admin,
          }
        : null,
      huddles,
      questions,
      meetings,
      projects,
      messages,
      files,
    };
  });

export const submitHqQuestion = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { body: string; projectName?: string; dealId?: number }) => ({
    body: data.body.trim(),
    projectName: data.projectName?.trim() || null,
    dealId: data.dealId ? Number(data.dealId) : null,
  }))
  .handler(async ({ context, data }) => {
    if (!data.body) return { ok: false as const, error: "Enter a question." };
    await ensureMember(context.userId);
    const sql = await getSql();
    await sql.query(
      `insert into hq_questions (user_id, project_name, body, status, deal_id)
       values ($1, $2, $3, 'submitted', $4)`,
      [context.userId, data.projectName, data.body, data.dealId],
    );
    return { ok: true as const };
  });

export const submitHqHuddle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      question: string;
      projectInfo?: string;
      deadline?: string;
      dealId?: number;
    }) => ({
      question: data.question.trim(),
      projectInfo: data.projectInfo?.trim() || null,
      deadline: data.deadline?.trim() || null,
      dealId: data.dealId ? Number(data.dealId) : null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!data.question) {
      return { ok: false as const, error: "Describe the question or decision." };
    }
    await ensureMember(context.userId);
    const sql = await getSql();
    await sql.query(
      `insert into hq_huddles (user_id, question, project_info, deadline, status, deal_id)
       values ($1, $2, $3, $4, 'submitted', $5)`,
      [context.userId, data.question, data.projectInfo, data.deadline, data.dealId],
    );
    return { ok: true as const };
  });

export const submitHqMeeting = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      meetingType: string;
      meetingAt?: string;
      location?: string;
      audience?: string;
      role?: string;
      prep?: string;
    }) => ({
      meetingType: data.meetingType.trim(),
      meetingAt: data.meetingAt?.trim() || null,
      location: data.location?.trim() || null,
      audience: data.audience?.trim() || null,
      role: data.role?.trim() || null,
      prep: data.prep?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!data.meetingType) {
      return { ok: false as const, error: "Choose a meeting type." };
    }
    await ensureMember(context.userId);
    const sql = await getSql();
    await sql.query(
      `insert into hq_meetings (user_id, meeting_type, meeting_at, location, audience, role, prep, status)
       values ($1, $2, $3, $4, $5, $6, $7, 'submitted')`,
      [
        context.userId,
        data.meetingType,
        data.meetingAt,
        data.location,
        data.audience,
        data.role,
        data.prep,
      ],
    );
    return { ok: true as const };
  });

export const submitHqMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { body: string; projectName?: string }) => ({
    body: data.body.trim(),
    projectName: data.projectName?.trim() || null,
  }))
  .handler(async ({ context, data }) => {
    if (!data.body) return { ok: false as const, error: "Enter a message." };
    await ensureMember(context.userId);
    const sql = await getSql();
    await sql.query(
      `insert into hq_messages (user_id, project_name, body, status)
       values ($1, $2, $3, 'submitted')`,
      [context.userId, data.projectName, data.body],
    );
    return { ok: true as const };
  });

export const getHqAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    if (!(await isAdminUser(context.userId))) return { admin: false as const };
    const sql = await getSql();
    const members = await sql.query<{
      user_id: string;
      plan: string | null;
      consult_allowance: number;
      consult_used: number;
      renewal_date: string | null;
      is_admin: boolean;
      email: string | null;
      name: string | null;
    }>(
      `select m.user_id, m.plan, m.consult_allowance, m.consult_used, m.renewal_date, m.is_admin,
              u.email, u.name
       from hq_members m
       left join "user" u on u.id = m.user_id
       order by m.created_at desc`,
    );
    const questions = await sql.query<{
      id: number;
      user_id: string;
      body: string;
      status: string;
      created_at: string;
    }>(
      `select id, user_id, body, status, created_at from hq_questions order by id desc limit 40`,
    );
    const huddles = await sql.query<{
      id: number;
      user_id: string;
      question: string;
      status: string;
      created_at: string;
    }>(
      `select id, user_id, question, status, created_at from hq_huddles order by id desc limit 40`,
    );
    const meetings = await sql.query<{
      id: number;
      user_id: string;
      meeting_type: string;
      status: string;
      created_at: string;
    }>(
      `select id, user_id, meeting_type, status, created_at from hq_meetings order by id desc limit 40`,
    );
    const notes = await sql.query<{
      id: number;
      subject_user_id: string;
      body: string;
      created_at: string;
    }>(
      `select id, subject_user_id, body, created_at from hq_internal_notes order by id desc limit 40`,
    );
    return { admin: true as const, members, questions, huddles, meetings, notes };
  });

export const assignHqMembership = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      targetUserId: string;
      plan: string;
      consultAllowance: number;
      renewalDate?: string;
    }) => ({
      targetUserId: data.targetUserId.trim(),
      plan: data.plan.trim(),
      consultAllowance: Number(data.consultAllowance) || 0,
      renewalDate: data.renewalDate?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!data.targetUserId) return { ok: false as const, error: "Choose a client." };
    const sql = await getSql();
    await sql.query(
      `update hq_members
       set plan = $2, consult_allowance = $3, renewal_date = $4
       where user_id = $1`,
      [data.targetUserId, data.plan || null, Math.max(0, data.consultAllowance), data.renewalDate],
    );
    return { ok: true as const };
  });

export const setHqQuestionStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number; status: string; answer?: string }) => ({
    id: Number(data.id),
    status: data.status.trim(),
    answer: data.answer?.trim() || null,
  }))
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!QUESTION_STATUSES.includes(data.status as (typeof QUESTION_STATUSES)[number])) {
      return { ok: false as const, error: "Unknown status." };
    }
    const sql = await getSql();
    await sql.query(
      `update hq_questions set status = $2, answer = coalesce($3, answer) where id = $1`,
      [data.id, data.status, data.answer],
    );
    return { ok: true as const };
  });

export const setHqHuddleStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      id: number;
      status: string;
      scheduledAt?: string;
      meetingLink?: string;
      notes?: string;
      actionItems?: string;
    }) => ({
      id: Number(data.id),
      status: data.status.trim(),
      scheduledAt: data.scheduledAt?.trim() || null,
      meetingLink: data.meetingLink?.trim() || null,
      notes: data.notes?.trim() || null,
      actionItems: data.actionItems?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!HUDDLE_STATUSES.includes(data.status as (typeof HUDDLE_STATUSES)[number])) {
      return { ok: false as const, error: "Unknown status." };
    }
    const sql = await getSql();
    await sql.query(
      `update hq_huddles
       set status = $2,
           scheduled_at = coalesce($3, scheduled_at),
           meeting_link = coalesce($4, meeting_link),
           notes = coalesce($5, notes),
           action_items = coalesce($6, action_items)
       where id = $1`,
      [data.id, data.status, data.scheduledAt, data.meetingLink, data.notes, data.actionItems],
    );
    return { ok: true as const };
  });

export const setHqMeetingStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { id: number; status: string }) => ({
    id: Number(data.id),
    status: data.status.trim(),
  }))
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!MEETING_STATUSES.includes(data.status as (typeof MEETING_STATUSES)[number])) {
      return { ok: false as const, error: "Unknown status." };
    }
    const sql = await getSql();
    await sql.query(`update hq_meetings set status = $2 where id = $1`, [
      data.id,
      data.status,
    ]);
    return { ok: true as const };
  });

export const createHqProject = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      targetUserId: string;
      name: string;
      location?: string;
      scope?: string;
      nextMilestone?: string;
    }) => ({
      targetUserId: data.targetUserId.trim(),
      name: data.name.trim(),
      location: data.location?.trim() || null,
      scope: data.scope?.trim() || null,
      nextMilestone: data.nextMilestone?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!data.targetUserId || !data.name) {
      return { ok: false as const, error: "Client and project name are required." };
    }
    const sql = await getSql();
    await sql.query(
      `insert into hq_projects (user_id, name, location, scope, status, next_milestone)
       values ($1, $2, $3, $4, 'scoping', $5)`,
      [data.targetUserId, data.name, data.location, data.scope, data.nextMilestone],
    );
    return { ok: true as const };
  });

export const createHqFileRecord = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    (data: {
      targetUserId: string;
      name: string;
      projectName?: string;
      format?: string;
      status?: string;
      version?: string;
    }) => ({
      targetUserId: data.targetUserId.trim(),
      name: data.name.trim(),
      projectName: data.projectName?.trim() || null,
      format: data.format?.trim() || null,
      status: (data.status?.trim() || "draft").toLowerCase(),
      version: data.version?.trim() || null,
    }),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!data.targetUserId || !data.name) {
      return { ok: false as const, error: "Client and file name are required." };
    }
    if (!FILE_STATUSES.includes(data.status as (typeof FILE_STATUSES)[number])) {
      return { ok: false as const, error: "Unknown file status." };
    }
    const sql = await getSql();
    await sql.query(
      `insert into hq_files (user_id, project_name, name, format, status, version)
       values ($1, $2, $3, $4, $5, $6)`,
      [data.targetUserId, data.projectName, data.name, data.format, data.status, data.version],
    );
    return { ok: true as const };
  });

export const addHqInternalNote = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { subjectUserId: string; body: string }) => ({
    subjectUserId: data.subjectUserId.trim(),
    body: data.body.trim(),
  }))
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context.userId))) {
      return { ok: false as const, error: "Admin only." };
    }
    if (!data.subjectUserId || !data.body) {
      return { ok: false as const, error: "Client and note are required." };
    }
    const sql = await getSql();
    await sql.query(
      `insert into hq_internal_notes (subject_user_id, body) values ($1, $2)`,
      [data.subjectUserId, data.body],
    );
    return { ok: true as const };
  });
