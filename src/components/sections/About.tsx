"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILL_GROUPS, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const SKILL_LEVELS: Record<string, number> = {
  // Frontend
  JavaScript: 88, TypeScript: 82, React: 85, HTML5: 92, CSS3: 90,
  "Tailwind CSS": 88, Bootstrap: 80, "Three.js": 70, Flutter: 68,
  // Backend
  Python: 75, Java: 72, "Express.js": 78, MySQL: 78, MongoDB: 74,
  // Tools
  Git: 85, GitHub: 85, "Android Studio": 70, Vercel: 80, Dart: 65,
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const bioRef     = useRef<HTMLDivElement>(null);
  const skillsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Header reveal
      gsap.fromTo(
        headerRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 80%" },
        }
      );

      // ── Bio panel
      gsap.fromTo(
        bioRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: bioRef.current, start: "top 78%" },
        }
      );

      // ── Skill bars animate width from 0
      const bars = sectionRef.current?.querySelectorAll(".skill-bar-fill");
      if (bars) {
        bars.forEach((bar) => {
          const target = (bar as HTMLElement).dataset.width ?? "0";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: `${target}%`,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: bar, start: "top 85%" },
            }
          );
        });
      }

      // ── Skill group cards stagger
      const groups = skillsRef.current?.querySelectorAll(".skill-group");
      if (groups) {
        gsap.fromTo(
          groups,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: skillsRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-20">
          <span className="font-mono text-xs text-[#64FFDA] tracking-widest uppercase block mb-4">
            03. About
          </span>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-tight">
            Student by status.
            <br />
            <span className="text-[#8A8A9A]">Developer by practice.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ── Bio panel */}
          <div ref={bioRef} className="space-y-6">
            <div className="glass-card p-8 space-y-5">
              <p className="text-[#8A8A9A] leading-relaxed">
                I&apos;m <span className="text-[#F0F0F5]">Eunich John Sese</span>, a 3rd-year{" "}
                <span className="text-[#64FFDA]">BS Information Technology</span> student at{" "}
                <span className="text-[#F0F0F5]">National University – Manila</span>, specializing
                in Mobile and Web Applications.
              </p>
              <p className="text-[#8A8A9A] leading-relaxed">
                I work across the full web stack — building{" "}
                <span className="text-[#F0F0F5]">responsive frontends</span> with React and
                TypeScript, and wiring them up to{" "}
                <span className="text-[#F0F0F5]">backend APIs</span> with Node.js, Python, and
                Java. My projects are always deployed and live, not just local demos.
              </p>
              <p className="text-[#8A8A9A] leading-relaxed">
                I&apos;m actively looking for internship and freelance opportunities where I can
                contribute real work, grow fast, and build things people actually use.
              </p>

              {/* Terminal-style facts */}
              <div className="pt-4 border-t border-white/5 space-y-2">
                {[
                  ["School",    "National University – Manila"],
                  ["Program",   "BS IT – Mobile & Web Applications"],
                  ["Year",      "3rd Year · Graduating 2028"],
                  ["Based in",  SITE.location],
                  ["Open to",   "Internship · Freelance · Full-time"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3 font-mono text-sm">
                    <span className="text-[#64FFDA] opacity-60 w-28 flex-shrink-0">{k}</span>
                    <span className="text-[#8A8A9A]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Skills panel */}
          <div ref={skillsRef} className="space-y-6">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className="skill-group glass-card p-6">
                <h3 className="font-mono text-xs text-[#64FFDA] tracking-widest uppercase mb-5">
                  {group.label}
                </h3>
                <div className="space-y-4">
                  {group.skills.map((skill) => {
                    const level = SKILL_LEVELS[skill] ?? 70;
                    return (
                      <div key={skill}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-[#F0F0F5]">{skill}</span>
                          <span className="font-mono text-xs text-[#4A4A5A]">{level}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="skill-bar-fill h-full rounded-full"
                            data-width={level}
                            style={{
                              width: "0%",
                              background:
                                "linear-gradient(90deg, #64FFDA, #00C4A7)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
