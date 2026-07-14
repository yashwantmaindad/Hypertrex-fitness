"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

const CLIENTS = [
  {
    name: "Alexander P.",
    role: "Founder & Tech CEO",
    protocol: "Executive Protocol",
    duration: "16 Weeks",
    weightChange: "15.3 kg",
    muscleChange: "+2.8 kg",
    testimonial: "The structure Marcus built fits perfectly into my insane business travel schedule. I lost 15kg of fat, gained significant strength across all lifts, and my cognitive focus has never been this consistent. It is a game changer for high-stress executives.",
    beforeImage: "/assets/trans_before.jpg",
    afterImage: "/assets/trans_after.png"
  },
  {
    name: "Rohan K.",
    role: "Software Architect",
    protocol: "Hypertrophy & Shred Protocol",
    duration: "12 Weeks",
    weightChange: "12.5 kg",
    muscleChange: "+3.2 kg",
    testimonial: "I was skeptical about achieving this level of conditioning in just 12 weeks, but the custom nutritional blueprint and training split were spot on. The coaching guidance helped me break through plateaus I'd been stuck on for years.",
    beforeImage: "/assets/trans_before_2.jpg",
    afterImage: "/assets/trans_after_2.jpg"
  }
];

export default function Transformations() {
  const [activeClientIndex, setActiveClientIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentClient = CLIENTS[activeClientIndex];

  const nextClient = () => {
    setActiveClientIndex((prev) => (prev + 1) % CLIENTS.length);
    setSliderPosition(50);
  };

  const prevClient = () => {
    setActiveClientIndex((prev) => (prev - 1 + CLIENTS.length) % CLIENTS.length);
    setSliderPosition(50);
  };

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <section id="transformations" className="py-24 md:py-32 bg-secondary-bg relative overflow-hidden border-t border-glass-border">
      {/* Background radial effects */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/4 w-[500px] h-[500px] rounded-full bg-accent-gold/3 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-accent-gold uppercase mb-3">
            Real Proof
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            CLIENT TRANSFORMATIONS
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold" />
          <p className="text-gray-400 font-light max-w-xl text-sm leading-relaxed mt-6">
            Explore interactive results from high-achievers who executed the protocol and built their ultimate physique.
          </p>
        </div>

        {/* Transformation Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Interactive Before/After Drag Slider (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Image Slider Wrapper */}
            <div 
              ref={containerRef}
              className="relative w-full aspect-[4/5] md:aspect-[4/5] max-w-lg rounded-2xl overflow-hidden select-none border border-glass-border shadow-2xl cursor-ew-resize group"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              {/* Client Change Arrows */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevClient();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#080808]/85 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
                aria-label="Previous client"
              >
                <ChevronLeft size={24} />
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextClient();
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#080808]/85 border border-accent-gold/40 text-accent-gold hover:bg-accent-gold hover:text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 backdrop-blur-md cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
                aria-label="Next client"
              >
                <ChevronRight size={24} />
              </button>

              {/* AFTER Image (Background Base) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClientIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={currentClient.afterImage} 
                    alt="After Transformation" 
                    fill 
                    className="object-cover object-center pointer-events-none"
                    sizes="(max-width: 768px) 100vw, 512px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* After Tag */}
              <div className="absolute bottom-6 right-6 z-10 px-4 py-1.5 rounded-md bg-[#080808]/70 border border-glass-border backdrop-blur-md">
                <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">AFTER</span>
              </div>

              {/* BEFORE Image (Clipped Overlay) */}
              <div 
                className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeClientIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image 
                      src={currentClient.beforeImage} 
                      alt="Before Transformation" 
                      fill 
                      className="object-cover object-center pointer-events-none scale-100"
                      sizes="(max-width: 768px) 100vw, 512px"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Before Tag */}
                <div className="absolute bottom-6 left-6 px-4 py-1.5 rounded-md bg-[#080808]/70 border border-glass-border backdrop-blur-md">
                  <span className="text-xs font-bold tracking-widest text-white uppercase">BEFORE</span>
                </div>
              </div>

              {/* Slider Line Divider */}
              <div 
                className="absolute top-0 bottom-0 z-20 w-[2px] bg-accent-gold pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Gold Circle Drag handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#080808]/90 border-2 border-accent-gold flex items-center justify-center text-accent-gold shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                  <ArrowLeftRight size={18} />
                </div>
              </div>
            </div>

            {/* Slider Instructions & Indicators */}
            <div className="flex flex-col items-center gap-3 mt-6">
              <div className="flex items-center gap-2 text-gray-500 text-xs tracking-wider">
                <ChevronLeft size={16} />
                <span>Drag slider left and right to compare</span>
                <ChevronRight size={16} />
              </div>
              
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {CLIENTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveClientIndex(index);
                      setSliderPosition(50);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeClientIndex ? "w-6 bg-accent-gold" : "w-1.5 bg-white/20"
                    }`}
                    aria-label={`Go to client ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right: Client Details & Testimonial (5 Columns) */}
          <div className="lg:col-span-5 min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeClientIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Meta Tags */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-glass-border text-xs text-accent-gold font-semibold uppercase tracking-widest">
                    <Scale size={12} />
                    {currentClient.protocol}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                    {currentClient.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-light italic">
                    {currentClient.role}
                  </p>
                </div>

                {/* Transformation Metrics */}
                <div className="grid grid-cols-3 gap-4 border-y border-glass-border py-6">
                  <div>
                    <span className="text-xs text-gray-500 font-light tracking-wider uppercase block">Duration</span>
                    <span className="text-lg font-bold text-white tracking-wide mt-1 block">{currentClient.duration}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-light tracking-wider uppercase block">Weight Lost</span>
                    <span className="text-lg font-bold text-accent-gold tracking-wide mt-1 block">{currentClient.weightChange}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-light tracking-wider uppercase block">Muscle Gained</span>
                    <span className="text-lg font-bold text-white tracking-wide mt-1 block">{currentClient.muscleChange}</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="space-y-4 relative">
                  {/* Styled quote marks */}
                  <span className="absolute -left-4 -top-6 text-7xl font-serif text-accent-gold/15 select-none">&ldquo;</span>
                  <p className="text-gray-400 font-light leading-relaxed relative z-10">
                    {currentClient.testimonial}
                  </p>
                </div>

                {/* CTA to Apply */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const appSection = document.querySelector("#application");
                      if (appSection) {
                        appSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-6 py-3.5 rounded-xl bg-accent-gold/10 hover:bg-accent-gold border border-accent-gold/30 hover:border-transparent text-xs font-bold tracking-widest text-accent-gold hover:text-black transition-all duration-500"
                  >
                    APPLY FOR YOUR TRANSFORMATION
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
