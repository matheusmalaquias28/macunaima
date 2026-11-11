"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getConsent } from "@/components/layout/CookieConsent";

const PIXEL_ID = "1810648256931453";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Snippet oficial do Meta Pixel (fbevents.js), sem o PageView automático. */
function loadPixel() {
  if (window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", PIXEL_ID);
}

/**
 * Meta Pixel liberado pelo aviso de cookies (LGPD): só carrega depois que o visitante aceita.
 * Dispara PageView na entrada e a cada troca de rota do App Router.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (getConsent() === "accepted") setAllowed(true);
    const onConsent = (e: Event) => setAllowed((e as CustomEvent).detail === "accepted");
    window.addEventListener("mcn:consent", onConsent);
    return () => window.removeEventListener("mcn:consent", onConsent);
  }, []);

  useEffect(() => {
    if (!allowed || lastTracked.current === pathname) return;
    loadPixel();
    window.fbq?.("track", "PageView");
    lastTracked.current = pathname;
  }, [allowed, pathname]);

  return null;
}
