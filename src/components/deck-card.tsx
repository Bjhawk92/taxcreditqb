import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DECKS } from "@/lib/playbook";

export function DeckCard({ deck }: { deck: (typeof DECKS)[number] }) {
  return (
    <Link
      to={deck.href}
      className="group flex flex-col border border-line bg-paper p-6 transition-colors duration-150 hover:border-ink md:p-8"
    >
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        Fig. {deck.n} · {deck.call}
      </p>
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink">
        {deck.name}
      </h3>
      <p className="mt-2 text-sm font-medium text-ink/80">{deck.room}</p>
      <p className="mt-4 flex-1 text-ink/70">{deck.job}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-nav text-ink">
        See the game plan
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
