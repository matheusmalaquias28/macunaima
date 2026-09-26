import Link from "next/link";
import Media from "@/components/ui/Media";
import { Arrow } from "@/components/ui/Button";
import { products } from "@/lib/site";

export default function Products() {
  return (
    <section
      id="produtos"
      aria-labelledby="produtos-title"
      className="relative -mt-10 rounded-t-[2.5rem] bg-nevoa py-24 md:-mt-16 md:rounded-t-[4rem] md:py-36"
    >
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Nossos produtos
          </p>
          <h2 id="produtos-title" className="t-display text-acai" data-split>
            Açaí para diferentes necessidades e aplicações.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-4 lg:col-start-9">
          <p className="t-lead text-acai-ink/70" data-reveal="up">
            A Macunaíma produz polpa de açaí em diferentes concentrações e formatos, atendendo diferentes
            necessidades de seus clientes.
          </p>
        </div>
      </div>

      <ul className="gutter mt-16 grid gap-5 sm:grid-cols-2 md:mt-24 xl:grid-cols-4">
        {products.map((p) => (
          <li key={p.slug} data-reveal="up">
            <Link href={`/produtos/${p.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-[1.75rem] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2">
                <Media
                  src={p.photo}
                  alt={p.alt}
                  label={p.alt}
                  className="aspect-[4/5] bg-acai"
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  reveal={false}
                />
                <span className="absolute bottom-5 right-5 grid size-14 place-items-center rounded-full bg-white text-acai transition-all duration-500 ease-[var(--ease-expo)] group-hover:rotate-[-45deg] group-hover:bg-folha">
                  <Arrow className="size-5" />
                </span>
              </div>
              <div className="px-1 pt-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-acai">
                  Açaí {p.concentration}
                  <span className="ml-2 text-base font-medium text-acai-ink/50">{p.weight}</span>
                </h3>
                <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-acai-ink/70">{p.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-acai/25 pb-1 text-sm font-semibold text-acai transition-colors group-hover:border-acai">
                  <span className="btn-roll">
                    <span>Conheça o produto</span>
                    <span aria-hidden="true">Conheça o produto</span>
                  </span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="gutter mt-16 border-t border-acai/15 pt-8 md:mt-24">
        <p className="max-w-xl text-acai-ink/70" data-reveal="up">
          Polpas de açaí indicadas para consumo direto ou para utilização na fabricação de outros produtos.
        </p>
      </div>
    </section>
  );
}
