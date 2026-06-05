"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SITE } from "@/lib/constants";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/BrandIcons";

export default function SideElements() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slide in from edges after page load
    gsap.fromTo(
      leftRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
    );
    gsap.fromTo(
      rightRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.2 }
    );
  }, []);

  return (
    <>
      {/* ── Left strip — social icons */}
      <div
        ref={leftRef}
        className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-5"
      >
        <a
          href={SITE.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          data-cursor-text="GitHub"
          className="text-[#4A4A5A] hover:text-[#64FFDA] hover:-translate-y-1 transition-all duration-300"
        >
          <GitHubIcon size={19} />
        </a>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-cursor-text="LinkedIn"
          className="text-[#4A4A5A] hover:text-[#64FFDA] hover:-translate-y-1 transition-all duration-300"
        >
          <LinkedInIcon size={19} />
        </a>

        <a
          href="https://www.instagram.com/lain.zxc/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          data-cursor-text="Instagram"
          className="text-[#4A4A5A] hover:text-[#64FFDA] hover:-translate-y-1 transition-all duration-300"
        >
          <InstagramIcon size={19} />
        </a>

        {/* vertical line */}
        <div className="w-px h-24 bg-gradient-to-b from-[#4A4A5A] to-transparent" />
      </div>

      {/* ── Right strip — rotated email */}
      <div
        ref={rightRef}
        className="fixed right-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-5"
      >
        <a
          href={`mailto:${SITE.email}`}
          data-cursor-text="Email Me"
          aria-label={`Send an email to ${SITE.name}`}
          className="font-mono text-xs text-[#4A4A5A] tracking-widest hover:text-[#64FFDA] hover:-translate-y-1 transition-all duration-300 select-none"
          style={{ writingMode: "vertical-rl" }}
        >
          {SITE.email}
        </a>

        {/* vertical line */}
        <div className="w-px h-24 bg-gradient-to-b from-[#4A4A5A] to-transparent" />
      </div>
    </>
  );
}
