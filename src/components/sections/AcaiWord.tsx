"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";
import AutoVideo from "@/components/ui/AutoVideo";
import LineIcon from "@/components/ui/LineIcon";
import SectionHead from "@/components/ui/SectionHead";

// Largura de "AÇAÍ" em Bricolage 800 dividida pelo font-size (medida no navegador).
// Com ela a palavra ocupa 97% da largura do conteúdo só com CSS, sem medir em JS.
const WORD_RATIO = 1.975;

const chain = [
  {
    k: "Do fruto",
    text: <>Açaí do Pará, da colheita à linha industrial em até 24 horas.</>,
    icon: (
      <>
        <path d="M12 22.5V9.5M12 9.5C9.6 7 6.4 6.6 3 7.6M12 9.5c2.4-2.5 5.6-2.9 9-1.9M12 9.5c-1.7-2.1-2.3-4.7-1.6-7.5M12 9.5c1.7-2.1 2.3-4.7 1.6-7.5" />
        <circle cx="9.6" cy="12.6" r="1.1" />
        <circle cx="12" cy="13.6" r="1.1" />
        <circle cx="14.4" cy="12.6" r="1.1" />
        <circle cx="10.8" cy="15.4" r="1.1" />
        <circle cx="13.2" cy="15.4" r="1.1" />
      </>
    ),
  },
  {
    k: "À polpa",
    text: (
      <>
        Polpa de açaí em concentrações de <b>8%</b>, <b>12%</b> e <b>14%</b>.
      </>
    ),
    icon: (
      <>
        <path d="M12 2.5C8 7.6 6 11.2 6 14.2a6 6 0 0 0 12 0c0-3-2-6.6-6-11.7z" />
        <path d="M9.2 15.2a2.8 2.8 0 0 0 2.8 2.6" />
      </>
    ),
  },
  {
    k: "Ao seu negócio",
    text: <>Embalagens de 1,02 kg e 100 g, com fornecimento ao longo do ano.</>,
    icon: (
      <>
        <path d="M2.5 20.5h19M4.5 20.5v1.5M12 20.5v1.5M19.5 20.5v1.5M4 20.5v-7h7v7M13 20.5v-11h7v11" />
        <path d="M14 4.5h6.5M18.5 2.5l2 2-2 2" />
      </>
    ),
  },
];

export default function AcaiWord() {
  const root = useRef<HTMLElement>(null);

  // A palavra encolhe levemente enquanto atravessa a tela
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-acai-word]",
          { scale: 1 },
          {
            scale: 0.94,
            ease: "none",
            scrollTrigger: { trigger: "[data-acai-knock]", start: "center bottom", end: "center top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Açaí — do fruto ao seu negócio" className="relative overflow-hidden bg-white pb-[clamp(80px,10vw,160px)] text-acai-ink">
      <SectionHead items={["02", "Açaí", "Euterpe oleracea", "Matéria-prima"]} />

      {/* Palavra vazada: fundo branco em "screen" sobre o vídeo deixa o vídeo aparecer só dentro das letras */}
      <div className="relative isolate mt-[clamp(24px,3vw,48px)]">
        {/* inset de 1px: a borda do vídeo fica sempre sob o branco (evita fio em posições fracionárias) */}
        <AutoVideo
          src="/video/polpa.mp4"
          poster="/video/polpa-poster.jpg"
          className="absolute inset-px h-[calc(100%-2px)] w-[calc(100%-2px)] bg-acai object-cover"
        />
        <div
          data-acai-knock
          aria-hidden="true"
          className="gutter relative flex items-center justify-center overflow-hidden bg-white pb-[clamp(8px,1.5vw,24px)] pt-[clamp(48px,6vw,96px)] mix-blend-screen"
        >
          {/* pb em "em": a cedilha desce além da entrelinha curta e seria cortada */}
          <span
            data-acai-word
            className="block whitespace-nowrap pb-[0.16em] font-display font-extrabold leading-[0.8] tracking-[-0.0385em] text-black"
            style={{ fontSize: `calc((100cqw - 2 * var(--gutter)) * 0.97 / ${WORD_RATIO})` }}
          >
            AÇAÍ
          </span>
        </div>
        <p className="sr-only">Açaí</p>
      </div>

      <ol className="gutter mt-[clamp(40px,5vw,80px)] grid gap-[30px] md:grid-cols-3 md:gap-[clamp(14px,1.6vw,28px)]">
        {chain.map((c, i) => (
          <li key={c.k} className="relative border-t border-acai-ink pt-[18px]" data-reveal="up">
            <span className="caption mb-[18px] flex items-center gap-2.5 text-acai-soft">
              <LineIcon>{c.icon}</LineIcon>
              {c.k}
            </span>
            <p className="max-w-[20ch] font-display text-[clamp(1.1875rem,1.6vw,1.5625rem)] leading-[1.12] tracking-[-0.0165em] [&_b]:font-semibold [&_b]:text-acai">
              {c.text}
            </p>
            <span className="caption absolute right-0 top-[18px] text-acai-ink/45">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ol>

      {/* Mosaico: fruto, higienização e polpa */}
      <div className="gutter mt-[clamp(56px,8vw,140px)] grid grid-cols-12 items-start gap-[clamp(14px,1.6vw,28px)]">
        <Media
          src="/empresa/macro-fruto-acai.webp"
          alt="Açaí em close na chegada à indústria"
          label="Açaí em close"
          sizes="(min-width: 768px) 58vw, 100vw"
          parallax={8}
          className="col-span-12 aspect-[9/5] md:col-span-7"
        />
        <Media
          src="/acai/higienizacao-linha.webp"
          alt="Frutos na linha de higienização"
          label="Frutos na linha de higienização"
          sizes="(min-width: 768px) 33vw, 58vw"
          className="col-span-7 mt-[clamp(14px,1.6vw,28px)] aspect-[3/4] md:col-span-4 md:col-start-9 md:mt-[clamp(40px,10vw,180px)]"
        />
        {/* Moldura branca fica no wrapper: o clip-path da revelação cortaria o outline */}
        <div className="relative z-[2] col-span-7 col-start-6 -mt-[30%] outline outline-[clamp(8px,1vw,16px)] outline-white md:col-span-4 md:col-start-5 md:-mt-[calc(clamp(14px,1.6vw,28px)+clamp(20px,6vw,100px))]">
          <Media
            src="/acai/polpa.webp"
            alt="Polpa de açaí na linha de produção"
            label="Polpa de açaí na linha de produção"
            sizes="(min-width: 768px) 33vw, 58vw"
            className="aspect-square"
          />
        </div>
        <p className="caption col-span-12 mt-4 text-acai-ink/50 md:col-span-3 md:col-start-10">Fruto · Higienização · Polpa</p>
      </div>
    </section>
  );
}
