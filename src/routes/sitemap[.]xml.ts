import { createFileRoute } from "@tanstack/react-router";
import { MODULES, siteConfig } from "@/lib/siteConfig";

const BASE_URL = `https://${siteConfig.brand.domain}`;

const staticPaths = [
  "/",
  "/pricing",
  "/getting-started",
  "/about",
  "/security",
  "/faq",
  "/contact",
  "/book-walkthrough",
  "/privacy",
  "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          ...staticPaths.map((p) => `${BASE_URL}${p}`),
          ...MODULES.map((m) => `${BASE_URL}/product/${m.slug}`),
        ];
        const xml =
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urls
            .map(
              (u) =>
                `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
            )
            .join("\n") +
          `\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
