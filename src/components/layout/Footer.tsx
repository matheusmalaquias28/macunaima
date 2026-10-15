import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { contact, footerNav, seals } from "@/lib/site";

const colTitle = "caption mb-2.5 text-acai-mist";
const colLink = "w-fit text-white/75 transition-colors duration-300 hover:text-white";
const metaLabel = "caption mt-3.5 text-white/40";

export default function Footer() {
  const year = new Date().getFullYear();
  const [institucional, produtos, comercial] = footerNav;

  return (
    <footer className="relative overflow-hidden bg-acai-ink pt-[clamp(70px,8vw,130px)] text-white">
      <div className="gutter grid grid-cols-12 gap-x-[clamp(14px,1.6vw,28px)] gap-y-6">
        <div className="col-span-12 mb-6 flex flex-col gap-[22px] lg:col-span-4 lg:mb-0">
          <Logo className="w-[200px]" />
          <p className="max-w-[16ch] font-display text-[clamp(20px,1.6vw,26px)] font-light leading-[1.05] tracking-[-0.011em] text-white/85">
            Açaí da Amazônia. Produzido no Pará para o mundo.
          </p>
        </div>

        <nav aria-label={institucional.title} className="col-span-6 flex flex-col gap-2 text-[15px] lg:col-span-2 lg:col-start-6">
          <h3 className={colTitle}>{institucional.title}</h3>
          {institucional.links.map((l) => (
            <Link key={l.label} href={l.href} className={colLink}>
              {l.label}
            </Link>
          ))}
        </nav>

        <nav aria-label={produtos.title} className="col-span-6 flex flex-col gap-2 text-[15px] lg:col-span-2">
          <h3 className={colTitle}>{produtos.title}</h3>
          {produtos.links.map((l) => (
            <Link key={l.label} href={l.href} className={colLink}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="col-span-12 mt-6 flex flex-col gap-2 text-[15px] lg:col-span-3 lg:mt-0">
          <h3 className={colTitle}>{comercial.title}</h3>
          {comercial.links.map((l) => (
            <Link key={l.label} href={l.href} className={colLink}>
              {l.label}
            </Link>
          ))}
          <p className={metaLabel}>Telefones</p>
          {contact.phones.map((tel) => (
            <a key={tel} href={`tel:+55${tel.replace(/\D/g, "")}`} className={colLink}>
              {tel}
            </a>
          ))}
          <p className={metaLabel}>E-mail</p>
          <a href={`mailto:${contact.email}`} className={colLink}>
            {contact.email}
          </a>
          <p className={metaLabel}>Endereço</p>
          <a href={contact.maps} target="_blank" rel="noopener noreferrer" className={`${colLink} max-w-[32ch] leading-relaxed`}>
            {contact.address}
          </a>
        </div>
      </div>

      {/* Selos em linha, monocromáticos */}
      <div className="gutter mt-[clamp(56px,6vw,96px)]">
        <div className="flex flex-wrap items-center gap-8 border-t border-white/12 pt-[26px]">
          <h3 className="caption text-white/50">Certificações</h3>
          <ul className="flex flex-wrap items-center gap-x-[34px] gap-y-[22px]">
            {seals.map((s) => (
              <li key={s.src}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.w}
                  height={s.h}
                  sizes="120px"
                  className="h-[34px] w-auto opacity-60 mix-blend-screen contrast-[1.3] grayscale invert"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assinatura em escala grande e apagada */}
      <p
        aria-hidden="true"
        className="gutter mt-[clamp(56px,7vw,110px)] whitespace-nowrap font-display text-[calc((100cqw-2*var(--gutter))/14.8)] leading-[0.9] tracking-[-0.0193em] text-white/10"
      >
        Produzido no Pará <span className="font-light">para o mundo.</span>
      </p>

      <div className="gutter caption mt-[clamp(24px,3vw,48px)] flex flex-wrap justify-between gap-5 border-t border-white/12 pb-[26px] pt-[22px] text-white/45">
        <span>© {year} Grupo Macunaíma. Todos os direitos reservados.</span>
        <span className="hidden md:inline">03°47′S · 52°28′W</span>
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <span>
            Design por{" "}
            <a href="https://volostudio.com.br/" target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors hover:text-white">
              Volo
            </a>
          </span>
          <span>
            Desenvolvido por{" "}
            <a href="https://www.energymidia.com.br/" target="_blank" rel="noopener noreferrer" className="text-white/75 transition-colors hover:text-white">
              Energy
            </a>
          </span>
        </span>
      </div>
    </footer>
  );
}
