"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";

const journey = [
  { name: "Açaizal", label: "Açaizal nativo na várzea paraense", tone: "rio" as const },
  { name: "Coleta", label: "Coletor subindo no açaizeiro com a peconha", tone: "acai" as const },
  { name: "Transporte até a indústria", label: "Caminhão refrigerado a caminho da fábrica", tone: "deep" as const },
  { name: "Produção", label: "Fruto entrando na linha industrial", tone: "acai" as const },
  { name: "Distribuição", label: "Caminhões carregando paletes de polpa para distribuição", tone: "deep" as const },
];

const facts = [
  { big: "22 anos", text: "de relacionamento com cooperativas e associações ribeirinhas." },
  { big: "Até 24 horas", text: "entre a colheita e a entrada do fruto na linha industrial." },
  { big: "Açaí do Pará", text: "como matéria-prima utilizada pela empresa." },
];

export default function Origin() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current!.querySelector<HTMLElement>("[data-o-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "[data-o-pin]",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.to(track, { x: () => -distance() }, 0).fromTo(
          "[data-o-river]",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0 },
          0,
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="origem" aria-labelledby="origem-title" className="relative bg-acai text-white">
      {/* Abertura em tela cheia */}
      <div className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <Media
          src="/empresa/origem-rio-amazonia.jpg"
          alt="Barco ribeirinho navegando por rio cercado pela floresta amazônica"
          label="Rio na floresta amazônica"
          tone="acai"
          reveal={false}
          parallax={10}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(74,2,52,0)_45%,rgba(74,2,52,0.85)_80%,#4a0234_100%)]" />
        <div className="gutter relative flex h-full flex-col justify-end pb-16 md:pb-24">
          <p className="eyebrow mb-6 text-folha" data-reveal="up">
            Nossa origem
          </p>
          <h2 id="origem-title" className="t-mega" data-split>
            Açaí da Amazônia.
            <br />
            <span className="text-folha">Pará, Brasil.</span>
          </h2>
        </div>
      </div>

      {/* Jornada do fruto */}
      <div data-o-pin className="relative overflow-hidden py-24 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:py-0">
        <div className="gutter mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-14">
          <h3 className="t-title max-w-2xl" data-split>
            Da Amazônia à indústria
          </h3>
          <p className="eyebrow text-white/50">
            <span className="lg:hidden">Deslize para acompanhar o caminho do fruto</span>
            <span className="hidden lg:inline">Role para acompanhar o caminho do fruto</span>
          </p>
        </div>

        <div data-o-track className="relative lg:w-max">
          <ol className="gutter flex snap-x snap-mandatory scroll-px-5 gap-4 no-scrollbar overflow-x-auto pb-2 lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-16 lg:pr-[20vw]">
            {journey.map((step, i) => (
              <li key={step.name} className="group relative w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(30vw,460px)]">
                <Media
                  label={step.label}
                  tone={step.tone}
                  reveal={false}
                  className="aspect-[4/5] rounded-[1.75rem] lg:aspect-auto lg:h-[52svh]"
                />
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-display text-sm font-semibold text-folha">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{step.name}</span>
                </div>
              </li>
            ))}
          </ol>

          {/* Rio que conecta as etapas */}
          <svg
            className="pointer-events-none absolute bottom-0 left-0 hidden h-12 w-full lg:block"
            viewBox="0 0 3200 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 50 C 160 5, 320 95, 480 50 S 800 5, 960 50 S 1280 95, 1440 50 S 1760 5, 1920 50 S 2240 95, 2400 50 S 2720 5, 2880 50 S 3100 80, 3200 50"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="3"
            />
            <path
              data-o-river
              d="M0 50 C 160 5, 320 95, 480 50 S 800 5, 960 50 S 1280 95, 1440 50 S 1760 5, 1920 50 S 2240 95, 2400 50 S 2720 5, 2880 50 S 3100 80, 3200 50"
              fill="none"
              stroke="#96CA65"
              strokeWidth="4"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>
        </div>
      </div>

      {/* Números da origem */}
      <div className="gutter grid gap-px overflow-hidden pb-24 pt-8 md:grid-cols-3 md:pb-36 lg:pt-24">
        {facts.map((f) => (
          <div key={f.big} className="border-t border-white/15 pr-8 pt-8" data-reveal="up">
            <p className="font-display text-[clamp(2.4rem,4.4vw,4.75rem)] font-semibold leading-none tracking-[-0.045em] text-folha">
              {f.big}
            </p>
            <p className="mt-5 max-w-xs text-lg text-white/75">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
