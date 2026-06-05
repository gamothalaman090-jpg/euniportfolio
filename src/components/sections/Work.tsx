"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/lib/constants";
import Image from "next/image";

import { useState } from "react";
import ProjectModal from "@/components/ui/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Grid items entrance
      const items = gridRef.current?.querySelectorAll(".grid-item");
      if (items) {
        gsap.fromTo(
          items,
          { y: 60, opacity: 0, scale: 0.95, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="work" className="py-32 px-6 bg-[#050508]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="font-mono text-xs text-[#64FFDA] tracking-[0.3em] uppercase block mb-4">
              02. Selected Work
            </span>
          </div>

          {/* Bento Grid */}
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-6 auto-rows-auto"
          >
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className={`grid-item flex flex-col gap-4 ${project.span}`}
              >
                {/* Image Container */}
                <div 
                  className="relative group overflow-hidden bg-[#0D0D12] rounded-sm cursor-none flex-1"
                  data-cursor-text={project.cursorText}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className={`relative w-full overflow-hidden ${project.span.includes('row-span-2') ? 'h-full min-h-[400px]' : 'aspect-[4/3]'}`}>
                    {/* Hover Overlays */}
                    <div className="absolute inset-0 bg-[#050508]/60 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Centered Content Reveal */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
                      <h3 className="text-white text-3xl md:text-4xl font-bold mb-2 tracking-tighter">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] text-[#64FFDA] tracking-[0.4em] uppercase bg-[#050508]/80 backdrop-blur-md px-6 py-3 border border-[#64FFDA]/20">
                        {project.category}
                      </span>
                    </div>
                    
                    {/* Real Image */}
                    <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-1000 ease-out relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#F0F0F5] font-bold text-lg tracking-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-[10px] text-[#4A4A5A] tracking-[0.2em] uppercase">
                    {project.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
