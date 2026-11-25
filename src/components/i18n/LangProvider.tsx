"use client";

import { createContext, useContext } from "react";
import type { Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>("pt");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

/** Idioma atual em componentes de cliente */
export const useLang = () => useContext(LangContext);
