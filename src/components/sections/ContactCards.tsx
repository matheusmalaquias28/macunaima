import {
  contact,
  tropicalAcai,
  whatsappLink,
  whatsappMessage,
  type Unit,
} from "@/lib/site";
import SocialIcon from "@/components/ui/SocialIcon";
import type { Lang } from "@/lib/i18n";

const tel = (p: string) =>
  `tel:+${p.replace(/\D/g, "").replace(/^(?!55)/, "55")}`;

const pin = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="size-4"
  >
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

function Flag({ code, label }: { code: "br" | "us"; label: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- bandeira SVG estática
    <img
      src={`/flags/${code}.svg`}
      alt={label}
      width={36}
      height={25}
      className="h-[25px] w-9 rounded-[3px] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
    />
  );
}

const action =
  "group inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-[0.92rem] font-semibold transition-colors duration-500";

/** Card de contato comercial B2B (carrossel da Home e página Onde nos encontrar) */
export function UnitCard({
  unit,
  lang,
  className = "",
  tone = "white",
}: {
  unit: Unit;
  lang: Lang;
  className?: string;
  tone?: "white" | "creme";
}) {
  const en = lang === "en";
  return (
    <article
      id={unit.slug}
      aria-labelledby={`${unit.slug}-title`}
      className={`flex scroll-mt-28 flex-col rounded-[1.75rem] p-6 md:p-8 ${tone === "white" ? "bg-white ring-1 ring-acai-ink/8" : "bg-creme"} ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-acai px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white">
          {unit.kind[lang]}
        </span>
        <span className="caption flex items-center gap-2 text-acai-ink/50">
          {unit.uf}
          <Flag code="br" label={unit.country[lang]} />
        </span>
      </div>
      <h3
        id={`${unit.slug}-title`}
        className="mt-8 font-display text-[clamp(2rem,2.8vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-acai-ink"
      >
        {unit.city}
      </h3>
      <p className="mt-2 text-[0.95rem] font-semibold text-acai">{unit.name}</p>
      <p className="mt-1 text-[0.92rem] text-acai-ink/60">
        {unit.segment[lang]}
      </p>
      {unit.address && (
        <p className="mt-4 text-[0.9rem] leading-relaxed text-acai-ink/55">
          {unit.address}
        </p>
      )}

      <ul
        className="mt-6 flex flex-wrap gap-1.5"
        aria-label={en ? "Products" : "Produtos"}
      >
        {unit.products.map((p) => (
          <li
            key={p.pt}
            className="rounded-full border border-acai-ink/12 px-3 py-1 text-[0.82rem] font-medium text-acai-ink/75"
          >
            {p[lang]}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        {unit.phone && (
          <a
            href={tel(unit.phone)}
            className="mb-5 block font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-acai-ink transition-colors hover:text-acai"
          >
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
            <a
              href={unit.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={`${action} border border-acai/25 text-acai hover:border-acai hover:bg-acai hover:text-white`}
            >
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
export function ExportCard({
  lang,
  className = "",
}: {
  lang: Lang;
  className?: string;
}) {
  const en = lang === "en";
  const t = tropicalAcai;
  return (
    <article
      id="exportacao"
      aria-labelledby="tropical-title"
      className={`flex scroll-mt-28 flex-col rounded-[1.75rem] bg-acai p-6 text-white md:p-8 ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-folha px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-acai-ink">
          {t.kind[lang]}
        </span>
        <span className="caption flex items-center gap-2 text-white/70">
          USA
          <Flag code="us" label={en ? "United States" : "Estados Unidos"} />
        </span>
      </div>
      <h3
        id="tropical-title"
        className="mt-8 font-display text-[clamp(2rem,2.8vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
      >
        {t.name}
      </h3>
      <p className="mt-2 text-[0.95rem] font-semibold text-folha">
        {en ? "United States" : "Estados Unidos"}
      </p>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-white/75">
        {t.text[lang]}
      </p>
      <div className="mt-auto pt-8">
        {t.phone && (
          <a
            href={`tel:${t.phoneIntl}`}
            className="mb-5 block font-display text-[1.5rem] font-semibold tracking-[-0.02em] transition-colors hover:text-folha"
          >
            {t.phone}
          </a>
        )}
        <div className="flex flex-wrap gap-2">
          {t.url && (
            <a
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${action} bg-white text-acai hover:bg-folha hover:text-acai-ink`}
            >
              {en ? "Contact page" : "Site · contato"}
            </a>
          )}
          {t.phone && (
            <a
              href={`tel:${t.phoneIntl}`}
              className={`${action} border border-white/35 text-white hover:bg-white hover:text-acai`}
            >
              {en ? "Call" : "Ligar"}
            </a>
          )}
          {t.email && (
            <a
              href={`mailto:${t.email}`}
              className={`${action} border border-white/35 text-white hover:bg-white hover:text-acai`}
            >
              E-mail
            </a>
          )}
          {!t.url && !t.phone && !t.email && (
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent("Exportação EUA · Tropical Açaí")}`}
              className={`${action} bg-white text-acai hover:bg-folha hover:text-acai-ink`}
            >
              {en ? "Contact for export" : "Contato para exportação"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
