import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { HqHeader, HqMain } from "@/components/hq-empty";
import { StateWatchPicker } from "@/components/state-watch-picker";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";
import { getAccountProfile, saveAccountPrefs, saveFollowedStates } from "@/lib/locker";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/hq/account")({
  component: AccountPage,
});

function AccountPage() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getAccountProfile>> | null>(
    null,
  );
  const [note, setNote] = useState<string | null>(null);
  const [followedStates, setFollowedStates] = useState<string[]>([]);
  const [savingStates, setSavingStates] = useState(false);
  useEffect(() => {
    getAccountProfile()
      .then((profile) => {
        setData(profile);
        setFollowedStates(profile.member?.followed_states ?? []);
      })
      .catch(() => setData(null));
  }, []);

  return (
    <main id="main">
      <HqHeader
        title="Account"
        sub="Personal, company, membership, and security settings for this locker."
      />
      <HqMain>
        <div className="grid gap-4 md:grid-cols-2">
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Personal information</h2>
            <p className="mt-3">{data?.name || "Name not set"}</p>
            <p className="text-ink/75">{data?.email}</p>
            <p className="mt-2 text-sm text-muted">
              {data?.member?.first_name} {data?.member?.last_name}
            </p>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Email</h2>
            <p className="mt-3 text-ink/75">
              {data?.emailVerified
                ? "This address is marked verified."
                : "This address is not marked verified. A mailer is not connected, so automatic verification links are not sent. Tax Credit QB can confirm the address operationally if needed."}
            </p>
            <a
              href={`mailto:${SITE.emails.info}?subject=Email%20verification`}
              className="mt-4 inline-block font-display text-sm font-semibold uppercase tracking-nav text-steel"
            >
              Write about email
            </a>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Developer / company profile</h2>
            <p className="mt-3">{data?.company?.name || data?.member?.company || "Not set"}</p>
            <p className="text-ink/75">
              {[data?.company?.city, data?.company?.state].filter(Boolean).join(", ")}
            </p>
            <p className="mt-2 text-sm text-muted">
              Experience: {data?.profile?.experience || "Not set"}
            </p>
            {data?.companyMembers?.length ? (
              <ul className="mt-4 space-y-1 text-sm">
                {data.companyMembers.map((m) => (
                  <li key={m.user_id}>
                    {m.name || m.email || m.user_id} · {m.role}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted">
                Company teams can share deals later. This account currently
                shows the owner only.
              </p>
            )}
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/onboarding">Update profile</Link>
            </Button>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Game Plan / membership</h2>
            <p className="mt-3">{data?.member?.plan || "No Game Plan assigned"}</p>
            <Button asChild className="mt-6" variant="secondary">
              <Link to="/hq/membership">Manage Game Plan</Link>
            </Button>
          </section>
          <section className="border border-line p-6 md:col-span-2">
            <h2 className="font-display text-xl font-semibold">Follow 3 States</h2>
            <p className="mt-3 text-ink/75">
              Field Pass monitors QAP, scoring, application, and deadline changes
              for up to three states. These choices are saved to your account.
            </p>
            <div className="mt-4">
              <StateWatchPicker value={followedStates} onChange={setFollowedStates} />
            </div>
            <Button
              type="button"
              className="mt-6"
              variant="secondary"
              disabled={savingStates}
              onClick={() => {
                setSavingStates(true);
                void saveFollowedStates({ data: { states: followedStates } })
                  .then((result) => {
                    setFollowedStates(result.states);
                    setNote(
                      result.states.length
                        ? `Monitoring ${result.states.join(", ")}.`
                        : "No states selected.",
                    );
                  })
                  .finally(() => setSavingStates(false));
              }}
            >
              {savingStates ? "Saving…" : "Save states"}
            </Button>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Password / security</h2>
            <p className="mt-3 text-ink/75">
              Password resets currently go through {SITE.emails.info} until the
              mailer is connected. Passwords are hashed by the existing
              authentication provider and are not stored in application tables.
            </p>
            <a
              href={`mailto:${SITE.emails.info}?subject=Password%20help`}
              className="mt-4 inline-block font-display text-sm font-semibold uppercase tracking-nav text-steel"
            >
              Request a reset
            </a>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Notifications</h2>
            <p className="mt-3 text-ink/75">
              Billing, verification, and model-status notices stay available.
              Optional product notices can be turned off.
            </p>
            <label className="mt-4 flex min-h-11 items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={data?.member?.notify_nonessential !== false}
                onChange={(e) => {
                  const on = e.target.checked;
                  void saveAccountPrefs({ data: { notifyNonessential: on } }).then(() => {
                    setNote(on ? "Optional notices on." : "Optional notices off.");
                    getAccountProfile().then(setData);
                  });
                }}
              />
              Receive optional locker notices
            </label>
            {note ? <p className="mt-2 text-sm">{note}</p> : null}
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Billing</h2>
            <Button asChild className="mt-4" variant="secondary">
              <Link to="/hq/billing">Open billing</Link>
            </Button>
          </section>
          <section className="border border-line p-6">
            <h2 className="font-display text-xl font-semibold">Privacy</h2>
            <p className="mt-3 text-ink/75">
              Deals, documents, and model files in this locker are private to
              your account and authorized company members.
            </p>
            <Button asChild className="mt-4" variant="secondary">
              <Link to="/legal">Legal</Link>
            </Button>
          </section>
        </div>
        <button
          type="button"
          className="mt-10 font-display text-sm font-semibold uppercase tracking-nav text-steel"
          onClick={() => void signOut("/")}
        >
          Log out
        </button>
      </HqMain>
    </main>
  );
}
