import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";

export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative flex min-h-[90svh] items-end overflow-hidden bg-acai text-white">
      <Media
        label="Close de açaí recém-colhido nas mãos de um coletor"
        labelAt="top"
        tone="acai"
        reveal={false}
        parallax={12}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(34,1,26,0.9)_0%,rgba(34,1,26,0.2)_70%)]" />
      <div className="gutter relative w-full pb-16 pt-40 md:pb-24">
        <p className="eyebrow mb-6 text-folha" data-reveal="up">
          Fale com a Macunaíma
        </p>
        <h2 id="cta-title" className="t-mega max-w-[14ch]" data-split>
          Seu negócio precisa de açaí?
        </h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="t-lead max-w-md text-white/80" data-reveal="up">
            Conheça nossos produtos e entre em contato com a equipe comercial.
          </p>
          <div data-reveal="up">
            <Button href="/contato" size="lg">
              Quero comprar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
