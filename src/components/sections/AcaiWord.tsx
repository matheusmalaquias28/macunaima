import LineIcon from "@/components/ui/LineIcon";
import SectionHead from "@/components/ui/SectionHead";

const chain = [
  {
    k: "Do fruto",
    text: <>Açaí do Pará, da colheita à linha industrial em até 24 horas.</>,
    icon: (
      <>
        <path d="M12 22.5V9.5M12 9.5C9.6 7 6.4 6.6 3 7.6M12 9.5c2.4-2.5 5.6-2.9 9-1.9M12 9.5c-1.7-2.1-2.3-4.7-1.6-7.5M12 9.5c1.7-2.1 2.3-4.7 1.6-7.5" />
        <circle cx="9.6" cy="12.6" r="1.1" />
        <circle cx="12" cy="13.6" r="1.1" />
        <circle cx="14.4" cy="12.6" r="1.1" />
        <circle cx="10.8" cy="15.4" r="1.1" />
        <circle cx="13.2" cy="15.4" r="1.1" />
      </>
    ),
  },
  {
    k: "À polpa",
    text: (
      <>
        Polpa de açaí em concentrações de <b>8%</b>, <b>12%</b> e <b>14%</b>.
      </>
    ),
    icon: (
      <>
        <path d="M12 2.5C8 7.6 6 11.2 6 14.2a6 6 0 0 0 12 0c0-3-2-6.6-6-11.7z" />
        <path d="M9.2 15.2a2.8 2.8 0 0 0 2.8 2.6" />
      </>
    ),
  },
  {
    k: "Ao seu negócio",
    text: <>Embalagens de 1,02 kg e 100 g, com fornecimento ao longo do ano.</>,
    icon: (
      <>
        <path d="M2.5 20.5h19M4.5 20.5v1.5M12 20.5v1.5M19.5 20.5v1.5M4 20.5v-7h7v7M13 20.5v-11h7v11" />
        <path d="M14 4.5h6.5M18.5 2.5l2 2-2 2" />
      </>
    ),
  },
];

export default function AcaiWord() {
  return (
    <section aria-label="Açaí — do fruto ao seu negócio" className="relative overflow-hidden bg-white pb-[clamp(80px,10vw,160px)] text-acai-ink">
      <SectionHead items={["02", "Açaí", "Euterpe oleracea", "Matéria-prima"]} />

      <ol className="gutter mt-[clamp(40px,5vw,80px)] grid gap-[30px] md:grid-cols-3 md:gap-[clamp(14px,1.6vw,28px)]">
        {chain.map((c, i) => (
          <li key={c.k} className="relative border-t border-acai-ink pt-[18px]" data-reveal="up">
            <span className="caption mb-[18px] flex items-center gap-2.5 text-acai-soft">
              <LineIcon>{c.icon}</LineIcon>
              {c.k}
            </span>
            <p className="max-w-[20ch] font-display text-[clamp(1.1875rem,1.6vw,1.5625rem)] leading-[1.12] tracking-[-0.0165em] [&_b]:font-semibold [&_b]:text-acai">
              {c.text}
            </p>
            <span className="caption absolute right-0 top-[18px] text-acai-ink/45">{String(i + 1).padStart(2, "0")}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
