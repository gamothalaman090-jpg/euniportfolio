"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE, STATS } from "@/lib/constants";
import { ArrowDown, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const sublineRef   = useRef<HTMLParagraphElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const socialsRef   = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const bgOrb1Ref    = useRef<HTMLDivElement>(null);
  const bgOrb2Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Background orb float
      gsap.to(bgOrb1Ref.current, {
        y: -40, x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(bgOrb2Ref.current, {
        y: 30, x: -30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // ── Entrance timeline
      const tl = gsap.timeline({ delay: 0.4 });

      // Headline: split by lines (manual spans)
      const lines = headlineRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        tl.fromTo(
          lines,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" }
        );
      }

      tl.fromTo(
        sublineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );

      tl.fromTo(
        socialsRef.current?.children ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        statsRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );

      tl.fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );

      // ── Scroll cue bounce
      gsap.to(scrollCueRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // ── Parallax: hero content moves up on scroll
      gsap.to(sectionRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-32 overflow-hidden"
    >
      {/* ── Ambient background orbs */}
      <div
        ref={bgOrb1Ref}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(100,255,218,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={bgOrb2Ref}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(241,90,36,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ── Noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* ── Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(90deg, #64FFDA 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Main content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        {/* Status badge */}
        <div className="mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#64FFDA] animate-pulse-soft" />
          <span className="font-mono text-xs text-[#64FFDA] tracking-widest uppercase">
            Open to Opportunities · {SITE.location}
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[1.05] tracking-tight mb-6 overflow-hidden"
        >
          {SITE.tagline.split("\n").map((line, i) => (
            <span key={i} className="hero-line block overflow-hidden">
              <span className="block">
                {i === 0 ? (
                  <><span className="gradient-teal">I build</span>{line.replace("I build", "")}</>
                ) : i === 2 ? (
                  <span className="text-[#8A8A9A]">{line}</span>
                ) : (
                  line
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* Sub-headline */}
        <p
          ref={sublineRef}
          className="max-w-xl text-[#8A8A9A] text-lg leading-relaxed mb-10"
        >
          {SITE.role} — 3rd-year IT student at National University Manila,
          building real, deployed web apps. Open to internships, freelance
          work, and full-time roles.
        </p>

        {/* Social links + CTA */}
        <div ref={socialsRef} className="flex flex-wrap items-center gap-4 mb-16">
          <a
            href={`mailto:${SITE.email}`}
            data-cursor-text="Send Protocol"
            aria-label="Send an email"
            className="group flex items-center gap-2 px-6 py-3 bg-[#64FFDA] text-[#050508] font-semibold text-sm rounded hover:bg-white transition-all duration-300 glow-teal"
          >
            <Mail size={16} />
            <span className="max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-500 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100">
              Let&apos;s Talk
            </span>
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="Open Protocol"
            aria-label="View GitHub profile"
            className="group flex items-center gap-2 px-6 py-3 border border-white/10 text-[#F0F0F5] text-sm rounded hover:border-[#64FFDA] hover:text-[#64FFDA] transition-all duration-300"
          >
            <GitHubIcon size={16} />
            <span className="max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-500 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100">
              GitHub
            </span>
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="Connect"
            aria-label="View LinkedIn profile"
            className="group flex items-center gap-2 px-6 py-3 border border-white/10 text-[#F0F0F5] text-sm rounded hover:border-[#64FFDA] hover:text-[#64FFDA] transition-all duration-300"
          >
            <LinkedInIcon size={16} />
            <span className="max-w-0 group-hover:max-w-[100px] overflow-hidden transition-all duration-500 ease-out whitespace-nowrap opacity-0 group-hover:opacity-100">
              LinkedIn
            </span>
          </a>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5 shadow-[0_0_20px_rgba(100,255,218,0.02)]"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0D0D12] px-6 py-5 flex flex-col gap-1 hover:bg-[#141419] transition-colors duration-300"
            >
              <span className="font-display text-3xl font-bold text-[#64FFDA]">
                {stat.value}
              </span>
              <span className="font-mono text-xs text-[#4A4A5A] tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4A4A5A]"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
