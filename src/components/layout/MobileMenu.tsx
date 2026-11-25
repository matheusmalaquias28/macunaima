"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import LangSwitch from "@/components/layout/LangSwitch";
import { useLang } from "@/components/i18n/LangProvider";
import { buyLink, contact, mainNav, socials } from "@/lib/site";
import { lp } from "@/lib/i18n";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const lang = useLang();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(root.current, { visibility: "visible" })
        .fromTo("[data-m-green]", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.9 })
        .fromTo("[data-m-panel]", { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: 0.9 }, 0.12)
        .fromTo("[data-m-link]", { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.1, ease: "expo.out", stagger: 0.05 }, 0.5)
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
      <div data-m-panel className="gutter absolute inset-0 flex flex-col overflow-y-auto bg-white pb-8 pt-28 text-acai-ink">
        <nav aria-label={lang === "en" ? "Mobile menu" : "Menu mobile"} className="flex-1">
          <ul className="flex flex-col gap-1">
            {mainNav.map((l) => (
              <li key={l.href}>
                <div className="overflow-clip">
                  <Link
                    data-m-link
                    href={lp(lang, l.href)}
                    onClick={onClose}
                    className="group inline-flex items-baseline gap-3 font-display text-[clamp(2rem,9vw,3.4rem)] font-semibold leading-[1.14] tracking-[-0.03em]"
                  >
                    <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3 group-hover:text-acai">
                      {l.label[lang]}
                    </span>
                  </Link>
                </div>
                {l.children && (
                  <ul className="mb-3 mt-1 flex flex-wrap gap-2">
                    {l.children.map((c) => (
                      <li key={c.href} className="overflow-clip">
                        <Link
                          data-m-link
                          href={lp(lang, c.href)}
                          onClick={onClose}
                          className="inline-flex rounded-full border border-acai/20 px-4 py-2 text-base font-semibold text-acai transition-colors hover:bg-acai hover:text-white"
                        >
                          {c.label[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-8 border-t border-acai-ink/10 pt-8">
          <div data-m-foot className="flex flex-wrap items-center justify-between gap-4">
            <Button href={lp(lang, buyLink.href)} variant="acai" size="lg" className="w-full justify-between sm:w-auto">
              {buyLink.label[lang]}
            </Button>
            <LangSwitch className="text-base" />
          </div>
          <div data-m-foot className="flex flex-wrap items-end justify-between gap-6">
            <div className="text-sm text-acai-ink/60">
              <p className="eyebrow mb-2 text-acai">{lang === "en" ? "Manufacturer · Wholesale only (B2B)" : "Indústria · Venda exclusiva B2B"}</p>
              <p>{contact.address}</p>
            </div>
            <ul className="flex gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} da Macunaíma`}
                    className="grid size-11 place-items-center rounded-full border border-acai/20 text-acai transition-colors hover:border-acai hover:bg-acai hover:text-white"
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
