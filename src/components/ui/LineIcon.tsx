/** Ícone de traço (grid 24, traço 1.25, terminações retas), no padrão do redesign. */
export default function LineIcon({ children, className = "size-5" }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
