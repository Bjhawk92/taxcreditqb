import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { BinderShell } from "@/components/binder-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotFound } from "@/components/not-found";
import appCss from "../styles.css?url";

const APP_NAME = "Tax Credit QB";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#151e32" },
      {
        name: "description",
        content:
          "LIHTC development strategy and execution. Presentation playbook, one-on-one advice, and meeting support for emerging and growing affordable-housing developers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Tax Credit QB" },
      {
        property: "og:title",
        content: "Tax Credit QB | LIHTC Development Strategy + Execution",
      },
      {
        property: "og:description",
        content:
          "Your next play. Backed by experience. Meeting decks, advice, and an experienced operator for the rooms that decide LIHTC deals.",
      },
      { property: "og:url", content: "https://taxcreditqb.com" },
      {
        property: "og:image",
        content: "https://taxcreditqb.com/og-tax-credit-qb.png",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:image",
        content: "https://taxcreditqb.com/og-tax-credit-qb.png",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/brand/tax-credit-qb-shield.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Figtree:ital,wght@0,400;0,500;0,600;1,400&display=swap",
      },
    ],
  }),
  notFoundComponent: NotFound,
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-desk text-ink">
        <PreviewHostBridge />
        <AuthProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <BinderShell>
            <Header />
            <Outlet />
            <Footer />
          </BinderShell>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
