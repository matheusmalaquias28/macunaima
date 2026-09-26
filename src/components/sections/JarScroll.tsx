"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const steps = [
  { eyebrow: "Do fruto", text: "Açaí do Pará, da colheita à linha industrial em até 24 horas." },
  { eyebrow: "À polpa", text: "Polpa de açaí em concentrações de 8%, 12% e 14%." },
  { eyebrow: "Ao seu negócio", text: "Embalagens de 1,02 kg e 100 g, com fornecimento ao longo do ano." },
];

/**
 * Seção com vídeo controlado pelo scroll.
 * Para um scrub fluido, exporte o vídeo com keyframe em todo frame:
 *   ffmpeg -i pote.mov -c:v libx264 -g 1 -crf 20 -pix_fmt yuv420p -an -movflags +faststart pote-abrindo.mp4
 * Sem `videoSrc`, mostra uma animação provisória do pote.
 */
export default function JarScroll({ videoSrc }: { videoSrc?: string }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)" },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            gsap.set("[data-j-step]", { opacity: 1, y: 0 });
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              onUpdate: (self) => {
                const v = video.current;
                if (v && v.duration) v.currentTime = self.progress * (v.duration - 0.05);
              },
            },
          });

          // Barra de progresso
          tl.fromTo("[data-j-bar]", { scaleY: 0 }, { scaleY: 1, duration: 10 }, 0);

          // Textos em sequência
          const stepEls = gsap.utils.toArray<HTMLElement>("[data-j-step]");
          stepEls.forEach((el, i) => {
            const at = i * 3.2 + 0.4;
            tl.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, at);
            if (i < stepEls.length - 1) tl.to(el, { opacity: 0, y: -60, duration: 1.2, ease: "power2.in" }, at + 2.2);
          });
          gsap.utils.toArray<HTMLElement>("[data-j-dot]").forEach((el, i) => {
            tl.fromTo(el, { backgroundColor: "rgba(255,255,255,0.2)" }, { backgroundColor: "#96CA65", duration: 0.3 }, i * 3.2 + 0.4);
          });

          // Animação provisória do pote
          if (!videoSrc) {
            tl.to("[data-j-lid]", { y: -150, x: 70, rotate: 22, duration: 3.2, ease: "power1.inOut" }, 0.6)
              .fromTo("[data-j-pulp]", { scaleY: 0.2, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 1.4 }, 1.6)
              .fromTo(
                "[data-j-berry]",
                { y: 0, opacity: 0, scale: 0.4 },
                { y: (i) => -150 - (i % 3) * 60, x: (i) => (i - 3) * 38, opacity: 1, scale: 1, duration: 4, stagger: 0.12 },
                2.2,
              )
              .fromTo("[data-j-glow]", { scale: 0.6, opacity: 0.2 }, { scale: 1.2, opacity: 0.9, duration: 6 }, 1)
              .to("[data-j-jar]", { scale: 1.12, duration: 4 }, 6);
          }
        },
      );
      return () => mm.revert();
    },
    { scope: root, dependencies: [videoSrc] },
  );

  return (
    <section ref={root} aria-label="Do fruto à polpa" className="relative h-[420vh] bg-acai-ink text-white">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {videoSrc ? (
          <video
            ref={video}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <JarPlaceholder />
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,1,26,0.9)_0%,rgba(34,1,26,0)_55%)] md:bg-[radial-gradient(ellipse_at_left,rgba(34,1,26,0.85)_0%,rgba(34,1,26,0)_60%)]" />

        <div className="gutter relative flex h-full items-start pt-28 md:items-center md:pt-0">
          <div className="relative h-[34vh] w-full max-w-xl pr-10 md:h-[46vh] md:pr-0">
            {steps.map((s) => (
              <div key={s.eyebrow} data-j-step className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-0">
                <p className="eyebrow mb-5 text-folha">{s.eyebrow}</p>
                <p className="t-title">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-[clamp(1.25rem,4vw,4.5rem)] top-1/2 flex -translate-y-1/2 items-center gap-4">
          <div className="flex flex-col gap-6">
            {steps.map((s) => (
              <span key={s.eyebrow} data-j-dot className="size-2 rounded-full bg-white/20" />
            ))}
          </div>
          <div className="relative h-40 w-px bg-white/15">
            <div data-j-bar className="absolute inset-0 origin-top bg-folha" />
          </div>
        </div>

        {!videoSrc && (
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-[0.68rem] text-white/60 backdrop-blur-sm">
            Vídeo · pote de açaí se abrindo (controlado pelo scroll)
          </span>
        )}
      </div>
    </section>
  );
}

function JarPlaceholder() {
  const berries = Array.from({ length: 7 });
  return (
    <div className="absolute inset-0 grid items-end justify-center pb-[6vh] md:items-center md:justify-end md:pb-0 md:pr-[14vw]">
      <div data-j-glow className="absolute size-[70vmin] rounded-full bg-acai-soft/60 blur-[90px] md:right-[8vw]" />
      <svg data-j-jar viewBox="0 0 400 460" className="relative w-[min(78vw,46vh,520px)] overflow-visible md:w-[min(72vmin,520px)] md:translate-y-[8%]" aria-hidden="true">
        <defs>
          <linearGradient id="jar-body" x1="0" x2="1">
            <stop offset="0" stopColor="#3a0129" />
            <stop offset="0.45" stopColor="#6d1650" />
            <stop offset="1" stopColor="#2a011f" />
          </linearGradient>
          <radialGradient id="jar-pulp" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#8b2a6e" />
            <stop offset="1" stopColor="#2a011f" />
          </radialGradient>
          <radialGradient id="berry" cx="0.35" cy="0.3" r="0.7">
            <stop offset="0" stopColor="#7a3a6a" />
            <stop offset="0.5" stopColor="#2d0a26" />
            <stop offset="1" stopColor="#120010" />
          </radialGradient>
        </defs>

        {/* corpo */}
        <path d="M62 150 L338 150 L318 420 Q316 440 296 440 L104 440 Q84 440 82 420 Z" fill="url(#jar-body)" />
        <rect x="74" y="250" width="252" height="92" fill="#96CA65" />
        <text x="200" y="306" textAnchor="middle" fontSize="30" fontWeight="700" fill="#4A0234" fontFamily="var(--font-unbounded)">
          AÇAÍ
        </text>
        {/* boca e polpa */}
        <ellipse cx="200" cy="150" rx="138" ry="30" fill="#22011a" />
        <ellipse data-j-pulp cx="200" cy="154" rx="126" ry="24" fill="url(#jar-pulp)" style={{ transformOrigin: "200px 154px" }} />

        {/* frutos */}
        {berries.map((_, i) => (
          <circle key={i} data-j-berry cx="200" cy="150" r={11 + (i % 3) * 3} fill="url(#berry)" opacity="0" />
        ))}

        {/* tampa */}
        <g data-j-lid style={{ transformOrigin: "200px 130px" }}>
          <path d="M56 118 Q56 100 76 100 L324 100 Q344 100 344 118 L344 150 L56 150 Z" fill="#96CA65" />
          <ellipse cx="200" cy="100" rx="144" ry="28" fill="#b4dc8c" />
        </g>
      </svg>
    </div>
  );
}
