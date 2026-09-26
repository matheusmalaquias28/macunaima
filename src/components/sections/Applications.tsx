import Media from "@/components/ui/Media";
import Button from "@/components/ui/Button";

const uses = [
  { name: "Sorvetes", src: "/aplicacoes/sorvetes-v2.webp", alt: "Tigela de madeira com creme de açaí" },
  { name: "Sucos", src: "/aplicacoes/sucos.jpg", alt: "Caneca de vidro com suco de açaí" },
  { name: "Néctares", src: "/aplicacoes/nectares-v2.jpg", alt: "Garrafas de vidro com néctar de açaí" },
  { name: "Smoothies", src: "/aplicacoes/smoothies-v2.jpg", alt: "Dois copos de smoothie de açaí com hortelã e bananas ao fundo" },
];

export default function Applications() {
  return (
    <section aria-labelledby="aplicacoes-title" className="relative bg-white py-24 md:py-36">
      <div className="gutter grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-6 text-acai-soft" data-reveal="up">
              Aplicações
            </p>
            <h2 id="aplicacoes-title" className="t-title text-acai xl:text-[clamp(2rem,3vw,3.5rem)]" data-split>
              Um produto, diferentes possibilidades.
            </h2>
            <p className="t-lead mt-8 text-acai-ink/70" data-reveal="up">
              A polpa de açaí pode ser utilizada para consumo direto ou como ingrediente na fabricação de produtos
              como sorvetes, sucos, néctares e smoothies.
            </p>
            <p className="mt-8 border-l-2 border-folha pl-4 text-sm leading-relaxed text-acai-ink/60" data-reveal="up">
              <strong className="font-semibold text-acai-ink">Importante:</strong> esses são exemplos de aplicações
              da polpa, e não produtos comercializados pela Macunaíma.
            </p>
            <div className="mt-10" data-reveal="up">
              <Button href="/produtos" variant="acai">
                Ver linha completa
              </Button>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-7 xl:col-span-8">
          {uses.map((u, i) => (
            <li key={u.name} className={i % 2 === 1 ? "mt-16 md:mt-32" : ""}>
              <figure className="group">
                <Media
                  src={u.src}
                  alt={u.alt}
                  label={u.alt}
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="aspect-[4/5] rounded-[1.5rem] bg-nevoa md:rounded-[2rem]"
                  parallax={6}
                >
                  <figcaption className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold tracking-[-0.02em] text-acai transition-colors duration-500 group-hover:bg-folha md:left-6 md:top-6 md:text-base">
                    {u.name}
                  </figcaption>
                </Media>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
