import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Ao criar uma página nova, adicione aqui
const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/produtos", priority: 0.9 },
  { path: "/contato", priority: 0.8 },
  { path: "/onde-nos-encontrar", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
