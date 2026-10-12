import type { Metadata } from "next";
import { Fragment } from "react";
import Media from "@/components/ui/Media";
import { Arrow } from "@/components/ui/Button";
import Applications from "@/components/sections/Applications";
import FinalCta from "@/components/sections/FinalCta";
import { products, sorbetLine, sorbets } from "@/lib/site";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Polpas de açaí em diferentes concentrações e formatos e Linha Sorbet em 5 sabores, produzidas pela Macunaíma no Pará.",
};

// "8%, 12% e 14%"
const joinPt = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}` : (items[0] ?? "");
const unique = (items: string[]) => [...new Set(items)];

export default function ProdutosPage() {
  return (
    <>
      <PageHero />
      <AcaiLine />
      <Applications cta={false} />
      <SorbetLine />
      <FinalCta />
    </>
  );
}

function PageHero() {
  const lines = [
    {
      href: "#linha-acai",
      eyebrow: "Linha Açaí",
      title: `${products.length} produtos`,
      meta: [joinPt(unique(products.map((p) => p.concentration))), joinPt(unique(products.map((p) => p.weight)))],
    },
    {
      href: "#linha-sorbet",
      eyebrow: "Linha Sorbet",
      title: `${sorbets.length} sabores`,
      meta: [`Embalagem de ${sorbetLine.packaging}`],
    },
  ];

  return (
    <section aria-labelledby="produtos-title" className="relative bg-acai pb-28 pt-40 text-white md:pb-40 md:pt-52">
      <div className="gutter grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-folha" data-reveal="up">
            Nossos produtos
          </p>
          <h1 id="produtos-title" className="t-mega [&_em]:text-folha" data-split>
            Açaí e sorbets
            <br />
            <em>Macunaíma.</em>
          </h1>
        </div>
        <p className="t-lead text-white/75 lg:col-span-4" data-reveal="up">
          A Macunaíma produz polpa de açaí em diferentes concentrações e formatos, atendendo diferentes necessidades de
          seus clientes.
        </p>
      </div>

      <nav aria-label="Linhas de produto" className="gutter mt-14 md:mt-20" data-reveal="up">
        <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/15 sm:grid-cols-2 md:rounded-[2rem]">
          {lines.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group flex h-full items-center justify-between gap-6 bg-acai px-6 py-6 transition-colors duration-500 hover:bg-acai-soft md:px-8 md:py-8"
              >
                <span>
                  <span className="eyebrow block text-folha">{l.eyebrow}</span>
                  <span className="mt-3 block font-display text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                    {l.title}
                  </span>
                  {/* Cada trecho fica inteiro na linha (evita "100" / "g" separados) */}
                  <span className="mt-2 block text-white/60">
                    {l.meta.map((m, i) => (
                      <Fragment key={m}>
                        {i > 0 && " · "}
                        <span className="whitespace-nowrap">{m}</span>
                      </Fragment>
                    ))}
                  </span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 transition-[transform,background-color,color] duration-500 group-hover:rotate-90 group-hover:bg-folha group-hover:text-acai-ink">
                  <Arrow className="size-5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

function AcaiLine() {
  return (
    <section
      id="linha-acai"
      aria-labelledby="linha-acai-title"
      className="relative -mt-10 rounded-t-[2.5rem] bg-nevoa py-24 md:-mt-16 md:rounded-t-[4rem] md:py-36"
    >
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Linha Açaí
          </p>
          <h2 id="linha-acai-title" className="t-display text-acai-ink [&_em]:text-acai" data-split>
            Açaí para diferentes <em>necessidades</em> e aplicações.
          </h2>
        </div>
        <p className="t-lead self-end text-acai-ink/70 lg:col-span-4 lg:col-start-9" data-reveal="up">
          Polpas de açaí indicadas para consumo direto ou para utilização na fabricação de outros produtos.
        </p>
      </div>

      <ul className="gutter mt-16 grid gap-x-5 gap-y-12 sm:grid-cols-2 md:mt-24 xl:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug} id={p.slug} className="scroll-mt-24" data-reveal="up">
            <article>
              <Media
                src={p.photo}
                alt={p.alt}
                label={p.alt}
                className="aspect-[4/5] rounded-[1.75rem] bg-acai"
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                reveal={false}
              >
                <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-acai md:left-5 md:top-5">
                  {p.weight}
                </span>
              </Media>
              <div className="px-1 pt-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-acai">
                  Açaí {p.concentration}
                </h3>
                <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-acai-ink/70">{p.text}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SorbetLine() {
  return (
    <section
      id="linha-sorbet"
      aria-labelledby="linha-sorbet-title"
      className="relative rounded-t-[2.5rem] bg-nevoa py-24 md:rounded-t-[4rem] md:py-36"
    >
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Linha Sorbet
          </p>
          <h2 id="linha-sorbet-title" className="t-display text-acai-ink [&_em]:text-acai" data-split>
            Mais possibilidades para o seu <em>portfólio.</em>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9" data-reveal="up">
          <p className="t-lead text-acai-ink/70">{sorbetLine.text}</p>
          <dl className="grid grid-cols-2 gap-6 border-t border-acai/15 pt-6">
            <div>
              <dt className="eyebrow text-acai-ink/50">Sabores</dt>
              <dd className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-acai">{sorbets.length}</dd>
            </div>
            <div>
              <dt className="eyebrow text-acai-ink/50">Embalagem</dt>
              <dd className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-acai">
                {sorbetLine.packaging}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <ul className="gutter mt-16 grid grid-cols-2 gap-3 sm:gap-5 md:mt-24 md:grid-cols-3 xl:grid-cols-5">
        {sorbets.map((fl) => (
          <li
            key={fl.name}
            className="group rounded-[1.5rem] p-2.5 md:rounded-[1.75rem]"
            style={{ backgroundColor: fl.bg, color: fl.ink }}
            data-reveal="up"
          >
            <Media
              src={fl.src}
              alt={`Embalagem de ${sorbetLine.packaging} do Sorbet ${fl.name} Macunaíma ao lado de uma taça com bolas de sorbet`}
              label={`Pote de Sorbet ${fl.name} ${sorbetLine.packaging} com a fruta ao lado`}
              tone="custom"
              reveal={false}
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 50vw"
              className="aspect-[3/4] rounded-[1.1rem] md:rounded-[1.25rem]"
              style={{ "--ph-a": fl.a, "--ph-b": fl.b, "--ph-c": fl.bg } as React.CSSProperties}
            />
            <div className="px-2 pb-2 pt-4 md:px-3 md:pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">Sorbet</p>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight tracking-[-0.03em] md:text-2xl">
                {fl.name}
              </h3>
              <p className="mt-1 text-sm opacity-70">{sorbetLine.packaging}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
