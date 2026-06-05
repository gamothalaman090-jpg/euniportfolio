"use client";

import { useState, useEffect } from "react";
import Navbar       from "@/components/layout/Navbar";
import Hero          from "@/components/sections/Hero";
import ScrollCanvas  from "@/components/canvas/ScrollCanvas";
import Work          from "@/components/sections/Work";
import About         from "@/components/sections/About";
import Contact       from "@/components/sections/Contact";
import CustomCursor  from "@/components/ui/CustomCursor";
import SideElements  from "@/components/ui/SideElements";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll while loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <>
      {/* ── Entrance Loading Sequence */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* ── Custom magnetic cursor (desktop only) */}
      <CustomCursor />

      {/* ── Fixed side strips (social left, email right) */}
      <SideElements />

      {/* ── Fixed navigation */}
      <Navbar />

      <main className="bg-[#050508] text-[#F0F0F5] min-h-screen">
        {/* Beat A — The Hook */}
        <Hero />

        {/* Beat B — The GSAP Scroll Canvas */}
        <ScrollCanvas />

        {/* Beat C — Impact Work */}
        <Work />

        {/* Beat D — Who I Am */}
        <About />

        {/* Beat E — The Signal */}
        <Contact />
      </main>
    </>
  );
}
