"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { onSiteReady, useLenis } from "@/components/motion/MotionProvider";
import { mainNav } from "@/lib/site";

export default function Header() {
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

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
      return onSiteReady(() =>
        gsap.to(bar, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.5 }),
      );
    },
    { scope: root },
  );

  const solid = scrolled && !open;

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[70] transition-transform duration-700 ease-[var(--ease-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div
          className={`gutter flex items-center justify-between gap-8 text-white transition-[background-color,height,backdrop-filter] duration-500 ${
            solid ? "h-18 bg-acai/92 backdrop-blur-md" : "h-24"
          }`}
        >
          <Link href="/" aria-label="Macunaíma, página inicial" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo className="w-[150px] md:w-[178px]" />
          </Link>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative py-2 text-[0.92rem] font-medium text-white/85 transition-colors hover:text-white"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-folha transition-transform duration-500 ease-[var(--ease-expo)] group-hover:origin-left group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button href="/contato">Quero comprar</Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-13 place-items-center rounded-full border border-white/30 transition-colors hover:border-white xl:hidden"
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
