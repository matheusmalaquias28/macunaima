import Button from "@/components/ui/Button";
import ScrollRow from "@/components/ui/ScrollRow";
import PresenceMap from "@/components/maps/PresenceMap";
import { ExportCard, UnitCard } from "@/components/sections/ContactCards";
import { units } from "@/lib/site";
import { lp, type Lang } from "@/lib/i18n";

// Home · Onde nos encontrar: título, mapa centralizado e os contatos comerciais na mesma seção
export default function WhereToFind({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section id="onde-nos-encontrar" aria-labelledby="encontrar-title" className="relative scroll-mt-20 bg-creme py-[clamp(72px,8vw,120px)]">
      <div className="gutter text-center">
        <p className="eyebrow mb-5 text-acai" data-reveal="up">
          {en ? "Where to find us" : "Onde nos encontrar"}
        </p>
        <h2 id="encontrar-title" className="font-display text-[clamp(2.4rem,5.4vw,5.2rem)] font-medium leading-[1] tracking-[-0.04em] text-acai-ink" data-reveal="up">
          {en ? (
            <>
              Rooted in the Amazon.
              <br />
              <span className="text-acai">Present in the world.</span>
            </>
          ) : (
            <>
              Raízes na Amazônia.
              <br />
              <span className="text-acai">Presença no mundo.</span>
            </>
          )}
        </h2>
        <div className="mt-10 md:mt-12">
          <PresenceMap />
        </div>
      </div>

      <div className="mt-[clamp(48px,6vw,88px)]">
        <div className="gutter mb-2 flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-semibold tracking-[-0.02em] text-acai-ink">
            {en ? "B2B sales contacts" : "Contatos comerciais B2B"}
          </h3>
          <Button href={lp(lang, "/onde-nos-encontrar")} variant="outline-dark">
            {en ? "See all contacts" : "Ver todos os contatos"}
          </Button>
        </div>
        <ScrollRow label={en ? "B2B sales contacts" : "Contatos comerciais B2B"}>
          {units.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} lang={lang} className="w-[min(84vw,380px)]" />
          ))}
          <ExportCard lang={lang} className="w-[min(84vw,380px)]" />
        </ScrollRow>
      </div>
    </section>
  );
}
