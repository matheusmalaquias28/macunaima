"use client";

import Button from "@/components/ui/Button";
import { useLang } from "@/components/i18n/LangProvider";
import { lp } from "@/lib/i18n";

export default function NotFoundContent() {
  const lang = useLang();
  const en = lang === "en";
  return (
    <section className="relative bg-creme pb-28 pt-40 md:pb-40 md:pt-52">
      <div className="gutter max-w-3xl">
        <p className="eyebrow mb-6 flex items-center gap-3 text-acai">
          <span className="h-px w-7 bg-current opacity-70" />
          {en ? "Error 404" : "Erro 404"}
        </p>
        <h1 className="t-mega text-acai-ink [&_em]:text-acai">
          {en ? (
            <>
              Page <em>not found.</em>
            </>
          ) : (
            <>
              Página <em>não encontrada.</em>
            </>
          )}
        </h1>
        <p className="t-lead mt-6 text-acai-ink/70">
          {en
            ? "The address may have changed. See our products or talk to our sales team."
            : "O endereço pode ter mudado. Veja os nossos produtos ou fale com a equipe comercial."}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={lp(lang, "/produtos/acai")} variant="acai">
            {en ? "See products" : "Ver produtos"}
          </Button>
          <Button href={lp(lang, "/contato")} variant="outline-dark">
            {en ? "Buy wholesale" : "Quero Comprar"}
          </Button>
        </div>
      </div>
    </section>
  );
}
