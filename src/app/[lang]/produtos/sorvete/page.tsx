import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import { Arrow } from "@/components/ui/Button";
import { sorbetBenefits, sorbetLine, sorbets } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { lp, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/produtos/sorvete">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "Sorbet line · 5 flavors in 5-liter tubs" : "Linha Sorbet · 5 sabores em potes de 5 litros",
    description: en
      ? "Macunaíma Sorbet: coconut, mango, passion fruit, pitaya and Blue Magic in 5-liter tubs. Gluten-free, dairy-free, no colorings or flavorings. Wholesale only."
      : "Sorbet Macunaíma: coco, manga, maracujá, pitaya e Blue Magic em potes de 5 litros. Sem glúten, sem leite, sem corantes e sem aromatizantes. Venda B2B.",
    path: "/produtos/sorvete",
  });
}

// Ícones dos diferenciais (traço), cada um cortado por uma barra de "sem"
const benefitIcons: Record<(typeof sorbetBenefits)[number]["key"], React.ReactNode> = {
  gluten: (
    <>
      <path d="M12 21V9" />
      <path d="M12 13c-2.2 0-3.5-1.4-3.5-3.5C10.7 9.5 12 10.9 12 13Zm0 0c2.2 0 3.5-1.4 3.5-3.5-2.2 0-3.5 1.4-3.5 3.5Zm0-4c-2.2 0-3.5-1.4-3.5-3.5C10.7 5.5 12 6.9 12 9Zm0 0c2.2 0 3.5-1.4 3.5-3.5C13.3 5.5 12 6.9 12 9Zm0 8c-2.2 0-3.5-1.4-3.5-3.5 2.2 0 3.5 1.4 3.5 3.5Zm0 0c2.2 0 3.5-1.4 3.5-3.5-2.2 0-3.5 1.4-3.5 3.5Z" />
    </>
  ),
  corantes: <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.8a5.5 5.5 0 0 1-11 0c0-3.2 2.5-6.2 5.5-9.8Z" />,
  aromas: (
    <>
      <path d="M9.5 3.5h5M10.5 3.5v5.2L6 17.5a2 2 0 0 0 1.8 3h8.4a2 2 0 0 0 1.8-3l-4.5-8.8V3.5" />
      <path d="M8 14h8" />
    </>
  ),
  leite: (
    <>
      <path d="M9 3h6v3l2 3.5V20a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9.5L9 6V3Z" />
      <path d="M7 12h10" />
    </>
  ),
  gordura: (
    <>
      <path d="M5 10h14v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8Z" />
      <path d="M8 10V7.5A1.5 1.5 0 0 1 9.5 6h5A1.5 1.5 0 0 1 16 7.5V10" />
    </>
  ),
};

export default async function SorvetePage({ params }: PageProps<"/[lang]/produtos/sorvete">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: en ? "Products" : "Produtos", path: "/produtos/acai" },
          { name: en ? "Sorbet" : "Sorvete", path: "/produtos/sorvete" },
        ])}
      />
      {/* 1. Apresentação da linha */}
      <PageHero
        id="sorvete-title"
        eyebrow={en ? "Products · Sorbet" : "Produtos · Sorvete"}
        title={
          en ? (
            <>
              Macunaíma <em>Sorbet line.</em>
            </>
          ) : (
            <>
              Linha <em>Sorbet Macunaíma.</em>
            </>
          )
        }
        b2b={en ? "Wholesale only (B2B)" : "Venda exclusiva B2B"}
        text={sorbetLine.text[lang]}
      />

      {/* 2. Diferenciais */}
      <section aria-labelledby="diferenciais-title" className="relative bg-creme pb-[clamp(48px,6vw,96px)]">
        <div className="gutter">
          <h2 id="diferenciais-title" className="sr-only">
            {en ? "Product highlights" : "Diferenciais do produto"}
          </h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
            {sorbetBenefits.map((b) => (
              <li key={b.key} className="flex items-center gap-4 rounded-[1.5rem] bg-white p-4 ring-1 ring-acai-ink/8 md:p-5 last:max-sm:col-span-2" data-reveal="up">
                <span className="relative grid size-12 shrink-0 place-items-center rounded-full bg-folha/30 text-folha-ink md:size-14">
                  <svg viewBox="0 0 24 24" className="size-6 md:size-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {benefitIcons[b.key]}
                    <path d="M4 20 20 4" strokeWidth={1.8} className="text-acai" stroke="currentColor" />
                  </svg>
                </span>
                <span className="font-display text-[1.05rem] font-semibold leading-tight text-acai-ink md:text-[1.15rem]">{b.label[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Sabores */}
      <section aria-labelledby="sabores-title" className="relative bg-white py-[clamp(64px,8vw,130px)]">
        <div className="gutter grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
              <span className="h-px w-7 bg-current opacity-70" />
              {en ? "Flavors" : "Sabores"}
            </p>
            <h2 id="sabores-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
              {en ? (
                <>
                  5 flavors, <em>5-liter tubs.</em>
                </>
              ) : (
                <>
                  5 sabores, <em>potes de 5 litros.</em>
                </>
              )}
            </h2>
          </div>
          <p className="text-[1.05rem] leading-relaxed text-acai-ink/65 lg:col-span-4 lg:col-start-9" data-reveal="up">
            {en
              ? "Supplied in boxes of 5-liter tubs, ready for açaí shops, ice cream parlors and food service."
              : "Fornecido em caixas com potes de 5 litros, prontos para açaiterias, sorveterias e food service."}
          </p>
        </div>

        <ol className="gutter mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-5 lg:gap-[clamp(12px,1.2vw,20px)]">
          {sorbets.map((s, i) => (
            <li key={s.slug} id={`sorbet-${s.slug}`} className="scroll-mt-28" data-reveal="up">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem]" style={{ backgroundColor: s.bg, color: s.ink }}>
                <div className="relative aspect-[3/4]">
                  <Image
                    src={s.src}
                    alt={en ? `${s.name.en} Sorbet 5-liter tub next to a bowl of sorbet` : `Pote de 5 litros do Sorbet ${s.name.pt} ao lado de uma taça de sorbet`}
                    fill
                    sizes="(min-width: 1024px) 19vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="caption opacity-60">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 font-display text-[1.75rem] font-semibold leading-none tracking-[-0.02em]">{s.name[lang]}</h3>
                  <p className="mt-2 text-sm font-semibold opacity-75">{en ? "5-liter tub" : "Pote de 5 litros"}</p>
                  <Link
                    href={`${lp(lang, "/contato")}?produto=sorbet-${s.slug}`}
                    className="mt-5 inline-flex h-11 items-center justify-between rounded-full border border-current pl-5 pr-1.5 text-sm font-semibold transition-colors duration-500 hover:bg-current/10"
                  >
                    {en ? "B2B quote" : "Cotação B2B"}
                    <span className="grid size-8 place-items-center rounded-full bg-current/10">
                      <Arrow className="size-3.5" />
                    </span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <FinalCta lang={lang} />
    </>
  );
}
