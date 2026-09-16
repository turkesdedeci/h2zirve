import type { MetadataRoute } from "next";

const siteUrl = "https://www.hidrojenzirvesi.com";

const routes = [
  "",
  "/program",
  "/konusmacilar",
  "/poster-cagrisi",
  "/kayit",
  "/poster-basvurusu",
  "/sponsorluk-basvurusu",
  "/stand-basvurusu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-09-16"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
