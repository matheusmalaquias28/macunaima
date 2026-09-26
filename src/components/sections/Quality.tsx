"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";

const items = [
  {
    title: "Controle da matéria-prima",
    text: "Os frutos são avaliados antes de serem liberados para a produção.",
    label: "Analista avaliando amostra de frutos na recepção",
    tone: "acai" as const,
  },
  {
    title: "Higienização",
    text: "Os frutos passam por quatro tanques de higienização.",
    label: "Tanques de higienização com os frutos em água",
    tone: "deep" as const,
  },
  {
    title: "Processos controlados",
    text: "Etapas como pasteurização e congelamento são monitoradas dentro dos parâmetros estabelecidos.",
    label: "Painel de controle da pasteurização",
    tone: "acai" as const,
  },
  {
    title: "Laboratórios próprios",
    text: "A Macunaíma possui laboratórios próprios de Físico-Química e Microbiologia.",
    label: "Laboratório de microbiologia com técnica em análise",
    tone: "deep" as const,
  },
  {
    title: "Rastreabilidade",
    text: "O sistema de rastreabilidade permite identificar internamente a região de origem da matéria-prima utilizada em cada lote.",
    label: "Etiqueta de lote sendo conferida no estoque",
    tone: "acai" as const,
  },
];

export default function Quality() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-q-item]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="qualidade-title" className="relative bg-white py-24 md:py-36">
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Qualidade em cada etapa
          </p>
          <h2 id="qualidade-title" className="t-display text-acai" data-split>
            Controle desde a chegada do fruto até o produto final.
          </h2>
        </div>
        <p className="t-lead self-end text-acai-ink/70 lg:col-span-4 lg:col-start-9" data-reveal="up">
          O processo produtivo da Macunaíma conta com acompanhamento do Controle de Qualidade em diferentes etapas.
        </p>
      </div>

      <div className="gutter mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
        {/* Imagem fixa que troca conforme o item ativo (desktop) */}
        <div className="hidden lg:col-span-6 lg:block">
          <div className="sticky top-24 h-[calc(100svh-8rem)] overflow-hidden rounded-[2rem]">
            {items.map((it, i) => (
              <div
                key={it.title}
                className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-expo)] ${
                  active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
                }`}
              >
                <Media label={it.label} tone={it.tone} reveal={false} className="absolute inset-0" />
              </div>
            ))}
            <span className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-acai">
              {items[active].title}
            </span>
          </div>
        </div>

        <ul className="lg:col-span-5 lg:col-start-8">
          {items.map((it, i) => (
            <li
              key={it.title}
              data-q-item
              className={`border-t border-acai/15 py-10 transition-opacity duration-700 lg:flex lg:min-h-[52svh] lg:flex-col lg:justify-center lg:py-0 ${
                active === i ? "lg:opacity-100" : "lg:opacity-30"
              }`}
            >
              <Media label={it.label} tone={it.tone} className="mb-8 aspect-[4/3] rounded-[1.5rem] lg:hidden" />
              <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-acai">
                {it.title}
              </h3>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-acai-ink/70">{it.text}</p>
            </li>
          ))}
          <li className="border-t border-acai/15 pt-10" data-reveal="up">
            <Button href="/processo-e-qualidade" variant="acai" size="lg">
              Conheça nosso processo e qualidade
            </Button>
          </li>
        </ul>
      </div>
    </section>
  );
}
