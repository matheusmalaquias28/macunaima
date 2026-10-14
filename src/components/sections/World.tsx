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
        <div className="lg:col-span-9">
          <p className="eyebrow mb-6 text-folha" data-reveal="up">
            Do Pará para o Brasil e para o mundo
          </p>
          <h2 id="mundo-title" className="t-display [&_em]:text-acai-mist" data-split>
            Açaí da Amazônia presente
            <br />
            em <em>diferentes</em> mercados.
          </h2>
        </div>
        <div className="flex flex-col justify-end lg:col-span-3">
          <p className="t-lead text-white/70" data-reveal="up">
            A Macunaíma atende <strong className="font-semibold text-white">22 estados brasileiros</strong> e exporta
            para <strong className="font-semibold text-white">quatro continentes</strong>.
          </p>
        </div>
      </div>

      {/* Letreiro infinito; padding = gap para o loop de -50% emendar sem salto (pausa no hover) */}
      <div className="marquee relative mt-16 overflow-hidden border-y border-white/12 py-8 md:mt-24 md:py-10 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <ul
          className="marquee-track flex w-max items-center gap-[clamp(40px,5vw,88px)] pr-[clamp(40px,5vw,88px)]"
          style={{ "--marquee-duration": "48s" } as React.CSSProperties}
        >
          {[...markets, ...markets].map((m, i) => (
            <li
              key={i}
              aria-hidden={i >= markets.length}
              className="flex shrink-0 items-center gap-[clamp(20px,2.4vw,40px)]"
            >
              <h3 className="whitespace-nowrap font-display text-[clamp(2rem,5.6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                {m.region}
              </h3>
              <p className="flex gap-2">
                {m.countries.map((c) => (
                  <span
                    key={c}
                    className="whitespace-nowrap rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/85 md:text-base"
                  >
                    {c}
                  </span>
                ))}
              </p>
              <span aria-hidden="true" className="ml-[clamp(20px,2.6vw,48px)] size-2.5 rounded-full bg-folha" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
