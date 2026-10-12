import SectionHead from "@/components/ui/SectionHead";

// Texto institucional oficial da Macunaíma (Missão, Visão e Valores)
const statements = [
  {
    k: "Nossa missão",
    text: "Produzir e comercializar alimentos derivados de superfrutas, com elevado padrão de qualidade, antecipando às necessidades do mercado, atendendo expectativas da empresa, Macunaienses e consumidores.",
  },
  {
    k: "Nossa visão",
    text: "Ser uma indústria referência na produção de alimentos feitos com superfrutas, reconhecida por seus clientes e consumidores pela qualidade e inovação de seus produtos, de maneira ética e perene, promovendo o desenvolvimento da empresa e dos Macunaienses.",
  },
];

const values = [
  {
    title: "Ser Macunaienses",
    text: [
      "É possuir atitude de dono, comprometimento, transparência e responsabilidade nas relações com as partes interessadas, meio ambiente e no processo de desenvolvimento e fabricação de nossos produtos.",
      "Sempre com amor, respeito, cooperação, agilidade e valorização às pessoas. De tal forma, que venha promover um ambiente positivo, motivador e amigável, onde todos se sentem valorizados e incentivados a dar o seu melhor.",
    ],
  },
  {
    title: "Segurança de Alimentos",
    text: [
      "Garantir que os nossos produtos não ocasionarão efeitos adversos à saúde do consumidor.",
      "Desta forma, todos devem agir como guardiães da segurança de alimentos.",
    ],
  },
  {
    title: "Desenvolvimento, Inovação e Melhoria Contínua",
    text: [
      "Com o objetivo de estar em constante aperfeiçoamento da qualidade de nossos produtos, serviços e processos, mantendo sempre à frente das mais novas técnicas de produção de alimentos saudáveis, buscando, assim, oferecer aos nossos clientes produtos cada vez melhores.",
      "Sempre investindo em pessoas e tecnologias.",
    ],
  },
];

export default function Purpose() {
  return (
    <section
      id="missao-visao-valores"
      aria-labelledby="proposito-title"
      className="relative bg-acai-ink pb-[clamp(80px,10vw,160px)] text-white"
    >
      <SectionHead onDark items={["01", "A Macunaíma", "Propósito", "Missão · Visão · Valores"]} />

      <div className="gutter grid gap-8 pb-[clamp(48px,6vw,96px)] pt-[clamp(60px,8vw,140px)] lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-acai-mist" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            Quem somos
          </p>
          <h2 id="proposito-title" className="t-display [&_em]:text-acai-mist" data-split>
            Missão, visão
            <br />e <em>valores.</em>
          </h2>
        </div>
      </div>

      {/* Missão e visão: duas declarações lado a lado */}
      <div className="gutter grid gap-12 md:grid-cols-2 md:gap-[clamp(14px,1.6vw,28px)]">
        {statements.map((s) => (
          <div key={s.k} className="border-t border-white/15 pt-6" data-reveal="up">
            <p className="caption mb-6 text-folha">{s.k}</p>
            <p className="max-w-[34ch] font-display text-[clamp(1.25rem,2vw,1.875rem)] font-light leading-[1.2] tracking-[-0.015em] text-white/90">
              {s.text}
            </p>
          </div>
        ))}
      </div>

      {/* Valores */}
      <div className="gutter mt-[clamp(64px,8vw,140px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-6" data-reveal="up">
          <p className="caption text-folha">Nossos valores</p>
          <p className="text-white/60">Nossos principais valores são:</p>
        </div>
        <ol className="grid gap-5 md:grid-cols-3 md:gap-[clamp(14px,1.6vw,28px)]">
          {values.map((v, i) => (
            <li key={v.title} className="flex flex-col rounded-[4px] bg-white/[0.04] p-6 md:p-8" data-reveal="up">
              <span className="font-display text-[clamp(2.6rem,3.6vw,3.6rem)] font-light leading-none tracking-[-0.04em] text-folha font-stretch-condensed">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-8 font-display text-[clamp(1.35rem,1.8vw,1.75rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                {v.title}
              </h3>
              <div className="mt-4 grid gap-3 text-[0.98rem] leading-relaxed text-white/70">
                {v.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
