"use client";

import { useState } from "react";
import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";

const flavors: { name: string; bg: string; ink: string; a: string; b: string; src?: string }[] = [
  { name: "Coco", bg: "#EFE6D8", ink: "#22011a", a: "#ffffff", b: "#d9c7ae" },
  { name: "Manga", bg: "#F5A524", ink: "#22011a", a: "#ffd27a", b: "#d9780b" },
  { name: "Maracujá", bg: "#F0D33C", ink: "#22011a", a: "#fff09a", b: "#c9a40f" },
  { name: "Pitaya", bg: "#C8175D", ink: "#ffffff", a: "#f0508f", b: "#7d0a37" },
  { name: "Blue Magic", bg: "#2C5BD8", ink: "#ffffff", a: "#6f97ff", b: "#16338a", src: "/sorbet/blue-magic.jpg" },
];

export default function Sorbet() {
  const [active, setActive] = useState(3);
  const f = flavors[active];

  return (
    <section
      id="sorbet"
      aria-labelledby="sorbet-title"
      className="relative overflow-hidden py-24 transition-[background-color,color] duration-700 ease-[var(--ease-expo)] md:py-36"
      style={{ backgroundColor: f.bg, color: f.ink }}
    >
      <div className="gutter grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-6">
          <p className="eyebrow mb-6 opacity-70" data-reveal="up">
            Conheça também a Linha Sorbet
          </p>
          <h2 id="sorbet-title" className="t-display xl:text-[clamp(2.2rem,4.6vw,5.5rem)]" data-split>
            Mais possibilidades para o seu portfólio.
          </h2>
          <p className="t-lead mt-8 max-w-lg opacity-80" data-reveal="up">
            Além da linha de açaí, a Macunaíma possui uma linha de Sorbet desenvolvida com frutas selecionadas e alta
            concentração de polpa.
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto]" data-reveal="up">
            <div>
              <p className="eyebrow mb-4 opacity-60">5 sabores</p>
              <ul className="flex flex-wrap gap-2" role="list">
                {flavors.map((fl, i) => (
                  <li key={fl.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-pressed={active === i}
                      className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[0.95rem] font-semibold transition-all duration-500 ${
                        active === i ? "border-current bg-current/10" : "border-current/25 hover:border-current"
                      }`}
                    >
                      <span className="size-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: fl.bg }} />
                      {fl.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 opacity-60">Embalagem</p>
              <p className="font-display text-4xl font-semibold tracking-[-0.04em]">5 litros</p>
            </div>
          </div>

          <div className="mt-12" data-reveal="up">
            <Button href="/linha-sorbet" variant={f.ink === "#ffffff" ? "light" : "acai"} size="lg">
              Conheça a linha Sorbet
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] lg:aspect-[1/1]" data-reveal="up">
            {flavors.map((fl, i) => (
              <div
                key={fl.name}
                className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-expo)] ${
                  active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              >
                <Media
                  src={fl.src}
                  alt={`Embalagem de 5 L do Sorbet ${fl.name} Macunaíma ao lado de uma taça com bolas de sorbet`}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  label={`Pote de Sorbet ${fl.name} 5 L com a fruta ao lado`}
                  tone="custom"
                  reveal={false}
                  className="absolute inset-0"
                  style={{ "--ph-a": fl.a, "--ph-b": fl.b, "--ph-c": fl.bg } as React.CSSProperties}
                />
              </div>
            ))}
            <p
              aria-live="polite"
              className="absolute inset-x-6 top-6 font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.9] tracking-[-0.05em] mix-blend-overlay md:inset-x-10 md:top-10"
            >
              {f.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
