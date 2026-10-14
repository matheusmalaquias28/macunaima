"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Button, { Arrow } from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import YouTubeBackground from "@/components/ui/YouTubeBackground";
import { onSiteReady } from "@/components/motion/MotionProvider";
import type { HeroBackground, HeroSlide } from "@/lib/site";

const AUTOPLAY_SECONDS = 8;

function Background({ bg }: { bg: HeroBackground }) {
  switch (bg.type) {
    case "youtube":
      return <YouTubeBackground id={bg.id} />;
    case "video":
      return <video src={bg.src} autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" />;
    case "image":
      return <Image src={bg.src} alt={bg.alt ?? ""} fill priority sizes="100vw" className="object-cover" />;
    case "logo":
      return (
        <div aria-hidden="true" className="media-ph media-tone-deep absolute inset-0 grid place-items-center">
          <Logo className="w-[min(88vw,1100px)] text-white/[0.07]" />
        </div>
      );
  }
}

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [started, setStarted] = useState(false);
  const [reduced, setReduced] = useState(false);
  const current = useRef(0);
  const splits = useRef<SplitText[]>([]);
  const reduce = useRef(false);
  const timer = useRef<gsap.core.Tween | null>(null);
  const touchX = useRef<number | null>(null);
  const goToRef = useRef<(i: number) => void>(() => {});
  const count = slides.length;

  const { contextSafe } = useGSAP(
    () => {
      reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const q = gsap.utils.selector(root);

      // Só o primeiro slide começa visível
      q("[data-h-slide]").forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
      q("[data-h-layer]").forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
      gsap.set("[data-h-title], [data-h-fade]", { opacity: 1 });

      if (reduce.current) {
        setReduced(true);
        setStarted(true);
        return;
      }

      splits.current = q("[data-h-title]").map((el) =>
        SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" }),
      );
      const first = q('[data-h-slide="0"]')[0];
      const fades = [...first.querySelectorAll("[data-h-fade]"), ...q("[data-h-bar]")];
      gsap.set(splits.current[0].lines, { yPercent: 110 });
      gsap.set(fades, { y: 30, opacity: 0 });
      gsap.set(q('[data-h-layer="0"] [data-h-bg]'), { scale: 1.18 });

      const off = onSiteReady(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" }, onComplete: () => setStarted(true) })
          .to(q('[data-h-layer="0"] [data-h-bg]'), { scale: 1, duration: 2.6 }, 0)
          .to(splits.current[0].lines, { yPercent: 0, duration: 1.5, stagger: 0.1 }, 0.15)
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
        splits.current.forEach((s) => s.revert());
      };
    },
    { scope: root },
  );

  const goTo = useCallback(
    (target: number) => {
      const next = (target + count) % count;
      const prev = current.current;
      if (next === prev || !root.current) return;
      current.current = next;
      setActive(next);
      contextSafe(() => {
        const q = gsap.utils.selector(root);
        const outSlide = q(`[data-h-slide="${prev}"]`)[0];
        const inSlide = q(`[data-h-slide="${next}"]`)[0];
        const outLayer = q(`[data-h-layer="${prev}"]`)[0];
        const inLayer = q(`[data-h-layer="${next}"]`)[0];

        if (reduce.current) {
          gsap.set([outSlide, outLayer], { autoAlpha: 0 });
          gsap.set([inSlide, inLayer], { autoAlpha: 1 });
          return;
        }

        const inFades = inSlide.querySelectorAll("[data-h-fade]");
        const inLines = splits.current[next]?.lines ?? [];
        gsap.killTweensOf([outSlide, inSlide, outLayer, inLayer]);
        gsap.set(inLayer, { zIndex: 2 });
        gsap.set(outLayer, { zIndex: 1 });
        gsap.set(inLines, { yPercent: 110 });
        gsap.set(inFades, { y: 30, opacity: 0 });

        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(outSlide, { autoAlpha: 0, y: -24, duration: 0.6, ease: "power2.in" }, 0)
          .fromTo(inLayer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: "power2.inOut" }, 0.1)
          .fromTo(inLayer.querySelector("[data-h-bg]"), { scale: 1.12 }, { scale: 1, duration: 2.6 }, 0.1)
          .set(outLayer, { autoAlpha: 0 }, 1.5)
          .set(outSlide, { y: 0 }, 1.5)
          .set(inSlide, { autoAlpha: 1, y: 0 }, 0.6)
          .to(inLines, { yPercent: 0, duration: 1.3, stagger: 0.1 }, 0.65)
          .to(inFades, { y: 0, opacity: 1, duration: 1.1, stagger: 0.07 }, 0.85);
      })();
    },
    [count, contextSafe],
  );

  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  // Autoplay: a barra de progresso do slide ativo dispara a troca ao terminar
  useEffect(() => {
    if (!started || count < 2 || reduce.current) return;
    const bar = root.current?.querySelector(`[data-h-progress="${active}"]`);
    if (!bar) return;
    timer.current = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: AUTOPLAY_SECONDS, ease: "none", onComplete: () => goToRef.current(active + 1) },
    );
    return () => {
      timer.current?.kill();
      timer.current = null;
      gsap.set(bar, { scaleX: 0 });
    };
  }, [active, started, count]);

  useEffect(() => {
    if (paused || hovering) timer.current?.pause();
    else timer.current?.resume();
  }, [paused, hovering, active, started]);

  const autoplaying = started && count > 1 && !paused && !reduced;

  return (
    <section
      ref={root}
      aria-roledescription="carrossel"
      aria-label="Destaques"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-acai-ink text-white"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) goTo(active + (dx < 0 ? 1 : -1));
      }}
    >
      <div data-h-parallax className="absolute inset-0">
        {slides.map((s, i) => (
          <div key={i} data-h-layer={i} className="absolute inset-0" style={{ visibility: i === 0 ? undefined : "hidden" }}>
            <div data-h-bg className="absolute inset-0">
              <Background bg={s.background} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,1,26,0.6)_0%,rgba(34,1,26,0.3)_30%,rgba(34,1,26,0.6)_60%,rgba(34,1,26,0.95)_100%)]" />

      <div data-h-content className="gutter relative flex h-full flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="grid" aria-live={autoplaying ? "off" : "polite"}>
          {slides.map((s, i) => {
            const Title = i === 0 ? "h1" : "h2";
            const isActive = i === active;
            return (
              <div
                key={i}
                data-h-slide={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${count}`}
                aria-hidden={!isActive}
                inert={!isActive}
                className="col-start-1 row-start-1 self-end"
                style={{ visibility: i === 0 ? undefined : "hidden" }}
              >
                {s.eyebrow && (
                  <p data-h-fade className="eyebrow mb-6 hidden items-center gap-3 text-folha opacity-0 md:flex">
                    <span className="h-px w-10 bg-folha" />
                    {s.eyebrow}
                  </p>
                )}
                <Title data-h-title className="t-mega opacity-0">
                  {s.title}
                </Title>
                <div className="mt-8 grid items-end gap-8 md:mt-10 lg:grid-cols-12">
                  {s.subtitle && (
                    <p
                      data-h-fade
                      className="font-display text-[clamp(1.375rem,2.5vw,2.5rem)] font-light leading-[0.98] tracking-[-0.011em] text-folha opacity-0 lg:col-span-6"
                    >
                      {s.subtitle.map((line, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </p>
                  )}
                  <div className="lg:col-span-5 lg:col-start-8">
                    {s.text && (
                      <p data-h-fade className="t-lead max-w-lg text-white/80 opacity-0">
                        {s.text}
                      </p>
                    )}
                    {s.ctas && s.ctas.length > 0 && (
                      <div data-h-fade className="mt-8 flex flex-wrap gap-3 opacity-0">
                        {s.ctas.map((c) => (
                          <Button key={c.label} href={c.href} variant={c.variant}>
                            {c.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          data-h-bar
          className="mt-10 flex items-center justify-between gap-6 border-t border-white/15 pt-5 text-xs text-white/55 md:mt-12"
        >
          <span className="eyebrow hidden min-w-0 flex-1 truncate md:inline">{slides[active]?.tag}</span>

          {count > 1 && (
            <div
              className="flex items-center gap-4"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <ol className="flex items-center gap-3">
                {slides.map((_, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Ir para o slide ${i + 1}`}
                      aria-current={i === active ? "true" : undefined}
                      className={`group flex items-center gap-2.5 py-2 transition-colors duration-500 ${
                        i === active ? "text-white" : "text-white/45 hover:text-white/80"
                      }`}
                    >
                      <span className="caption">{String(i + 1).padStart(2, "0")}</span>
                      <span className="relative h-px w-10 overflow-hidden bg-white/25 md:w-14">
                        <span
                          data-h-progress={i}
                          className="absolute inset-0 origin-left bg-folha"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goTo(active - 1)}
                  aria-label="Slide anterior"
                  className="grid size-9 place-items-center rounded-full border border-white/25 text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-acai"
                >
                  <Arrow className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(active + 1)}
                  aria-label="Próximo slide"
                  className="grid size-9 place-items-center rounded-full border border-white/25 text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-acai"
                >
                  <Arrow className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? "Retomar troca automática" : "Pausar troca automática"}
                  aria-pressed={paused}
                  className="grid size-9 place-items-center rounded-full text-white/70 transition-colors duration-500 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5" fill="currentColor">
                    {paused ? <path d="M7 4.5v15l12.5-7.5z" /> : <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" />}
                  </svg>
                </button>
              </div>
            </div>
          )}

          <span className="hidden flex-1 items-center justify-end gap-3 sm:flex">
            <span className="eyebrow hidden lg:inline">Role para conhecer</span>
            <span className="relative h-8 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-quart)_infinite] bg-folha" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
