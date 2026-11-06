import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import { bioLinks, socials, whatsappLink } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

// Link da bio do Instagram: página enxuta, sem cabeçalho/rodapé do site (ver HideOn) e fora do Google
export const metadata: Metadata = {
  ...pageMetadata({
    title: "Links",
    description: "Fale com a Macunaíma no WhatsApp da unidade mais próxima: Pará, Ceará ou Pernambuco.",
    path: "/links",
  }),
  robots: { index: false, follow: true },
};

const siteLinks = [
  { label: "Conheça nossos produtos", href: "/produtos" },
  { label: "Fazer pedido pelo site", href: "/contato" },
  { label: "Onde nos encontrar", href: "/onde-nos-encontrar" },
];

export default function LinksPage() {
  return (
    // Margem negativa anula o espaço da barra de pedido, que não aparece aqui
    <div className="relative -mb-[calc(5.5rem+env(safe-area-inset-bottom))] min-h-dvh overflow-hidden bg-acai text-white lg:mb-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/topo.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full object-cover opacity-[0.13] mix-blend-overlay"
      />

      <div className="relative mx-auto flex w-full max-w-md flex-col items-center px-5 pb-12 pt-[clamp(48px,9vh,88px)]">
        <h1>
          <Logo className="w-[220px]" />
        </h1>
        <p className="mt-3 text-center text-[0.95rem] leading-relaxed text-white/75">
          Açaí da Amazônia, direto do Pará para todo o Brasil.
        </p>

        <ul className="mt-5 flex gap-2" aria-label="Redes sociais">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} da Macunaíma`}
                className="grid size-11 place-items-center rounded-full border border-white/25 transition-colors duration-300 hover:border-folha hover:bg-folha hover:text-acai-ink"
              >
                <SocialIcon name={s.icon} className="size-[18px]" />
              </a>
            </li>
          ))}
        </ul>

        <p className="caption mt-10 w-full text-folha">Fale no WhatsApp</p>
        <ul className="mt-3 grid w-full gap-3">
          {bioLinks.map((l) => (
            <li key={l.label}>
              <a
                href={whatsappLink(l.phone, l.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-[1.25rem] bg-white p-3 pr-4 text-acai-ink transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-0.5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-folha text-acai-ink">
                  <SocialIcon name="whatsapp" className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.1rem] font-semibold leading-tight tracking-[-0.02em]">{l.label}</span>
                  <span className="mt-0.5 block text-sm text-acai-ink/60">{l.detail}</span>
                </span>
                <Arrow className="size-4 shrink-0 text-acai transition-transform duration-500 group-hover:rotate-[-45deg]" />
              </a>
            </li>
          ))}
        </ul>

        <p className="caption mt-10 w-full text-folha">No site</p>
        <ul className="mt-3 grid w-full gap-3">
          {siteLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex h-14 items-center justify-between rounded-full border border-white/30 pl-6 pr-5 font-semibold transition-colors duration-500 hover:border-white hover:bg-white hover:text-acai"
              >
                {l.label}
                <Arrow className="size-4 transition-transform duration-500 group-hover:rotate-[-45deg]" />
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="caption mt-12 text-white/50 transition-colors hover:text-white">
          acaimacunaima.com.br
        </Link>
      </div>
    </div>
  );
}
