import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PresenceMap from "@/components/maps/PresenceMap";
import FinalCta from "@/components/sections/FinalCta";
import { ExportCard, UnitCard } from "@/components/sections/ContactCards";
import { units } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata, unitsJsonLd } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/onde-nos-encontrar">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "Where to find us · B2B sales contacts" : "Onde nos encontrar · Contatos comerciais B2B",
    description: en
      ? "Macunaíma plant in Inhangapi (PA), B2B distributors in Recife (PE) and Fortaleza (CE), and Tropical Açaí for exports to the USA. Present in 22 states and 4 continents."
      : "Indústria da Macunaíma em Inhangapi (PA), distribuidores B2B em Recife (PE) e Fortaleza (CE) e a Tropical Açaí para exportação aos EUA. Presença em 22 estados e 4 continentes.",
    path: "/onde-nos-encontrar",
  });
}

export default async function OndeNosEncontrarPage({ params }: PageProps<"/[lang]/onde-nos-encontrar">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: en ? "Where to find us" : "Onde nos encontrar", path: "/onde-nos-encontrar" }])} />
      <JsonLd data={unitsJsonLd()} />
      <PageHero
        id="encontrar-title"
        eyebrow={en ? "Where to find us" : "Onde nos encontrar"}
        title={
          en ? (
            <>
              From Pará to Brazil <em>and the world.</em>
            </>
          ) : (
            <>
              Do Pará para o Brasil <em>e o mundo.</em>
            </>
          )
        }
        b2b={en ? "Wholesale only (B2B)" : "Atendimento exclusivo B2B"}
        text={
          en
            ? "Present in 22 Brazilian states and 4 continents. Talk to the sales contact closest to your business."
            : "Presença em 22 estados brasileiros e 4 continentes. Fale com o contato comercial mais próximo do seu negócio."
        }
      />

      <section aria-label={en ? "Presence map" : "Mapa de presença"} className="bg-creme pb-[clamp(56px,7vw,110px)]">
        <div className="gutter">
          <PresenceMap />
        </div>
      </section>

      <section aria-labelledby="contatos-title" className="bg-white py-[clamp(64px,8vw,130px)]">
        <div className="gutter">
          <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            {en ? "B2B sales contacts" : "Contatos comerciais B2B"}
          </p>
          <h2 id="contatos-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            {en ? (
              <>
                Talk to the <em>nearest team.</em>
              </>
            ) : (
              <>
                Fale com a <em>equipe mais próxima.</em>
              </>
            )}
          </h2>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-[clamp(12px,1.2vw,20px)]">
            {units.map((u) => (
              <li key={u.slug} data-reveal="up">
                <UnitCard unit={u} lang={lang} tone="creme" className="h-full" />
              </li>
            ))}
            <li data-reveal="up">
              <ExportCard lang={lang} className="h-full" />
            </li>
          </ul>
        </div>
      </section>

      <FinalCta lang={lang} />
    </>
  );
}
