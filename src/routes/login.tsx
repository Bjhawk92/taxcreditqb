import { createFileRoute, Navigate } from "@tanstack/react-router";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    seo({
      title: "Get the Playbook | Tax Credit QB",
      description: "Create your free Tax Credit QB account.",
    }),
  component: Login,
});

function Login() {
  return <Navigate to="/register" search={{ mode: "in" }} />;
}
