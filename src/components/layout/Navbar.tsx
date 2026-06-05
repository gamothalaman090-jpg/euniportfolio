"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import LogoIcon from "@/components/ui/LogoIcon";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Reveal animation on mount
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  // ── Shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Desktop entrance
    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-[rgba(5,5,8,0.85)] backdrop-blur-xl border-b border-white/5"
          : "py-6 bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center hover:opacity-70 transition-opacity"
          aria-label={`${SITE.name} Logo — Return to Home`}
        >
          <LogoIcon size={34} />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="nav-item">
              <a
                href={link.href}
                data-cursor-text={link.label}
                className="group flex items-center gap-2 text-sm text-[#8A8A9A] hover:text-[#F0F0F5] transition-colors duration-300"
              >
                <span className="font-mono text-[#64FFDA] text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                  0{i + 1}.
                </span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}`}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="Hire Me"
              className="px-4 py-2 text-sm font-mono text-[#64FFDA] border border-[#64FFDA] rounded hover:bg-[rgba(100,255,218,0.1)] transition-all duration-300"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={cn("block h-px bg-[#F0F0F5] transition-all duration-300", menuOpen && "rotate-45 translate-y-2")} />
          <span className={cn("block h-px bg-[#F0F0F5] transition-all duration-300", menuOpen && "opacity-0")} />
          <span className={cn("block h-px bg-[#F0F0F5] transition-all duration-300", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-[#0D0D12] border-b border-white/5 overflow-hidden transition-all duration-500",
        menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      )}>
        <ul className="flex flex-col gap-4 px-6 py-6">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              className={cn(
                "transform transition-all duration-500 delay-[var(--delay)]",
                menuOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              )}
              style={{ "--delay": `${i * 100}ms` } as any}
            >
              <a
                href={link.href}
                className="text-[#8A8A9A] hover:text-[#64FFDA] transition-colors font-mono text-sm tracking-widest"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-[#64FFDA] mr-2">0{i + 1}.</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
