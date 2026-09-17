import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import {
  addHqInternalNote,
  assignHqMembership,
  createHqFileRecord,
  createHqProject,
  getHqAdmin,
  setHqHuddleStatus,
  setHqMeetingStatus,
  setHqQuestionStatus,
} from "@/lib/hq";
import {
  deliverModelRecord,
  listAdminModelRequests,
  setModelRequestStatus,
} from "@/lib/locker";
import { MODEL_STATUSES, formatModelStatus } from "@/lib/deal-fields";

export const Route = createFileRoute("/hq/admin")({
  component: HqAdmin,
});

function HqAdmin() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getHqAdmin>> | null>(
    null,
  );
  const [models, setModels] = useState<Awaited<ReturnType<typeof listAdminModelRequests>> | null>(
    null,
  );
  const [note, setNote] = useState<string | null>(null);

  function load() {
    getHqAdmin()
      .then(setData)
      .catch(() => setData({ admin: false }));
    listAdminModelRequests()
      .then(setModels)
      .catch(() => setModels({ admin: false, rows: [] }));
  }
  useEffect(load, []);

  if (!data) {
    return (
      <main id="main" className="px-5 py-16">
        Loading…
      </main>
    );
  }
  if (!data.admin) {
    return (
      <main id="main">
        <HqHeader title="Admin" />
        <HqMain>
          <HqEmpty
            title="No admin access on this account"
            body="Internal notes and client lists are only for Tax Credit QB administrators. External specialists get project-scoped access when assigned — never another client’s files."
          />
        </HqMain>
      </main>
    );
  }

  async function onPlan(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await assignHqMembership({
      data: {
        targetUserId: String(form.get("targetUserId") ?? ""),
        plan: String(form.get("plan") ?? ""),
        consultAllowance: Number(form.get("consultAllowance") ?? 0),
        renewalDate: String(form.get("renewalDate") ?? ""),
      },
    });
    setNote(res.ok ? "Membership updated." : res.error);
    if (res.ok) load();
  }

  async function onProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await createHqProject({
      data: {
        targetUserId: String(form.get("targetUserId") ?? ""),
        name: String(form.get("name") ?? ""),
        location: String(form.get("location") ?? ""),
        scope: String(form.get("scope") ?? ""),
        nextMilestone: String(form.get("nextMilestone") ?? ""),
      },
    });
    setNote(res.ok ? "Project created." : res.error);
    if (res.ok) {
      e.currentTarget.reset();
      load();
    }
  }

  async function onFile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await createHqFileRecord({
      data: {
        targetUserId: String(form.get("targetUserId") ?? ""),
        name: String(form.get("name") ?? ""),
        projectName: String(form.get("projectName") ?? ""),
        format: String(form.get("format") ?? ""),
        status: String(form.get("status") ?? "draft"),
        version: String(form.get("version") ?? ""),
      },
    });
    setNote(res.ok ? "File record added. No upload was stored." : res.error);
    if (res.ok) {
      e.currentTarget.reset();
      load();
    }
  }

  async function onNote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await addHqInternalNote({
      data: {
        subjectUserId: String(form.get("subjectUserId") ?? ""),
        body: String(form.get("body") ?? ""),
      },
    });
    setNote(res.ok ? "Internal note saved. Clients cannot see this." : res.error);
    if (res.ok) {
      e.currentTarget.reset();
      load();
    }
  }

  const members = data.members;

  return (
    <main id="main">
      <HqHeader
        title="Admin"
        sub="Manage clients, memberships, questions, bookings, and logged deliverables. Internal notes stay off the client view."
      />
      <HqMain>
        {note ? <p className="mb-6 text-sm">{note}</p> : null}

        <section>
          <h2 className="font-display text-2xl font-semibold">Clients</h2>
          {members.length === 0 ? (
            <p className="mt-3 text-muted">No members have signed in yet.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {members.map((m) => (
                <li key={m.user_id} className="border border-line p-4 text-sm">
                  <p className="font-semibold">
                    {m.name || "Unnamed"} · {m.email || m.user_id}
                  </p>
                  <p className="mt-1 text-muted">
                    {m.plan || "No plan"} · {m.consult_used}/{m.consult_allowance} huddles
                    {m.is_admin ? " · admin" : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {models?.admin ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">Custom model requests</h2>
            <p className="mt-2 text-sm text-muted">
              Internal notes stay off the client view. Deliverable records log
              metadata only — no file bytes are stored here.
            </p>
            {models.rows.length === 0 ? (
              <p className="mt-3 text-muted">No model requests yet.</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {models.rows.map((r) => (
                  <li key={r.id} className="border border-line p-4 text-sm">
                    <p className="font-semibold">
                      #{r.id} · {r.deal_name || "No deal"} · {r.email || r.user_id}
                    </p>
                    <p className="mt-1 text-muted">{formatModelStatus(r.status)}</p>
                    {r.provider_notes_internal ? (
                      <p className="mt-2 border border-dashed border-line p-2 text-muted">
                        Internal: {r.provider_notes_internal}
                      </p>
                    ) : null}
                    <form
                      className="mt-3 grid gap-3 md:grid-cols-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = new FormData(e.currentTarget);
                        void setModelRequestStatus({
                          data: {
                            id: r.id,
                            status: String(form.get("status") ?? r.status),
                            customerVisibleNotes: String(
                              form.get("customerVisibleNotes") ?? "",
                            ),
                            internalNotes: String(form.get("internalNotes") ?? ""),
                          },
                        }).then((res) => {
                          setNote(res.ok ? "Model status updated." : res.error);
                          if (res.ok) load();
                        });
                      }}
                    >
                      <Field label="Status" htmlFor={`ms-${r.id}`}>
                        <Select id={`ms-${r.id}`} name="status" defaultValue={r.status}>
                          {MODEL_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {formatModelStatus(s)}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="Note to customer" htmlFor={`cn-${r.id}`}>
                        <Input id={`cn-${r.id}`} name="customerVisibleNotes" />
                      </Field>
                      <Field label="Internal note" htmlFor={`in-${r.id}`}>
                        <Input id={`in-${r.id}`} name="internalNotes" />
                      </Field>
                      <div className="flex items-end">
                        <Button type="submit">Update request</Button>
                      </div>
                    </form>
                    <form
                      className="mt-3 flex flex-col gap-3 sm:flex-row"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const form = new FormData(e.currentTarget);
                        void deliverModelRecord({
                          data: {
                            requestId: r.id,
                            name: String(form.get("name") ?? ""),
                            fileType: String(form.get("fileType") ?? ""),
                          },
                        }).then((res) => {
                          setNote(
                            res.ok
                              ? `Deliverable v${res.version} recorded. Prior versions kept.`
                              : res.error,
                          );
                          if (res.ok) load();
                        });
                      }}
                    >
                      <Input name="name" placeholder="Deliverable file name" required />
                      <Input name="fileType" placeholder="xlsx / pdf" />
                      <Button type="submit" variant="secondary">
                        Record delivery
                      </Button>
                    </form>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : null}

        <section className="mt-12 grid gap-10 lg:grid-cols-2">
          <form onSubmit={onPlan} className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Assign membership</h2>
            <MemberSelect members={members} name="targetUserId" id="plan-client" />
            <Field label="Plan name" htmlFor="plan">
              <Select id="plan" name="plan" defaultValue="The Playbook">
                <option value="Film Room + Ask the QB">Film Room + Ask the QB</option>
                <option value="The Playbook">The Playbook</option>
                <option value="The Huddle">The Huddle</option>
              </Select>
            </Field>
            <Field label="Huddle allowance" htmlFor="allow">
              <Input
                id="allow"
                name="consultAllowance"
                type="number"
                min={0}
                defaultValue={1}
              />
            </Field>
            <Field label="Renewal date" htmlFor="renew">
              <Input id="renew" name="renewalDate" type="date" />
            </Field>
            <Button type="submit">Save plan</Button>
          </form>

          <form onSubmit={onProject} className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Open a project</h2>
            <MemberSelect members={members} name="targetUserId" id="proj-client" />
            <Field label="Project name" htmlFor="pname">
              <Input id="pname" name="name" required />
            </Field>
            <Field label="Location" htmlFor="ploc">
              <Input id="ploc" name="location" />
            </Field>
            <Field label="Scope" htmlFor="pscope">
              <Textarea id="pscope" name="scope" rows={3} />
            </Field>
            <Field label="Next milestone" htmlFor="pnext">
              <Input id="pnext" name="nextMilestone" />
            </Field>
            <Button type="submit">Create project</Button>
          </form>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-2">
          <form onSubmit={onFile} className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Log a deliverable</h2>
            <p className="text-sm text-muted">
              Records a file the client can see. Does not upload bytes.
            </p>
            <MemberSelect members={members} name="targetUserId" id="file-client" />
            <Field label="File name" htmlFor="fname">
              <Input id="fname" name="name" required />
            </Field>
            <Field label="Project" htmlFor="fproj">
              <Input id="fproj" name="projectName" />
            </Field>
            <Field label="Format" htmlFor="ffmt">
              <Input id="ffmt" name="format" placeholder="PPTX, PDF, XLSX" />
            </Field>
            <Field label="Version" htmlFor="fver">
              <Input id="fver" name="version" placeholder="v1" />
            </Field>
            <Field label="Status" htmlFor="fstat">
              <Select id="fstat" name="status" defaultValue="draft">
                <option value="draft">Draft</option>
                <option value="for review">For Review</option>
                <option value="approved">Approved (client)</option>
                <option value="final">Final</option>
              </Select>
            </Field>
            <Button type="submit">Add file record</Button>
          </form>

          <form onSubmit={onNote} className="space-y-3">
            <h2 className="font-display text-2xl font-semibold">Internal note</h2>
            <p className="text-sm text-muted">Not shown to the client.</p>
            <MemberSelect members={members} name="subjectUserId" id="note-client" />
            <Field label="Note" htmlFor="nbody">
              <Textarea id="nbody" name="body" required rows={4} />
            </Field>
            <Button type="submit">Save note</Button>
          </form>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Huddle requests</h2>
          <ul className="mt-4 space-y-2">
            {data.huddles.map((h) => (
              <li key={h.id} className="border border-line p-4 text-sm">
                <HqStatus value={h.status} />
                <p className="mt-2">{h.question}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      void setHqHuddleStatus({
                        data: { id: h.id, status: "accepted" },
                      }).then(load)
                    }
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      void setHqHuddleStatus({
                        data: { id: h.id, status: "declined" },
                      }).then(load)
                    }
                  >
                    Decline
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Questions</h2>
          <ul className="mt-4 space-y-2">
            {data.questions.map((q) => (
              <li key={q.id} className="border border-line p-4 text-sm">
                <HqStatus value={q.status} />
                <p className="mt-2">{q.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      void setHqQuestionStatus({
                        data: { id: q.id, status: "awaiting information" },
                      }).then(load)
                    }
                  >
                    Awaiting information
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      void setHqQuestionStatus({
                        data: { id: q.id, status: "answered" },
                      }).then(load)
                    }
                  >
                    Mark answered
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Meeting requests</h2>
          <ul className="mt-4 space-y-2">
            {data.meetings.map((m) => (
              <li key={m.id} className="border border-line p-4 text-sm">
                <HqStatus value={m.status} />
                <p className="mt-2">{m.meeting_type}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      void setHqMeetingStatus({
                        data: { id: m.id, status: "accepted" },
                      }).then(load)
                    }
                  >
                    Accept request
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      void setHqMeetingStatus({
                        data: { id: m.id, status: "declined" },
                      }).then(load)
                    }
                  >
                    Decline
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Internal notes</h2>
          <ul className="mt-4 space-y-2">
            {data.notes.map((n) => (
              <li key={n.id} className="border border-dashed border-line p-4 text-sm">
                <p className="text-muted">{n.subject_user_id}</p>
                <p className="mt-1">{n.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </HqMain>
    </main>
  );
}

function MemberSelect({
  members,
  name,
  id,
}: {
  members: { user_id: string; email: string | null; name: string | null }[];
  name: string;
  id: string;
}) {
  return (
    <Field label="Client" htmlFor={id}>
      <Select id={id} name={name} required defaultValue="">
        <option value="">Select</option>
        {members.map((m) => (
          <option key={m.user_id} value={m.user_id}>
            {m.name || m.email || m.user_id}
          </option>
        ))}
      </Select>
    </Field>
  );
}
