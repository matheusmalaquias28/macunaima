"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";
import YouTubeBackground from "@/components/ui/YouTubeBackground";
import { onSiteReady } from "@/components/motion/MotionProvider";

export default function Hero({ videoSrc, youtubeId }: { videoSrc?: string; youtubeId?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.set("[data-h-title], [data-h-fade]", { opacity: 1 });
      if (reduce) return;

      const q = gsap.utils.selector(root);
      const bg = q("[data-h-bg]");
      const fades = q("[data-h-fade]");
      const split = SplitText.create(q("[data-h-title]"), { type: "lines", mask: "lines", linesClass: "split-line" });
      gsap.set(split.lines, { yPercent: 110 });
      gsap.set(fades, { y: 30, opacity: 0 });
      gsap.set(bg, { scale: 1.18 });

      const off = onSiteReady(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(bg, { scale: 1, duration: 2.6 }, 0)
          .to(split.lines, { yPercent: 0, duration: 1.5, stagger: 0.1 }, 0.15)
          .to(fades, { y: 0, opacity: 1, duration: 1.3, stagger: 0.08 }, 0.55);
      });

      // Saída suave ao rolar
      gsap.to("[data-h-content]", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-h-parallax]", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });

      return () => {
        off();
        split.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[640px] overflow-hidden bg-acai-ink text-white">
      <div data-h-parallax className="absolute inset-0">
        <div data-h-bg className="absolute inset-0">
          {youtubeId ? (
            <YouTubeBackground id={youtubeId} />
          ) : videoSrc ? (
            <video src={videoSrc} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />
          ) : (
            <Media
              reveal={false}
              tone="rio"
              label="Vídeo ou foto aérea do rio e dos açaizais no Pará (full HD, loop)"
              labelAt="top"
              className="absolute inset-0"
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,1,26,0.6)_0%,rgba(34,1,26,0.3)_30%,rgba(34,1,26,0.6)_60%,rgba(34,1,26,0.95)_100%)]" />

      <div data-h-content className="gutter relative flex h-full flex-col justify-end pb-10 pt-32 md:pb-14">
        <p data-h-fade className="eyebrow mb-6 hidden items-center md:flex gap-3 text-folha opacity-0">
          <span className="h-px w-10 bg-folha" />
          Pará, Brasil
        </p>
        <h1 data-h-title className="t-mega opacity-0">
          Açaí da Amazônia.
        </h1>
        <div className="mt-8 grid items-end gap-8 md:mt-10 lg:grid-cols-12">
          <p data-h-fade className="t-title text-folha opacity-0 lg:col-span-6">
            Produzido no Pará
            <br />
            para o mundo.
          </p>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-h-fade className="t-lead max-w-lg text-white/80 opacity-0">
              Da origem do fruto à produção industrial, a Macunaíma transforma o açaí do Pará em produtos para
              empresas que precisam de qualidade, escala e consistência.
            </p>
            <div data-h-fade className="mt-8 flex flex-wrap gap-3 opacity-0">
              <Button href="/produtos">Conheça nossos produtos</Button>
              <Button href="/contato" variant="outline-light">
                Quero comprar
              </Button>
            </div>
          </div>
        </div>

        <div data-h-fade className="mt-12 hidden items-center md:flex justify-between border-t border-white/15 pt-5 text-xs text-white/55 opacity-0">
          <span className="eyebrow hidden md:inline">Indústria de polpa de açaí</span>
          <span className="flex items-center gap-3">
            <span className="eyebrow hidden sm:inline">Role para conhecer</span>
            <span className="relative h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-quart)_infinite] bg-folha" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
