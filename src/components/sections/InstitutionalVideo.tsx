"use client";

import { useState } from "react";
import { useLang } from "@/components/i18n/LangProvider";

// [A CONFIRMAR] trocar pelo novo vídeo institucional com imagens de drone quando o cliente enviar
const VIDEO_ID = "fqrtabH57lg";

export default function InstitutionalVideo() {
  const en = useLang() === "en";
  const title = en ? "Macunaíma institutional video" : "Vídeo institucional da Macunaíma";
  // O player do YouTube só carrega no clique: até lá fica a capa (mais leve e sem cookies de terceiros)
  const [playing, setPlaying] = useState(false);

  return (
    <div className="gutter -mt-2" data-reveal="up">
      <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-acai-ink md:rounded-[2.25rem]">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`${en ? "Watch" : "Assistir"}: ${title}`} className="group absolute inset-0 size-full cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element -- capa remota do YouTube */}
            <img src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="" className="media-zoom absolute inset-0 size-full object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(34,1,26,0)_40%,rgba(34,1,26,0.55)_100%)]" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-[clamp(72px,8vw,112px)] place-items-center rounded-full bg-white text-acai shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-110">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-[6%] size-[36%]" fill="currentColor">
                  <path d="M7 4.5v15l12.5-7.5z" />
                </svg>
              </span>
            </span>
            <span className="caption absolute bottom-[clamp(16px,2vw,28px)] left-[clamp(16px,2vw,28px)] text-white/90">
              {en ? "Watch the video" : "Assistir ao vídeo"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
