import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/tasarim-deneme/"],
    },
    sitemap: "https://www.hidrojenzirvesi.com/sitemap.xml",
  };
}
