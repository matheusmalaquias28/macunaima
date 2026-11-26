import Image from "next/image";
import Button from "@/components/ui/Button";
import { products, sorbetLine, sorbets } from "@/lib/site";
import { lp, type Lang } from "@/lib/i18n";

type Slide = { key: string; src: string; alt: string; label: string; bg?: string; ink?: string };

/** Fileira fixa de produtos: grade no desktop; no celular rola para o lado e termina no último item */
function ProductRow({ slides }: { slides: Slide[] }) {
  const cols = slides.length >= 5 ? "md:grid-cols-5" : "md:grid-cols-3";
  return (
    <ul className={`no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-ps-(--gutter) px-(--gutter) pb-2 md:grid md:overflow-visible md:pb-0 ${cols} md:gap-5`}>
      {slides.map((s) => (
        <li key={s.key} className="w-[min(62vw,280px)] shrink-0 snap-start md:w-auto" data-reveal="up">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]" style={{ backgroundColor: s.bg ?? "var(--color-nevoa)" }}>
            <Image src={s.src} alt={s.alt} fill sizes={slides.length >= 5 ? "(min-width: 768px) 19vw, 62vw" : "(min-width: 768px) 31vw, 62vw"} className="object-cover" />
            <figcaption
              className="absolute bottom-4 left-4 rounded-full px-4 py-2 font-display text-lg font-semibold leading-none shadow-sm"
              style={{ backgroundColor: "#fff", color: s.bg && s.ink !== "#ffffff" ? "#22011a" : "var(--color-acai)" }}
            >
              {s.label}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

function LineIntro({
  id,
  eyebrow,
  title,
  text,
  chips,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  chips: React.ReactNode;
  cta: React.ReactNode;
}) {
  return (
    <div className="gutter grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-6">
        <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
          <span className="h-px w-7 bg-current opacity-70" />
          {eyebrow}
        </p>
        <h2 id={id} className="font-display text-[clamp(2.6rem,5.6vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-acai-ink" data-reveal="up">
          {title}
        </h2>
        <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-acai-ink/65" data-reveal="up">
          {text}
        </p>
      </div>
      <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:items-end" data-reveal="up">
        {chips}
        {cta}
      </div>
    </div>
  );
}

// Nossos produtos: uma seção para a Linha Açaí e outra para a Linha Sorvete
export default function ProductLines({ lang }: { lang: Lang }) {
  const en = lang === "en";

  const acaiSlides: Slide[] = products.map((p) => ({ key: p.slug, src: p.photo, alt: p.alt[lang], label: `Açaí ${p.concentration}` }));
  const sorbetSlides: Slide[] = sorbets.map((s) => ({
    key: s.slug,
    src: s.src,
    alt: en ? `${s.name.en} Sorbet, 5-liter tub` : `Sorbet ${s.name.pt}, pote de 5 litros`,
    label: s.name[lang],
    bg: s.bg,
    ink: s.ink,
  }));

  return (
    <div id="produtos" className="scroll-mt-20">
      {/* Linha Açaí */}
      <section aria-labelledby="linha-acai-title" className="relative overflow-hidden bg-white py-[clamp(72px,8vw,130px)]">
        <LineIntro
          id="linha-acai-title"
          eyebrow={en ? "Our products · Açaí pulps" : "Nossos produtos · Polpas de açaí"}
          title={en ? "Açaí line" : "Linha Açaí"}
          text={
            en
              ? "Frozen açaí pulp in packs and buckets, for direct consumption or as an ingredient."
              : "Polpa de açaí congelada em embalagens e baldes, para consumo direto ou como ingrediente."
          }
          chips={
            <ul className="flex flex-wrap gap-2.5" aria-label={en ? "Available concentrations" : "Concentrações disponíveis"}>
              {products.map((p) => (
                <li key={p.slug} className="rounded-full bg-acai px-5 py-2.5 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-semibold leading-none text-white">
                  {p.concentration}
                </li>
              ))}
            </ul>
          }
          cta={
            <Button href={lp(lang, "/produtos/acai")} variant="acai">
              {en ? "See the Açaí line" : "Ver Linha Açaí"}
            </Button>
          }
        />
        <div className="mt-12 md:mt-16">
          <ProductRow slides={acaiSlides} />
        </div>
      </section>

      {/* Linha Sorvete */}
      <section aria-labelledby="linha-sorvete-title" className="relative overflow-hidden bg-creme py-[clamp(72px,8vw,130px)]">
        <LineIntro
          id="linha-sorvete-title"
          eyebrow={en ? "Our products · Fruit sorbets" : "Nossos produtos · Sorbets de fruta"}
          title={en ? "Sorbet line" : "Linha Sorvete"}
          text={
            en
              ? `Fruit sorbets in boxes with ${sorbetLine.packaging.en} tubs, made with a high pulp concentration.`
              : `Sorbets de fruta em caixas com potes de ${sorbetLine.packaging.pt}, com alta concentração de polpa.`
          }
          chips={
            <ul className="flex flex-wrap gap-2 lg:justify-end" aria-label={en ? "Available flavors" : "Sabores disponíveis"}>
              {sorbets.map((s) => (
                <li key={s.slug} className="flex items-center gap-2 rounded-full border border-acai-ink/12 bg-white px-3.5 py-2 text-[0.95rem] font-semibold">
                  <span className="size-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: s.bg }} aria-hidden="true" />
                  {s.name[lang]}
                </li>
              ))}
            </ul>
          }
          cta={
            <Button href={lp(lang, "/produtos/sorvete")} variant="acai">
              {en ? "See the Sorbet line" : "Ver Linha Sorvete"}
            </Button>
          }
        />
        <div className="mt-12 md:mt-16">
          <ProductRow slides={sorbetSlides} />
        </div>
      </section>
    </div>
  );
}
