import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import { Arrow } from "@/components/ui/Button";
import { products } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { lp, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/produtos/acai">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "Açaí pulp 8%, 12% and 14% · Wholesale" : "Polpa de açaí 8%, 12% e 14% · Atacado",
    description: en
      ? "Macunaíma açaí pulp catalog: 8%, 12% and 14% concentrations, technical sheet and B2B quote. Manufactured in Pará, Brazil."
      : "Catálogo de polpas de açaí Macunaíma: concentrações de 8%, 12% e 14%, ficha técnica e cotação B2B. Produzidas no Pará.",
    path: "/produtos/acai",
  });
}

export default async function AcaiPage({ params }: PageProps<"/[lang]/produtos/acai">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";

  const sheet = (p: (typeof products)[number]) => [
    { label: en ? "Concentration" : "Concentração", value: p.concentration },
    { label: en ? "Pack" : "Embalagem", value: en ? `Pack · ${p.weight.replace(",", ".")}` : `Pacote · ${p.weight}` },
    { label: en ? "Storage" : "Conservação", value: en ? "Frozen" : "Congelado" },
    { label: en ? "Origin" : "Origem", value: en ? "Pará, Brazil" : "Pará, Brasil" },
    { label: en ? "Use" : "Indicação", value: en ? "Direct consumption and industry" : "Consumo direto e indústria" },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: en ? "Products" : "Produtos", path: "/produtos/acai" },
          { name: "Açaí", path: "/produtos/acai" },
        ])}
      />
      <PageHero
        id="acai-title"
        eyebrow={en ? "Products · Açaí" : "Produtos · Açaí"}
        title={
          en ? (
            <>
              Açaí pulp <em>8%, 12% and 14%.</em>
            </>
          ) : (
            <>
              Polpa de açaí <em>8%, 12% e 14%.</em>
            </>
          )
        }
        b2b={en ? "Wholesale only (B2B)" : "Venda exclusiva B2B"}
        text={
          en
            ? "Frozen açaí pulp for distributors, açaí shops, industries and food service, in different concentrations and packs."
            : "Polpa de açaí congelada para distribuidores, açaiterias, indústrias e food service, em diferentes concentrações e embalagens."
        }
      >
        <nav aria-label={en ? "Concentrations" : "Concentrações"} className="gutter mt-10 md:mt-14" data-reveal="up">
          <ul className="flex flex-wrap gap-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="inline-flex items-center gap-3 rounded-full border border-acai/20 bg-white py-2 pl-5 pr-2 font-display text-xl font-semibold text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white"
                >
                  Açaí {p.concentration}
                  <span className="grid size-8 place-items-center rounded-full bg-current/10">
                    <Arrow className="size-3.5 rotate-90" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section aria-label={en ? "Açaí pulp catalog" : "Catálogo de polpas de açaí"} className="relative bg-white py-[clamp(56px,7vw,120px)]">
        <ul className="gutter grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[clamp(14px,1.6vw,28px)]">
          {products.map((p) => (
            <li key={p.slug} id={p.slug} className="scroll-mt-28" data-reveal="up">
              <article aria-labelledby={`${p.slug}-title`} className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-acai-ink/10">
                <div className="relative aspect-[4/5] bg-nevoa">
                  <Image src={p.photo} alt={p.alt[lang]} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" className="object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-display text-2xl font-semibold leading-none text-acai shadow-sm">
                    {p.concentration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <h2 id={`${p.slug}-title`} className="font-display text-[clamp(1.8rem,2.4vw,2.4rem)] font-semibold leading-none tracking-[-0.025em] text-acai-ink">
                    Açaí {p.concentration}
                  </h2>
                  <p className="mt-3 leading-relaxed text-acai-ink/65">{p.text[lang]}</p>

                  <div className="mt-6 rounded-2xl bg-nevoa p-5">
                    <p className="caption mb-3 text-acai">{en ? "Technical sheet" : "Ficha técnica"}</p>
                    <dl className="grid gap-2.5 text-[0.93rem]">
                      {sheet(p).map((s) => (
                        <div key={s.label} className="flex justify-between gap-4 border-b border-acai-ink/8 pb-2.5 last:border-0 last:pb-0">
                          <dt className="text-acai-ink/55">{s.label}</dt>
                          <dd className="text-right font-semibold text-acai-ink">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <div className="mt-auto pt-7">
                    <Link
                      href={`${lp(lang, "/contato")}?produto=${p.slug}`}
                      className="group inline-flex h-13 w-full items-center justify-between rounded-full bg-acai pl-6 pr-2 font-semibold text-white transition-colors duration-500 hover:bg-acai-ink"
                    >
                      {en ? "Request a B2B quote" : "Solicitar cotação B2B"}
                      <span className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-[-45deg]">
                        <Arrow className="size-4" />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {/* Outras embalagens e baldes: aguardando fotos e lista do cliente */}
        <div className="gutter mt-10" data-reveal="up">
          <div className="flex flex-col gap-5 rounded-[1.75rem] border border-dashed border-acai/25 bg-creme p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-display text-xl font-semibold text-acai-ink">{en ? "Other packs and buckets" : "Outras embalagens e baldes"}</p>
              <p className="mt-1 text-acai-ink/65">
                {en
                  ? "Ask our sales team about the packs and bucket sizes available for your operation."
                  : "Consulte a equipe comercial sobre as embalagens e os tamanhos de balde disponíveis para a sua operação."}
              </p>
            </div>
            <Link
              href={`${lp(lang, "/contato")}?produto=baldes`}
              className="inline-flex h-12 shrink-0 items-center rounded-full border border-acai/30 px-6 font-semibold text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white"
            >
              {en ? "Ask about packs" : "Consultar embalagens"}
            </Link>
          </div>
        </div>
      </section>

      <FinalCta lang={lang} />
    </>
  );
}
