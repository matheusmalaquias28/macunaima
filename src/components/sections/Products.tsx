import ProductCarousel from "@/components/ui/ProductCarousel";
import { portfolio } from "@/lib/site";

export default function Products() {
  return (
    <section
      id="produtos"
      aria-labelledby="produtos-title"
      className="relative -mt-10 rounded-t-[2.5rem] bg-nevoa pb-20 pt-24 md:-mt-16 md:rounded-t-[4rem] md:pb-28 md:pt-36"
    >
      <div className="gutter grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
            Nossos produtos
          </p>
          <h2 id="produtos-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            <span className="lg:whitespace-nowrap">O portfólio para diferentes</span>
            <br />
            <em>necessidades</em> e
            <br />
            aplicações.
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-5 lg:col-start-8">
          <p className="t-lead text-acai-ink/70" data-reveal="up">
            Polpas de açaí e a Linha Sorbet, em concentrações e sabores para consumo direto ou para a fabricação de
            outros produtos.
          </p>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <ProductCarousel items={portfolio} variant="card" />
      </div>

      <div className="gutter mt-16 flex justify-center md:mt-20">
        <p className="border border-acai/25 px-6 py-3.5 text-center text-acai-ink/70 lg:whitespace-nowrap" data-reveal="up">
          Polpas de açaí e sorbets de fruta, produzidos no Pará para consumo direto ou para a fabricação de outros produtos.
        </p>
      </div>
    </section>
  );
}
