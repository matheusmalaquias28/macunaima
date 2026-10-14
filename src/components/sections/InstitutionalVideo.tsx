"use client";

import { useState } from "react";

const VIDEO_ID = "fqrtabH57lg";
const VIDEO_TITLE = "Vídeo institucional da Macunaíma";

export default function InstitutionalVideo() {
  // O player do YouTube só carrega no clique: até lá fica a capa (mais leve e sem cookies de terceiros)
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video-institucional"
      aria-labelledby="video-title"
      className="relative bg-acai-ink pb-[clamp(96px,12vw,200px)] text-white"
    >
      <div className="gutter grid gap-8 pb-[clamp(32px,4vw,56px)] lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow mb-6 flex items-center gap-3 text-acai-mist" data-reveal="up">
            <span className="h-px w-7 bg-current opacity-70" />
            Vídeo institucional
          </p>
          <h2 id="video-title" className="t-display [&_em]:text-acai-mist" data-split>
            Conheça a <em>Macunaíma.</em>
          </h2>
        </div>
        <p className="t-lead max-w-md text-white/70 lg:col-span-4" data-reveal="up">
          Há quase duas décadas produzindo açaí do Pará com qualidade, da origem do fruto à indústria.
        </p>
      </div>

      <div className="gutter" data-reveal="up">
        <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-acai">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={VIDEO_TITLE}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Assistir: ${VIDEO_TITLE}`}
              className="group absolute inset-0 size-full cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- capa remota do YouTube */}
              <img
                src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                loading="lazy"
                className="media-zoom absolute inset-0 size-full object-cover"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,1,26,0.1)_0%,rgba(34,1,26,0.55)_100%)]" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-[clamp(72px,8vw,112px)] place-items-center rounded-full bg-folha text-acai-ink transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-[6%] size-[36%]" fill="currentColor">
                    <path d="M7 4.5v15l12.5-7.5z" />
                  </svg>
                </span>
              </span>
              <span className="caption absolute bottom-[clamp(16px,2vw,28px)] left-[clamp(16px,2vw,28px)] text-white/80">
                Assistir ao vídeo
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
