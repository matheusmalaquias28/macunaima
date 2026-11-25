import Button from "@/components/ui/Button";
import ScrollRow from "@/components/ui/ScrollRow";
import PresenceMap from "@/components/maps/PresenceMap";
import { ExportCard, UnitCard } from "@/components/sections/ContactCards";
import { units } from "@/lib/site";
import { lp, type Lang } from "@/lib/i18n";

export default function WhereToFind({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section id="onde-nos-encontrar" aria-labelledby="encontrar-title" className="relative scroll-mt-20 bg-creme pt-[clamp(72px,8vw,120px)]">
      <div className="gutter">
        <div className="mb-8 flex items-center gap-4 text-acai" data-reveal="up">
          <span className="size-2 rounded-full bg-current" aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-[0.16em]">{en ? "Where to find us" : "Onde nos encontrar"}</p>
          <span className="h-px flex-1 bg-acai/25" />
        </div>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="encontrar-title" className="font-display text-[clamp(2.8rem,6.5vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-acai-ink lg:col-span-9" data-reveal="up">
            {en ? <>Rooted in the Amazon.<br /><span className="text-acai">Present in the world.</span></> : <>Raízes na Amazônia.<br /><span className="text-acai">Presença no mundo.</span></>}
          </h2>
          <p className="max-w-md text-base leading-relaxed text-acai-ink/65 lg:col-span-3 lg:pb-2" data-reveal="up">
            {en ? "The strength of our origin travels with us. Explore the reach of Macunaíma açaí." : "A força da nossa origem vai com a gente. Explore até onde o açaí Macunaíma chega."}
          </p>
        </div>
        <div className="pb-[clamp(56px,7vw,100px)] pt-10 md:pt-14"><PresenceMap /></div>
      </div>
      <div className="bg-folha py-5 text-acai-ink">
        <div className="gutter flex flex-wrap items-center justify-between gap-x-8 gap-y-2 font-display text-[clamp(1.2rem,2.3vw,2rem)] font-medium tracking-[-0.02em]">
          <span>{en ? "One origin." : "Uma só origem."}</span><span>{en ? "Countless connections." : "Inúmeras conexões."}</span><span className="font-semibold">{en ? "The true Amazonian açaí." : "O verdadeiro açaí da Amazônia."}</span>
        </div>
      </div>
      <div className="bg-white py-[clamp(56px,7vw,100px)]">
        <div className="gutter mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="caption text-acai">{en ? "Our commercial network" : "Nossa rede comercial"}</p>
            <h3 className="mt-3 font-display text-[clamp(2rem,4vw,3.6rem)] font-medium leading-tight tracking-[-0.035em] text-acai-ink">{en ? "Closer to your business." : "Mais perto do seu negócio."}</h3>
          </div>
          <Button href={lp(lang, "/onde-nos-encontrar")} variant="acai">{en ? "See all contacts" : "Ver todos os contatos"}</Button>
        </div>
        <ScrollRow label={en ? "B2B sales contacts" : "Contatos comerciais B2B"}>
          {units.map((unit) => <UnitCard key={unit.slug} unit={unit} lang={lang} className="w-[min(84vw,380px)]" />)}
          <ExportCard lang={lang} className="w-[min(84vw,380px)]" />
        </ScrollRow>
      </div>
    </section>
  );
}
