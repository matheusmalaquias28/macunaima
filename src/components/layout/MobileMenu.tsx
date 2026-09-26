"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import { mainNav, socials, contact } from "@/lib/site";

const links = [{ label: "Início", href: "/" }, ...mainNav, { label: "Contato", href: "/contato" }];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(root.current, { visibility: "visible" })
        .fromTo("[data-m-green]", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.9 })
        .fromTo("[data-m-panel]", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.9 }, 0.12)
        .fromTo(
          "[data-m-link]",
          { yPercent: 115, rotate: 4 },
          { yPercent: 0, rotate: 0, duration: 1.1, ease: "expo.out", stagger: 0.05 },
          0.5,
        )
        .fromTo("[data-m-foot]", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.75);
    },
    { scope: root },
  );

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      t.timeScale(1).play();
      root.current?.querySelector<HTMLAnchorElement>("[data-m-link]")?.focus({ preventScroll: true });
    } else if (t.progress() > 0) {
      t.timeScale(1.8).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={root}
      id="menu-mobile"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      className="invisible fixed inset-0 z-[60] xl:hidden"
      data-lenis-prevent
    >
      <div data-m-green className="absolute inset-0 bg-folha" />
      <div data-m-panel className="gutter absolute inset-0 flex flex-col overflow-y-auto bg-acai pb-8 pt-28 text-white">
        <nav aria-label="Menu mobile" className="flex-1">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.label} className="overflow-clip">
                <Link
                  data-m-link
                  href={l.href}
                  onClick={onClose}
                  className="group inline-flex items-baseline gap-3 font-display text-[clamp(2rem,9vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.04em]"
                >
                  <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:text-folha">
                    {l.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-8 border-t border-white/15 pt-8">
          <div data-m-foot>
            <Button href="/contato" size="lg" className="w-full justify-between sm:w-auto">
              Quero comprar
            </Button>
          </div>
          <div data-m-foot className="flex flex-wrap items-end justify-between gap-6">
            <div className="text-sm text-white/60">
              <p className="eyebrow mb-2 text-folha">Açaí da Amazônia</p>
              <p>{contact.address}</p>
            </div>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:border-folha hover:bg-folha hover:text-acai-ink"
                  >
                    <SocialIcon name={s.icon} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
