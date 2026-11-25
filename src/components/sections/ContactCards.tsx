import { contact, tropicalAcai, whatsappLink, whatsappMessage, type Unit } from "@/lib/site";
import SocialIcon from "@/components/ui/SocialIcon";
import type { Lang } from "@/lib/i18n";

const tel = (p: string) => `tel:+${p.replace(/\D/g, "").replace(/^(?!55)/, "55")}`;

const pin = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

const action =
  "group inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-[0.92rem] font-semibold transition-colors duration-500";

/** Card de contato comercial B2B (carrossel da Home e página Onde nos encontrar) */
export function UnitCard({ unit, lang, className = "", tone = "white" }: { unit: Unit; lang: Lang; className?: string; tone?: "white" | "creme" }) {
  const en = lang === "en";
  return (
    <article
      id={unit.slug}
      aria-labelledby={`${unit.slug}-title`}
      className={`flex scroll-mt-28 flex-col rounded-[1.75rem] p-6 md:p-8 ${tone === "white" ? "bg-white ring-1 ring-acai-ink/8" : "bg-creme"} ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-acai px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white">{unit.kind[lang]}</span>
        <span className="caption text-acai-ink/45">
          {unit.uf} · {unit.country[lang]}
        </span>
      </div>
      <h3 id={`${unit.slug}-title`} className="mt-8 font-display text-[clamp(2rem,2.8vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-acai-ink">
        {unit.city}
      </h3>
      <p className="mt-2 text-[0.95rem] font-semibold text-acai">{unit.name}</p>
      <p className="mt-1 text-[0.92rem] text-acai-ink/60">{unit.segment[lang]}</p>
      {unit.address && <p className="mt-4 text-[0.9rem] leading-relaxed text-acai-ink/55">{unit.address}</p>}

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={en ? "Products" : "Produtos"}>
        {unit.products.map((p) => (
          <li key={p.pt} className="rounded-full border border-acai-ink/12 px-3 py-1 text-[0.82rem] font-medium text-acai-ink/75">
            {p[lang]}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        {unit.phone && (
          <a href={tel(unit.phone)} className="mb-5 block font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-acai-ink transition-colors hover:text-acai">
            {unit.phone}
          </a>
        )}
        <div className="flex flex-wrap gap-2">
          {unit.phone && (
            <a
              href={whatsappLink(unit.phone, whatsappMessage[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className={`${action} bg-acai text-white hover:bg-acai-ink`}
            >
              <SocialIcon name="whatsapp" className="size-4" />
              WhatsApp
            </a>
          )}
          {unit.maps && (
            <a href={unit.maps} target="_blank" rel="noopener noreferrer" className={`${action} border border-acai/25 text-acai hover:border-acai hover:bg-acai hover:text-white`}>
              {pin}
              {en ? "Location" : "Localização"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Tropical Açaí: exportação para os Estados Unidos */
export function ExportCard({ lang, className = "" }: { lang: Lang; className?: string }) {
  const en = lang === "en";
  const t = tropicalAcai;
  return (
    <article id="exportacao" aria-labelledby="tropical-title" className={`flex scroll-mt-28 flex-col rounded-[1.75rem] bg-folha/25 p-6 ring-1 ring-folha-ink/20 md:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-folha-ink px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white">{t.kind[lang]}</span>
        <span className="caption text-acai-ink/45">USA</span>
      </div>
      <h3 id="tropical-title" className="mt-8 font-display text-[clamp(2rem,2.8vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-acai-ink">
        {t.name}
      </h3>
      <p className="mt-2 text-[0.95rem] font-semibold text-folha-ink">{en ? "United States" : "Estados Unidos"}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-acai-ink/70">{t.text[lang]}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {t.url && (
          <a href={t.url} target="_blank" rel="noopener noreferrer" className={`${action} bg-acai-ink text-white hover:bg-acai`}>
            {en ? "Visit website" : "Acessar site"}
          </a>
        )}
        {t.phone && (
          <a href={whatsappLink(t.phone, whatsappMessage.en)} target="_blank" rel="noopener noreferrer" className={`${action} border border-acai-ink/25 text-acai-ink hover:bg-acai-ink hover:text-white`}>
            <SocialIcon name="whatsapp" className="size-4" />
            {en ? "Export contact" : "Contato exportação"}
          </a>
        )}
        {t.email && (
          <a href={`mailto:${t.email}`} className={`${action} border border-acai-ink/25 text-acai-ink hover:bg-acai-ink hover:text-white`}>
            E-mail
          </a>
        )}
        {!t.url && !t.phone && !t.email && (
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent("Exportação EUA · Tropical Açaí")}`} className={`${action} bg-acai-ink text-white hover:bg-acai`}>
            {en ? "Contact for export" : "Contato para exportação"}
          </a>
        )}
      </div>
    </article>
  );
}
