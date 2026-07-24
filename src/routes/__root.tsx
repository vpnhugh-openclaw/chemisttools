import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--paper)" }}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6 pt-24">
        <div className="max-w-md text-center">
          <div className="eyebrow mb-3">404</div>
          <h1 style={{ fontSize: 40, marginBottom: 12 }}>Page not found.</h1>
          <p className="text-[var(--navy-500)]">The page you were looking for doesn't exist or has been moved.</p>
          <a
            href="/"
            className="mt-6 inline-flex rounded-full px-5 py-3 text-sm font-semibold text-white"
            style={{ background: "var(--navy)" }}
          >
            Go home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: "var(--paper)" }}>
      <div className="max-w-md text-center">
        <h1 style={{ fontSize: 28 }}>This page didn't load.</h1>
        <p className="mt-2 text-[var(--navy-500)]">Something went wrong on our end. Try refreshing or head back home.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full px-4 py-2 text-sm text-white"
            style={{ background: "var(--navy)" }}
          >
            Try again
          </button>
          <a href="/" className="rounded-full px-4 py-2 text-sm border border-[var(--navy-100)]">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#10183f" },
      { title: "Chemist Care Tools â€” Run your pharmacy like the best in the business" },
      {
        name: "description",
        content:
          "One staff portal for tasks, orders, packs, compliance, and stock. Developed by real community pharmacists in Sydney and Melbourne.",
      },
      { property: "og:site_name", content: "Chemist Care Tools" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Chemist Care Tools â€” Run your pharmacy like the best in the business" },
      {
        property: "og:description",
        content: "One staff portal for tasks, orders, packs, compliance, and stock. Developed by real community pharmacists in Sydney and Melbourne.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Chemist Care Tools â€” Run your pharmacy like the best in the business" },
      { name: "twitter:description", content: "One staff portal for tasks, orders, packs, compliance, and stock. Developed by real community pharmacists in Sydney and Melbourne." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/R6K3glyzDwgIwpIt8lj1BoPA0EM2/social-images/social-1784845977367-21f93649-074a-4469-bc6a-a1d05a6a0321.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/R6K3glyzDwgIwpIt8lj1BoPA0EM2/social-images/social-1784845977367-21f93649-074a-4469-bc6a-a1d05a6a0321.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Nunito:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
