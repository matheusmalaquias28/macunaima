import type { Metadata } from "next";
import HomeHero from "@/components/sections/home/HomeHero";
import Certifications from "@/components/sections/Certifications";
import ProductLines from "@/components/sections/home/ProductLines";
import WhereToFind from "@/components/sections/home/WhereToFind";
import FinalCta from "@/components/sections/FinalCta";
import { pageMetadata } from "@/lib/seo";
import { hasLang, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return pageMetadata({
    lang: hasLang(lang) ? lang : "pt",
    title: en
      ? "Macunaíma | Amazon açaí manufacturer · Wholesale only (B2B)"
      : "Macunaíma | Indústria de açaí da Amazônia · Venda exclusiva B2B",
    absoluteTitle: true,
    description: en
      ? "Açaí pulp (8%, 12% and 14%) and Sorbet line manufactured in Pará, Brazil. Wholesale (B2B) only, for distributors, açaí shops, industries and food service."
      : "Indústria de polpa de açaí no Pará. Açaí 8%, 12% e 14% e Linha Sorbet com venda exclusiva para o atacado (B2B): distribuidores, açaiterias, indústrias e food service.",
    path: "/",
  });
}

// Home: 01 Banner · 02 Certificações · 03 Produtos · 04 Onde nos encontrar · 05 CTA final
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = (await params) as { lang: Lang };
  return (
    <>
      <HomeHero />
      <Certifications />
      <ProductLines lang={lang} />
      <WhereToFind lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}
