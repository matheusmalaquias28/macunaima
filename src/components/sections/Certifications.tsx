import Image from "next/image";
import { seals } from "@/lib/site";

export default function Certifications() {
  const loop = [...seals, ...seals];
  return (
    <section aria-labelledby="cert-title" className="relative overflow-hidden bg-white pb-[clamp(36px,4vw,60px)] pt-[clamp(40px,5vw,72px)]">
      <div className="gutter mb-[clamp(28px,3vw,44px)] grid items-end gap-5 md:grid-cols-12 md:gap-[clamp(14px,1.6vw,28px)]">
        <h2 id="cert-title" className="caption flex items-center gap-3 text-acai-soft md:col-span-4" data-reveal="up">
          <span className="h-px w-7 bg-current opacity-70" />
          Certificações
          <span className="text-acai-ink">{String(seals.length).padStart(2, "0")}</span>
        </h2>
        <p
          className="font-display text-[clamp(1.0625rem,1.35vw,1.25rem)] leading-[1.3] tracking-[-0.0083em] text-acai-ink md:col-span-8 md:col-start-5 lg:justify-self-end lg:whitespace-nowrap"
          data-reveal="up"
        >
          Padrões reconhecidos no Brasil e nos mercados para onde o açaí da Macunaíma é exportado.
        </p>
      </div>

      {/* Logos em preto e branco (a cor volta no hover); padding = gap para o loop de -50% emendar sem salto */}
      <div className="marquee overflow-hidden py-[26px] [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul
          className="marquee-track flex w-max items-center gap-[clamp(48px,6vw,96px)] pr-[clamp(48px,6vw,96px)]"
          style={{ "--marquee-duration": "42s" } as React.CSSProperties}
        >
          {loop.map((s, i) => (
            <li key={i} aria-hidden={i >= seals.length}>
              <Image
                src={s.src}
                alt={i < seals.length ? s.alt : ""}
                width={s.w}
                height={s.h}
                sizes="160px"
                className="h-[clamp(40px,4vw,58px)] w-auto max-w-[150px] object-contain opacity-60 mix-blend-multiply grayscale contrast-[1.1] transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
