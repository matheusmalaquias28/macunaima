"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Media from "@/components/ui/Media";
import { Arrow } from "@/components/ui/Button";
import type { PortfolioItem } from "@/lib/site";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProductCarousel({
  items,
  variant,
}: {
  items: PortfolioItem[];
  variant: "card" | "detail";
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const [edge, setEdge] = useState({ index: 0, atStart: true, atEnd: false });
  const [dragging, setDragging] = useState(false);
  const sorbetAnchor = items.find((item) => item.line === "Sorbet")?.slug;

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const sync = () => {
      const cards = [...el.querySelectorAll<HTMLElement>("[data-slide]")];
      const style = getComputedStyle(el);
      const padLeft = parseFloat(style.paddingLeft) || 0;
      const edgeX = el.getBoundingClientRect().left + padLeft;
      let index = 0;
      let best = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().left - edgeX);
        if (dist < best) {
          best = dist;
          index = i;
        }
      });
      const box = el.getBoundingClientRect();
      const padRight = parseFloat(style.paddingRight) || 0;
      const first = cards[0];
      const last = cards[cards.length - 1];
      const atStart = !first || first.getBoundingClientRect().left >= box.left + padLeft - 8;
      const atEnd = !last || last.getBoundingClientRect().right <= box.right - padRight + 8;
      setEdge((prev) =>
        prev.index === index && prev.atStart === atStart && prev.atEnd === atEnd ? prev : { index, atStart, atEnd },
      );
    };

    const alignToHash = (smooth: boolean) => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      const target = el.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
      const slide = target?.closest<HTMLElement>("[data-slide]");
      if (!slide) return;
      const padLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;
      const left = slide.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - padLeft;
      el.scrollTo({ left: Math.max(0, left), behavior: smooth ? "smooth" : "auto" });
    };

    const onHash = () => alignToHash(true);
    const onPop = () => alignToHash(false);
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.pathname !== window.location.pathname) return;
      requestAnimationFrame(() => alignToHash(true));
    };

    sync();
    alignToHash(false);
    const raf = requestAnimationFrame(() => alignToHash(false));
    const later = window.setTimeout(() => alignToHash(false), 450);

    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onPop);
    window.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(later);
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("click", onClick);
    };
  }, [items]);

  const step = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 20;
    const width = (card?.offsetWidth ?? el.clientWidth * 0.8) + gap;
    el.scrollBy({ left: dir * width, behavior: "smooth" });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || !scroller.current) return;
    drag.current = { down: true, x: event.clientX, left: scroller.current.scrollLeft, moved: false };
    scroller.current.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down || !scroller.current) return;
    const dx = event.clientX - drag.current.x;
    if (Math.abs(dx) > 6) drag.current.moved = true;
    scroller.current.scrollLeft = drag.current.left - dx;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    drag.current.down = false;
    scroller.current?.releasePointerCapture(event.pointerId);
    setDragging(false);
  };

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label={variant === "detail" ? "Portfólio com detalhes" : "Portfólio de produtos"}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        }
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
      }}
    >
      <div className="gutter mb-5 flex items-center justify-between gap-4 md:mb-6">
        <p className="caption text-acai-ink/45" aria-live="polite">
          {pad(edge.index + 1)} / {pad(items.length)}
        </p>
        <div className="flex gap-2">
          <CarouselButton label="Produto anterior" disabled={edge.atStart} onClick={() => step(-1)}>
            <Arrow className="size-4 rotate-180" />
          </CarouselButton>
          <CarouselButton label="Próximo produto" disabled={edge.atEnd} onClick={() => step(1)}>
            <Arrow className="size-4" />
          </CarouselButton>
        </div>
      </div>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(event) => {
          if (!drag.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
          drag.current.moved = false;
        }}
        className={`no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-ps-(--gutter) px-(--gutter) pb-2 motion-safe:scroll-smooth ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        } [&_img]:pointer-events-none`}
      >
        {items.map((item) =>
          variant === "detail" ? (
            <DetailSlide key={item.slug} item={item} anchor={item.slug === sorbetAnchor} />
          ) : (
            <CardSlide key={item.slug} item={item} />
          ),
        )}
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-12 place-items-center rounded-full border border-acai/25 text-acai transition-colors duration-500 hover:border-acai hover:bg-acai hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function CardSlide({ item }: { item: PortfolioItem }) {
  return (
    <article data-slide id={item.slug} className="w-[min(78vw,320px)] shrink-0 snap-start" data-reveal="up">
      <Link href={`/produtos#${item.slug}`} className="group block">
        <div className="relative overflow-hidden rounded-[1.75rem] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2">
          <ProductPhoto item={item} sizes="320px" className="aspect-[4/5] bg-acai" />
          <span className="absolute bottom-5 right-5 grid size-14 place-items-center rounded-full bg-white text-acai transition-all duration-500 ease-[var(--ease-expo)] group-hover:rotate-[-45deg] group-hover:bg-folha">
            <Arrow className="size-5" />
          </span>
        </div>
        <div className="px-1 pt-6">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-acai">
            {item.title}
            <span className="ml-2 text-base font-medium text-acai-ink/50">{item.weight}</span>
          </h3>
          <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-acai-ink/70">{item.text}</p>
          <span className="mt-5 inline-flex h-11 items-center rounded-full border border-acai/35 px-5 text-sm font-semibold text-acai transition-colors duration-500 group-hover:border-acai group-hover:bg-acai group-hover:text-white">
            Conheça o produto
          </span>
        </div>
      </Link>
    </article>
  );
}

function DetailSlide({ item, anchor }: { item: PortfolioItem; anchor: boolean }) {
  const sorbet = item.line === "Sorbet";
  return (
    <article
      data-slide
      id={item.slug}
      className={`flex w-[min(88vw,880px)] shrink-0 snap-start scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] md:min-h-[520px] md:flex-row md:rounded-[2rem] ${
        sorbet ? "" : "bg-white text-acai-ink"
      }`}
      style={sorbet ? { backgroundColor: item.bg, color: item.ink } : undefined}
      data-reveal="up"
    >
      {anchor && (
        <span id="linha-sorbet" className="sr-only">
          Linha Sorbet
        </span>
      )}
      <div className="relative aspect-[4/5] shrink-0 md:aspect-auto md:w-[44%]">
        <ProductPhoto item={item} sizes="(min-width: 768px) 40vw, 88vw" className="absolute inset-0 bg-acai" />
        <span
          className={`absolute left-4 top-4 rounded-full px-4 py-2 font-display text-sm font-semibold md:left-5 md:top-5 ${
            sorbet ? "bg-white/90" : "bg-white text-acai"
          }`}
          style={sorbet ? { color: item.ink } : undefined}
        >
          {item.weight}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-10">
        <p className={`eyebrow ${sorbet ? "opacity-60" : "text-acai-soft"}`}>{item.line}</p>
        <h3 className={`mt-4 font-display text-[clamp(2rem,3vw,3.25rem)] font-semibold leading-[0.92] tracking-[-0.04em] ${sorbet ? "" : "text-acai"}`}>
          {item.title}
        </h3>
        <p className={`mt-4 max-w-md text-[0.98rem] leading-relaxed ${sorbet ? "opacity-80" : "text-acai-ink/70"}`}>{item.detail}</p>
        <dl className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 ${sorbet ? "border-current/15" : "border-acai/12"}`}>
          {item.specs.map((spec) => (
            <div key={spec.label}>
              <dt className={`eyebrow ${sorbet ? "opacity-50" : "text-acai-ink/45"}`}>{spec.label}</dt>
              <dd className="mt-1.5 font-display text-xl font-semibold tracking-[-0.03em]">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/contato"
          className="mt-8 inline-flex h-12 w-fit items-center rounded-full border border-current px-6 text-sm font-semibold transition-colors duration-500 hover:bg-current/10"
        >
          Quero este produto
        </Link>
      </div>
    </article>
  );
}

function ProductPhoto({ item, className, sizes }: { item: PortfolioItem; className: string; sizes: string }) {
  const sorbet = item.line === "Sorbet";
  return (
    <Media
      src={item.photo}
      alt={item.alt}
      label={item.label}
      tone={sorbet ? "custom" : "acai"}
      reveal={false}
      sizes={sizes}
      className={className}
      style={
        sorbet
          ? ({ "--ph-a": item.a, "--ph-b": item.b, "--ph-c": item.bg } as React.CSSProperties)
          : undefined
      }
    />
  );
}
