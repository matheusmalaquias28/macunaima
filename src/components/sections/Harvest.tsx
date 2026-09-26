import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";

const storage = [
  { big: "-20 °C", label: "Temperatura da câmara refrigerada" },
  { big: "5 milhões de kg", label: "Capacidade para armazenamento de polpa" },
  { big: "3.000", label: "Posições de paletes para produtos acabados" },
  { big: "24 meses", label: "Tempo de armazenamento" },
];

export default function Harvest() {
  return (
    <section
      aria-labelledby="safra-title"
      className="relative -mt-10 rounded-t-[2.5rem] bg-folha pb-24 pt-24 text-acai-ink md:-mt-16 md:rounded-t-[4rem] md:pb-36 md:pt-32"
    >
      <div className="gutter grid gap-10 lg:grid-cols-12">
        <h2 id="safra-title" className="t-display text-acai lg:col-span-7" data-split>
          Produção na safra. Fornecimento ao longo do ano.
        </h2>
        <div className="flex flex-col justify-end gap-6 lg:col-span-4 lg:col-start-9">
          <p className="t-lead" data-reveal="up">
            A Macunaíma concentra sua produção durante o período de safra para formar estoque e manter a
            padronização de suas polpas.
          </p>
          <p className="text-acai-ink/75" data-reveal="up">
            Sua estrutura de armazenamento permite trabalhar exclusivamente com açaí do Pará durante a safra.
          </p>
        </div>
      </div>

      <div className="gutter mt-16 md:mt-24">
        <Media
          src="/empresa/camara-refrigerada.jpg"
          alt="Câmara refrigerada com paletes de caixas de açaí Macunaíma"
          label="Câmara refrigerada a -20 °C com paletes de polpa armazenados"
          tone="deep"
          className="group aspect-[4/5] rounded-[1.75rem] sm:aspect-[16/9] md:rounded-[2.5rem] lg:aspect-[21/9]"
          parallax={10}
        />
      </div>

      <dl className="gutter mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {storage.map((s) => (
          <div
            key={s.label}
            className="group flex min-h-56 flex-col-reverse justify-between rounded-[1.5rem] bg-acai p-7 text-white transition-colors duration-500 hover:bg-acai-ink md:p-8"
            data-reveal="up"
          >
            <dt className="mt-8 text-sm leading-snug text-white/65 md:text-base">{s.label}</dt>
            <dd className="font-display text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-folha">
              {s.big}
            </dd>
          </div>
        ))}
      </dl>

      <div className="gutter mt-12 md:mt-16" data-reveal="up">
        <Button href="/estrutura" variant="acai" size="lg">
          Conheça nossa estrutura
        </Button>
      </div>
    </section>
  );
}
