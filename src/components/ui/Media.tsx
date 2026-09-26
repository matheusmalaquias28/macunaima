import Image from "next/image";
import AutoVideo from "@/components/ui/AutoVideo";

type Tone = "acai" | "deep" | "folha" | "nevoa" | "rio" | "custom";

type MediaProps = {
  /** Caminho da imagem final. Sem src, renderiza o placeholder. */
  src?: string;
  /** Vídeo em loop no lugar da imagem (toca só quando visível). */
  videoSrc?: string;
  poster?: string;
  alt?: string;
  /** Descrição da foto que deve entrar aqui (aparece no placeholder). */
  label: string;
  tone?: Tone;
  className?: string;
  sizes?: string;
  preload?: boolean;
  /** Cortina de entrada ao rolar. */
  reveal?: boolean;
  /** Intensidade do parallax interno (0 desliga). */
  parallax?: number;
  style?: React.CSSProperties;
  /** Onde fica a etiqueta do placeholder (use "top" quando houver texto por cima). */
  labelAt?: "bottom" | "top";
  children?: React.ReactNode;
};

export default function Media({
  src,
  videoSrc,
  poster,
  alt = "",
  label,
  tone = "acai",
  className = "",
  sizes = "100vw",
  preload,
  reveal = true,
  parallax = 0,
  style,
  labelAt = "bottom",
  children,
}: MediaProps) {
  const lightTone = tone === "nevoa" || tone === "folha";
  return (
    <div
      className={`${/\b(absolute|fixed|sticky)\b/.test(className) ? "" : "relative "}overflow-hidden ${className}`}
      data-reveal={reveal ? "img" : undefined}
      style={style}
    >
      <div data-media-inner className="absolute inset-0">
        <div
          className={`media-zoom absolute ${parallax ? "-inset-y-[14%] inset-x-0" : "inset-0"}`}
          data-parallax={parallax || undefined}
        >
          {videoSrc ? (
            <AutoVideo src={videoSrc} poster={poster} className="absolute inset-0 size-full object-cover" />
          ) : src ? (
            <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className="object-cover" />
          ) : (
            <div className={`media-ph ${tone === "custom" ? "" : `media-tone-${tone}`} absolute inset-0`} role="img" aria-label={alt || label} />
          )}
        </div>
      </div>
      {!src && !videoSrc && (
        <span
          className={`pointer-events-none absolute z-[1] max-w-[68%] ${labelAt === "top" ? "right-4 top-28 text-right" : "bottom-3 left-3"} rounded-full px-3 py-1.5 text-[0.68rem] font-medium leading-tight backdrop-blur-sm ${
            lightTone ? "bg-white/50 text-acai-ink/70" : "bg-black/20 text-white/70"
          }`}
        >
          Imagem · {label}
        </span>
      )}
      {children}
    </div>
  );
}
