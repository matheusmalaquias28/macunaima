/** Régua técnica no topo da seção: número, nome e dois rótulos (o último some no celular). */
export default function SectionHead({ items, onDark = false }: { items: [string, string, string, string]; onDark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`gutter caption relative z-[2] grid grid-cols-[auto_1fr_auto] gap-x-[clamp(14px,1.6vw,28px)] py-[18px] md:grid-cols-4 ${
        onDark ? "text-white/50" : "text-acai-ink/50"
      }`}
    >
      {items.map((t, i) => (
        <span
          key={t}
          className={`${i === 0 ? (onDark ? "text-white" : "text-acai-ink") : ""} ${i === 3 ? "hidden text-right md:block" : ""}`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
