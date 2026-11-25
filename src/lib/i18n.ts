// Idiomas do site. PT fica sem prefixo na URL (o proxy reescreve para /pt); EN fica em /en.

export const locales = ["pt", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "pt";

export const hasLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);

/** Texto nos dois idiomas */
export type T = { pt: string; en: string };

/** Caminho no idioma: lp("en", "/quem-somos") → "/en/quem-somos"; lp("pt", "/") → "/" */
export function lp(lang: Lang, path: string) {
  if (lang === defaultLang || /^(https?:|mailto:|tel:)/.test(path)) return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${path}`;
}

/** Remove o prefixo de idioma de um caminho visível: "/en/produtos/acai" → "/produtos/acai" */
export function stripLang(pathname: string) {
  if (pathname === "/en" || pathname === "/pt") return "/";
  if (pathname.startsWith("/en/") || pathname.startsWith("/pt/")) return pathname.slice(3);
  return pathname;
}

export const htmlLang: Record<Lang, string> = { pt: "pt-BR", en: "en" };
export const ogLocale: Record<Lang, string> = { pt: "pt_BR", en: "en_US" };
