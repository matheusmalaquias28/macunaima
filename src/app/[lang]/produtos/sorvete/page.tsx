import type { Metadata } from "next";
import Image from "next/image";
import FinalCta from "@/components/sections/FinalCta";
import ScrollRow from "@/components/ui/ScrollRow";
import ProductSlide from "@/components/products/ProductSlide";
import { sorbetBenefits, sorbetLine, sorbets } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { lp, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/produtos/sorvete">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "Sorbet line · 5 flavors in 5-liter tubs" : "Linha Sorvete · 5 sabores em potes de 5 litros",
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
      <path d="M12 13c-2.2 0-3.5-1.4-3.5-3.5C10.7 9.5 12 10.9 12 13Zm0 0c2.2 0 3.5-1.4 3.5-3.5-2.2 0-3.5 1.4-3.5 3.5Zm0-4c-2.2 0-3.5-1.4-3.5-3.5C10.7 5.5 12 6.9 12 9Zm0 0c2.2 0 3.5-1.4 3.5-3.5C13.3 5.5 12 6.9 12 9Z" />
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
  const seal = en ? "WHOLESALE ONLY · B2B · WHOLESALE ONLY · B2B · " : "VENDA EXCLUSIVA · B2B · VENDA EXCLUSIVA · B2B · ";

  const slides = sorbets.map((s) => ({
    id: `sorbet-${s.slug}`,
    photo: s.src,
    alt: en ? `${s.name.en} Sorbet 5-liter tub next to a bowl of sorbet` : `Pote de 5 litros do Sorbet ${s.name.pt} ao lado de uma taça de sorbet`,
    eyebrow: en ? "Sorbet line" : "Linha Sorvete",
    title: s.name[lang],
    badge: sorbetLine.packaging[lang],
    text: en
      ? `${s.name.en} sorbet made with selected fruit and a high pulp concentration.`
      : `Sorbet de ${s.name.pt.toLowerCase()} feito com frutas selecionadas e alta concentração de polpa.`,
    specs: [
      { label: en ? "Flavor" : "Sabor", value: s.name[lang] },
      { label: en ? "Pack" : "Embalagem", value: en ? "5-liter tub" : "Pote de 5 litros" },
      { label: en ? "Supply" : "Fornecimento", value: en ? "Boxes of tubs" : "Caixas com potes" },
      { label: en ? "Free from" : "Sem", value: en ? "Gluten, dairy, colorings" : "Glúten, leite, corantes" },
    ],
    cta: { label: en ? "Request a B2B quote" : "Solicitar cotação B2B", href: `${lp(lang, "/contato")}?produto=sorbet-${s.slug}` },
    bg: s.bg,
    ink: s.ink,
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: en ? "Products" : "Produtos", path: "/produtos/acai" },
          { name: en ? "Sorbet" : "Sorvete", path: "/produtos/sorvete" },
        ])}
      />

      {/* Topo com fundo: provisório até chegar a imagem/vídeo da linha sorvete */}
      <section aria-labelledby="sorvete-title" className="relative flex min-h-[78svh] items-end overflow-hidden bg-acai-ink pt-28 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_20%,#c8175d_0%,#6d1650_45%,#22011a_100%)]">
          <div className="absolute inset-y-0 right-[4%] hidden w-[46%] items-center justify-end gap-4 pt-24 lg:flex">
            {sorbets.slice(1, 4).map((s, i) => (
              <div key={s.slug} className={`relative aspect-[3/4] w-[31%] overflow-hidden rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] ${i === 1 ? "-translate-y-8" : "translate-y-6"}`}>
                <Image src={s.src} alt="" fill preload={i === 1} sizes="16vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,1,26,0.7)_0%,rgba(34,1,26,0.2)_60%,rgba(34,1,26,0)_100%)]" />

        <div className="gutter relative w-full pb-14 md:pb-20">
          <p className="eyebrow mb-5 text-folha">{en ? "Products · Sorbet" : "Produtos · Sorvete"}</p>
          <div className="relative w-fit">
            <h1 id="sorvete-title" className="t-mega pr-24 md:pr-32">
              {en ? "Sorbet line" : "Linha Sorvete"}
            </h1>
            {/* Selo redondo girando no canto da palavra */}
            <div className="absolute -right-2 -top-14 grid size-24 place-items-center rounded-full bg-folha text-acai-ink md:-top-20 md:size-32" aria-label={en ? "Wholesale only (B2B)" : "Venda exclusiva B2B"} role="img">
              <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
                <defs>
                  <path id="seal-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
                </defs>
                <text fontSize="8.6" fontWeight="700" letterSpacing="1.6" fill="currentColor" fontFamily="var(--font-figtree)">
                  <textPath href="#seal-circle">{seal}</textPath>
                </text>
              </svg>
              <span className="font-display text-xl font-bold tracking-[-0.03em] md:text-2xl" aria-hidden="true">
                B2B
              </span>
            </div>
          </div>
          <p className="t-lead mt-6 max-w-xl text-white/80">{sorbetLine.text[lang]}</p>
        </div>
      </section>

      {/* Produtos logo de cara: carrossel grande, informações ao clicar */}
      <section aria-labelledby="sabores-title" className="relative bg-white py-[clamp(56px,7vw,110px)]">
        <div className="gutter mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 id="sabores-title" className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.025em] text-acai-ink">
            {en ? "5 flavors · 5-liter tubs" : "5 sabores · potes de 5 litros"}
          </h2>
        </div>
        <ScrollRow label={en ? "Sorbet flavors" : "Sabores de sorbet"}>
          {slides.map((s) => (
            <ProductSlide key={s.id} item={s} collapsible />
          ))}
        </ScrollRow>

        {/* Diferenciais, embaixo dos produtos e em tamanho discreto */}
        <ul className="gutter mt-10 flex flex-wrap gap-2.5" aria-label={en ? "Product highlights" : "Diferenciais do produto"}>
          {sorbetBenefits.map((b) => (
            <li key={b.key} className="flex items-center gap-2.5 rounded-full bg-creme py-1.5 pl-1.5 pr-4 ring-1 ring-acai-ink/8">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-folha/35 text-folha-ink">
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {benefitIcons[b.key]}
                  <path d="M4 20 20 4" strokeWidth={1.8} className="text-acai" stroke="currentColor" />
                </svg>
              </span>
              <span className="text-[0.92rem] font-semibold text-acai-ink">{b.label[lang]}</span>
            </li>
          ))}
        </ul>
      </section>

      <FinalCta lang={lang} />
    </>
  );
}
