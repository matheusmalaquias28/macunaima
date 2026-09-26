"use client";

import { useEffect, useRef, useState } from "react";

type YTPlayer = {
  mute: () => void;
  playVideo: () => void;
  seekTo: (s: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
      PlayerState: { PLAYING: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<void> | null = null;
function loadApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    });
  }
  return apiPromise;
}

/**
 * Vídeo do YouTube como fundo: mudo, em loop, sem controles e sem interface visível.
 * O iframe é ampliado além da área visível para esconder título e logo, e só aparece
 * depois que o vídeo começa a tocar (antes disso fica a thumbnail).
 */
export default function YouTubeBackground({ id, className = "" }: { id: string; className?: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let player: YTPlayer | null = null;
    let loopTimer: number | undefined;
    let cancelled = false;

    loadApi().then(() => {
      if (cancelled || !mount.current || !window.YT) return;
      const YT = window.YT;
      player = new YT.Player(mount.current, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          cc_load_policy: 0,
          loop: 1,
          playlist: id,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === YT.PlayerState.PLAYING) {
              // pequeno atraso para o título do YouTube sumir antes de revelar
              window.setTimeout(() => !cancelled && setPlaying(true), 600);
            }
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(0, true);
              e.target.playVideo();
            }
          },
        },
      });

      // Reinicia um pouco antes do fim para não exibir a tela final do YouTube
      loopTimer = window.setInterval(() => {
        try {
          const d = player?.getDuration() ?? 0;
          const t = player?.getCurrentTime() ?? 0;
          if (d > 0 && t > d - 0.8) player?.seekTo(0, true);
        } catch {}
      }, 250);
    });

    return () => {
      cancelled = true;
      window.clearInterval(loopTimer);
      player?.destroy();
    };
  }, [id]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-acai-ink bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${id}/maxresdefault.jpg)` }}
    >
      <div
        className={`absolute left-1/2 top-1/2 aspect-video w-[max(100%,177.78svh,1138px)] -translate-x-1/2 -translate-y-1/2 scale-[1.2] transition-opacity duration-1000 [&_iframe]:size-full ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div ref={mount} />
      </div>
    </div>
  );
}
