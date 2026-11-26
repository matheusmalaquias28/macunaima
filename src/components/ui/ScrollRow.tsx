"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { useLang } from "@/components/i18n/LangProvider";

/** Carrossel horizontal com rolagem nativa (snap), arraste com o mouse e setas. Cada filho direto é um slide. */
export default function ScrollRow({ label, children }: { label: string; children: React.ReactNode }) {
  const en = useLang() === "en";
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [edge, setEdge] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const sync = () => {
      const start = el.scrollLeft <= 8;
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      setEdge((p) => (p.start === start && p.end === end ? p : { start, end }));
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const step = (dir: number) => {
    const el = scroller.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el) return;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? el.clientWidth * 0.8) + 20), behavior: "smooth" });
  };

  const btn =
    "grid size-12 place-items-center rounded-full border border-acai/25 text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <div role="region" aria-roledescription={en ? "carousel" : "carrossel"} aria-label={label}>
      <div className="gutter mb-5 flex justify-end gap-2">
        <button type="button" className={btn} disabled={edge.start} onClick={() => step(-1)} aria-label={en ? "Previous" : "Anterior"}>
          <Arrow className="size-4 rotate-180" />
        </button>
        <button type="button" className={btn} disabled={edge.end} onClick={() => step(1)} aria-label={en ? "Next" : "Próximo"}>
          <Arrow className="size-4" />
        </button>
      </div>
      <div
        ref={scroller}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0 || !scroller.current) return;
          drag.current = { down: true, x: e.clientX, left: scroller.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          if (!drag.current.down || !scroller.current) return;
          const dx = e.clientX - drag.current.x;
          if (!drag.current.moved && Math.abs(dx) > 6) {
            // Só vira arraste depois de mexer: um clique simples continua abrindo os botões do card
            drag.current.moved = true;
            scroller.current.setPointerCapture(e.pointerId);
            setDragging(true);
          }
          if (!drag.current.moved) return;
          scroller.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={(e) => {
          if (!drag.current.down) return;
          drag.current.down = false;
          if (scroller.current?.hasPointerCapture(e.pointerId)) scroller.current.releasePointerCapture(e.pointerId);
          setDragging(false);
        }}
        onPointerCancel={() => {
          drag.current.down = false;
          setDragging(false);
        }}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => {
          if (!drag.current.moved) return;
          e.preventDefault();
          e.stopPropagation();
          drag.current.moved = false;
        }}
        data-lenis-prevent-wheel
        className={`no-scrollbar flex gap-5 overflow-x-auto overscroll-x-contain scroll-ps-(--gutter) px-(--gutter) pb-3 *:shrink-0 *:snap-start [&_img]:pointer-events-none ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
