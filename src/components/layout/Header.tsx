"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import LangSwitch from "@/components/layout/LangSwitch";
import { useLang } from "@/components/i18n/LangProvider";
import { onSiteReady, useLenis } from "@/components/motion/MotionProvider";
import { buyLink, mainNav } from "@/lib/site";
import { lp, stripLang } from "@/lib/i18n";

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const lang = useLang();
  const path = stripLang(usePathname());

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) lenis.current?.stop();
    else lenis.current?.start();
  }, [open, lenis]);

  useGSAP(
    () => {
      const bar = root.current!.firstElementChild!;
      gsap.set(bar, { yPercent: -100, opacity: 0 });
      return onSiteReady(() => gsap.to(bar, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.3 }));
    },
    { scope: root },
  );

  const isActive = (href: string, children?: { href: string }[]) =>
    href === "/" ? path === "/" : children ? children.some((c) => path.startsWith(c.href)) : path.startsWith(href);

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[70] transition-transform duration-700 ease-[var(--ease-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`gutter flex items-center justify-between gap-6 bg-white/95 text-acai-ink backdrop-blur-md transition-[height,box-shadow] duration-500 ${
            scrolled ? "h-18 shadow-[0_10px_30px_-20px_rgba(34,1,26,0.35)]" : "h-20 md:h-22"
          }`}
        >
          <Link href={lp(lang, "/")} aria-label={lang === "en" ? "Macunaíma, home" : "Macunaíma, página inicial"} className="shrink-0 text-acai" onClick={() => setOpen(false)}>
            <Logo className="w-[150px] md:w-[178px]" />
          </Link>

          <nav aria-label={lang === "en" ? "Main" : "Principal"} className="hidden xl:block">
            <ul className="flex items-center gap-[clamp(18px,2vw,40px)]">
              {mainNav.map((item) => {
                const active = isActive(item.href, item.children);
                return (
                  <li key={item.href} className="group/nav relative">
                    <Link
                      href={lp(lang, item.href)}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex items-center gap-1.5 whitespace-nowrap py-3 text-[0.95rem] font-semibold transition-colors hover:text-acai ${
                        active ? "text-acai" : "text-acai-ink/80"
                      }`}
                    >
                      {item.label[lang]}
                      {item.children && (
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover/nav:rotate-180 group-focus-within/nav:rotate-180" fill="none" stroke="currentColor" strokeWidth={2.2}>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                      <span
                        className={`absolute inset-x-0 bottom-1.5 h-0.5 origin-left rounded-full bg-folha transition-transform duration-500 ease-[var(--ease-expo)] ${
                          active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                        }`}
                      />
                    </Link>
                    {item.children && (
                      <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                        <ul className="min-w-[210px] rounded-2xl bg-white p-2 shadow-[0_24px_60px_-24px_rgba(34,1,26,0.45)] ring-1 ring-acai-ink/8">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={lp(lang, c.href)}
                                aria-current={path === c.href ? "page" : undefined}
                                className={`flex items-center justify-between rounded-xl px-4 py-3 text-[0.95rem] font-semibold transition-colors hover:bg-nevoa hover:text-acai ${
                                  path === c.href ? "bg-nevoa text-acai" : "text-acai-ink/85"
                                }`}
                              >
                                {c.label[lang]}
                                <span className="size-1.5 rounded-full bg-folha" aria-hidden="true" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <LangSwitch />
            <div className="hidden sm:block">
              <Button href={lp(lang, buyLink.href)} variant="acai">
                {buyLink.label[lang]}
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? (lang === "en" ? "Close menu" : "Fechar menu") : lang === "en" ? "Open menu" : "Abrir menu"}
              className="grid size-12 place-items-center rounded-full border border-acai-ink/15 transition-colors hover:border-acai xl:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)] ${
                    open ? "translate-y-[5.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-expo)] ${
                    open ? "-translate-y-[5.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
