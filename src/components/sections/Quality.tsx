import Media from "@/components/ui/Media";
import type { Lang, T } from "@/lib/i18n";

const items: { title: T; text: T; icon: React.ReactNode }[] = [
  {
    title: { pt: "Controle da matéria-prima", en: "Raw material control" },
    text: {
      pt: "Os frutos são avaliados na chegada, antes de serem liberados para a produção.",
      en: "The fruit is assessed on arrival, before being released for production.",
    },
    icon: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <circle cx="10.5" cy="10.5" r="2.5" />
        <path d="m15.3 15.3 5.2 5.2" />
      </>
    ),
  },
  {
    title: { pt: "Higienização em 4 tanques", en: "Cleaning in 4 tanks" },
    text: {
      pt: "Os frutos passam por quatro tanques de higienização.",
      en: "The fruit goes through four cleaning tanks.",
    },
    icon: (
      <>
        <path d="M3 5.5c1.5-1 3-1 4.5 0s3 1 4.5 0 3-1 4.5 0 3 1 4.5 0" />
        <rect x="3" y="9" width="18" height="11" rx="1" />
        <path d="M7.5 9v11M12 9v11M16.5 9v11" />
      </>
    ),
  },
  {
    title: { pt: "Pasteurização e congelamento controlados", en: "Controlled pasteurization and freezing" },
    text: {
      pt: "Etapas monitoradas dentro dos parâmetros estabelecidos.",
      en: "Stages monitored within established parameters.",
    },
    icon: (
      <>
        <path d="M14 13.5V5a2 2 0 1 0-4 0v8.5a4 4 0 1 0 4 0Z" />
        <path d="M12 15.5V9M18.5 3.5v4M16.5 5.5h4" />
      </>
    ),
  },
  {
    title: { pt: "Laboratórios próprios", en: "In-house laboratories" },
    text: {
      pt: "Laboratórios de Físico-Química e Microbiologia dentro da indústria.",
      en: "Physical-chemical and microbiology laboratories inside the plant.",
    },
    icon: (
      <>
        <path d="M9 3h6M10.5 3v6l-5.3 9.2a1.5 1.5 0 0 0 1.3 2.3h11a1.5 1.5 0 0 0 1.3-2.3L13.5 9V3" />
        <path d="M7.6 14.5h8.8" />
      </>
    ),
  },
  {
    title: { pt: "Rastreabilidade por lote", en: "Batch traceability" },
    text: {
      pt: "Cada lote permite identificar a região de origem da matéria-prima utilizada.",
      en: "Each batch identifies the region where its raw material came from.",
    },
    icon: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
        <circle cx="12" cy="10" r="2.5" />
        <path d="M2.5 10h2M19.5 10h2" />
      </>
    ),
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Quality({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section id="qualidade" aria-labelledby="qualidade-title" className="relative bg-white py-[clamp(72px,9vw,150px)]">
      <div className="gutter grid gap-12 lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)]">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
              <span className="h-px w-7 bg-current opacity-70" />
              {en ? "Quality control" : "Controle de Qualidade"}
            </p>
            <h2 id="qualidade-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
              {en ? (
                <>
                  Control from the fruit&apos;s arrival <em>to the final product.</em>
                </>
              ) : (
                <>
                  Controle desde a chegada do fruto <em>até o produto final.</em>
                </>
              )}
            </h2>
            {/* Vídeo real da linha de produção */}
            <Media
              videoSrc="/video/macunaima-industria-v2.mp4"
              poster="/video/macunaima-industria-v2-poster.webp"
              label={en ? "Macunaíma production line" : "Linha de produção da Macunaíma"}
              className="mt-10 aspect-[4/5] max-h-[560px] w-full rounded-[1.75rem] bg-nevoa"
            />
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {items.map((it, i) => (
            <li
              key={it.title.pt}
              className="grid grid-cols-[3.25rem_minmax(0,1fr)] gap-x-4 border-t border-acai-ink/10 py-8 last:border-b md:grid-cols-[4.5rem_minmax(0,1fr)] md:py-10"
              data-reveal="up"
            >
              <span className="grid size-[3.25rem] place-items-center rounded-2xl bg-nevoa text-acai md:size-[4.5rem]">
                <svg viewBox="0 0 24 24" className="size-6 md:size-8" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {it.icon}
                </svg>
              </span>
              <div>
                <p className="caption text-folha-ink">{pad(i + 1)}</p>
                <h3 className="mt-1 font-display text-[clamp(1.35rem,2vw,1.85rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-acai-ink">{it.title[lang]}</h3>
                <p className="mt-2 max-w-[30rem] text-[1.02rem] leading-relaxed text-acai-ink/65">{it.text[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
