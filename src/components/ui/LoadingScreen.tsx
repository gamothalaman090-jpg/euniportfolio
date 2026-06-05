"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LogoIcon from "@/components/ui/LogoIcon";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // Hold the logo for a moment, then slide screen up
    tl.to(screenRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 2.5,
    });
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050508]"
    >
      <div className="relative">
        <LogoIcon size={80} animate={true} />
        
        {/* Optional subtle percentage loader */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#64FFDA] tracking-[0.2em] uppercase opacity-50">
          Initializing Systems
        </div>
      </div>
    </div>
  );
}
