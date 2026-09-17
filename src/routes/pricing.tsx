import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/game-plans" });
  },
  component: function PricingRedirect() {
    return <Navigate to="/game-plans" />;
  },
});
