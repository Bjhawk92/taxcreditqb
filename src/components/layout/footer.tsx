import { Link } from "@tanstack/react-router";
import { EmailCapture } from "@/components/email-capture";
import { Wordmark } from "@/components/wordmark";
import { FOOTER_NAV, SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-12 md:px-8 md:py-16">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-5 max-w-sm text-lede text-ink/80">{SITE.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            Pronounced “{SITE.pronunciation}.” For emerging and growing LIHTC
            developers.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="font-display text-sm font-semibold uppercase tracking-mark text-muted">
            Navigate
          </p>
          <ul className="mt-4 space-y-2">
            {FOOTER_NAV.map((item) => (
              <li key={item.to + item.label}>
                <Link
                  to={item.to}
                  className="text-ink/80 transition-colors duration-150 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <EmailCapture compact />
          {SITE.social.length > 0 ? (
          <div className="mt-8">
            <p className="font-display text-sm font-semibold uppercase tracking-mark text-muted">
              Social
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {SITE.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink/80 transition-colors duration-150 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">
          <p className="max-w-4xl text-sm leading-body text-muted">{SITE.disclaimer}</p>
          <p className="mt-5 font-display text-sm uppercase tracking-nav text-muted">
            © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
