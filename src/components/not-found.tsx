import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-20 md:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-mark text-steel">
        404
      </p>
      <h1 className="mt-4 font-display text-display font-semibold text-ink">
        This page is not on the map.
      </h1>
      <p className="mt-4 max-w-md text-lede text-ink/75">
        The route does not exist. Head home, or call in the play.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/inquiry">Call in the play</Link>
        </Button>
      </div>
    </main>
  );
}
