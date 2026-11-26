import Image from "next/image";
import { recipeCategories, recipes } from "@/lib/recipes";
import type { Lang } from "@/lib/i18n";

// Receitas: o que é possível fazer com a polpa (fica dentro da página do Açaí)
export default function Recipes({ lang }: { lang: Lang }) {
  const en = lang === "en";
  return (
    <section id="receitas" aria-labelledby="receitas-title" className="relative scroll-mt-20 bg-white py-[clamp(72px,8vw,130px)]">
      <div className="gutter grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5 flex items-center gap-3 text-acai" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            {en ? "Recipes" : "Receitas"}
          </p>
          <h2 id="receitas-title" className="t-title text-acai-ink [&_em]:text-acai" data-split>
            {en ? (
              <>
                What you can make <em>with açaí.</em>
              </>
            ) : (
              <>
                O que dá para fazer <em>com a polpa.</em>
              </>
            )}
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal="up">
          <p className="text-[1.05rem] leading-relaxed text-acai-ink/65">
            {en
              ? "Ideas for food service menus: bowls and ice creams, juices, nectars and smoothies."
              : "Ideias para o cardápio do food service: bowls e sorvetes, sucos, néctares e smoothies."}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {recipeCategories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex h-10 items-center rounded-full border border-acai/20 px-4 text-sm font-semibold text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white"
                >
                  {c.name[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="gutter mt-12 grid gap-5 md:mt-16">
        {recipes.map((r) => {
          const cat = recipeCategories.find((c) => c.slug === r.category);
          return (
            <article
              key={r.slug}
              id={r.category}
              aria-labelledby={`${r.slug}-title`}
              className="grid scroll-mt-28 overflow-hidden rounded-[2rem] bg-creme ring-1 ring-acai-ink/8 md:grid-cols-12"
              data-reveal="up"
            >
              <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[420px]">
                <Image src={r.photo} alt={r.alt[lang]} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                {cat && <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 font-display text-sm font-semibold text-acai">{cat.name[lang]}</span>}
              </div>
              <div className="p-6 md:col-span-7 md:p-10 lg:p-12">
                <h3 id={`${r.slug}-title`} className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-semibold leading-none tracking-[-0.025em] text-acai-ink">
                  {r.title[lang]}
                </h3>
                <p className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
                  <span className="rounded-full bg-acai px-3 py-1 text-white">{r.product[lang]}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-acai-ink/70 ring-1 ring-acai-ink/10">
                    {en ? "Yield" : "Rendimento"}: {r.yield[lang]}
                  </span>
                </p>
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <h4 className="caption mb-3 text-acai">{en ? "Ingredients" : "Ingredientes"}</h4>
                    <ul className="grid gap-2 text-[0.97rem] leading-relaxed text-acai-ink/80">
                      {r.ingredients[lang].map((ing) => (
                        <li key={ing} className="flex gap-2.5">
                          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-folha-ink" aria-hidden="true" />
                          {ing}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="caption mb-3 text-acai">{en ? "Method" : "Modo de preparo"}</h4>
                    <ol className="grid gap-3 text-[0.97rem] leading-relaxed text-acai-ink/80">
                      {r.steps[lang].map((s, i) => (
                        <li key={s} className="flex gap-3">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-acai ring-1 ring-acai/20">{i + 1}</span>
                          {s}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
