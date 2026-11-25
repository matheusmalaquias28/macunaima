import Image from "next/image";
import Button from "@/components/ui/Button";
import { contact, whatsappLink, whatsappMessage } from "@/lib/site";
import { lp, type Lang } from "@/lib/i18n";

// CTA final: reforça que a Macunaíma é indústria com atendimento exclusivo para o atacado (B2B)
export default function FinalCta({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const audience = en
    ? ["Distributors", "Açaí shops & franchises", "Industries", "Food service"]
    : ["Distribuidores", "Açaiterias e franquias", "Indústrias", "Food service"];

  return (
    <section aria-labelledby="cta-title" className="relative bg-white py-[clamp(56px,7vw,110px)]">
      <div className="gutter">
        <div className="grid overflow-hidden rounded-[2rem] bg-nevoa md:rounded-[2.5rem] lg:grid-cols-12">
          <div className="flex flex-col p-6 py-10 md:p-12 lg:col-span-7 lg:p-16">
            <p className="inline-flex w-fit items-center gap-2.5 rounded-full bg-acai px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white" data-reveal="up">
              <span className="size-2 rounded-full bg-folha" aria-hidden="true" />
              {en ? "Manufacturer · Wholesale only (B2B)" : "Indústria · Venda exclusiva B2B"}
            </p>
            <h2 id="cta-title" className="t-display mt-8 text-acai-ink [&_em]:text-acai" data-split>
              {en ? (
                <>
                  Does your business <em>need açaí?</em>
                </>
              ) : (
                <>
                  Seu negócio precisa <em>de açaí?</em>
                </>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-acai-ink/70" data-reveal="up">
              {en
                ? "Macunaíma is a manufacturer and serves wholesale buyers only. Request a quote and our sales team will get in touch."
                : "A Macunaíma é uma indústria e atende exclusivamente compras no atacado. Solicite uma cotação e a equipe comercial entra em contato."}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" data-reveal="up">
              {audience.map((a) => (
                <li key={a} className="rounded-full border border-acai/20 bg-white px-3.5 py-1.5 text-sm font-semibold text-acai">
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal="up">
              <Button href={lp(lang, "/contato")} variant="acai" size="lg">
                {en ? "Request a B2B quote" : "Quero Comprar"}
              </Button>
              <a
                href={whatsappLink(contact.whatsapp, whatsappMessage[lang])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-16 items-center rounded-full border border-acai/25 px-7 font-semibold text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white"
              >
                {en ? "Sales on WhatsApp" : "Comercial no WhatsApp"}
              </a>
            </div>
          </div>
          <div className="relative min-h-[300px] lg:col-span-5">
            <Image
              src="/empresa/cta-embalagens-acai.webp"
              alt={en ? "Macunaíma açaí pulp packs in a straw basket" : "Pacotes de polpa de açaí Macunaíma em cesto de palha"}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
