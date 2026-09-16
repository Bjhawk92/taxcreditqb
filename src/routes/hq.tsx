import { Outlet, createFileRoute } from "@tanstack/react-router";
import { HqNav } from "@/components/hq-nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hq")({
  head: () =>
    seo({
      title: "Team HQ | Tax Credit QB",
      description:
        "The Tax Credit QB client portal. Membership, playbook files, huddles and project work in one place.",
    }),
  component: HqLayout,
});

function HqLayout() {
  return (
    <>
      <HqNav />
      <Outlet />
    </>
  );
}
