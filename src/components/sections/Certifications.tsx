import Image from "next/image";
import { seals } from "@/lib/site";

export default function Certifications() {
  const loop = [...seals, ...seals];
  return (
    <section aria-labelledby="cert-title" className="relative py-14 md:py-20">
      <div className="gutter mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="cert-title" className="eyebrow text-acai" data-reveal="up">
          Certificações
        </h2>
        <p className="max-w-sm text-sm text-acai-ink/60" data-reveal="up">
          Padrões reconhecidos no Brasil e nos mercados para onde o açaí da Macunaíma é exportado.
        </p>
      </div>
      <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="marquee-track flex w-max items-center" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
          {loop.map((s, i) => (
            <li key={i} aria-hidden={i >= seals.length} className="px-8 md:px-14">
              <Image
                src={s.src}
                alt={i < seals.length ? s.alt : ""}
                width={s.w}
                height={s.h}
                sizes="220px"
                className="h-16 w-auto max-w-[200px] object-contain transition-transform duration-500 hover:scale-110 md:h-24 md:max-w-[240px]"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
