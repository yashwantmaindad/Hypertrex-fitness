"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Award, Target, Eye, Calendar, Trophy, ShieldCheck } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = "", duration = 2 }: CounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: duration, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, count, value, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}



export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-secondary-bg relative overflow-hidden border-t border-glass-border">
      {/* Background glow elements */}
      <div className="absolute -left-60 top-1/3 w-96 h-96 rounded-full bg-accent-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-60 bottom-1/4 w-96 h-96 rounded-full bg-accent-gold/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-accent-gold uppercase mb-3">
            The Mastermind
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            MEET COACH YASHWANT
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold" />
        </div>

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Side: Coach Portrait with luxury framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Outer Golden Border Offset */}
              <div className="absolute inset-0 border border-accent-gold/30 rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              
              {/* Image Box */}
              <div className="relative z-10 aspect-[3/4] w-full rounded-2xl overflow-hidden bg-primary-bg border border-glass-border">
                <Image
                  src="/assets/coach.jpg"
                  alt="Coach Portrait"
                  fill
                  className="object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  sizes="(max-width: 768px) 100vw, 380px"
                  priority
                />
                
                {/* Gold Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent opacity-85" />
                
                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs font-bold tracking-widest text-accent-gold uppercase">
                    Founder & Head Coach
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-wide mt-1">
                    Yashwant Maindad
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Philosophy, Stats, Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Bio and Mission */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-wide text-white">
                Bespoke Performance, <span className="text-accent-gold">Zero Compromise.</span>
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                With over a decade of high-performance physical training, my mission is to guide high-achievers to unlock their absolute peak physical potential. I do not deal in quick fixes or cookie-cutter templates. We build custom biomechanical, nutritional, and lifestyle structures that sustain top-tier conditioning for life.
              </p>
              
              {/* Mission & Vision Mini Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-white/5 border border-glass-border text-accent-gold">
                    <Target size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm tracking-wider">OUR MISSION</h4>
                    <p className="text-xs text-gray-500 font-light mt-1">To construct highly sustainable, elite physiques that reflect the success and discipline of our clients.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-lg bg-white/5 border border-glass-border text-accent-gold">
                    <Eye size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm tracking-wider">OUR VISION</h4>
                    <p className="text-xs text-gray-500 font-light mt-1">Creating a global, exclusive digital health and physical optimization system for high-net-worth performers.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Counter Block */}
            <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-glass-border">
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-accent-gold">
                  <Counter value={500} suffix="+" />
                </span>
                <span className="text-[10px] tracking-widest text-gray-500 uppercase mt-2">Clients Coached</span>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-accent-gold">
                  <Counter value={15} suffix="+" />
                </span>
                <span className="text-[10px] tracking-widest text-gray-500 uppercase mt-2">Years Experience</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <span className="text-3xl md:text-4xl font-extrabold text-accent-gold">
                  <Counter value={5} suffix="★" />
                </span>
                <span className="text-[10px] tracking-widest text-gray-500 uppercase mt-2">Average Rating</span>
              </div>
            </div>



          </div>

        </div>
      </div>
    </section>
  );
}
