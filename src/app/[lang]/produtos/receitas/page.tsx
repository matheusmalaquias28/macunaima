import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import FinalCta from "@/components/sections/FinalCta";
import { recipeCategories, recipes } from "@/lib/recipes";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/produtos/receitas">): Promise<Metadata> {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";
  return pageMetadata({
    lang,
    title: en ? "Açaí recipes for food service" : "Receitas com açaí para food service",
    description: en
      ? "Ideas for using Macunaíma products in food service: açaí bowls and ice creams, juices, nectars and smoothies, with ingredients and method."
      : "Ideias de uso dos produtos Macunaíma no food service: bowls e sorvetes, sucos, néctares e smoothies, com ingredientes e modo de preparo.",
    path: "/produtos/receitas",
  });
}

export default async function ReceitasPage({ params }: PageProps<"/[lang]/produtos/receitas">) {
  const { lang } = (await params) as { lang: Lang };
  const en = lang === "en";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: en ? "Products" : "Produtos", path: "/produtos/acai" },
          { name: en ? "Recipes" : "Receitas", path: "/produtos/receitas" },
        ])}
      />
      <PageHero
        id="receitas-title"
        eyebrow={en ? "Products · Recipes" : "Produtos · Receitas"}
        title={
          en ? (
            <>
              One product, <em>many possibilities.</em>
            </>
          ) : (
            <>
              Um produto, <em>muitas possibilidades.</em>
            </>
          )
        }
        text={
          en
            ? "Ideas for using Macunaíma açaí in food service menus: bowls, ice creams, juices, nectars and smoothies."
            : "Ideias de uso do açaí Macunaíma no cardápio do food service: bowls, sorvetes, sucos, néctares e smoothies."
        }
      >
        <nav aria-label={en ? "Categories" : "Categorias"} className="gutter mt-10 md:mt-14" data-reveal="up">
          <ul className="flex flex-wrap gap-2">
            {recipeCategories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex h-11 items-center rounded-full border border-acai/20 bg-white px-5 font-semibold text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white"
                >
                  {c.name[lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="bg-white py-[clamp(48px,6vw,100px)]">
        {recipeCategories.map((c) => {
          const list = recipes.filter((r) => r.category === c.slug);
          if (!list.length) return null;
          return (
            <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-title`} className="gutter scroll-mt-28 py-[clamp(24px,3vw,48px)]">
              <h2 id={`${c.slug}-title`} className="caption mb-5 flex items-center gap-3 text-acai">
                <span className="h-px w-7 bg-current opacity-70" />
                {c.name[lang]}
              </h2>
              {list.map((r) => (
                <article
                  key={r.slug}
                  aria-labelledby={`${r.slug}-title`}
                  className="grid overflow-hidden rounded-[2rem] bg-creme ring-1 ring-acai-ink/8 md:grid-cols-12"
                  data-reveal="up"
                >
                  <div className="relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[440px]">
                    <Image src={r.photo} alt={r.alt[lang]} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-6 md:col-span-7 md:p-10 lg:p-12">
                    <h3 id={`${r.slug}-title`} className="font-display text-[clamp(1.8rem,2.8vw,2.75rem)] font-semibold leading-none tracking-[-0.025em] text-acai-ink">
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
              ))}
            </section>
          );
        })}
      </div>

      <FinalCta lang={lang} />
    </>
  );
}
