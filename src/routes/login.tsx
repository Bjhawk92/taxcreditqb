import { createFileRoute, Navigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    seo({
      title: "Team HQ | Tax Credit QB",
      description: "The Tax Credit QB client portal.",
    }),
  component: Login,
});

function Login() {
  return <Navigate to="/hq" />;
}
