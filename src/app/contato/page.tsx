import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quero comprar",
  description: "Fale com a equipe comercial da Macunaíma e conte um pouco sobre o que você procura.",
};

const tel = (p: string) => `tel:+55${p.replace(/\D/g, "")}`;

export default function ContatoPage() {
  return (
    <>
      <section aria-labelledby="contato-title" className="relative bg-acai pb-28 pt-40 text-white md:pb-40 md:pt-52">
        <div className="gutter grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-3 text-folha" data-reveal="up">
              <span className="h-px w-7 bg-current opacity-70" />
              Quero comprar
            </p>
            <h1 id="contato-title" className="t-mega [&_em]:text-folha" data-split>
              Fale com a equipe
              <br />
              <em>comercial</em> da Macunaíma.
            </h1>
          </div>
          <p className="t-lead text-white/75 lg:col-span-4" data-reveal="up">
            Preencha os dados abaixo e conte um pouco sobre o que você procura.
          </p>
        </div>
      </section>

      <section
        aria-label="Formulário de contato"
        className="relative -mt-10 rounded-t-[2.5rem] bg-nevoa py-20 md:-mt-16 md:rounded-t-[4rem] md:py-28"
      >
        <div className="gutter grid gap-14 lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)]">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="caption mb-5 text-acai-soft">Prefere ligar?</p>
              <ul className="grid gap-2">
                {contact.phones.map((p) => (
                  <li key={p}>
                    <a
                      href={tel(p)}
                      className="font-display text-[clamp(1.4rem,2vw,1.9rem)] font-semibold tracking-[-0.025em] text-acai-ink transition-colors hover:text-acai"
                    >
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-xs text-acai-ink/60">
                Ao enviar, abrimos uma conversa no WhatsApp com a equipe comercial já com os seus dados preenchidos.
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
