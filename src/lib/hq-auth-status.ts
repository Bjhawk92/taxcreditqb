import { createServerFn } from "@tanstack/react-start";
import { dbSource } from "@/lib/db";

/** Live Team HQ needs Neon. Google only works with a real (non-preview) broker client. */
export const getHqAuthStatus = createServerFn({ method: "POST" }).handler(
  async () => ({
    database: dbSource,
    social: Boolean(process.env.GROK_AUTH_CLIENT_ID?.trim()),
  }),
);
