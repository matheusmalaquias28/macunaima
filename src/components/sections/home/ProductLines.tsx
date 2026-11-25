import Image from "next/image";
import Button from "@/components/ui/Button";
import { products, sorbetLine, sorbets } from "@/lib/site";
import { lp, type Lang } from "@/lib/i18n";

// Duas linhas em blocos separados, sem misturar açaí e sorbet
export default function ProductLines({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section id="produtos" aria-labelledby="produtos-title" className="relative bg-creme py-[clamp(72px,9vw,150px)]">
      <div className="gutter grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            {en ? "Our products" : "Nossos produtos"}
          </p>
          <h2 id="produtos-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            {en ? (
              <>
                Two lines, made for <em>your business.</em>
              </>
            ) : (
              <>
                Duas linhas, feitas para <em>o seu negócio.</em>
              </>
            )}
          </h2>
        </div>
        <p className="text-[1.05rem] leading-relaxed text-acai-ink/65 lg:col-span-4 lg:col-start-9" data-reveal="up">
          {en
            ? "Açaí pulp and Sorbet, manufactured in Pará and sold exclusively to companies."
            : "Polpas de açaí e Sorbet, produzidos no Pará e vendidos exclusivamente para empresas."}
        </p>
      </div>

      <div className="gutter mt-12 grid gap-5 md:mt-16 lg:grid-cols-2 lg:gap-[clamp(16px,1.8vw,32px)]">
        {/* Bloco A — Linha Açaí */}
        <article aria-labelledby="linha-acai-title" className="flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-acai-ink/8" data-reveal="up">
          <div className="grid grid-cols-3 gap-2 bg-nevoa p-2">
            {products.map((p) => (
              <div key={p.slug} className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-acai">
                <Image src={p.photo} alt={p.alt[lang]} fill sizes="(min-width: 1024px) 16vw, 32vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-9">
            <p className="eyebrow text-folha-ink">{en ? "Açaí pulps" : "Polpas de açaí"}</p>
            <h3 id="linha-acai-title" className="mt-3 font-display text-[clamp(2rem,3vw,3rem)] font-semibold leading-none tracking-[-0.025em] text-acai">
              {en ? "Açaí line" : "Linha Açaí"}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-acai-ink/65">
              {en
                ? "Frozen açaí pulp in packs and buckets, for direct consumption or as an ingredient."
                : "Polpa de açaí congelada em embalagens e baldes, para consumo direto ou como ingrediente."}
            </p>
            <div className="mt-7">
              <p className="caption mb-3 text-acai-ink/50">{en ? "Available concentrations" : "Concentrações disponíveis"}</p>
              <ul className="flex flex-wrap gap-2.5">
                {products.map((p) => (
                  <li
                    key={p.slug}
                    className="rounded-full bg-acai px-5 py-2.5 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-semibold leading-none tracking-[-0.02em] text-white"
                  >
                    {p.concentration}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto pt-9">
              <Button href={lp(lang, "/produtos/acai")} variant="acai">
                {en ? "See the Açaí line" : "Ver Linha Açaí"}
              </Button>
            </div>
          </div>
        </article>

        {/* Bloco B — Linha Sorvete (Sorbet) */}
        <article aria-labelledby="linha-sorvete-title" className="flex flex-col overflow-hidden rounded-[2rem] bg-white ring-1 ring-acai-ink/8" data-reveal="up">
          <div className="grid grid-cols-5 gap-2 bg-nevoa p-2">
            {sorbets.map((s) => (
              <div key={s.slug} className="relative aspect-[3/5] overflow-hidden rounded-[1.1rem]" style={{ backgroundColor: s.bg }}>
                <Image src={s.src} alt={en ? `Sorbet ${s.name.en}, 5-liter tub` : `Sorbet ${s.name.pt}, pote de 5 litros`} fill sizes="(min-width: 1024px) 10vw, 19vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col p-6 md:p-9">
            <p className="eyebrow text-folha-ink">{en ? "Fruit sorbets" : "Sorbets de fruta"}</p>
            <h3 id="linha-sorvete-title" className="mt-3 font-display text-[clamp(2rem,3vw,3rem)] font-semibold leading-none tracking-[-0.025em] text-acai">
              {en ? "Sorbet line" : "Linha Sorvete"}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-acai-ink/65">
              {en
                ? `Fruit sorbets in boxes with ${sorbetLine.packaging.en} tubs, made with a high pulp concentration.`
                : `Sorbets de fruta em caixas com potes de ${sorbetLine.packaging.pt}, com alta concentração de polpa.`}
            </p>
            <div className="mt-7">
              <p className="caption mb-3 text-acai-ink/50">{en ? "Available flavors" : "Sabores disponíveis"}</p>
              <ul className="flex flex-wrap gap-2">
                {sorbets.map((s) => (
                  <li key={s.slug} className="flex items-center gap-2 rounded-full border border-acai-ink/12 px-3.5 py-2 text-[0.95rem] font-semibold">
                    <span className="size-3 rounded-full ring-1 ring-black/10" style={{ backgroundColor: s.bg }} aria-hidden="true" />
                    {s.name[lang]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto pt-9">
              <Button href={lp(lang, "/produtos/sorvete")} variant="acai">
                {en ? "See the Sorbet line" : "Ver Linha Sorvete"}
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
