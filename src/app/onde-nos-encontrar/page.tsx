import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/Button";
import FinalCta from "@/components/sections/FinalCta";
import { units, type Unit } from "@/lib/site";

export const metadata: Metadata = {
  title: "Onde nos encontrar",
  description:
    "Matriz da Macunaíma em Inhangapi (PA) e distribuidoras em Recife e Fortaleza. Telefones, WhatsApp e localização de cada unidade.",
};

const tel = (p: string) => `tel:+55${p.replace(/\D/g, "")}`;
const pad = (n: number) => String(n).padStart(2, "0");

const icons = {
  phone: <path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z" />,
  whatsapp: (
    <>
      <path d="M4 20l1.2-4.1A8.5 8.5 0 1 1 8.4 19L4 20z" />
      <path d="M9 8.6c0 3 2.6 6 5.8 6.4l1-1.3-1.8-1-1 .8a4.6 4.6 0 0 1-2.4-2.4l.8-1-1-1.8-1.4.9z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
};

function Icon({ name, className = "size-[18px]" }: { name: keyof typeof icons; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

/** Ações da unidade: WhatsApp em destaque, localização em contorno */
function Actions({ unit, onDark = false }: { unit: Unit; onDark?: boolean }) {
  const base =
    "group inline-flex h-12 items-center gap-3 rounded-full pl-5 pr-2 text-[0.95rem] font-semibold transition-colors duration-500";
  const chip = "grid size-8 place-items-center rounded-full bg-current/10";
  return (
    <div className="flex flex-wrap gap-3">
      {unit.whatsapp && (
        <a
          href={`https://wa.me/${unit.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${onDark ? "bg-folha text-acai-ink hover:bg-white" : "bg-acai text-white hover:bg-acai-ink"}`}
        >
          Fale conosco
          <span className={chip}>
            <Icon name="whatsapp" className="size-4" />
          </span>
        </a>
      )}
      <a
        href={unit.maps}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} border ${
          onDark
            ? "border-white/30 text-white hover:border-white hover:bg-white hover:text-acai"
            : "border-acai/25 text-acai hover:border-acai hover:bg-acai hover:text-white"
        }`}
      >
        Localização
        <span className={chip}>
          <Icon name="pin" className="size-4" />
        </span>
      </a>
    </div>
  );
}

function Products({ items, onDark = false }: { items: string[]; onDark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Produtos disponíveis">
      {items.map((p) => (
        <li
          key={p}
          className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium ${
            onDark ? "border-white/20 text-white/85" : "border-acai/15 text-acai-ink/80"
          }`}
        >
          {p}
        </li>
      ))}
    </ul>
  );
}

export default function OndeNosEncontrarPage() {
  const [matriz, ...distribuidoras] = units;

  return (
    <>
      {/* Abertura */}
      <section aria-labelledby="encontrar-title" className="relative bg-acai pb-28 pt-40 text-white md:pb-40 md:pt-52">
        <div className="gutter grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-3 text-folha" data-reveal="up">
              <span className="h-px w-7 bg-current opacity-70" />
              Onde nos encontrar
            </p>
            {/* Sempre em 2 linhas: no celular a fonte acompanha a largura para "mais perto de você?" caber */}
            <h1
              id="encontrar-title"
              className="t-mega whitespace-nowrap text-[min(2.5rem,9vw)] md:text-[clamp(3rem,5.6vw,5.75rem)] [&_em]:text-folha"
              data-split
            >
              Onde estamos
              <br />
              mais <em>perto de você?</em>
            </h1>
          </div>
          <p className="t-lead text-white/75 lg:col-span-4" data-reveal="up">
            Da matriz no Pará às distribuidoras no Nordeste: fale com a unidade mais próxima do seu negócio.
          </p>
        </div>

        {/* Índice das unidades */}
        <nav aria-label="Unidades" className="gutter mt-14 md:mt-20" data-reveal="up">
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/15 sm:grid-cols-3 md:rounded-[2rem]">
            {units.map((u, i) => (
              <li key={u.slug}>
                <a
                  href={`#${u.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-acai p-5 transition-colors duration-500 hover:bg-acai-soft md:p-7"
                >
                  <span className="caption flex items-center justify-between text-white/50">
                    {pad(i + 1)}
                    <span className="text-folha">{u.kind}</span>
                  </span>
                  <span className="flex items-end justify-between gap-3">
                    <span>
                      <span className="block font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-none tracking-[-0.04em]">
                        {u.city}
                      </span>
                      <span className="mt-2 block text-sm text-white/60">{u.uf}</span>
                    </span>
                    <Arrow className="size-5 shrink-0 rotate-90 text-white/50 transition-transform duration-500 group-hover:translate-y-1 group-hover:text-folha" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <section
        aria-label="Unidades da Macunaíma"
        className="relative -mt-10 rounded-t-[2.5rem] bg-nevoa pb-24 pt-[clamp(28px,3vw,48px)] md:-mt-16 md:rounded-t-[4rem] md:pb-36"
      >
        {/* Matriz em destaque */}
        <div className="gutter">
          <article
            id={matriz.slug}
            aria-labelledby={`${matriz.slug}-title`}
            className="relative scroll-mt-28 overflow-hidden rounded-[1.75rem] bg-acai-ink text-white md:rounded-[2.5rem]"
            data-reveal="up"
          >
            {/* Sigla gigante ao fundo */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[0.18em] right-[-0.04em] select-none font-display text-[clamp(10rem,30vw,26rem)] font-extrabold leading-none tracking-[-0.06em] text-white/[0.04]"
            >
              {matriz.uf}
            </span>

            <div className="relative grid gap-12 p-6 md:p-10 lg:grid-cols-12 lg:gap-[clamp(14px,1.6vw,28px)] lg:p-14">
              <div className="lg:col-span-7">
                <p className="caption mb-8 flex items-center gap-3 text-folha">
                  <span className="rounded-full bg-folha px-3 py-1 text-acai-ink">{matriz.kind}</span>
                  {matriz.name}
                </p>
                <h2
                  id={`${matriz.slug}-title`}
                  className="font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.045em]"
                >
                  {matriz.city}
                  <span className="ml-[0.18em] align-top text-[0.32em] font-light tracking-[-0.01em] text-acai-mist">
                    {matriz.uf}
                  </span>
                </h2>
                <p className="t-lead mt-6 max-w-md text-white/70">
                  Onde o açaí é produzido. Atendimento para{" "}
                  <strong className="font-semibold text-white">{matriz.segment.toLowerCase()}</strong> direto da
                  indústria.
                </p>
              </div>

              <div className="flex flex-col justify-end gap-10 lg:col-span-5">
                <div className="border-t border-white/15 pt-5">
                  <p className="caption mb-4 text-white/50">Portfólio · {matriz.segment}</p>
                  <Products items={matriz.products} onDark />
                </div>
                <div className="border-t border-white/15 pt-5">
                  <p className="caption mb-3 text-white/50">Telefone</p>
                  <a
                    href={tel(matriz.phone)}
                    className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-[-0.03em] transition-colors hover:text-folha"
                  >
                    {matriz.phone}
                  </a>
                </div>
                <Actions unit={matriz} onDark />
              </div>
            </div>
          </article>
        </div>

        {/* Distribuidoras */}
        <div className="gutter mt-[clamp(72px,9vw,140px)]">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end md:mb-14">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6 flex items-center gap-3 text-acai-soft" data-reveal="up">
                <span className="h-px w-7 bg-current opacity-70" />
                Açaí Distribuidora
              </p>
              <h2 className="t-title text-acai-ink [&_em]:text-acai" data-split>
                Varejo e atacado
                <br />
                no <em>Nordeste.</em>
              </h2>
            </div>
            <p className="t-lead text-acai-ink/70 lg:col-span-4 lg:col-start-9" data-reveal="up">
              Distribuidoras com o portfólio Macunaíma para revenda e consumo, perto dos principais mercados da região.
            </p>
          </div>

          <ul className="grid gap-5 md:grid-cols-2 md:gap-[clamp(14px,1.6vw,28px)]">
            {distribuidoras.map((u, i) => (
              <li key={u.slug} id={u.slug} className="scroll-mt-28" data-reveal="up">
                <article
                  aria-labelledby={`${u.slug}-title`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 transition-transform duration-700 ease-[var(--ease-expo)] hover:-translate-y-2 md:p-8"
                >
                  <div className="caption flex items-center justify-between text-acai-ink/45">
                    <span>{pad(i + 2)}</span>
                    <span className="text-acai-soft">{u.segment}</span>
                  </div>

                  <h3
                    id={`${u.slug}-title`}
                    className="mt-[clamp(40px,5vw,72px)] font-display text-[clamp(2.25rem,3.6vw,3.5rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-acai-ink"
                  >
                    {u.city}
                    <span className="ml-[0.2em] align-top text-[0.4em] font-light tracking-[-0.01em] text-acai">
                      {u.uf}
                    </span>
                  </h3>
                  {u.address && <p className="mt-4 text-[0.95rem] leading-relaxed text-acai-ink/60">{u.address}</p>}

                  <div className="mt-8 border-t border-acai/12 pt-5">
                    <p className="caption mb-4 text-acai-ink/45">Portfólio</p>
                    <Products items={u.products} />
                  </div>

                  <div className="mt-auto pt-10">
                    <a
                      href={tel(u.phone)}
                      className="mb-6 inline-flex items-center gap-2.5 font-display text-[clamp(1.35rem,1.8vw,1.7rem)] font-semibold tracking-[-0.025em] text-acai-ink transition-colors hover:text-acai"
                    >
                      <Icon name="phone" className="size-5 text-acai" />
                      {u.phone}
                    </a>
                    <Actions unit={u} />
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-acai-ink/60" data-reveal="up">
            Quer conhecer os produtos antes?{" "}
            <Link href="/produtos" className="font-semibold text-acai underline-offset-4 hover:underline">
              Veja o portfólio completo
            </Link>
            .
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
