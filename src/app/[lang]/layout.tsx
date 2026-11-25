import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Figtree, Outfit } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import MetaPixel from "@/components/layout/MetaPixel";
import ConversionBar from "@/components/layout/ConversionBar";
import HideOn from "@/components/layout/HideOn";
import { LangProvider } from "@/components/i18n/LangProvider";
import { JsonLd, ogImage, siteJsonLd, siteName, siteUrl } from "@/lib/seo";
import { hasLang, htmlLang, locales, ogLocale } from "@/lib/i18n";
import "../globals.css";

// Títulos: geométrica e pesada como a logo (a de um andar, terminais retos)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const en = lang === "en";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: en
        ? "Macunaíma | Amazon açaí manufacturer · Wholesale only (B2B)"
        : "Macunaíma | Indústria de açaí da Amazônia · Venda exclusiva B2B",
      template: "%s | Macunaíma",
    },
    description: en
      ? "Açaí pulp (8%, 12% and 14%) and Sorbet line manufactured in Pará, Brazil. Wholesale (B2B) only, for distributors, açaí shops, industries and food service."
      : "Indústria de polpa de açaí no Pará. Açaí 8%, 12% e 14% e Linha Sorbet com venda exclusiva para o atacado (B2B): distribuidores, açaiterias, indústrias e food service.",
    applicationName: siteName,
    openGraph: { type: "website", locale: hasLang(lang) ? ogLocale[lang] : ogLocale.pt, siteName, images: [ogImage] },
    twitter: { card: "summary_large_image", images: [ogImage] },
    // Evita que o iPhone transforme números (CNPJ, quantidades) em links de telefone
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Roda antes da pintura: habilita estados iniciais das animações e pula o preloader já visto
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';try{if(sessionStorage.getItem('mcn-preloader'))d.classList.add('preloader-seen')}catch(e){}})();`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={`${outfit.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <JsonLd data={siteJsonLd(lang)} />
        <LangProvider lang={lang}>
          <MotionProvider>
            <HideOn>
              <Preloader />
              <Header />
            </HideOn>
            <main>{children}</main>
            <HideOn>
              <Footer lang={lang} />
              <ConversionBar />
            </HideOn>
            <CookieConsent />
            <MetaPixel />
          </MotionProvider>
        </LangProvider>
      </body>
    </html>
  );
}
