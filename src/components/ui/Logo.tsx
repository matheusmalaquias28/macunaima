export default function Logo({ className = "", ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span role="img" aria-label="Grupo Macunaíma" className={`logo-mask ${className}`} {...rest} />;
}
