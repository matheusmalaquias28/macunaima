import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative bg-acai pb-28 pt-40 text-white md:pb-40 md:pt-52">
      <div className="gutter max-w-3xl">
        <p className="eyebrow mb-6 flex items-center gap-3 text-folha">
          <span className="h-px w-7 bg-current opacity-70" />
          Erro 404
        </p>
        <h1 className="t-mega [&_em]:text-folha">
          Página <em>não encontrada.</em>
        </h1>
        <p className="t-lead mt-6 text-white/75">O endereço pode ter mudado. Veja os nossos produtos ou fale com a equipe comercial.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/produtos" variant="folha">
            Ver produtos
          </Button>
          <Button href="/contato" variant="outline-light">
            Quero comprar
          </Button>
        </div>
      </div>
    </section>
  );
}
