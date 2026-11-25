import type { Metadata } from "next";
import Logo from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import { bioLinks, socials } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { hasLang, lp, type Lang } from "@/lib/i18n";

// Link da bio do Instagram: página enxuta, sem cabeçalho/rodapé do site (ver HideOn) e fora do Google
export async function generateMetadata({ params }: PageProps<"/[lang]/links">): Promise<Metadata> {
  const { lang } = await params;
  const l: Lang = hasLang(lang) ? lang : "pt";
  return {
    ...pageMetadata({
      lang: l,
      title: "Links",
      description:
        l === "en"
          ? "Macunaíma: website, sales on WhatsApp and wholesale registration."
          : "Macunaíma: site, comercial no WhatsApp e cadastro para compras no atacado.",
      path: "/links",
    }),
    robots: { index: false, follow: true },
  };
}

const icons = {
  site: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </>
  ),
  cadastro: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
};

export default async function LinksPage({ params }: PageProps<"/[lang]/links">) {
  const { lang } = await params;
  const l: Lang = hasLang(lang) ? lang : "pt";

  return (
    // Margem negativa anula o espaço da barra de pedido, que não aparece aqui
    <div className="relative -mb-[calc(5.5rem+env(safe-area-inset-bottom))] min-h-dvh overflow-hidden bg-creme text-acai-ink lg:mb-0">
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center px-5 pb-12 pt-[clamp(48px,9vh,88px)]">
        <h1 className="text-acai">
          <Logo className="w-[230px]" />
        </h1>
        <p className="caption mt-5 rounded-full border border-acai/20 px-4 py-1.5 text-acai">
          {l === "en" ? "Manufacturer · Wholesale only (B2B)" : "Indústria · Venda exclusiva B2B"}
        </p>
        <p className="mt-4 text-center text-[0.95rem] leading-relaxed text-acai-ink/70">
          {l === "en"
            ? "Açaí from the Amazon, made in Pará for businesses across Brazil and the world."
            : "Açaí da Amazônia, produzido no Pará para empresas de todo o Brasil e do mundo."}
        </p>

        <ul className="mt-10 grid w-full gap-3">
          {bioLinks.map((b) => {
            const external = b.kind === "whatsapp";
            return (
              <li key={b.kind}>
                <a
                  href={external ? b.href : lp(l, b.href)}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex items-center gap-4 rounded-[1.25rem] p-3 pr-4 shadow-[0_14px_34px_-22px_rgba(34,1,26,0.5)] ring-1 transition-transform duration-500 ease-[var(--ease-expo)] hover:-translate-y-0.5 ${
                    external ? "bg-acai text-white ring-acai" : "bg-white text-acai-ink ring-acai-ink/8"
                  }`}
                >
                  <span
                    className={`grid size-12 shrink-0 place-items-center rounded-full ${
                      external ? "bg-folha text-acai-ink" : "bg-nevoa text-acai"
                    }`}
                  >
                    {b.kind === "whatsapp" ? (
                      <SocialIcon name="whatsapp" className="size-6" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-6">
                        {icons[b.kind]}
                      </svg>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.15rem] font-semibold leading-tight tracking-[-0.01em]">{b.label[l]}</span>
                    <span className={`mt-0.5 block text-sm ${external ? "text-white/70" : "text-acai-ink/60"}`}>{b.detail[l]}</span>
                  </span>
                  <Arrow className={`size-4 shrink-0 transition-transform duration-500 group-hover:rotate-[-45deg] ${external ? "text-white" : "text-acai"}`} />
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="mt-10 flex gap-2" aria-label={l === "en" ? "Social media" : "Redes sociais"}>
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
    </div>
  );
}
