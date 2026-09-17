import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { HqEmpty, HqHeader, HqMain, HqStatus } from "@/components/hq-empty";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { getHqHome, submitHqQuestion } from "@/lib/hq";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/messages")({
  component: HqMessages,
});

function HqMessages() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getHqHome>> | null>(
    null,
  );
  const [msg, setMsg] = useState<string | null>(null);

  function load() {
    getHqHome()
      .then(setData)
      .catch(() => setData(null));
  }
  useEffect(load, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await submitHqQuestion({
      data: {
        body: String(form.get("body") ?? ""),
        projectName: String(form.get("projectName") ?? ""),
      },
    }).catch(() => ({
      ok: false as const,
      error:
        "Could not send that request. Email info@taxcreditqb.com or use Call the next play.",
    }));
    if (!res.ok) {
      setMsg(res.error);
      return;
    }
    setMsg(
      "Submitted. Status starts as submitted — not answered until a Tax Credit QB teammate replies. This is not a promise that Brett personally answers, and replies are not immediate.",
    );
    e.currentTarget.reset();
    load();
  }

  const questions = data?.questions ?? [];
  const messages = data?.messages ?? [];
  const empty = questions.length === 0 && messages.length === 0;

  return (
    <main id="main">
      <HqHeader
        title="Questions and messages"
        sub="Private thread with Tax Credit QB. Support volume follows your membership — not unlimited, not immediate."
      />
      <HqMain>
        <p className="max-w-2xl text-sm text-muted">
          Attachments are not accepted here until storage is connected. Email files
          to {SITE.emails.info}.
        </p>
        <form onSubmit={onSubmit} className="mt-8 max-w-xl space-y-4">
          <Field label="Project (optional)" htmlFor="project">
            <Input id="project" name="projectName" />
          </Field>
          <Field label="Question or message" htmlFor="body">
            <Textarea id="body" name="body" required rows={5} />
          </Field>
          <Button type="submit">Submit</Button>
          {msg ? <p className="text-sm">{msg}</p> : null}
        </form>
        <h2 className="mt-12 font-display text-2xl font-semibold">Thread</h2>
        {empty ? (
          <div className="mt-4">
            <HqEmpty
              title="No questions yet"
              body="Statuses: submitted, awaiting information, answered."
            />
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {questions.map((r) => (
              <li key={`q-${r.id}`} className="border border-line p-5">
                <HqStatus value={`Question · ${r.status}`} />
                {r.project_name ? (
                  <p className="mt-1 text-sm text-muted">{r.project_name}</p>
                ) : null}
                <p className="mt-2">{r.body}</p>
                {r.answer ? (
                  <p className="mt-3 border-t border-line pt-3 text-ink/80">
                    Reply: {r.answer}
                  </p>
                ) : null}
              </li>
            ))}
            {messages.map((r) => (
              <li key={`m-${r.id}`} className="border border-line p-5">
                <HqStatus value={`Message · ${r.status}`} />
                <p className="mt-2">{r.body}</p>
              </li>
            ))}
          </ul>
        )}
      </HqMain>
    </main>
  );
}
