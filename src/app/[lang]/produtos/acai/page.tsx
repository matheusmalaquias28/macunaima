import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Recipes from "@/components/sections/Recipes";
import FinalCta from "@/components/sections/FinalCta";
import ScrollRow from "@/components/ui/ScrollRow";
import ProductSlide from "@/components/products/ProductSlide";
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
      ? "Macunaíma açaí pulp catalog: 8%, 12% and 14% concentrations, technical sheet, B2B quote and recipe ideas. Manufactured in Pará, Brazil."
      : "Catálogo de polpas de açaí Macunaíma: concentrações de 8%, 12% e 14%, ficha técnica, cotação B2B e ideias de receitas. Produzidas no Pará.",
    path: "/produtos/acai",
  });
}

export default async function AcaiPage({ params }: PageProps<"/[lang]/produtos/acai">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";

  const slides = products.map((p) => {
    const weight = en ? p.weight.replace(",", ".") : p.weight;
    return {
      id: p.slug,
      photo: p.photo,
      alt: p.alt[lang],
      eyebrow: en ? "Açaí line" : "Linha Açaí",
      title: `Açaí ${p.concentration}`,
      badge: weight,
      text: p.text[lang],
      specs: [
        { label: en ? "Concentration" : "Concentração", value: p.concentration },
        { label: en ? "Pack" : "Embalagem", value: en ? `Pack · ${weight}` : `Pacote · ${weight}` },
        { label: en ? "Storage" : "Conservação", value: en ? "Frozen" : "Congelado" },
        { label: en ? "Origin" : "Origem", value: en ? "Pará, Brazil" : "Pará, Brasil" },
      ],
      cta: { label: en ? "Request a B2B quote" : "Solicitar cotação B2B", href: `${lp(lang, "/contato")}?produto=${p.slug}` },
    };
  });

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
      />

      {/* Catálogo: cards grandes lado a lado, passando para o lado */}
      <section aria-label={en ? "Açaí pulp catalog" : "Catálogo de polpas de açaí"} className="relative bg-nevoa py-[clamp(56px,7vw,110px)]">
        <ScrollRow label={en ? "Açaí pulp catalog" : "Catálogo de polpas de açaí"}>
          {slides.map((s) => (
            <ProductSlide key={s.id} item={s} />
          ))}
        </ScrollRow>

        {/* Outras embalagens e baldes: aguardando fotos e lista do cliente */}
        <div className="gutter mt-10" data-reveal="up">
          <div className="flex flex-col gap-5 rounded-[1.75rem] bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
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

      <Recipes lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}
