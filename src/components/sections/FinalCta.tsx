import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";
import { lp, type Lang } from "@/lib/i18n";

// CTA final com a foto das embalagens no cesto (versão que o cliente aprovou), reforçando o atendimento B2B
export default function FinalCta({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section aria-labelledby="cta-title" className="relative flex min-h-[90svh] items-end overflow-hidden bg-acai text-white">
      <Media
        src="/empresa/cta-embalagens-acai.webp"
        alt={en ? "Macunaíma açaí pulp packs in a straw basket, surrounded by açaí berries and açaí cream" : "Pacotes de polpa de açaí Macunaíma em cesto de palha, cercados por frutos e creme de açaí"}
        label={en ? "Macunaíma açaí packs in a straw basket" : "Pacotes de polpa de açaí Macunaíma em cesto de palha"}
        labelAt="top"
        tone="acai"
        reveal={false}
        parallax={12}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(34,1,26,0.9)_0%,rgba(34,1,26,0.2)_70%)]" />
      <div className="gutter relative w-full pb-16 pt-40 md:pb-24">
        <p className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-acai" data-reveal="up">
          <span className="size-2 rounded-full bg-folha" aria-hidden="true" />
          {en ? "Manufacturer · Wholesale only (B2B)" : "Indústria · Venda exclusiva B2B"}
        </p>
        <h2 id="cta-title" className="t-mega leading-[0.86] [&_em]:text-[1.06em] [&_em]:text-acai-mist" data-split>
          {en ? (
            <>
              Does your business
              <br />
              need <em>açaí?</em>
            </>
          ) : (
            <>
              Seu negócio
              <br />
              precisa de <em>açaí?</em>
            </>
          )}
        </h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="t-lead max-w-md text-white/80" data-reveal="up">
            {en
              ? "We serve wholesale buyers only. Request a quote and talk to our sales team."
              : "Atendemos exclusivamente compras no atacado. Solicite uma cotação e fale com a equipe comercial."}
          </p>
          <div data-reveal="up">
            <Button href={lp(lang, "/contato")} size="lg">
              {en ? "Buy wholesale" : "Quero Comprar"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
