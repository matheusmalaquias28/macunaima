"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import { useLang } from "@/components/i18n/LangProvider";

export type ProductSlideData = {
  id: string;
  photo: string;
  alt: string;
  eyebrow: string;
  title: string;
  badge: string;
  text: string;
  specs: { label: string; value: string }[];
  cta: { label: string; href: string };
  /** Cores do sabor (sorbet); sem elas o card é branco */
  bg?: string;
  ink?: string;
};

/** Card grande do catálogo (imagem + informações). `collapsible`: a ficha aparece ao clicar. */
export default function ProductSlide({ item, collapsible = false }: { item: ProductSlideData; collapsible?: boolean }) {
  const en = useLang() === "en";
  const panel = useId();
  const [open, setOpen] = useState(!collapsible);
  const colored = !!item.bg;
  const muted = colored ? "opacity-75" : "text-acai-ink/65";

  return (
    <article
      id={item.id}
      className={`flex w-[min(88vw,920px)] scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] md:min-h-[540px] md:flex-row md:rounded-[2rem] ${
        colored ? "" : "bg-white text-acai-ink ring-1 ring-acai-ink/8"
      }`}
      style={colored ? { backgroundColor: item.bg, color: item.ink } : undefined}
    >
      <div className="relative aspect-[4/5] shrink-0 md:aspect-auto md:w-[46%]">
        <Image src={item.photo} alt={item.alt} fill sizes="(min-width: 768px) 42vw, 88vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-acai md:left-5 md:top-5">{item.badge}</span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-10">
        <p className={`eyebrow ${colored ? "opacity-60" : "text-acai"}`}>{item.eyebrow}</p>
        <h3 className={`mt-4 font-display text-[clamp(2rem,3vw,3.25rem)] font-semibold leading-[0.95] tracking-[-0.035em] ${colored ? "" : "text-acai"}`}>{item.title}</h3>
        <p className={`mt-4 max-w-md text-[0.98rem] leading-relaxed ${muted}`}>{item.text}</p>

        {collapsible && (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panel}
            onClick={() => setOpen((v) => !v)}
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold underline decoration-current/40 underline-offset-4 hover:decoration-current"
          >
            {open ? (en ? "Hide information" : "Ocultar informações") : en ? "More information" : "Mais informações"}
            <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        )}

        <div id={panel} hidden={!open}>
          <p className={`caption mt-7 ${colored ? "opacity-60" : "text-acai"}`}>{en ? "Technical sheet" : "Ficha técnica"}</p>
          <dl className={`mt-3 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-5 ${colored ? "border-current/15" : "border-acai/12"}`}>
            {item.specs.map((s) => (
              <div key={s.label}>
                <dt className={`eyebrow ${colored ? "opacity-55" : "text-acai-ink/45"}`}>{s.label}</dt>
                <dd className="mt-1.5 font-display text-lg font-semibold leading-tight tracking-[-0.02em]">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-auto pt-8">
          <Link
            href={item.cta.href}
            className={`group inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-sm font-semibold transition-colors duration-500 ${
              colored ? "border border-current hover:bg-current/10" : "bg-acai text-white hover:bg-acai-ink"
            }`}
          >
            {item.cta.label}
            <span className="grid size-9 place-items-center rounded-full bg-current/15 transition-transform duration-500 group-hover:rotate-[-45deg]">
              <Arrow className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
