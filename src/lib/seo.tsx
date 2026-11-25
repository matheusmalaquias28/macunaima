import type { Metadata } from "next";
import { contact, socials, units } from "@/lib/site";
import { lp, ogLocale, type Lang } from "@/lib/i18n";

// Domínio de produção (o site atual da Macunaíma já usa www). Dá para sobrescrever com NEXT_PUBLIC_SITE_URL.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.acaimacunaima.com.br").replace(/\/$/, "");
export const siteName = "Açaí Macunaíma";

const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

// Imagem de compartilhamento (WhatsApp, LinkedIn, Facebook, X...): 1200×630, JPG leve para a prévia carregar rápido
export const ogImage = {
  url: "/brand/og-macunaima.jpg",
  width: 1200,
  height: 630,
  alt: "Açaí Macunaíma: indústria de polpa de açaí da Amazônia, venda exclusiva B2B",
  type: "image/jpeg",
};

/** Metadados de uma página: título, descrição, canonical, hreflang e Open Graph/Twitter coerentes */
export function pageMetadata({
  lang,
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Macunaíma`;
  const url = lp(lang, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: { "pt-BR": lp("pt", path), en: lp("en", path), "x-default": lp("pt", path) },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: lang === "pt" ? ogLocale.en : ogLocale.pt,
      siteName,
      url,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}

const phoneE164 = (p: string) => {
  const d = p.replace(/\D/g, "");
  return `+${d.startsWith("55") && d.length > 11 ? d : `55${d}`}`;
};

const orgId = `${siteUrl}/#organizacao`;

/** Organização + site: vai em todas as páginas (layout) */
export function siteJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteName,
        legalName: "Agroindústria Açaí Macunaíma",
        url: siteUrl,
        logo: `${siteUrl}/apple-icon`,
        image: `${siteUrl}${ogImage.url}`,
        description:
          lang === "en"
            ? "Açaí pulp and sorbet manufacturer in Inhangapi, Pará, Brazil. Wholesale (B2B) only: distributors, açaí shops, industries and food service."
            : "Indústria de polpa de açaí e sorbet em Inhangapi, Pará. Venda exclusiva para o atacado (B2B): distribuidores, açaiterias, indústrias e food service.",
        email: contact.email,
        telephone: phoneE164(contact.phones[0]),
        sameAs: socials.map((s) => s.href),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Travessa Benedito Miguel de Souza, 230, Vila Nova",
          addressLocality: "Inhangapi",
          addressRegion: "PA",
          addressCountry: "BR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          telephone: phoneE164(contact.whatsapp),
          email: contact.email,
          availableLanguage: ["Portuguese", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#site`,
        url: siteUrl,
        name: siteName,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** Trilha (breadcrumb) de uma página interna */
export function breadcrumbJsonLd(lang: Lang, trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: lang === "en" ? "Home" : "Início", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: abs(lp(lang, t.path)),
    })),
  };
}

/** Unidades com endereço como negócios locais, ligadas à organização */
export function unitsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": units
      .filter((u) => u.address && u.phone)
      .map((u) => ({
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/onde-nos-encontrar#${u.slug}`,
        name: `${u.name} Macunaíma ${u.city}`,
        url: `${siteUrl}/onde-nos-encontrar#${u.slug}`,
        telephone: phoneE164(u.phone!),
        image: `${siteUrl}${ogImage.url}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: u.address!.split(" · ")[0],
          addressLocality: u.city,
          addressRegion: u.uf,
          addressCountry: "BR",
        },
        hasMap: u.maps,
        parentOrganization: { "@id": orgId },
      })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // "<" escapado para o JSON nunca fechar a tag <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
