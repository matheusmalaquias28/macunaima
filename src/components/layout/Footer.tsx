import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SocialIcon from "@/components/ui/SocialIcon";
import { contact, footerNav, seals, socials } from "@/lib/site";
import { lp, type Lang } from "@/lib/i18n";

const colTitle = "caption mb-2.5 text-acai";
const colLink = "w-fit text-acai-ink/70 transition-colors duration-300 hover:text-acai";
const metaLabel = "caption mt-3.5 text-acai-ink/45";

export default function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const en = lang === "en";

  return (
    <footer className="relative overflow-hidden border-t border-acai-ink/8 bg-creme pt-[clamp(64px,7vw,110px)] text-acai-ink">
      <div className="gutter grid grid-cols-12 gap-x-[clamp(14px,1.6vw,28px)] gap-y-6">
        <div className="col-span-12 mb-6 flex flex-col gap-5 lg:col-span-4 lg:mb-0">
          <Logo className="w-[200px] text-acai" />
          <p className="w-fit rounded-full bg-acai px-4 py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.12em] text-white">
            {en ? "Manufacturer · Wholesale only (B2B)" : "Indústria · Venda exclusiva B2B"}
          </p>
          <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-acai-ink/65">
            {en
              ? "Macunaíma serves companies only: distributors, açaí shops, industries and food service. We do not sell to final consumers."
              : "A Macunaíma atende exclusivamente empresas: distribuidores, açaiterias, indústrias e food service. Não realizamos venda no varejo."}
          </p>
          <ul className="flex gap-2" aria-label={en ? "Social media" : "Redes sociais"}>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} da Macunaíma`}
                  className="grid size-11 place-items-center rounded-full border border-acai/20 text-acai transition-colors duration-300 hover:border-acai hover:bg-acai hover:text-white"
                >
                  <SocialIcon name={s.icon} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {footerNav.slice(0, 2).map((col) => (
          <nav key={col.title.pt} aria-label={col.title[lang]} className="col-span-6 flex flex-col gap-2 text-[15px] lg:col-span-2 lg:first-of-type:col-start-6">
            <h3 className={colTitle}>{col.title[lang]}</h3>
            {col.links.map((l) => (
              <Link key={l.href} href={lp(lang, l.href)} className={colLink}>
                {l.label[lang]}
              </Link>
            ))}
          </nav>
        ))}

        <div className="col-span-12 mt-6 flex flex-col gap-2 text-[15px] lg:col-span-3 lg:mt-0">
          <h3 className={colTitle}>{footerNav[2].title[lang]}</h3>
          {footerNav[2].links.map((l) => (
            <Link key={l.href} href={lp(lang, l.href)} className={`${colLink} font-semibold text-acai`}>
              {l.label[lang]}
            </Link>
          ))}
          <p className={metaLabel}>{en ? "Phones" : "Telefones"}</p>
          {contact.phones.map((tel) => (
            <a key={tel} href={`tel:+55${tel.replace(/\D/g, "")}`} className={colLink}>
              {tel}
            </a>
          ))}
          <p className={metaLabel}>{en ? "Sales e-mail" : "E-mail comercial"}</p>
          <a href={`mailto:${contact.email}`} className={colLink}>
            {contact.email}
          </a>
          <p className={metaLabel}>{en ? "Plant address" : "Endereço da fábrica"}</p>
          <a href={contact.maps} target="_blank" rel="noopener noreferrer" className={`${colLink} max-w-[32ch] leading-relaxed`}>
            {contact.address}
          </a>
        </div>
      </div>

      {/* Selos em linha, nas cores originais */}
      <div className="gutter mt-[clamp(48px,6vw,88px)]">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-acai-ink/10 pt-7">
          <h3 className="caption text-acai-ink/50">{en ? "Certifications" : "Certificações"}</h3>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-5">
            {seals.map((s) => (
              <li key={s.src}>
                <Image src={s.src} alt={s.alt} title={s.name} width={s.w} height={s.h} sizes="120px" className="h-[40px] w-auto max-w-[120px] object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gutter caption mt-[clamp(28px,3vw,48px)] flex flex-wrap justify-between gap-5 border-t border-acai-ink/10 pb-[26px] pt-[22px] text-acai-ink/50">
        <span>
          © {year} Grupo Macunaíma. {en ? "All rights reserved." : "Todos os direitos reservados."}
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-1">
          <span>
            {en ? "Design by" : "Design por"}{" "}
            <a href="https://volostudio.com.br/" target="_blank" rel="noopener noreferrer" className="text-acai-ink/75 transition-colors hover:text-acai">
              Volo
            </a>
          </span>
          <span>
            {en ? "Developed by" : "Desenvolvido por"}{" "}
            <a href="https://www.energymidia.com.br/" target="_blank" rel="noopener noreferrer" className="text-acai-ink/75 transition-colors hover:text-acai">
              Energy
            </a>
          </span>
        </span>
      </div>
    </footer>
  );
}
