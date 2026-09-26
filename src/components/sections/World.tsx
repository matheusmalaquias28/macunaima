const markets = [
  { region: "América do Norte", countries: ["Estados Unidos", "Canadá"] },
  { region: "Europa", countries: ["Islândia", "Inglaterra"] },
  { region: "Oceania", countries: ["Austrália"] },
  { region: "Ásia", countries: ["China", "Japão"] },
];

export default function World() {
  return (
    <section
      id="exportacao"
      aria-labelledby="mundo-title"
      className="relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-acai-ink py-24 text-white md:-mt-16 md:rounded-t-[4rem] md:py-36"
    >
      <div className="gutter grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 text-folha" data-reveal="up">
            Do Pará para o Brasil e para o mundo
          </p>
          <h2 id="mundo-title" className="t-display" data-split>
            Açaí da Amazônia presente em diferentes mercados.
          </h2>
        </div>
        <div className="flex flex-col justify-end lg:col-span-4">
          <p className="t-lead text-white/70" data-reveal="up">
            A Macunaíma atende <strong className="font-semibold text-white">22 estados brasileiros</strong> e exporta
            para <strong className="font-semibold text-white">quatro continentes</strong>.
          </p>
        </div>
      </div>

      <div className="relative mt-16 md:mt-24">
        <ul className="border-b border-white/12">
          {markets.map((m) => (
            <li
              key={m.region}
              className="group gutter relative border-t border-white/12"
              data-reveal="up"
            >
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-acai transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-y-100" />
              <div className="relative flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between md:py-10">
                <h3 className="font-display text-[clamp(2rem,5.6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em] transition-[color,transform] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:text-folha">
                  {m.region}
                </h3>
                <p className="flex flex-wrap gap-2">
                  {m.countries.map((c) => (
                    <span key={c} className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 md:text-base">
                      {c}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
