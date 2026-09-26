import Link from "next/link";

type Variant = "folha" | "acai" | "light" | "outline-light" | "outline-dark";

const variants: Record<Variant, string> = {
  folha: "bg-folha text-acai-ink hover:bg-white",
  acai: "bg-acai text-white hover:bg-acai-ink",
  light: "bg-white text-acai hover:bg-folha hover:text-acai-ink",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white hover:text-acai",
  "outline-dark": "border border-acai/25 text-acai hover:border-acai hover:bg-acai hover:text-white",
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({
  href,
  children,
  variant = "folha",
  size = "md",
  className = "",
}: {
  href: string;
  children: string;
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizing = size === "lg" ? "h-16 pl-8 pr-3 text-base" : "h-13 pl-6 pr-2 text-[0.95rem]";
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full font-semibold transition-colors duration-500 ${sizing} ${variants[variant]} ${className}`}
    >
      <span className="btn-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span
        className={`grid place-items-center rounded-full bg-current/10 transition-transform duration-500 group-hover:rotate-[-45deg] ${
          size === "lg" ? "size-11" : "size-9"
        }`}
      >
        <Arrow className="size-4" />
      </span>
    </Link>
  );
}
