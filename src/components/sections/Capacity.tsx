import Media from "@/components/ui/Media";
import type { Lang } from "@/lib/i18n";

// Capacidade produtiva: só os dois números em destaque
export default function Capacity({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const stats = [
    { value: "150", unit: en ? "tons/day" : "toneladas/dia", label: en ? "Production capacity" : "Capacidade de produção" },
    { value: en ? "20k" : "20 mil", unit: en ? "cans/day" : "latas/dia", label: en ? "Daily output" : "Produção diária" },
  ];

  return (
    <section id="capacidade" aria-labelledby="capacidade-title" className="relative bg-creme py-[clamp(72px,9vw,150px)]">
      <div className="gutter grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-[clamp(14px,1.6vw,28px)]">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            {en ? "Production capacity" : "Capacidade produtiva"}
          </p>
          <h2 id="capacidade-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            {en ? (
              <>
                Industrial scale, <em>from the Amazon.</em>
              </>
            ) : (
              <>
                Escala industrial, <em>direto da Amazônia.</em>
              </>
            )}
          </h2>
          <dl className="mt-12 grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[1.75rem] bg-white p-6 ring-1 ring-acai-ink/8 md:p-8" data-reveal="up">
                <dt className="caption text-acai-ink/50">{s.label}</dt>
                <dd className="mt-4">
                  <span className="block font-display text-[clamp(3.5rem,6vw,6rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-acai">
                    {s.value}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-acai-ink">
                    <span className="size-2 rounded-full bg-folha" aria-hidden="true" />
                    {s.unit}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <Media
          src="/empresa/planta-industrial-aerea-v2.webp"
          alt={en ? "Aerial view of the Macunaíma plant surrounded by forest" : "Vista aérea da planta industrial da Macunaíma cercada pela floresta"}
          label={en ? "Aerial view of the plant" : "Vista aérea da planta"}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[4/3] rounded-[1.75rem] lg:col-span-6 lg:aspect-[5/4]"
        />
      </div>
    </section>
  );
}
