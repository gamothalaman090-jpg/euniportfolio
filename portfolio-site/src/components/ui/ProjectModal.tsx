"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { X, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import Image from "next/image";

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "block"
      })
        .fromTo(contentRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = "auto";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        display: "none"
      });
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] hidden bg-[#050508]/90 backdrop-blur-sm opacity-0 px-4 py-8 md:p-12 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto bg-[#0D0D12] border border-white/5 rounded-sm overflow-hidden pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative aspect-video w-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 z-20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-16">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <span className="font-mono text-xs text-[#64FFDA] tracking-[0.3em] uppercase block mb-4">
                Project Detail
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {project.title}
              </h2>
              <p className="text-[#8A8A9A] text-lg leading-relaxed mb-8 max-w-2xl">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-12">
                {project.tech?.map((t: string) => (
                  <span key={t} className="px-4 py-2 bg-white/5 border border-white/5 rounded-sm font-mono text-[10px] text-[#64FFDA]">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-[#64FFDA] text-[#050508] font-bold rounded-sm hover:bg-white transition-all duration-300"
                  >
                    <ExternalLink size={18} />
                    Live Preview
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 bg-white/5 text-white border border-white/10 font-bold rounded-sm hover:bg-white/10 transition-all duration-300"
                  >
                    <GitHubIcon size={18} />
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="space-y-8">
                <div>
                  <h4 className="font-mono text-[10px] text-[#4A4A5A] tracking-widest uppercase mb-2">Category</h4>
                  <p className="text-white font-medium">{project.category}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-[#4A4A5A] tracking-widest uppercase mb-2">Role</h4>
                  <p className="text-white font-medium">{project.role || "Lead Developer / Designer"}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] text-[#4A4A5A] tracking-widest uppercase mb-2">Timeline</h4>
                  <p className="text-white font-medium">2026 — 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
