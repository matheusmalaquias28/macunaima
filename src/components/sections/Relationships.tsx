import Media from "@/components/ui/Media";

export default function Relationships() {
  return (
    <section aria-labelledby="relacoes-title" className="relative overflow-hidden bg-nevoa py-24 md:py-36">
      <div className="gutter grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Relacionamentos construídos ao longo do tempo
          </p>
          <p className="t-mega text-acai" aria-hidden="true" data-split>
            22 anos
          </p>
          <h2 id="relacoes-title" className="t-title mt-8 max-w-xl text-acai" data-split>
            Algumas parcerias estão com a Macunaíma há mais de duas décadas.
          </h2>
          <div className="mt-10 grid max-w-xl gap-5 text-lg leading-relaxed text-acai-ink/70" data-reveal="up">
            <p>Alguns dos maiores clientes da empresa mantêm relacionamento com a Macunaíma há 22 anos.</p>
            <p className="font-semibold text-acai-ink">
              Uma relação construída com consistência, capacidade de fornecimento e confiança.
            </p>
          </div>
        </div>

        {/* Colagem de fotos */}
        <div className="relative h-[520px] sm:h-[640px] lg:col-span-6 lg:h-[760px]">
          <div className="absolute right-0 top-0 w-[72%] rotate-[3deg]" data-reveal="up">
            <Media
              label="Equipe comercial recebendo cliente na fábrica"
              className="group aspect-[4/5] rounded-[1.5rem] shadow-[0_40px_80px_-30px_rgba(34,1,26,0.5)]"
              reveal={false}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[58%] -rotate-[4deg]" data-reveal="up">
            <Media
              label="Aperto de mãos entre parceiros diante dos paletes"
              tone="deep"
              className="group aspect-[4/5] rounded-[1.5rem] border-[10px] border-white shadow-[0_40px_80px_-30px_rgba(34,1,26,0.5)]"
              reveal={false}
            />
          </div>
          <div className="spin-slow absolute bottom-[18%] right-[6%] grid size-32 place-items-center rounded-full bg-folha text-acai md:size-40">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
              <defs>
                <path id="circle-rel" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text fontSize="8.4" fontWeight="700" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font-figtree)">
                <textPath href="#circle-rel">CONSISTÊNCIA • FORNECIMENTO • CONFIANÇA •</textPath>
              </text>
            </svg>
            <span className="font-display text-2xl font-bold tracking-[-0.04em] md:text-3xl">22</span>
          </div>
        </div>
      </div>
    </section>
  );
}
