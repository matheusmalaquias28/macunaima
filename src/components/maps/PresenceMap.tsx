"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/components/i18n/LangProvider";
import { brazilStates, brazilViewBox, worldDots, worldOrigin, worldRoutes } from "@/components/maps/mapData";
import styles from "./PresenceMap.module.css";

const routeCountries: Record<string, { flag: string; pt: string; en: string }> = {
  US: { flag: "us", pt: "Estados Unidos", en: "United States" },
  CA: { flag: "ca", pt: "Canadá", en: "Canada" },
  IS: { flag: "is", pt: "Islândia", en: "Iceland" },
  GB: { flag: "gb-eng", pt: "Inglaterra", en: "England" },
  AU: { flag: "au", pt: "Austrália", en: "Australia" },
  CN: { flag: "cn", pt: "China", en: "China" },
  JP: { flag: "jp", pt: "Japão", en: "Japan" },
};

/** Mapa enxuto e centralizado: Brasil (22 estados) ou mundo (4 continentes) */
export default function PresenceMap() {
  const lang = useLang();
  const en = lang === "en";
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [view, setView] = useState<"brazil" | "world">("brazil");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tabs = [
    { key: "brazil" as const, n: "22", label: en ? "Brazilian states" : "estados brasileiros" },
    { key: "world" as const, n: "4", label: en ? "continents" : "continentes" },
  ];

  return (
    <div ref={root} className={styles.atlas} data-running={inView}>
      {/* Números como seletor do mapa */}
      <div className="flex flex-wrap justify-center gap-3" role="group" aria-label={en ? "Choose a map" : "Escolha um mapa"}>
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={view === t.key}
            aria-controls={`${id}-${t.key}`}
            onClick={() => setView(t.key)}
            className={`flex items-baseline gap-3 rounded-full border px-6 py-3 transition-colors duration-300 ${
              view === t.key ? "border-acai bg-acai text-white" : "border-acai/20 bg-white text-acai-ink hover:border-acai"
            }`}
          >
            <span className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.03em]">{t.n}</span>
            <span className="text-[0.95rem] font-semibold">{t.label}</span>
          </button>
        ))}
      </div>

      <div id={`${id}-brazil`} hidden={view !== "brazil"} className="mx-auto mt-8 max-w-[440px]">
        <svg viewBox={brazilViewBox} role="img" aria-label={en ? "Map of Brazil with Pará, our origin, highlighted" : "Mapa do Brasil com o Pará, nossa origem, em destaque"} className={styles.brazilMap}>
          <g className={styles.states}>
            {brazilStates.map((state) => (
              <path key={state.name} d={state.d} data-origin={state.name === "Pará"}>
                <title>{state.name}</title>
              </path>
            ))}
          </g>
          <g transform="translate(365 155)" aria-hidden="true">
            <circle className={styles.ring} r="12" />
            <circle r="8" fill="#fff" stroke="var(--color-acai)" strokeWidth="3" />
          </g>
        </svg>
      </div>

      <div id={`${id}-world`} hidden={view !== "world"} className="mx-auto mt-8 max-w-[980px]">
        <svg viewBox="-20 -45 1240 640" role="img" aria-label={en ? "Export routes from Pará to the United States, Canada, Iceland, England, Australia, China and Japan" : "Rotas de exportação do Pará para Estados Unidos, Canadá, Islândia, Inglaterra, Austrália, China e Japão"} className={styles.worldMap}>
          <path className={styles.dots} d={worldDots} />
          {worldRoutes.map((route, index) => (
            <g key={route.code} style={{ "--delay": `${index * -0.6}s` } as CSSProperties}>
              <path className={styles.arc} d={route.arc} />
              <path className={styles.traveler} pathLength="1" d={route.arc} />
              <circle cx={route.x} cy={route.y} r="5" fill="var(--color-acai)" />
              <svg x={route.x + (route.end ? -82 : 20)} y={route.y + (route.ty > 0 ? 12 : -52)} width="64" height="44" viewBox="0 0 64 44" className={styles.flag} overflow="visible">
                <title>{routeCountries[route.code][lang]}</title>
                <rect x="-2" y="-2" width="68" height="48" rx="4" fill="#fff" />
                <image href={`/flags/${routeCountries[route.code].flag}.svg`} width="64" height="44" preserveAspectRatio="xMidYMid meet" />
              </svg>
            </g>
          ))}
          <g transform={`translate(${worldOrigin.x} ${worldOrigin.y})`}>
            <circle className={styles.ring} r="14" />
            <circle r="9" fill="var(--color-acai)" stroke="#fff" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}
