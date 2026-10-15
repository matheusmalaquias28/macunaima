import type { Metadata } from "next";
import { Fragment } from "react";
import { Arrow } from "@/components/ui/Button";
import Applications from "@/components/sections/Applications";
import FinalCta from "@/components/sections/FinalCta";
import ProductCarousel from "@/components/ui/ProductCarousel";
import { portfolio, products, sorbetLine, sorbets } from "@/lib/site";

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
      <Catalog />
      <Applications cta={false} />
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

function Catalog() {
  const acaiCount = portfolio.filter((item) => item.line === "Açaí").length;
  return (
    <section
      id="linha-acai"
      aria-labelledby="linha-acai-title"
      className="relative -mt-10 scroll-mt-28 rounded-t-[2.5rem] bg-nevoa py-24 md:-mt-16 md:rounded-t-[4rem] md:py-36"
    >
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Portfólio
          </p>
          <h2 id="linha-acai-title" className="t-display text-acai-ink [&_em]:text-acai" data-split>
            Cada produto, com o detalhe para a <em>compra.</em>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9" data-reveal="up">
          <p className="t-lead text-acai-ink/70">
            Polpas de açaí e a Linha Sorbet no mesmo carrossel. Passe para o lado para ver concentração, sabor e
            embalagem de cada item.
          </p>
          <dl className="grid grid-cols-3 gap-4 border-t border-acai/15 pt-6">
            <div>
              <dt className="eyebrow text-acai-ink/50">Açaí</dt>
              <dd className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-acai">{acaiCount}</dd>
            </div>
            <div>
              <dt className="eyebrow text-acai-ink/50">Sorbets</dt>
              <dd className="mt-2 font-display text-3xl font-semibold tracking-[-0.04em] text-acai">{sorbets.length}</dd>
            </div>
            <div>
              <dt className="eyebrow text-acai-ink/50">Embalagens</dt>
              <dd className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-0.04em] text-acai">
                1,02 kg
                <span className="mt-1 block text-base font-medium text-acai-ink/50">{sorbetLine.packaging}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <ProductCarousel items={portfolio} variant="detail" />
      </div>
    </section>
  );
}
