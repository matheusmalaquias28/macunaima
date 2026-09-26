import Media from "@/components/ui/Media";

const stats = [
  { value: 150, unit: "toneladas/dia", label: "Capacidade de produção" },
  { value: 20, suffix: " mil", unit: "latas/dia", label: "Produção" },
  { value: 200, unit: "funcionários", label: "Equipe" },
  { value: 500, unit: "coletores", label: "Na cadeia de fornecimento" },
  { value: 22, unit: "estados", label: "Atendidos no Brasil" },
  { value: 4, unit: "continentes", label: "Mercados internacionais" },
];

export default function Industry() {
  return (
    <section aria-labelledby="industria-title" className="relative pb-24 pt-10 md:pb-36 md:pt-16">
      <div className="gutter grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-9">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            A Macunaíma
          </p>
          <h2 id="industria-title" className="t-display text-acai" data-split>
            Uma indústria amazônica preparada para grandes negócios.
          </h2>
        </div>
        <p className="t-lead max-w-md self-end text-acai-ink/70 lg:col-span-4 lg:col-start-9" data-reveal="up">
          A Macunaíma une a origem do açaí do Pará a uma estrutura industrial preparada para produzir e fornecer em
          escala.
        </p>
      </div>

      <div className="gutter mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
        <Media
          videoSrc="/video/macunaima-industria.mp4"
          poster="/video/macunaima-industria-poster.jpg"
          label="Vídeo da linha de produção da Macunaíma"
          className="group aspect-[4/5] rounded-[1.75rem] lg:col-span-5 lg:aspect-auto lg:min-h-full"
          parallax={8}
        />

        <dl className="grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
          {stats.map((s) => (
            <div key={s.label} className="group border-t border-acai/15 pb-10 pt-6" data-reveal="up">
              <dt className="eyebrow mb-4 text-acai-ink/50">{s.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(3.25rem,6.2vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-acai transition-colors duration-500 group-hover:text-acai-soft">
                  <span data-count={s.value}>{s.value.toLocaleString("pt-BR")}</span>
                  {s.suffix && <span className="text-[0.55em] tracking-[-0.03em]">{s.suffix}</span>}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-acai-ink">
                  <span className="size-2 rounded-full bg-folha transition-transform duration-500 group-hover:scale-150" />
                  {s.unit}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Media
        src="/empresa/planta-industrial-aerea.jpg"
        alt="Vista aérea da planta industrial da Macunaíma cercada pela floresta"
        label="Panorâmica da planta industrial da Macunaíma"
        tone="deep"
        className="group mt-20 aspect-[4/3] w-full md:mt-32 md:aspect-[21/9]"
        parallax={12}
      />
    </section>
  );
}
