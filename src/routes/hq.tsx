import { Outlet, createFileRoute } from "@tanstack/react-router";
import { HqNav } from "@/components/hq-nav";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hq")({
  head: () =>
    seo({
      title: "My Locker | Tax Credit QB",
      description:
        "Your deals, Equipment, documents, Game Plan, and QB Access — all in one place.",
    }),
  component: HqLayout,
});

function HqLayout() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return null;
  if (!user) return <RedirectToSignIn />;
  return (
    <>
      <HqNav />
      <Outlet />
    </>
  );
}
