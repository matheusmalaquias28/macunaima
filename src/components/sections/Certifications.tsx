"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "@/components/i18n/LangProvider";
import { seals } from "@/lib/site";

const TIP_W = 280;

export default function Certifications() {
  const lang = useLang();
  const en = lang === "en";
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [pinned, setPinned] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: TIP_W });

  // Posiciona o balão acima do selo, sem sair da tela
  const place = useCallback((i: number) => {
    const sec = root.current;
    const btn = sec?.querySelector<HTMLElement>(`[data-seal="${i}"]`);
    if (!sec || !btn) return;
    const s = sec.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const w = Math.min(TIP_W, s.width - 32);
    const x = Math.min(Math.max(b.left + b.width / 2 - s.left, w / 2 + 16), s.width - w / 2 - 16);
    setPos({ x, y: b.top - s.top, w });
  }, []);

  const show = (i: number, pin = false) => {
    place(i);
    setOpen(i);
    setPinned(pin);
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest?.("[data-seal], [data-seal-tip]")) setOpen(null);
    };
    const onResize = () => place(open);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, place]);

  const seal = open !== null ? seals[open] : null;

  return (
    <section
      ref={root}
      id="certificacoes"
      aria-labelledby="cert-title"
      className="relative bg-white pb-[clamp(48px,6vw,96px)] pt-[clamp(48px,6vw,88px)]"
    >
      <div className="gutter mb-[clamp(28px,3.5vw,52px)] grid items-end gap-5 md:grid-cols-12 md:gap-[clamp(14px,1.6vw,28px)]">
        <div className="md:col-span-6">
          <p className="eyebrow mb-4 flex items-center gap-3 text-acai" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            {en ? "Certifications" : "Certificações"}
          </p>
          <h2 id="cert-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            {en ? (
              <>
                Recognized <em>standards</em>
              </>
            ) : (
              <>
                Padrões <em>reconhecidos</em>
              </>
            )}
          </h2>
        </div>
        <p className="text-[1.02rem] leading-relaxed text-acai-ink/65 md:col-span-5 md:col-start-8" data-reveal="up">
          {en
            ? "Certifications in Brazil and in the markets Macunaíma exports to. Hover over or tap a seal to learn more."
            : "Certificações no Brasil e nos mercados para onde a Macunaíma exporta. Passe o mouse ou toque em um selo para saber mais."}
        </p>
      </div>

      <ul className="gutter grid grid-cols-3 gap-3 sm:grid-cols-5 md:gap-4 xl:grid-cols-9">
        {seals.map((s, i) => (
          <li key={s.src} data-reveal="up">
            <button
              type="button"
              data-seal={i}
              aria-expanded={open === i}
              aria-describedby={open === i ? "seal-tip" : undefined}
              aria-label={s.name}
              onMouseEnter={() => !pinned && show(i)}
              onMouseLeave={() => !pinned && setOpen(null)}
              onFocus={() => show(i)}
              onBlur={() => !pinned && setOpen(null)}
              onClick={() => (open === i && pinned ? setOpen(null) : show(i, true))}
              className={`group relative block aspect-[4/3] w-full rounded-2xl border bg-white transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 ${
                open === i
                  ? "-translate-y-1 border-acai/40 shadow-[0_18px_40px_-24px_rgba(74,2,52,0.55)]"
                  : "border-acai-ink/10 hover:border-acai/30"
              }`}
            >
              <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1280px) 140px, 30vw" className="object-contain p-[14%]" />
            </button>
          </li>
        ))}
      </ul>

      {seal && (
        <div
          id="seal-tip"
          role="tooltip"
          data-seal-tip
          className="pointer-events-auto absolute z-20 -translate-x-1/2 -translate-y-full pb-3"
          style={{ left: pos.x, top: pos.y, width: pos.w }}
        >
          <div className="rounded-2xl bg-acai-ink p-4 text-white shadow-[0_24px_50px_-20px_rgba(34,1,26,0.6)]">
            <p className="font-display text-[1.05rem] font-semibold">{seal.name}</p>
            <p className="mt-1.5 text-[0.9rem] leading-relaxed text-white/80">{seal.text[lang]}</p>
          </div>
        </div>
      )}
    </section>
  );
}
