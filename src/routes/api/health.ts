import { createFileRoute } from "@tanstack/react-router";
import { dbSource } from "@/lib/db";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: () =>
        Response.json({
          ok: true,
          database: dbSource,
          auth: true,
        }),
    },
  },
});
