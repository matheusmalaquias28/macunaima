"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useLang } from "@/components/i18n/LangProvider";
import { brazilStates, brazilViewBox, worldDots, worldOrigin, worldRoutes } from "@/components/maps/mapData";
import { markets } from "@/lib/site";
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

const regionCodes = [["US", "CA"], ["IS", "GB"], ["CN", "JP"], ["AU"]];

export default function PresenceMap() {
  const lang = useLang();
  const en = lang === "en";
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [view, setView] = useState<"brazil" | "world">("brazil");
  const [region, setRegion] = useState<number | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const selectedMarket = region === null ? null : markets[region];

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={root} className={styles.atlas} data-running={inView && !paused}>
      <div className={styles.toolbar}>
        <div className={styles.viewSwitch} role="group" aria-label={en ? "Choose a map" : "Escolha um mapa"}>
          <button type="button" aria-pressed={view === "brazil"} aria-controls={`${id}-brazil`} onClick={() => setView("brazil")}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 5 5-2 6 2 5-2v16l-5 2-6-2-5 2V5Zm5-2v16m6-14v16" /></svg>
            {en ? "Explore Brazil" : "Explore o Brasil"}<span>22 {en ? "states" : "estados"}</span>
          </button>
          <button type="button" aria-pressed={view === "world"} aria-controls={`${id}-world`} onClick={() => setView("world")}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>
            {en ? "Explore the world" : "Explore o mundo"}<span>4 {en ? "continents" : "continentes"}</span>
          </button>
        </div>
        <button type="button" className={styles.motionButton} onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={en ? "Pause map animations" : "Pausar animações dos mapas"}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">{paused ? <path d="M4 2l9 6-9 6z" fill="currentColor" /> : <path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" />}</svg>
          {paused ? (en ? "Resume" : "Retomar") : (en ? "Pause" : "Pausar")}
        </button>
      </div>

      <div id={`${id}-brazil`} hidden={view !== "brazil"}>
        <div className={styles.explorer}>
          <div className={styles.story}>
            <p className={styles.eyebrow}>{en ? "Amazonian roots. National reach." : "Raiz amazônica. Alcance nacional."}</p>
            <p className={styles.number}>22<span>{en ? "Brazilian states served" : "estados brasileiros atendidos"}</span></p>
            <h3>{en ? <>Our açaí.<br />Across Brazil.</> : <>Nosso açaí.<br />Brasil afora.</>}</h3>
            <p className={styles.description}>{en ? "From our plant in Pará to the businesses that bring the taste of the Amazon further." : "Da nossa indústria no Pará aos negócios que levam o sabor da Amazônia mais longe."}</p>
            <div className={styles.origin}><span aria-hidden="true" /><div><strong>{en ? "It all starts in Pará" : "Tudo começa no Pará"}</strong><p>{en ? "Inhangapi · Headquarters and plant" : "Inhangapi · Matriz e indústria"}</p></div></div>
          </div>
          <div className={`${styles.stage} ${styles.brazilStage}`}>
            <svg viewBox={brazilViewBox} role="img" aria-label={en ? "Political map of Brazil. All states are illustrated; Pará identifies our origin. Colors do not indicate service coverage." : "Mapa político do Brasil. Todos os estados estão ilustrados; o Pará identifica nossa origem. As cores não indicam cobertura de atendimento."} className={styles.brazilMap}>
              <defs>
                <linearGradient id={`${id}-states`} x1="0" y1="0" x2="0.8" y2="1"><stop stopColor="var(--color-folha)" /><stop offset="1" stopColor="var(--color-folha-ink)" /></linearGradient>
              </defs>
              <g className={styles.states} fill={`url(#${id}-states)`} onMouseLeave={() => setHoveredState(null)}>
                {brazilStates.map((state) => <path key={state.name} d={state.d} data-origin={state.name === "Pará"} onMouseEnter={() => setHoveredState(state.name)}><title>{state.name}</title></path>)}
              </g>
              <g transform="translate(365 155)" className={styles.brazilOrigin} aria-hidden="true">
                <circle className={styles.ring} r="12" />
                <circle r="8" fill="#fff" stroke="var(--color-acai)" strokeWidth="3" />
                <path d="M13 0H70L95 -35H174" className={styles.callout} />
                <rect x="93" y="-72" width="87" height="33" rx="5" fill="#fff" />
                <text x="136" y="-49" textAnchor="middle">PARÁ</text>
              </g>
            </svg>
            <div className={styles.mapCaption}><span>{hoveredState || (en ? "Brazil · Our national presence" : "Brasil · Nossa presença nacional")}</span><span>{en ? "Origin: Pará" : "Origem: Pará"}</span></div>
          </div>
        </div>
      </div>

      <div id={`${id}-world`} hidden={view !== "world"}>
        <div className={`${styles.explorer} ${styles.worldExplorer}`}>
          <div className={styles.story}>
            <p className={styles.eyebrow}>{en ? "From the Amazon to the world" : "Da Amazônia para o mundo"}</p>
            <p className={styles.number}>4<span>{en ? "continents reached" : "continentes alcançados"}</span></p>
            <h3>{en ? <>A flavor without<br />borders.</> : <>Um sabor sem<br />fronteiras.</>}</h3>
            <p className={styles.description}>{en ? "Explore the destinations connected to our origin." : "Explore os destinos conectados à nossa origem."}</p>
            <div className={styles.filters} role="group" aria-label={en ? "Export destinations" : "Destinos de exportação"}>
              <button type="button" aria-pressed={region === null} onClick={() => setRegion(null)}>{en ? "All destinations" : "Todos os destinos"}<span>07</span></button>
              {markets.map((market, index) => <button key={market.region.pt} type="button" aria-pressed={region === index} onClick={() => setRegion(index)}>{market.region[lang]}<span>0{market.countries.length}</span></button>)}
            </div>
          </div>
          <div className={`${styles.stage} ${styles.worldStage}`}>
            <svg viewBox="-20 -45 1240 640" role="img" aria-label={en ? "Export routes from Pará to North America, Europe, Asia and Oceania. Destinations listed below." : "Rotas de exportação do Pará para América do Norte, Europa, Ásia e Oceania. Destinos listados abaixo."} className={styles.worldMap}>
              <path className={styles.dots} d={worldDots} />
              {worldRoutes.map((route, index) => <g key={route.code} className={styles.route} data-active={region === null || regionCodes[region].includes(route.code)} style={{ "--delay": `${index * -0.6}s` } as CSSProperties}>
                <path className={styles.arcOutline} d={route.arc} />
                <path className={styles.arc} d={route.arc} />
                <path className={styles.traveler} pathLength="1" d={route.arc} />
                <circle cx={route.x} cy={route.y} r="12" className={styles.destinationHalo} />
                <circle cx={route.x} cy={route.y} r="5" fill="var(--color-folha)" />
                <svg x={route.x + (route.end ? -82 : 20)} y={route.y + (route.ty > 0 ? 12 : -52)} width="64" height="44" viewBox="0 0 64 44" className={styles.flag} overflow="visible">
                  <title>{routeCountries[route.code][lang]}</title>
                  <rect x="-2" y="-2" width="68" height="48" rx="4" fill="#fff" stroke="var(--color-folha-ink)" strokeWidth="1.5" />
                  <image href={`/flags/${routeCountries[route.code].flag}.svg`} width="64" height="44" preserveAspectRatio="xMidYMid meet" />
                </svg>
              </g>)}
              <g transform={`translate(${worldOrigin.x} ${worldOrigin.y})`} className={styles.worldOrigin}>
                <circle className={styles.ring} r="14" />
                <circle r="9" fill="var(--color-folha)" stroke="var(--color-folha-ink)" strokeWidth="3" />
                <rect x="-54" y="22" width="108" height="32" rx="4" fill="var(--color-folha)" />
                <text x="0" y="45" textAnchor="middle">PARÁ · BR</text>
              </g>
            </svg>
            <div className={styles.worldDetail} aria-live="polite"><strong>{selectedMarket?.region[lang] || (en ? "One origin. A world of connections." : "Uma origem. Um mundo de conexões.")}</strong><p>{(selectedMarket ? selectedMarket.countries : markets.flatMap((market) => market.countries)).map((country) => country[lang]).join(" · ")}</p></div>
          </div>
        </div>
      </div>
      <div className={styles.atlasFooter}><span>{en ? "Grown in the Amazon" : "Nascido na Amazônia"}</span><span>{en ? "Industry · Wholesale only" : "Indústria · Venda exclusiva B2B"}</span><span>MACUNAÍMA</span></div>
    </div>
  );
}

