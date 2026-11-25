import type { Lang, T } from "@/lib/i18n";

// Missão, Visão e Valores (resumo do texto institucional oficial)
const items: { k: T; text: T; values?: T[] }[] = [
  {
    k: { pt: "Missão", en: "Mission" },
    text: {
      pt: "Produzir e comercializar alimentos derivados de superfrutas, com elevado padrão de qualidade e antecipando as necessidades do mercado.",
      en: "To produce and sell foods made from superfruits, with high quality standards and anticipating market needs.",
    },
  },
  {
    k: { pt: "Visão", en: "Vision" },
    text: {
      pt: "Ser uma indústria referência em alimentos feitos com superfrutas, reconhecida pela qualidade e inovação de seus produtos.",
      en: "To be a benchmark manufacturer of superfruit foods, recognized for the quality and innovation of its products.",
    },
  },
  {
    k: { pt: "Valores", en: "Values" },
    text: {
      pt: "Atitude de dono, transparência e respeito às pessoas, com foco em:",
      en: "Ownership, transparency and respect for people, focused on:",
    },
    values: [
      { pt: "Ser Macunaienses", en: "Being Macunaienses" },
      { pt: "Segurança de Alimentos", en: "Food Safety" },
      { pt: "Desenvolvimento, Inovação e Melhoria Contínua", en: "Development, Innovation and Continuous Improvement" },
    ],
  },
];

export default function Purpose({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section id="missao-visao-valores" aria-labelledby="proposito-title" className="relative bg-white py-[clamp(72px,9vw,150px)]">
      <div className="gutter">
        <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
          <span className="h-px w-7 bg-current opacity-70" />
          {en ? "Purpose" : "Propósito"}
        </p>
        <h2 id="proposito-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
          {en ? (
            <>
              Mission, vision <em>and values.</em>
            </>
          ) : (
            <>
              Missão, visão <em>e valores.</em>
            </>
          )}
        </h2>
      </div>

      <ol className="gutter mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-[clamp(14px,1.6vw,28px)]">
        {items.map((it, i) => (
          <li key={it.k.pt} className="flex flex-col rounded-[1.75rem] bg-nevoa p-6 md:p-8" data-reveal="up">
            <span className="flex items-center justify-between">
              <span className="font-display text-[clamp(1.6rem,2.2vw,2.1rem)] font-semibold tracking-[-0.02em] text-acai">{it.k[lang]}</span>
              <span className="caption text-acai-ink/40">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-acai-ink/75">{it.text[lang]}</p>
            {it.values && (
              <ul className="mt-4 grid gap-2">
                {it.values.map((v) => (
                  <li key={v.pt} className="flex items-start gap-2.5 font-semibold text-acai-ink">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-folha" aria-hidden="true" />
                    {v[lang]}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
