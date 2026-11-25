import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import InstitutionalVideo from "@/components/sections/InstitutionalVideo";
import Purpose from "@/components/sections/Purpose";
import Capacity from "@/components/sections/Capacity";
import Quality from "@/components/sections/Quality";
import FinalCta from "@/components/sections/FinalCta";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/quem-somos">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "About us" : "Quem Somos",
    description: en
      ? "Macunaíma is an açaí manufacturer in Pará, Brazil: mission, vision and values, 150 tons/day capacity and quality control from fruit to final product."
      : "A Macunaíma é uma indústria de açaí no Pará: missão, visão e valores, capacidade de 150 toneladas/dia e controle de qualidade do fruto ao produto final.",
    path: "/quem-somos",
  });
}

export default async function QuemSomosPage({ params }: PageProps<"/[lang]/quem-somos">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: en ? "About us" : "Quem Somos", path: "/quem-somos" }])} />
      <PageHero
        id="quem-somos-title"
        eyebrow={en ? "About us" : "Quem Somos"}
        title={
          en ? (
            <>
              An Amazon <em>açaí manufacturer.</em>
            </>
          ) : (
            <>
              Uma indústria <em>de açaí da Amazônia.</em>
            </>
          )
        }
        b2b={en ? "Manufacturer · Wholesale only (B2B)" : "Indústria · Venda exclusiva B2B"}
        text={
          en
            ? "From Inhangapi, Pará, Macunaíma turns açaí into products for companies that need quality, scale and consistency."
            : "Em Inhangapi, no Pará, a Macunaíma transforma o açaí em produtos para empresas que precisam de qualidade, escala e consistência."
        }
      />
      <div className="bg-creme pb-[clamp(48px,6vw,96px)]">
        <InstitutionalVideo />
      </div>
      <Purpose lang={lang} />
      <Capacity lang={lang} />
      <Quality lang={lang} />
      <FinalCta lang={lang} />
    </>
  );
}
