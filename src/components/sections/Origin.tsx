"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";
import SectionHead from "@/components/ui/SectionHead";
import { useLenis } from "@/components/motion/MotionProvider";

const journey = [
  {
    name: "Açaizal",
    src: "/origem/01-acaizal.jpg",
    alt: "Açaizeiros carregados de cachos às margens do rio, com ribeirinho no barco",
    icon: (
      <>
        <path d="M12 21.5c.6-3.6.6-7.4 0-11" />
        <path d="M12 10.5C10.8 7.6 8 6 4.5 6.3M12 10.5c1.2-2.9 4-4.5 7.5-4.2M12 10.5c-2.6-.6-5.6.6-7.2 3.4M12 10.5c2.6-.6 5.6.6 7.2 3.4M12 10.5c-.4-2.8.2-5.3 1.8-7.3" />
        <circle cx="9.6" cy="13.6" r=".9" />
        <circle cx="14.4" cy="13.6" r=".9" />
      </>
    ),
  },
  {
    name: "Coleta",
    src: "/origem/02-coleta.jpg",
    alt: "Coletor com equipamento de segurança subindo no açaizeiro",
    icon: (
      <>
        <path d="M7 10V8.5a5 5 0 0 1 10 0V10" />
        <path d="M3 10h18l-1.7 9.2a1 1 0 0 1-1 .8H5.7a1 1 0 0 1-1-.8L3 10Z" />
        <path d="M9 13.5v3M12 13.5v3M15 13.5v3" />
      </>
    ),
  },
  {
    name: "Transporte até a indústria",
    src: "/origem/03-transporte.jpg",
    alt: "Caminhão refrigerado da Macunaíma na estrada",
    icon: (
      <>
        <path d="M14 17V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1.5M9.5 17h5" />
        <path d="M14 9h3.5l3.5 4.2V16a1 1 0 0 1-1 1h-.5" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </>
    ),
  },
  {
    name: "Produção",
    src: "/origem/04-producao.jpg",
    alt: "Frutos de açaí passando pela higienização na linha industrial",
    icon: (
      <>
        <rect x="6.5" y="3" width="11" height="3.5" rx="1" />
        <path d="M6 6.5h12l-.9 12.6a2 2 0 0 1-2 1.9H8.9a2 2 0 0 1-2-1.9L6 6.5Z" />
        <path d="M6.6 11h10.8M6.9 15.5h10.2" />
      </>
    ),
  },
  {
    name: "Distribuição",
    src: "/origem/05-distribuicao.jpg",
    alt: "Paletes de caixas Macunaíma sendo carregados no caminhão",
    icon: (
      <>
        <rect x="3.5" y="11.5" width="7.5" height="7.5" rx=".8" />
        <rect x="13" y="11.5" width="7.5" height="7.5" rx=".8" />
        <rect x="8.25" y="3" width="7.5" height="7.5" rx=".8" />
        <path d="M2 21.5h20" />
      </>
    ),
  },
];

// Números grandes finos e condensados; unidade pequena em verde
const factBig = "flex flex-wrap items-baseline gap-2 font-display text-[clamp(48px,4.6vw,80px)] font-light leading-[0.9] tracking-[-0.033em] font-stretch-condensed";
const factUnit = "font-sans text-[clamp(14px,1.1vw,17px)] font-medium tracking-normal text-folha font-stretch-normal";

export default function Origin() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const last = journey.length - 1;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const pinEl = root.current!.querySelector<HTMLElement>("[data-o-pin]")!;
        const track = root.current!.querySelector<HTMLElement>("[data-o-track]")!;
        // clientWidth (e não innerWidth) para o último card parar alinhado ao gutter, sem a barra de rolagem
        const distance = () => track.scrollWidth - pinEl.clientWidth;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
          // Etapa ativa acompanha o scrub (e não o scroll cru), para casar com o movimento dos cards
          onUpdate: () => setActive(Math.round(tl.progress() * last)),
        });
        pin.current = tl.scrollTrigger ?? null;
        tl.to(track, { x: () => -distance() }, 0).fromTo("[data-o-progress]", { scaleX: 0 }, { scaleX: 1 }, 0);
        return () => {
          pin.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Clicar numa etapa rola até a posição dela dentro da trava
  const select = (i: number) => {
    const st = pin.current;
    if (!st) return;
    const y = st.start + (st.end - st.start) * (i / last);
    if (lenis.current) lenis.current.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={root} id="origem" aria-labelledby="origem-title" className="relative bg-acai pb-12 text-white md:pb-16">
      <SectionHead onDark items={["04", "Origem", "Bacia amazônica", "Pará — BR"]} />

      {/* Abertura: foto com relevo topográfico, fundindo com o fundo em cima e embaixo */}
      <div className="relative h-[clamp(480px,76svh,840px)] overflow-hidden">
        <Media
          src="/empresa/origem-rio-amazonia.jpg"
          alt="Barco ribeirinho navegando por rio cercado pela floresta amazônica"
          label="Rio na floresta amazônica"
          tone="acai"
          reveal={false}
          parallax={10}
          className="absolute inset-0"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- textura decorativa em SVG */}
        <img src="/brand/topo.svg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.13] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#4a0234_0%,rgba(74,2,52,0.2)_22%,rgba(74,2,52,0.1)_55%,#4a0234_100%)]" />
        <div className="gutter absolute inset-x-0 bottom-[clamp(36px,6vw,90px)] z-[2]">
          <p className="eyebrow mb-[22px] flex items-center gap-3" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            Nossa origem
          </p>
          <h2 id="origem-title" className="t-mega leading-[0.86] [&_em]:inline-block [&_em]:text-[1.02em] [&_em]:text-folha" data-split>
            Açaí da Amazônia.
            <br />
            <em>Pará, Brasil.</em>
          </h2>
        </div>
      </div>

      {/* Da Amazônia à indústria: três números */}
      <div className="gutter relative z-[2] grid gap-10 pb-[clamp(24px,3vw,48px)] pt-[clamp(32px,4vw,64px)] lg:pb-0 lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)]">
        <h3
          className="font-display text-[clamp(20px,1.7vw,26px)] font-medium leading-[1.05] tracking-[-0.0165em] lg:col-span-3 [&_em]:text-[1.2em] [&_em]:font-light [&_em]:not-italic [&_em]:text-folha"
          data-reveal="up"
        >
          Da Amazônia à
          <br />
          <em>indústria</em>
        </h3>
        <dl className="grid gap-7 md:grid-cols-3 md:gap-[clamp(14px,1.6vw,28px)] lg:col-span-8 lg:col-start-5">
          <div className="border-t border-white/12 pt-[18px]" data-reveal="up">
            <dt className={`${factBig} mb-[18px]`}>
              <span data-count="22">22</span>
              <small className={factUnit}>anos</small>
            </dt>
            <dd className="max-w-[28ch] text-[15.5px] text-white/70">de relacionamento com cooperativas e associações ribeirinhas.</dd>
          </div>
          <div className="border-t border-white/12 pt-[18px]" data-reveal="up">
            <dt className={`${factBig} mb-[18px]`}>
              <small className={`${factUnit} -mb-[0.2em] w-full text-white/60`}>Até</small>
              <span data-count="24">24</span>
              <small className={factUnit}>horas</small>
            </dt>
            <dd className="max-w-[28ch] text-[15.5px] text-white/70">entre a colheita e a entrada do fruto na linha industrial.</dd>
          </div>
          <div className="border-t border-white/12 pt-[18px]" data-reveal="up">
            <dt className="mb-[18px] font-display text-[clamp(30px,2.8vw,48px)] font-medium leading-[0.95] tracking-[-0.0248em]">
              Açaí <em className="block text-[1.1em] font-light not-italic tracking-[-0.0055em] text-folha">do Pará</em>
            </dt>
            <dd className="max-w-[28ch] text-[15.5px] text-white/70">como matéria-prima utilizada pela empresa.</dd>
          </div>
        </dl>
      </div>

      {/* Jornada do fruto */}
      <div data-o-pin className="relative overflow-hidden pt-6 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:pt-16">
        <div className="gutter mb-10 lg:mb-[clamp(1.5rem,4svh,3rem)] lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
          <p className="eyebrow max-w-[17rem] leading-[1.45] text-white/50 lg:col-span-4">
            <span className="lg:hidden">Deslize para acompanhar o caminho do fruto</span>
            <span className="hidden lg:inline">Role para acompanhar o caminho do fruto</span>
          </p>

          {/* Linha de etapas: a ativa fica preenchida e o traço avança com o scroll */}
          <div className="hidden lg:col-span-8 lg:block lg:pr-12">
            <ol className="relative flex items-center justify-between">
              <span aria-hidden="true" className="absolute inset-x-[22px] top-1/2 h-px bg-white/15" />
              <span aria-hidden="true" data-o-progress className="absolute inset-x-[22px] top-1/2 h-px origin-left scale-x-0 bg-white/60" />
              {journey.map((step, i) => (
                <li key={step.name} className="relative">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Etapa ${i + 1}: ${step.name}`}
                    aria-current={active === i ? "step" : undefined}
                    className={`grid size-11 place-items-center rounded-full border transition-colors duration-500 ${
                      active === i
                        ? "border-white bg-white text-acai"
                        : "border-white/25 bg-acai text-white/70 hover:border-white/60 hover:text-white"
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {step.icon}
                    </svg>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div data-o-track className="relative lg:w-max">
          <ol className="gutter flex snap-x snap-mandatory scroll-px-5 gap-4 no-scrollbar overflow-x-auto pb-2 lg:snap-none lg:gap-14 lg:overflow-visible lg:pb-0">
            {journey.map((step, i) => (
              // Desktop: o tamanho do card vem da altura da tela, para o bloco travado preenchê-la sem sobra
              <li
                key={step.name}
                className="group relative w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(calc((100cqw-2*var(--gutter)-3.5rem)/1.5),calc(76svh-230px))]"
              >
                {/* Alturas alternadas: pares descem, ímpares sobem; o filete abaixo fica alinhado */}
                <div className={i % 2 ? "lg:pt-10" : "lg:pb-10"}>
                  <Media
                    src={step.src}
                    alt={step.alt}
                    label={step.alt}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw"
                    reveal={false}
                    className="aspect-[4/5] rounded-[4px]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-4 border-t border-white/15 pt-4">
                  <span className="font-display text-[2.6rem] font-medium leading-none tracking-[-0.04em] text-folha font-stretch-condensed lg:text-[3.4rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-[-0.03em] lg:text-[1.75rem]">{step.name}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
