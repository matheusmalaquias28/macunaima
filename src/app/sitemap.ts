import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { lp } from "@/lib/i18n";

// Ao criar uma página nova, adicione aqui (as versões PT e EN entram juntas)
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/quem-somos", priority: 0.8 },
  { path: "/produtos/acai", priority: 0.9 },
  { path: "/produtos/sorvete", priority: 0.9 },
  { path: "/onde-nos-encontrar", priority: 0.7 },
  { path: "/contato", priority: 0.8 },
];

const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    (["pt", "en"] as const).map((lang) => ({
      url: abs(lp(lang, path)),
      changeFrequency: "monthly" as const,
      priority: lang === "pt" ? priority : Math.round(priority * 8) / 10,
      alternates: { languages: { "pt-BR": abs(lp("pt", path)), en: abs(lp("en", path)) } },
    })),
  );
}
