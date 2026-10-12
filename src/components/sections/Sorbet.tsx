"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";
import { useLenis } from "@/components/motion/MotionProvider";
import { sorbetLine, sorbets as flavors } from "@/lib/site";

export default function Sorbet() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();
  const [active, setActive] = useState(0);
  const f = flavors[active];
  const last = flavors.length - 1;

  // Desktop: a seção trava e o scroll percorre os sabores
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        pin.current = ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.7 * last}`,
          pin: true,
          invalidateOnRefresh: true,
          snap: { snapTo: 1 / last, directional: false, duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut", delay: 0.08 },
          onUpdate: (self) => setActive(Math.round(self.progress * last)),
        });
        return () => {
          pin.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Com a seção travada, escolher um sabor rola até a posição dele; sem trava, troca direto
  const select = (i: number, fromHover = false) => {
    const st = pin.current;
    if (!st) return setActive(i);
    if (fromHover) return;
    const y = st.start + (st.end - st.start) * (i / last);
    if (lenis.current) lenis.current.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={root}
      id="sorbet"
      aria-labelledby="sorbet-title"
      className="relative overflow-hidden py-24 transition-[background-color,color] duration-700 ease-[var(--ease-expo)] md:py-36 lg:flex lg:h-[100svh] lg:min-h-[680px] lg:items-center lg:py-0"
      // Destaque do título em roxo nos sabores claros; nos escuros acompanha o texto branco
      style={{ backgroundColor: f.bg, color: f.ink, "--em": f.ink === "#ffffff" ? "currentColor" : "#4a0234" } as React.CSSProperties}
    >
      <div className="gutter grid w-full gap-16 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pt-12">
        <div className="flex flex-col lg:col-span-6">
          <p className="eyebrow mb-6 opacity-70" data-reveal="up">
            Conheça também a Linha Sorbet
          </p>
          <h2 id="sorbet-title" className="t-title [&_em]:text-[var(--em)] [&_em]:transition-colors [&_em]:duration-700" data-split>
            Mais
            <br />
            possibilidades
            <br />
            para o seu
            <br />
            <em>portfólio.</em>
          </h2>
          <p className="t-lead mt-8 max-w-lg opacity-80 lg:mt-6" data-reveal="up">
            {sorbetLine.text}
          </p>

          <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto] lg:mt-10" data-reveal="up">
            <div>
              <p className="eyebrow mb-4 opacity-60">{flavors.length} sabores</p>
              <ul className="flex flex-wrap gap-2" role="list">
                {flavors.map((fl, i) => (
                  <li key={fl.name}>
                    <button
                      type="button"
                      onMouseEnter={() => select(i, true)}
                      onClick={() => select(i)}
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
              <p className="font-display text-4xl font-semibold tracking-[-0.04em]">{sorbetLine.packaging}</p>
            </div>
          </div>

          <div className="mt-12 lg:mt-10" data-reveal="up">
            <Button href="/linha-sorbet" variant={f.ink === "#ffffff" ? "light" : "acai"} size="lg">
              Conheça a linha Sorbet
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] lg:ml-auto lg:h-[min(84svh,860px)] lg:w-auto lg:max-w-full" data-reveal="up">
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
            <ol className="absolute bottom-6 right-6 hidden gap-1.5 lg:flex" aria-hidden="true">
              {flavors.map((fl, i) => (
                <li
                  key={fl.name}
                  className={`h-1 rounded-full bg-white transition-all duration-500 ${active === i ? "w-8 opacity-100" : "w-3 opacity-50"}`}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
