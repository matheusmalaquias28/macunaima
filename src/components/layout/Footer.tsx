import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SocialIcon from "@/components/ui/SocialIcon";
import { contact, footerNav, seals, socials } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-acai-ink text-white">
      <div className="gutter grid gap-14 pb-16 pt-20 md:pt-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo className="w-[210px]" />
          <p className="mt-8 max-w-xs text-lg leading-snug text-white/70">
            Açaí da Amazônia. Produzido no Pará para o mundo.
          </p>
          <ul className="mt-8 flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-12 place-items-center rounded-full border border-white/15 transition-colors duration-300 hover:border-folha hover:bg-folha hover:text-acai-ink"
                >
                  <SocialIcon name={s.icon} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Rodapé" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          {footerNav.map((col) => (
            <div key={col.title} className={col.title === "Comercial" ? "col-span-2 sm:col-span-1" : ""}>
              <p className="eyebrow mb-6 text-folha">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-2 text-white/75 transition-colors hover:text-white"
                    >
                      <span className="h-px w-0 bg-folha transition-all duration-500 ease-[var(--ease-expo)] group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.title === "Comercial" && (
                <dl className="mt-8 flex flex-col gap-4 text-sm text-white/60">
                  <div>
                    <dt className="eyebrow mb-1 text-white/40">Telefones</dt>
                    {contact.phones.map((tel) => (
                      <dd key={tel}>
                        <a href={`tel:+55${tel.replace(/\D/g, "")}`} className="transition-colors hover:text-white">
                          {tel}
                        </a>
                      </dd>
                    ))}
                  </div>
                  <div>
                    <dt className="eyebrow mb-1 text-white/40">E-mail</dt>
                    <dd>{contact.email}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow mb-1 text-white/40">Endereço</dt>
                    <dd>{contact.address}</dd>
                  </div>
                </dl>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="gutter">
        <div className="border-t border-white/10 py-10">
          <p className="eyebrow mb-6 text-white/40">Certificações</p>
          <ul className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
            {seals.map((s) => (
              <li key={s.src} className="relative h-16 rounded-xl bg-white sm:h-20 sm:w-28 sm:rounded-2xl md:h-24 md:w-32">
                <Image src={s.src} alt={s.alt} fill sizes="128px" className="object-contain p-3" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Assinatura em escala total */}
      <div className="gutter pb-4 pt-6" aria-hidden="true">
        <Logo className="w-full text-acai" />
      </div>

      <div className="gutter flex flex-col gap-3 border-t border-white/10 py-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© {year} Grupo Macunaíma. Todos os direitos reservados.</p>
        <p>
          Desenvolvido por <span className="font-semibold text-white">Energy</span>
        </p>
      </div>
    </footer>
  );
}
