"use client";

import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
// Evita recalcular tudo quando a barra de endereço do celular aparece/some (causava travadas)
ScrollTrigger.config({ ignoreMobileResize: true });

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });
export const useLenis = () => useContext(LenisContext);

/** Executa `cb` quando o preloader terminar (ou imediatamente, se já terminou). */
export function onSiteReady(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  if (window.__mcnReady) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("mcn:ready", handler, { once: true });
  return () => window.removeEventListener("mcn:ready", handler);
}

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Scroll suave, sincronizado com o ticker do GSAP
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Troca de página: vai à âncora da URL (ex.: /#origem) ou volta ao topo
  useEffect(() => {
    const target = window.location.hash ? document.querySelector<HTMLElement>(decodeURIComponent(window.location.hash)) : null;
    if (!target) {
      lenisRef.current?.scrollTo(0, { immediate: true });
      return;
    }
    // Espera dois quadros para os pins do ScrollTrigger já terem criado seus espaçadores
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const lenis = lenisRef.current;
        if (!lenis) return target.scrollIntoView();
        lenis.resize(); // o Lenis ainda guarda a altura da página anterior e limitaria a rolagem
        lenis.scrollTo(target, { immediate: true, force: true });
      }),
    );
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Links para âncoras da própria página rolam suave (inclusive com o menu mobile aberto, que pausa o Lenis)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(decodeURIComponent(url.hash));
      if (!target) return;
      // O <Link> do Next respeita o preventDefault e não pula sem animação; o onClick (ex.: fechar menu) continua rodando
      e.preventDefault();
      history.pushState(null, "", url.hash);
      const lenis = lenisRef.current;
      if (!lenis) return target.scrollIntoView({ behavior: "smooth" });
      // Com o menu mobile aberto o Lenis está pausado (e a página travada): espera ele voltar, por até ~1s
      let tries = 60;
      const go = () => {
        if (lenis.isStopped && tries-- > 0) return requestAnimationFrame(go);
        lenis.scrollTo(target, { duration: 1.4, force: true });
      };
      go();
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, []);

  // Animações de entrada declarativas via data-attributes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Blocos que sobem
        // Obs.: evitamos `once: true` porque triggers que se matam durante a criação quebram o refresh
        ScrollTrigger.batch('[data-reveal="up"]', {
          start: "top 88%",
          onEnter: (els) => {
            const fresh = (els as HTMLElement[]).filter((el) => !el.dataset.revealed);
            fresh.forEach((el) => (el.dataset.revealed = "1"));
            if (fresh.length)
              gsap.fromTo(
                fresh,
                { y: 48, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.09 },
              );
          },
        });

        // Imagens com cortina + zoom interno
        gsap.utils.toArray<HTMLElement>('[data-reveal="img"]').forEach((el) => {
          const inner = el.querySelector("[data-media-inner]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          });
          tl.fromTo(
            el,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
          );
          if (inner) tl.fromTo(inner, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.1);
        });

        // Contadores
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = parseFloat(el.dataset.count || "0");
          const obj = { v: 0 };
          const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");
          el.textContent = fmt(0);
          gsap.to(obj, {
            v: target,
            duration: 2.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
            onUpdate: () => {
              el.textContent = fmt(obj.v);
            },
          });
        });

        // O revert desfaz as entradas; limpa a marca para que reanimem (ex.: montagem dupla do StrictMode)
        return () => {
          document.querySelectorAll<HTMLElement>("[data-revealed]").forEach((el) => delete el.dataset.revealed);
        };
      });

      // Parallax só a partir do tablet: no celular o scroll é nativo e o scrub em imagens grandes engasga
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Parallax
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.dataset.parallax || "12");
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
      });

      // Títulos com linhas mascaradas (espera as fontes para medir certo)
      let splits: SplitText[] = [];
      document.fonts.ready.then(() => {
        splits = gsap.utils.toArray<HTMLElement>("[data-split]").map((el) => {
          gsap.set(el, { opacity: 1 });
          return SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit(self) {
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
              return gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.3,
                ease: "expo.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
              });
            },
          });
        });
        ScrollTrigger.refresh();
      });

      return () => {
        splits.forEach((s) => s.revert());
        mm.revert();
      };
    },
    { dependencies: [pathname] },
  );

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>;
}

declare global {
  interface Window {
    __mcnReady?: boolean;
  }
}
