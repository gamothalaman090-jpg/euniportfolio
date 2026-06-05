"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollCanvas — GSAP ScrollTrigger-driven image-sequence engine.
 *
 * Place 120 WebP frames at /public/sequence/frame_001.webp … frame_120.webp
 * The canvas will scrub through them as the user scrolls the pinned section.
 *
 * While no real frames are present, a stylised animated placeholder is shown.
 */

const FRAME_COUNT  = 120;
const FRAME_FORMAT = (i: number) =>
  `/sequence/frame_${String(i).padStart(3, "0")}.webp`;

export default function ScrollCanvas() {
  const wrapperRef   = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const framesLoaded = useRef(0);
  const images       = useRef<HTMLImageElement[]>([]);
  const frameObj     = useRef({ frame: 0 });

  // ── Draw a frame (or placeholder)
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const img = images.current[index];
    if (img?.complete && img.naturalWidth > 0) {
      // Draw real frame
      const ratio = Math.min(
        canvas.offsetWidth  / img.naturalWidth,
        canvas.offsetHeight / img.naturalHeight
      );
      const w = img.naturalWidth  * ratio;
      const h = img.naturalHeight * ratio;
      const x = (canvas.offsetWidth  - w) / 2;
      const y = (canvas.offsetHeight - h) / 2;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.drawImage(img, x, y, w, h);
    } else {
      // ── Placeholder: animated gradient rings
      const cx = canvas.offsetWidth  / 2;
      const cy = canvas.offsetHeight / 2;
      const progress = index / (FRAME_COUNT - 1);

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw concentric rings that rotate as scroll progresses
      for (let ring = 0; ring < 5; ring++) {
        const r     = 60 + ring * 50 + progress * 40;
        const alpha = 0.06 + (5 - ring) * 0.02;
        const angle = progress * Math.PI * 4 + ring * 0.4;

        const grad = ctx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r);
        grad.addColorStop(0, `rgba(100, 255, 218, ${alpha * 2})`);
        grad.addColorStop(1, "rgba(100, 255, 218, 0)");

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 255, 218, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }


    }
  };

  useEffect(() => {
    // ── Pre-load images (graceful — won't block if 404)
    images.current = Array.from({ length: FRAME_COUNT }, (_, i) => {
      const img = new Image();
      img.src = FRAME_FORMAT(i + 1);
      img.onload = () => {
        framesLoaded.current += 1;
      };
      return img;
    });

    drawFrame(0);

    const ctx = gsap.context(() => {
      // ── Pin the wrapper and scrub through frames
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: `+=${window.innerHeight * 4}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const frame = Math.min(
            Math.round(self.progress * (FRAME_COUNT - 1)),
            FRAME_COUNT - 1
          );
          if (frame !== frameObj.current.frame) {
            frameObj.current.frame = frame;
            drawFrame(frame);
          }
        },
      });

      // ── Overlay text reveals tied to scroll progress
      const labels = overlayRef.current?.querySelectorAll(".canvas-label");
      if (labels) {
        labels.forEach((label, i) => {
          const startProgress = i / labels.length;
          const endProgress   = (i + 1) / labels.length;

          ScrollTrigger.create({
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${window.innerHeight * 4}`,
            scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (p >= startProgress && p < endProgress) {
                gsap.to(label, { opacity: 1, y: 0, duration: 0.3 });
              } else {
                gsap.to(label, { opacity: 0, y: 20, duration: 0.3 });
              }
            },
          });
        });
      }
    }, wrapperRef);

    const onResize = () => drawFrame(frameObj.current.frame);
    window.addEventListener("resize", onResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-screen bg-[#050508]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label="Scroll-linked animation canvas"
      />

      {/* Overlay labels tied to scroll phases */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none"
      >
        {[
          { text: "Architecting the foundation…", sub: "Backend · Systems Design" },
          { text: "Assembling the interface…",    sub: "React · Tailwind · GSAP" },
          { text: "Shipping to production.",       sub: "Docker · Vercel · CI/CD" },
        ].map((item, i) => (
          <div
            key={i}
            className="canvas-label absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 translate-y-5"
          >
            <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-bold text-white mb-3">
              {item.text}
            </h3>
            <span className="font-mono text-xs text-[#64FFDA] tracking-widest uppercase">
              {item.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Corner decoration */}
      <div className="absolute top-6 right-6 font-mono text-xs text-[#2A2A3A] tracking-widest">
        SCROLL ↓
      </div>
    </div>
  );
}
