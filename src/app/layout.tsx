import type { Metadata, Viewport } from "next";
import { Figtree, Unbounded } from "next/font/google";
import MotionProvider from "@/components/motion/MotionProvider";
import Preloader from "@/components/layout/Preloader";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Macunaíma | Açaí da Amazônia, produzido no Pará para o mundo",
    template: "%s | Macunaíma",
  },
  description:
    "Da origem do fruto à produção industrial, a Macunaíma transforma o açaí do Pará em polpas para empresas que precisam de qualidade, escala e consistência.",
};

export const viewport: Viewport = {
  themeColor: "#4a0234",
};

// Roda antes da pintura: habilita estados iniciais das animações e pula o preloader já visto
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');if('scrollRestoration' in history)history.scrollRestoration='manual';try{if(sessionStorage.getItem('mcn-preloader'))d.classList.add('preloader-seen')}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${unbounded.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <MotionProvider>
          <Preloader />
          <Header />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
