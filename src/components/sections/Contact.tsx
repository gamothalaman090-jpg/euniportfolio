"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/constants";
import { Mail, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/BrandIcons";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgLineRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Background scan line sweep
      gsap.fromTo(
        bgLineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1, opacity: 1, duration: 1.2, ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      // ── Content reveal
      const children = contentRef.current?.children ?? [];
      gsap.fromTo(
        children,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 75%" },
        }
      );

      // ── CTA button pulse
      gsap.to(btnRef.current, {
        boxShadow: "0 0 60px -10px rgba(100,255,218,0.6)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // ── Coral orb drift
      gsap.to(".contact-orb", {
        y: -30, x: 20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-40 px-6 overflow-hidden"
    >
      {/* Background coral orb */}
      <div
        className="contact-orb absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(241,90,36,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Horizontal scan line */}
      <div
        ref={bgLineRef}
        className="absolute top-1/2 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(90deg, transparent, rgba(100,255,218,0.1), transparent)" }}
      />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div ref={contentRef}>
          {/* Label */}
          <span className="font-mono text-xs text-[#64FFDA] tracking-widest uppercase block mb-6">
            04. Let&apos;s Build Something
          </span>

          {/* Headline */}
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] mb-6">
            Got a problem
            <br />
            worth solving?
          </h2>

          <p className="text-[#8A8A9A] text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            I&apos;m a 3rd-year IT student open to{" "}
            <span className="text-[#F0F0F5]">internships</span>,{" "}
            <span className="text-[#F0F0F5]">freelance projects</span>, and{" "}
            <span className="text-[#F0F0F5]">full-time roles </span> after graduation.
            If you have something in mind — let&apos;s talk.
          </p>

          {/* Primary CTA */}
          <a
            ref={btnRef}
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-text="Send Protocol"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-[#64FFDA] text-[#050508] font-bold text-lg rounded hover:bg-white transition-all duration-300 mb-12 glow-teal"
          >
            <Mail size={20} />
            <span className="relative overflow-hidden">
              Let&apos;s Talk
            </span>
            <ArrowUpRight size={18} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Divider */}
          <div className="flex items-center gap-6 mb-12 justify-center">
            <div className="h-px bg-white/10 flex-1 max-w-24" />
            <span className="font-mono text-xs text-[#4A4A5A] uppercase tracking-widest">or find me at</span>
            <div className="h-px bg-white/10 flex-1 max-w-24" />
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="GitHub"
              className="group flex items-center gap-2 px-6 py-3 border border-white/10 text-[#8A8A9A] text-sm rounded hover:border-[#64FFDA] hover:text-[#64FFDA] transition-all duration-300"
            >
              <GitHubIcon size={16} />
              GitHub
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="LinkedIn"
              className="group flex items-center gap-2 px-6 py-3 border border-white/10 text-[#8A8A9A] text-sm rounded hover:border-[#64FFDA] hover:text-[#64FFDA] transition-all duration-300"
            >
              <LinkedInIcon size={16} />
              LinkedIn
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://www.instagram.com/lain.zxc/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="Instagram"
              className="group flex items-center gap-2 px-6 py-3 border border-white/10 text-[#8A8A9A] text-sm rounded hover:border-[#64FFDA] hover:text-[#64FFDA] transition-all duration-300"
            >
              <InstagramIcon size={16} />
              Instagram
              <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Footer note */}
          <p className="mt-20 font-mono text-xs text-[#2A2A3A]">
            Designed & engineered by {SITE.name} · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
