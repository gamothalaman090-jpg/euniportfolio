"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current!;
    const text = textRef.current!;

    // Using quickSetter for better performance
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const txSet = gsap.quickSetter(text, "x", "px");
    const tySet = gsap.quickSetter(text, "y", "px");

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const speed = 0.15; // Lower = smoother/slower, Higher = snappier

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const updateCursor = () => {
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      xSet(pos.x);
      ySet(pos.y);
      txSet(pos.x + 20);
      tySet(pos.y + 20);
    };

    gsap.ticker.add(updateCursor);

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const cursorText = el.getAttribute("data-cursor-text");

      setIsPointer(true);
      gsap.to(cursor, { scale: 1.15, duration: 0.4, ease: "power2.out" });

      if (cursorText) {
        text.innerText = cursorText;
        gsap.to(text, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" });
      }
    };

    const onLeave = () => {
      setIsPointer(false);
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: "power2.out" });
      gsap.to(text, { opacity: 0, scale: 0.5, duration: 0.4, ease: "power2.in" });
    };

    window.addEventListener("mousemove", onMove);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(updateCursor);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] hidden md:block pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform w-8 h-8"
      >
        <img
          src={isPointer ? "/cursors/miku-pointer.png" : "/cursors/miku-cursor.png"}
          alt="Miku Cursor"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        ref={textRef}
        className="fixed top-0 left-0 z-[10001] hidden md:flex items-center justify-center font-mono text-[9px] font-bold text-[#64FFDA] tracking-widest uppercase opacity-0 pointer-events-none select-none bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-[#64FFDA]/30 will-change-transform"
      >
        View
      </div>
    </>
  );
}
