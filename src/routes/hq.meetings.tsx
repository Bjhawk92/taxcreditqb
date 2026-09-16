import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { getHqHome, submitHqMeeting } from "@/lib/hq";

export const Route = createFileRoute("/hq/meetings")({
  component: HqMeetings,
});

function HqMeetings() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof getHqHome>>["meetings"]>(
    [],
  );
  const [msg, setMsg] = useState<string | null>(null);

  function load() {
    getHqHome()
      .then((d) => setRows(d.meetings))
      .catch(() => setRows([]));
  }
  useEffect(load, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await submitHqMeeting({
      data: {
        meetingType: String(form.get("meetingType") ?? ""),
        meetingAt: String(form.get("meetingAt") ?? ""),
        location: String(form.get("location") ?? ""),
        audience: String(form.get("audience") ?? ""),
        role: String(form.get("role") ?? ""),
        prep: String(form.get("prep") ?? ""),
      },
    }).catch(() => ({
      ok: false as const,
      error:
        "The portal is in preview. Use Call in the Play to request meeting support.",
    }));
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    setMsg(
      "Request submitted. Submitting does not book attendance. Availability, fees, member discounts, and travel are confirmed separately.",
    );
    e.currentTarget.reset();
    load();
  }

  return (
    <main id="main">
      <HqHeader
        title="Meeting support"
        sub="Request virtual or in-person participation. The role is agreed in advance. This form is a request only."
      />
      <HqMain>
        <form onSubmit={onSubmit} className="max-w-xl space-y-4">
          <Field label="Meeting type" htmlFor="type">
            <Select id="type" name="meetingType" required defaultValue="">
              <option value="">Select</option>
              <option>Municipal introduction</option>
              <option>Neighborhood meeting</option>
              <option>Public hearing</option>
              <option>Landowner negotiation</option>
              <option>Syndicator or lender discussion</option>
            </Select>
          </Field>
          <Field label="Date and time" htmlFor="when">
            <Input id="when" name="meetingAt" />
          </Field>
          <Field label="Location" htmlFor="loc">
            <Input id="loc" name="location" />
          </Field>
          <Field label="Project and audience" htmlFor="aud">
            <Input id="aud" name="audience" />
          </Field>
          <Field label="Requested role" htmlFor="role">
            <Input
              id="role"
              name="role"
              placeholder="Preparation, supporting voice, or presenting"
            />
          </Field>
          <Field label="Preparation needs" htmlFor="prep">
            <Textarea id="prep" name="prep" rows={3} />
          </Field>
          <Button type="submit">Submit request</Button>
          {msg ? <p className="text-sm">{msg}</p> : null}
        </form>
        <h2 className="mt-12 font-display text-2xl font-semibold">Your requests</h2>
        {rows.length === 0 ? (
          <div className="mt-4">
            <HqEmpty
              title="No meeting requests"
              body="Accepted attendance will list here with scope and travel terms. Until then, a request is not a booking."
            />
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {rows.map((r) => (
              <li key={r.id} className="border border-line p-5">
                <HqStatus
                  value={
                    r.status === "accepted"
                      ? "accepted — attendance still confirmed separately"
                      : `${r.status} — not booked`
                  }
                />
                <p className="mt-2">{r.meeting_type}</p>
                {r.meeting_at ? (
                  <p className="mt-1 text-sm text-muted">{r.meeting_at}</p>
                ) : null}
                {r.location ? (
                  <p className="mt-1 text-sm text-muted">{r.location}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
