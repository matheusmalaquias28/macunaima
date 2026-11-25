/** Abertura das páginas internas, em fundo claro */
export default function PageHero({
  id,
  eyebrow,
  title,
  text,
  children,
  b2b,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  children?: React.ReactNode;
  /** Selo "Indústria · Venda exclusiva B2B" */
  b2b?: string;
}) {
  return (
    <section aria-labelledby={id} className="relative overflow-hidden bg-creme pb-[clamp(48px,6vw,96px)] pt-[clamp(128px,13vw,200px)]">
      <div className="gutter grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-acai" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            {eyebrow}
          </p>
          <h1 id={id} className="t-mega text-acai-ink [&_em]:text-acai" data-split>
            {title}
          </h1>
        </div>
        {(text || b2b) && (
          <div className="lg:col-span-4" data-reveal="up">
            {b2b && (
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-acai px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-white">
                <span className="size-2 rounded-full bg-folha" aria-hidden="true" />
                {b2b}
              </p>
            )}
            {text && <p className="t-lead text-acai-ink/70">{text}</p>}
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
