"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Button, { Arrow } from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { useLang } from "@/components/i18n/LangProvider";
import { sorbets } from "@/lib/site";
import { lp, type T } from "@/lib/i18n";

const AUTOPLAY_MS = 7000;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

// Banners provisórios: serão trocados pelas fotografias reais (floresta, palmeiras e cachos de açaí; linha sorvete)
type Slide = {
  key: string;
  line: T;
  title: T;
  text: T;
  cta: { label: T; href: string };
};

const slides: Slide[] = [
  {
    key: "acai",
    line: { pt: "Linha Açaí", en: "Açaí line" },
    title: { pt: "Polpa de açaí 8%, 12% e 14%", en: "Açaí pulp 8%, 12% and 14%" },
    text: {
      pt: "Produzida no Pará, perto da origem do fruto, para distribuidores, açaiterias, indústrias e food service.",
      en: "Made in Pará, close to where the fruit grows, for distributors, açaí shops, industries and food service.",
    },
    cta: { label: { pt: "Conheça a Linha Açaí", en: "Explore the Açaí line" }, href: "/produtos/acai" },
  },
  {
    key: "sorvete",
    line: { pt: "Linha Sorvete", en: "Sorbet line" },
    title: { pt: "Sorbet em 5 sabores, potes de 5 litros", en: "Sorbet in 5 flavors, 5-liter tubs" },
    text: {
      pt: "Frutas selecionadas e alta concentração de polpa. Sem glúten, sem leite, sem corantes e sem aromatizantes.",
      en: "Selected fruits and a high pulp concentration. Gluten-free, dairy-free, no colorings and no flavorings.",
    },
    cta: { label: { pt: "Conheça a Linha Sorvete", en: "Explore the Sorbet line" }, href: "/produtos/sorvete" },
  },
];

function Background({ k }: { k: string }) {
  if (k === "acai") {
    return (
      <Image
        src="/empresa/origem-acaizal.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-[50%_35%]"
      />
    );
  }
  // Linha Sorvete: fundo nas cores da linha com os potes ao lado
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_20%,#c8175d_0%,#6d1650_45%,#22011a_100%)]">
      <div className="absolute inset-y-0 right-[4%] hidden w-[46%] items-center justify-end gap-4 pt-24 lg:flex">
        {sorbets.slice(0, 3).map((s, i) => (
          <div
            key={s.slug}
            className={`relative aspect-[3/4] w-[31%] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ${
              i === 1 ? "-translate-y-8" : "translate-y-6"
            }`}
          >
            <Image src={s.src} alt="" fill sizes="16vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeHero() {
  const lang = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const go = (i: number) => setActive((i + count) % count);

  const running = !paused && !hovering && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, running, count]);

  const en = lang === "en";

  return (
    <section
      aria-roledescription={en ? "carousel" : "carrossel"}
      aria-label={en ? "Product lines" : "Linhas de produto"}
      className="relative h-[100svh] max-h-[960px] min-h-[640px] overflow-hidden bg-acai-ink text-white"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
      }}
    >
      {slides.map((s, i) => (
        <div
          key={s.key}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-[var(--ease-expo)] ${
            i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
          }`}
        >
          <Background k={s.key} />
        </div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,1,26,0.78)_0%,rgba(34,1,26,0.45)_45%,rgba(34,1,26,0)_75%),linear-gradient(0deg,rgba(34,1,26,0.7)_0%,rgba(34,1,26,0)_45%)]" />

      <div className="gutter relative flex h-full flex-col justify-end pb-10 pt-28 md:pb-14">
        {/* Selo de posicionamento */}
        <p className="mb-7 inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-acai shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] md:text-[0.8rem]">
          <span className="size-2 rounded-full bg-folha" aria-hidden="true" />
          {en ? "Manufacturer" : "Indústria"}
          <span className="h-3.5 w-px bg-acai/25" aria-hidden="true" />
          {en ? "Wholesale only (B2B)" : "Venda exclusiva B2B"}
        </p>

        {/* Logomarca em destaque, acima da frase */}
        <h1>
          <Logo className="w-[min(86vw,760px)] text-white drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)]" />
          <span className="mt-4 block font-display text-[clamp(1.05rem,1.6vw,1.5rem)] font-light tracking-[-0.005em] text-white/85">
            {en ? "The real açaí from the Amazon." : "O verdadeiro açaí da Amazônia."}
          </span>
        </h1>

        <div className="mt-8 grid md:mt-10" aria-live={running ? "off" : "polite"}>
          {slides.map((s, i) => (
            <div
              key={s.key}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}: ${s.line[lang]}`}
              aria-hidden={i !== active}
              inert={i !== active}
              className={`col-start-1 row-start-1 grid gap-6 transition-[opacity,transform] duration-700 ease-[var(--ease-expo)] lg:grid-cols-12 lg:items-end ${
                i === active ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-4 opacity-0"
              }`}
            >
              <div className="lg:col-span-6">
                <p className="eyebrow flex items-center gap-3 text-folha">
                  <span className="h-px w-8 bg-current" />
                  {s.line[lang]}
                </p>
                <p className="mt-3 font-display text-[clamp(1.4rem,2.3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.015em]">
                  {s.title[lang]}
                </p>
                <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-white/80 md:text-[1.05rem]">{s.text[lang]}</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
                <Button href={lp(lang, s.cta.href)} variant="folha">
                  {s.cta.label[lang]}
                </Button>
                <Button href={lp(lang, "/contato")} variant="outline-light">
                  {en ? "Buy wholesale" : "Quero Comprar"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-between gap-6 border-t border-white/20 pt-5">
          <ol className="flex items-center gap-4">
            {slides.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={s.line[lang]}
                  aria-current={i === active ? "true" : undefined}
                  className={`flex items-center gap-3 py-2 text-sm font-semibold transition-colors ${
                    i === active ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  <span className="relative h-0.5 w-10 overflow-hidden rounded-full bg-white/25 md:w-16">
                    <span
                      key={`${active}-${running}`}
                      className="absolute inset-0 origin-left bg-folha"
                      style={{
                        transform: i === active && !running ? "scaleX(1)" : "scaleX(0)",
                        animation: i === active && running ? `hero-progress ${AUTOPLAY_MS}ms linear forwards` : undefined,
                      }}
                    />
                  </span>
                  <span className="hidden sm:inline">{s.line[lang]}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label={en ? "Previous slide" : "Slide anterior"}
              className="grid size-10 place-items-center rounded-full border border-white/30 transition-colors duration-500 hover:border-white hover:bg-white hover:text-acai"
            >
              <Arrow className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label={en ? "Next slide" : "Próximo slide"}
              className="grid size-10 place-items-center rounded-full border border-white/30 transition-colors duration-500 hover:border-white hover:bg-white hover:text-acai"
            >
              <Arrow className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? (en ? "Resume autoplay" : "Retomar troca automática") : en ? "Pause autoplay" : "Pausar troca automática"}
              aria-pressed={paused}
              className="grid size-10 place-items-center rounded-full text-white/70 transition-colors hover:text-white"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5" fill="currentColor">
                {paused ? <path d="M7 4.5v15l12.5-7.5z" /> : <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
