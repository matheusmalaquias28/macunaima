import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import MetaPixel from "@/components/layout/MetaPixel";
import ConversionBar from "@/components/layout/ConversionBar";
import HideOn from "@/components/layout/HideOn";
import { JsonLd, ogImage, siteJsonLd, siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Macunaíma | Polpa de açaí da Amazônia para empresas",
    template: "%s | Macunaíma",
  },
  description:
    "Indústria de polpa de açaí no Pará. Açaí 8%, 12% e 14% e Linha Sorbet para distribuidores, açaiterias, indústrias e food service, com qualidade e escala.",
  applicationName: siteName,
  openGraph: { type: "website", locale: "pt_BR", siteName, images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage] },
  // Evita que o iPhone transforme números (CNPJ, quantidades) em links de telefone
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#4a0234",
};

// Roda antes da pintura: habilita estados iniciais das animações e pula o preloader já visto
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';try{if(sessionStorage.getItem('mcn-preloader'))d.classList.add('preloader-seen')}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <JsonLd data={siteJsonLd()} />
        <MotionProvider>
          <HideOn>
            <Preloader />
            <Header />
          </HideOn>
          <main>{children}</main>
          <HideOn>
            <Footer />
            <ConversionBar />
          </HideOn>
          <CookieConsent />
          <MetaPixel />
        </MotionProvider>
      </body>
    </html>
  );
}
