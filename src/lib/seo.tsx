import type { Metadata } from "next";
import { contact, socials, units } from "@/lib/site";

// Domínio de produção (o site atual da Macunaíma já usa www). Dá para sobrescrever com NEXT_PUBLIC_SITE_URL.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.acaimacunaima.com.br").replace(/\/$/, "");
export const siteName = "Açaí Macunaíma";

const abs = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

// Imagem de compartilhamento (WhatsApp, LinkedIn, Facebook, X...): 1200×630, JPG leve para a prévia carregar rápido
export const ogImage = {
  url: "/brand/og-macunaima.jpg",
  width: 1200,
  height: 630,
  alt: "Açaí Macunaíma: polpa de açaí da Amazônia, produzida no Pará para empresas",
  type: "image/jpeg",
};

/** Metadados de uma página: título, descrição, canonical e Open Graph/Twitter coerentes */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | Macunaíma`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName,
      url: path,
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
export function siteJsonLd() {
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
          "Indústria de polpa de açaí em Inhangapi, Pará. Açaí 8%, 12% e 14% e Linha Sorbet para distribuidores, açaiterias, indústrias e food service.",
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
          availableLanguage: ["Portuguese"],
          areaServed: "BR",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#site`,
        url: siteUrl,
        name: siteName,
        inLanguage: "pt-BR",
        publisher: { "@id": orgId },
      },
    ],
  };
}

/** Trilha (breadcrumb) de uma página interna */
export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
      { "@type": "ListItem", position: 2, name, item: abs(path) },
    ],
  };
}

/** Distribuidoras como negócios locais, ligadas à organização */
export function unitsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": units
      .filter((u) => u.address)
      .map((u) => ({
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/onde-nos-encontrar#${u.slug}`,
        name: `${u.name} Macunaíma ${u.city}`,
        url: `${siteUrl}/onde-nos-encontrar#${u.slug}`,
        telephone: phoneE164(u.phone),
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
