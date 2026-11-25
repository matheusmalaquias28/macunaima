"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/components/i18n/LangProvider";
import { locales, lp, stripLang } from "@/lib/i18n";

/** Seletor PT | EN: mantém a página atual ao trocar de idioma */
export default function LangSwitch({ className = "" }: { className?: string }) {
  const lang = useLang();
  const path = stripLang(usePathname());

  return (
    <nav aria-label={lang === "en" ? "Language" : "Idioma"} className={`flex items-center gap-1 text-[0.82rem] font-bold tracking-[0.06em] ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className="text-current/30">|</span>}
          <Link
            href={lp(l, path)}
            hrefLang={l === "en" ? "en" : "pt-BR"}
            aria-current={l === lang ? "true" : undefined}
            className={`rounded px-1 py-1 uppercase transition-colors ${l === lang ? "text-acai" : "text-current/45 hover:text-acai"}`}
          >
            {l}
          </Link>
        </span>
      ))}
    </nav>
  );
}
