import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import PageHero from "@/components/sections/PageHero";
import { contact } from "@/lib/site";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/contato">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "Buy wholesale: request a B2B quote" : "Quero Comprar: cotação no atacado (B2B)",
    description: en
      ? "Request a quote for açaí pulp and sorbets for your business. Wholesale (B2B) only. Fill in the form and talk to Macunaíma's sales team on WhatsApp."
      : "Peça cotação de polpa de açaí e sorbets para o seu negócio. Atendimento exclusivo para o atacado (B2B). Preencha o formulário e fale com o comercial pelo WhatsApp.",
    path: "/contato",
  });
}

const tel = (p: string) => `tel:+55${p.replace(/\D/g, "")}`;

export default async function ContatoPage({ params }: PageProps<"/[lang]/contato">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(lang, [{ name: en ? "Buy wholesale" : "Quero Comprar", path: "/contato" }])} />
      <PageHero
        id="contato-title"
        eyebrow={en ? "Buy wholesale" : "Quero Comprar"}
        title={
          en ? (
            <>
              Talk to our <em>sales team.</em>
            </>
          ) : (
            <>
              Fale com a equipe <em>comercial.</em>
            </>
          )
        }
        text={en ? "Fill in your company details and tell us what you are looking for." : "Preencha os dados da sua empresa e conte o que você procura."}
      >
        {/* Aviso de atendimento exclusivo B2B */}
        <div className="gutter mt-10 md:mt-14" data-reveal="up">
          <div role="note" className="flex flex-col gap-4 rounded-[1.5rem] bg-acai p-5 text-white md:flex-row md:items-center md:gap-6 md:p-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-folha text-acai-ink" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6" />
              </svg>
            </span>
            <div>
              <p className="font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-semibold leading-tight">
                {en ? "Wholesale (B2B) purchases only." : "Atendimento exclusivo para compras no atacado (B2B)."}
              </p>
              <p className="mt-1 text-white/75">
                {en
                  ? "Macunaíma is a manufacturer and serves companies only. We do not sell to final consumers."
                  : "A Macunaíma é uma indústria e atende somente empresas, com CNPJ. Não realizamos venda no varejo."}
              </p>
            </div>
          </div>
        </div>
      </PageHero>

      <section aria-label={en ? "Contact form" : "Formulário de contato"} className="relative bg-white py-[clamp(56px,7vw,110px)]">
        <div className="gutter grid gap-14 lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)]">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="caption mb-5 text-acai">{en ? "Prefer to call?" : "Prefere ligar?"}</p>
              <ul className="grid gap-2">
                {contact.contactPagePhones.map((p) => (
                  <li key={p}>
                    <a href={tel(p)} className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-semibold tracking-[-0.02em] text-acai-ink transition-colors hover:text-acai">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xs text-acai-ink/60">
                {en
                  ? "When you submit, a WhatsApp chat with our sales team opens with your details already filled in."
                  : "Ao enviar, abrimos uma conversa no WhatsApp com a equipe comercial já com os seus dados preenchidos."}
              </p>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
