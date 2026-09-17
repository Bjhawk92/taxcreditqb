import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/locker")({
  component: function LockerRedirect() {
    return <Navigate to="/hq" />;
  },
});
