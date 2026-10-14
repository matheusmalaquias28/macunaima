import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";
import LineIcon from "@/components/ui/LineIcon";
import SectionHead from "@/components/ui/SectionHead";

const storage: { label: string; value: React.ReactNode; icon: React.ReactNode }[] = [
  {
    label: "Temperatura da câmara refrigerada",
    value: "-20 °C",
    icon: (
      <>
        <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7" />
        <path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2M3 10.6l3.2-.6-1-3M21 13.4l-3.2.6 1 3M3 13.4l3.2.6-1 3M21 10.6l-3.2-.6 1-3" />
      </>
    ),
  },
  {
    label: "Capacidade para armazenamento de polpa",
    value: (
      <>
        <span data-count="5">5</span> milhões de kg
      </>
    ),
    icon: (
      <>
        <path d="M12 2.5 21 7.5v9l-9 5-9-5v-9z" />
        <path d="M3 7.5l9 5 9-5M12 12.5v9" />
      </>
    ),
  },
  {
    label: "Posições de paletes para produtos acabados",
    value: <span data-count="3000">3.000</span>,
    icon: (
      <>
        <path d="M2.5 19.5h19M4 19.5v2M12 19.5v2M20 19.5v2M3.5 14h17v5.5h-17zM5.5 7.5h13V14h-13z" />
        <path d="M12 7.5V14M7.5 3.5h9v4h-9z" />
      </>
    ),
  },
  {
    label: "Tempo de armazenamento",
    value: (
      <>
        <span data-count="24">24</span> meses
      </>
    ),
    icon: (
      <>
        <circle cx="12" cy="12" r="9.5" />
        <path d="M12 6.5V12l3.8 2.3" />
        <path d="M12 2.5v1.5M12 20v1.5M2.5 12H4M20 12h1.5" />
      </>
    ),
  },
];

export default function Harvest() {
  return (
    <section
      id="estrutura"
      aria-labelledby="safra-title"
      className="relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-[linear-gradient(180deg,var(--color-acai-ink)_0%,#140010_100%)] pb-[clamp(80px,10vw,160px)] text-white md:-mt-16 md:rounded-t-[4rem]"
    >
      <SectionHead onDark items={["05", "Estrutura", "Câmara refrigerada", "Safra → ano todo"]} />

      <div className="gutter grid items-end gap-10 pb-[clamp(40px,5vw,80px)] pt-[clamp(60px,8vw,140px)] lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)]">
        <h2 id="safra-title" className="t-display lg:col-span-9 [&_em]:text-acai-mist" data-split>
          Produção na <em>safra.</em>
          <br />
          Fornecimento ao
          <br />
          longo do <em>ano.</em>
        </h2>
        <div className="flex flex-col gap-4 text-white/75 lg:col-span-3" data-reveal="up">
          <p>
            A Macunaíma concentra sua produção durante o período de safra para formar estoque e manter a padronização de
            suas polpas.
          </p>
          <p>Sua estrutura de armazenamento permite trabalhar exclusivamente com açaí do Pará durante a safra.</p>
        </div>
      </div>

      {/* Foto da câmara com o "−20 °C" vazando para fora pela base */}
      <div className="relative">
        <div className="md:gutter">
          <Media
            src="/empresa/camara-refrigerada.jpg"
            alt="Câmara refrigerada com paletes de caixas de açaí Macunaíma"
            label="Câmara refrigerada a -20 °C com paletes de polpa armazenados"
            tone="deep"
            parallax={10}
            className="h-[clamp(380px,76svh,820px)] [&_img]:contrast-[1.05] [&_img]:saturate-[.75]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,0,16,0.7),rgba(20,0,16,0)_55%)]" />
          </Media>
        </div>
        <p
          aria-label="Temperatura da câmara refrigerada: -20 °C"
          className="pointer-events-none absolute -bottom-[0.17em] left-[calc(var(--gutter)-0.06em)] z-[2] flex items-start bg-[linear-gradient(180deg,#fff_10%,var(--color-acai-mist)_55%,rgba(181,138,166,0.15)_100%)] bg-clip-text font-display text-[clamp(96px,15vw,240px)] font-extralight leading-[0.8] tracking-[-0.0385em] text-transparent font-stretch-condensed"
        >
          <span aria-hidden="true">−20</span>
          <sup aria-hidden="true" className="ml-[0.1em] mt-[0.35em] text-[0.22em] font-light tracking-normal text-acai-mist">
            °C
          </sup>
        </p>
      </div>

      <dl className="gutter mt-[clamp(70px,9vw,150px)] grid grid-cols-2 lg:grid-cols-4">
        {storage.map((s, i) => (
          <div
            key={s.label}
            className={`border-t border-white/12 py-[22px] max-lg:odd:pr-[clamp(14px,1.6vw,28px)] lg:mr-[clamp(14px,1.6vw,28px)] lg:pr-[clamp(14px,1.6vw,28px)] ${
              i < storage.length - 1 ? "lg:border-r" : "lg:mr-0"
            } border-white/12`}
            data-reveal="up"
          >
            <dt className="caption flex min-h-[5.4em] flex-col gap-3.5 text-white/55">
              <LineIcon className="size-7 text-acai-mist">{s.icon}</LineIcon>
              {s.label}
            </dt>
            <dd className="mt-[18px] font-display text-[clamp(1.25rem,1.7vw,1.75rem)] leading-none tracking-[-0.022em]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="gutter mt-[clamp(40px,4vw,64px)]" data-reveal="up">
        <Button href="/estrutura" variant="light">
          Conheça nossa estrutura
        </Button>
      </div>
    </section>
  );
}
