"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";

const items: {
  title: string;
  text: string;
  label: string;
  src?: string;
  alt?: string;
  tone: "acai" | "deep";
  icon: React.ReactNode;
}[] = [
  {
    title: "Controle da matéria-prima",
    text: "Os frutos são avaliados antes de serem liberados para a produção.",
    label: "Analista avaliando amostra de frutos na recepção",
    src: "/qualidade/controle-materia-prima.jpg",
    alt: "Analista de controle de qualidade avaliando frutos de açaí na recepção",
    tone: "acai",
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <circle cx="10.5" cy="10.5" r="2.5" />
        <path d="m15.3 15.3 5.2 5.2" />
      </>
    ),
  },
  {
    title: "Higienização",
    text: "Os frutos passam por quatro tanques de higienização.",
    label: "Tanques de higienização com os frutos em água",
    src: "/qualidade/higienizacao.jpg",
    alt: "Frutos de açaí sendo lavados por jatos de água na linha de higienização da Macunaíma",
    tone: "deep",
    icon: (
      <>
        <path d="M3 5.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
        <rect x="3" y="9" width="18" height="11" rx="1" />
        <path d="M7.5 9v11M12 9v11M16.5 9v11" />
      </>
    ),
  },
  {
    title: "Processos controlados",
    text: "Etapas como pasteurização e congelamento são monitoradas dentro dos parâmetros estabelecidos.",
    label: "Painel de controle da pasteurização",
    src: "/qualidade/processos-controlados.jpg",
    alt: "Etapas monitoradas da produção: medição de temperatura, pasteurização, congelamento e envase da polpa",
    tone: "acai",
    icon: (
      <>
        <path d="M14 13.5V5a2 2 0 1 0-4 0v8.5a4 4 0 1 0 4 0Z" />
        <path d="M12 15.5V9M18.5 3.5v4M16.5 5.5h4" />
      </>
    ),
  },
  {
    title: "Laboratórios próprios",
    text: "A Macunaíma possui laboratórios próprios de Físico-Química e Microbiologia.",
    label: "Laboratório de microbiologia com técnica em análise",
    src: "/qualidade/laboratorios.jpg",
    alt: "Laboratório com microscópio, balança e amostras de polpa de açaí",
    tone: "deep",
    icon: (
      <>
        <path d="M9 3h6M10.5 3v6l-5.3 9.2a1.5 1.5 0 0 0 1.3 2.3h11a1.5 1.5 0 0 0 1.3-2.3L13.5 9V3" />
        <path d="M7.6 14.5h8.8" />
      </>
    ),
  },
  {
    title: "Rastreabilidade",
    text: "O sistema de rastreabilidade permite identificar internamente a região de origem da matéria-prima utilizada em cada lote.",
    label: "Etiqueta de lote sendo conferida no estoque",
    src: "/qualidade/rastreabilidade.jpg",
    alt: "Colaborador lendo o código de barras de um lote de polpa com coletor de dados",
    tone: "acai",
    icon: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.5" />
        <path d="M2.5 10h2M19.5 10h2" />
      </>
    ),
  },
];

// Política de Qualidade e Segurança de Alimentos (texto oficial, PO QUA 001 Rev. 06)
const policy = {
  commitment:
    "A Macunaíma tem o compromisso de garantir a produção de alimentos seguros e de qualidade, atendendo aos requisitos regulamentares, de seus clientes e da própria Empresa.",
  items: [
    "Ampliar competências e capacitação dos colaboradores.",
    "Disseminar a cultura de qualidade e segurança de alimentos em todos os níveis da organização.",
    "Promover a comunicação eficaz com todas as partes interessadas, garantindo que o recebimento de materiais e serviços atenda às necessidades da Macunaíma.",
    "Garantir a melhoria contínua dos processos e a redução de perdas de alimentos.",
  ],
  code: "PO QUA 001 · Rev. 06",
  approved: "Aprovada em 13/04/2026",
  signedBy: "Gustavo Dias Breda · Diretor",
};

const pad = (n: number) => String(n).padStart(2, "0");
// Número e ícone usam a altura da 1ª linha do título para ficarem centralizados com ela
const titleSize = "text-[clamp(1.5rem,2.1vw,1.9rem)] leading-[1.15]";

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
    <section ref={root} id="qualidade" aria-labelledby="qualidade-title" className="relative bg-nevoa py-24 md:py-36">
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Qualidade em cada etapa
          </p>
          <h2 id="qualidade-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            Controle desde a chegada
            <br />
            do <em>fruto</em> até o
            <br />
            produto final.
          </h2>
        </div>
        <p className="t-lead self-end text-acai-ink/70 lg:col-span-4 lg:col-start-9" data-reveal="up">
          O processo produtivo da Macunaíma conta com acompanhamento do Controle de Qualidade em diferentes etapas.
        </p>
      </div>

      <div className="gutter mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
        {/* Imagem fixa que troca conforme o item ativo (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24">
            <div className="relative aspect-[10/11] max-h-[calc(100svh-14rem)] w-full overflow-hidden rounded-[4px] bg-acai">
              {items.map((it, i) => (
                <div
                  key={it.title}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-expo)] ${
                    active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  }`}
                >
                  <Media src={it.src} alt={it.alt} label={it.label} tone={it.tone} sizes="(min-width: 1024px) 40vw, 100vw" reveal={false} className="absolute inset-0" />
                </div>
              ))}
              <span className="absolute bottom-4 left-4 rounded-[3px] bg-acai-ink/55 px-2 py-1 text-[0.7rem] font-bold tabular-nums tracking-[0.12em] text-white backdrop-blur-sm">
                {pad(active + 1)}/{pad(items.length)}
              </span>
            </div>
            <Button href="/processo-e-qualidade" variant="acai" className="mt-6">
              Conheça nosso processo e qualidade
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="border-b border-acai-ink/10">
            {items.map((it, i) => (
              <li
                key={it.title}
                data-q-item
                className={`grid grid-cols-[2.25rem_2.75rem_minmax(0,1fr)] items-start border-t border-acai-ink/10 py-10 transition-opacity duration-700 md:grid-cols-[4.75rem_3.5rem_minmax(0,1fr)] lg:py-14 ${
                  active === i ? "lg:opacity-100" : "lg:opacity-40"
                }`}
              >
                <Media src={it.src} alt={it.alt} label={it.label} tone={it.tone} sizes="100vw" className="col-span-3 mb-8 aspect-[4/3] rounded-[4px] lg:hidden" />
                <span className={`flex items-center ${titleSize}`}>
                  <span className="text-[0.7rem] font-semibold tabular-nums tracking-[0.12em] text-acai-soft">{pad(i + 1)}</span>
                </span>
                <span className={`flex items-center ${titleSize}`}>
                  <svg
                    viewBox="0 0 24 24"
                    className="size-7 text-acai-soft md:size-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.4}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {it.icon}
                  </svg>
                </span>
                <div>
                  <h3 className={`font-display font-semibold tracking-[-0.03em] text-acai-ink ${titleSize}`}>{it.title}</h3>
                  <p className="mt-3 max-w-[26rem] text-[1.05rem] leading-relaxed text-acai-ink/60">{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 lg:hidden" data-reveal="up">
            <Button href="/processo-e-qualidade" variant="acai" size="lg">
              Conheça nosso processo e qualidade
            </Button>
          </div>
        </div>
      </div>

      {/* Política oficial (documento PO QUA 001) */}
      <div className="gutter mt-[clamp(80px,10vw,160px)]">
        <article
          aria-labelledby="politica-title"
          className="grid gap-10 rounded-[4px] bg-white p-6 md:p-10 lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)] lg:p-14"
          data-reveal="up"
        >
          <div className="lg:col-span-4">
            <p className="caption mb-5 flex items-center gap-3 text-acai-soft">
              <span className="h-px w-7 bg-current opacity-70" />
              Política
            </p>
            <h3
              id="politica-title"
              className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] font-semibold leading-[1] tracking-[-0.025em] text-acai-ink [&_em]:font-light [&_em]:not-italic [&_em]:text-acai"
            >
              Qualidade e <em>segurança de alimentos</em>
            </h3>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-[clamp(1.2rem,1.8vw,1.6rem)] font-light leading-[1.25] tracking-[-0.012em] text-acai-ink">
              {policy.commitment}
            </p>
            <ol className="mt-8 border-t border-acai-ink/10">
              {policy.items.map((item, i) => (
                <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-b border-acai-ink/10 py-4">
                  <span className="caption pt-1 text-acai-soft">{pad(i + 1)}</span>
                  <p className="leading-relaxed text-acai-ink/75">{item}</p>
                </li>
              ))}
            </ol>
            <p className="caption mt-6 flex flex-wrap gap-x-5 gap-y-1 text-acai-ink/45">
              <span>{policy.code}</span>
              <span>{policy.approved}</span>
              <span>{policy.signedBy}</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
