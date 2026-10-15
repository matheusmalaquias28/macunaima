"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onSiteReady } from "@/components/motion/MotionProvider";

const KEY = "mcn-consent";
export type Consent = "accepted" | "rejected";

/** Escolha salva do visitante (null = ainda não decidiu). Use para liberar scripts de medição. */
export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw).value as Consent) : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  // Só aparece depois do preloader e se o visitante ainda não escolheu
  useEffect(() => {
    if (getConsent()) return;
    return onSiteReady(() => {
      setOpen(true);
      requestAnimationFrame(() => setShown(true));
    });
  }, []);

  const decide = (value: Consent) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value, date: new Date().toISOString() }));
    } catch {}
    window.dispatchEvent(new CustomEvent("mcn:consent", { detail: value }));
    setShown(false);
    setTimeout(() => setOpen(false), 500);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className={`fixed inset-x-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-[80] max-w-[380px] rounded-[4px] bg-white p-5 text-acai-ink shadow-[0_24px_60px_-20px_rgba(34,1,26,0.45)] ring-1 ring-acai-ink/10 transition-[opacity,transform] duration-500 ease-[var(--ease-expo)] sm:left-auto sm:right-6 lg:bottom-28 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <p id="cookie-title" className="caption flex items-center gap-3 text-acai-soft">
        <span className="h-px w-5 bg-current opacity-70" />
        Privacidade · LGPD
      </p>
      <p id="cookie-text" className="mt-3 text-[0.9rem] leading-relaxed text-acai-ink/75">
        Usamos cookies para o funcionamento do site e para entender como ele é utilizado. Você pode aceitar ou recusar os
        cookies não essenciais. Saiba mais na nossa{" "}
        <Link href="/politica-de-privacidade" className="font-semibold text-acai underline decoration-acai/30 underline-offset-2 hover:decoration-acai">
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => decide("rejected")}
          className="h-10 flex-1 rounded-full border border-acai-ink/20 text-sm font-semibold transition-colors hover:border-acai-ink"
        >
          Recusar
        </button>
        <button
          type="button"
          onClick={() => decide("accepted")}
          className="h-10 flex-1 rounded-full bg-acai text-sm font-semibold text-white transition-colors hover:bg-acai-ink"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
