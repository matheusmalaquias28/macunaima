"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/ui/Logo";

function markReady() {
  window.__mcnReady = true;
  window.dispatchEvent(new Event("mcn:ready"));
}

/** Tela de abertura: roda uma vez por sessão. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const seen = document.documentElement.classList.contains("preloader-seen");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (seen || reduce) {
        el.style.display = "none";
        markReady();
        return;
      }
      try {
        sessionStorage.setItem("mcn-preloader", "1");
      } catch {}

      const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      tl.fromTo("[data-pl-logo]", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.1 })
        .fromTo("[data-pl-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, 0)
        .to("[data-pl-inner]", { yPercent: -40, opacity: 0, duration: 0.9 }, "+=0.15")
        .to("[data-pl-green]", { yPercent: -100, duration: 1.1 }, "<0.05")
        .to(el, { yPercent: -100, duration: 1.1 }, "<0.12")
        .add(() => requestAnimationFrame(markReady), "<0.35")
        .set(el, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-acai text-white"
    >
      <div data-pl-green className="absolute inset-x-0 top-full h-full bg-folha" />
      <div data-pl-inner className="flex w-[min(62vw,340px)] flex-col items-center gap-6">
        <Logo className="w-full" data-pl-logo />
        <div className="h-px w-full bg-white/15">
          <div data-pl-bar className="h-full origin-left bg-folha" />
        </div>
      </div>
    </div>
  );
}
