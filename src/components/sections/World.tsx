"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";

const markets = [
  { region: "América do Norte", countries: ["Estados Unidos", "Canadá"], label: "Contêineres refrigerados no porto, rumo à América do Norte" },
  { region: "Europa", countries: ["Islândia", "Inglaterra"], label: "Produto Macunaíma em ponto de venda europeu" },
  { region: "Oceania", countries: ["Austrália"], label: "Açaí servido em café na Austrália" },
  { region: "Ásia", countries: ["China", "Japão"], label: "Embarque de paletes para a Ásia" },
];

export default function World() {
  const root = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(
    () => {
      const cursor = root.current!.querySelector<HTMLElement>("[data-w-cursor]")!;
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.7, ease: "power3" });
      const list = root.current!.querySelector<HTMLElement>("[data-w-list]")!;
      const move = (e: PointerEvent) => {
        const r = list.getBoundingClientRect();
        xTo(e.clientX - r.left);
        yTo(e.clientY - r.top);
      };
      list.addEventListener("pointermove", move);
      return () => list.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="exportacao"
      aria-labelledby="mundo-title"
      className="relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-acai-ink py-24 text-white md:-mt-16 md:rounded-t-[4rem] md:py-36"
    >
      <div className="gutter grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-folha" data-reveal="up">
            Do Pará para o Brasil e para o mundo
          </p>
          <h2 id="mundo-title" className="t-display" data-split>
            Açaí da Amazônia presente em diferentes mercados.
          </h2>
        </div>
        <div className="flex flex-col justify-end lg:col-span-4">
          <p className="t-lead text-white/70" data-reveal="up">
            A Macunaíma atende <strong className="font-semibold text-white">22 estados brasileiros</strong> e exporta
            para <strong className="font-semibold text-white">quatro continentes</strong>.
          </p>
        </div>
      </div>

      <div data-w-list className="relative mt-16 md:mt-24" onPointerLeave={() => setHover(null)}>
        {/* Imagem que segue o cursor (desktop) */}
        <div
          data-w-cursor
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        >
          <div
            className={`relative -translate-x-1/2 -translate-y-1/2 transition-[opacity,scale] duration-500 ease-[var(--ease-expo)] ${
              hover === null ? "scale-75 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {markets.map((m, i) => (
              <div
                key={m.region}
                className={`absolute inset-0 transition-opacity duration-500 ${hover === i ? "opacity-100" : "opacity-0"}`}
              >
                <Media label={m.label} tone={i % 2 ? "acai" : "rio"} reveal={false} className="h-full w-full rounded-[1.25rem]" />
              </div>
            ))}
            <div className="h-[300px] w-[240px]" />
          </div>
        </div>

        <ul className="border-b border-white/12">
          {markets.map((m, i) => (
            <li
              key={m.region}
              onPointerEnter={() => setHover(i)}
              className="group gutter relative border-t border-white/12"
              data-reveal="up"
            >
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-acai transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <div className="relative flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between md:py-10">
                <h3 className="font-display text-[clamp(2rem,5.6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] transition-[color,transform] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:text-folha">
                  {m.region}
                </h3>
                <p className="flex flex-wrap gap-2">
                  {m.countries.map((c) => (
                    <span key={c} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 md:text-base">
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
