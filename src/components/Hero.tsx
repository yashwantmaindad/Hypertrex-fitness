"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

// Dynamically import HeroScene with SSR disabled to avoid SSR Three.js issues
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-primary-bg flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border border-accent-gold/20 border-t-accent-gold animate-spin" />
    </div>
  ),
});

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation constants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center bg-primary-bg overflow-hidden pt-20"
    >
      {/* Immersive Gym Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25 select-none">
        <Image
          src="/assets/gym_hero_bg.png"
          alt="Luxury Gym Atmosphere"
          fill
          className="object-cover object-center filter brightness-[0.5] contrast-[1.1]"
          priority
        />
      </div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <HeroScene />
      </div>

      {/* Overlay vignette to create depth and focus */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(8,8,8,0.6)_60%,#080808_100%)]" />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Headline and copy */}
        <motion.div
          className="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight md:leading-[1.1] mb-6 text-white"
          >
            Transform Your Body. <br />
            <span className="text-gold-gradient">Elevate Your Life.</span>
          </motion.h1>

          {/* Body Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-xl mb-8"
          >
            Transform your body, build confidence, and unlock your full potential with personalized coaching designed around your goals, lifestyle, and commitment. Every workout moves you closer to the strongest version of yourself.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo("#application")}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-accent-gold text-black rounded-full font-semibold text-sm tracking-wider hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-[1.03] shadow-lg shadow-accent-gold/10"
            >
              BOOK CONSULTATION
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
            <button
              onClick={() => handleScrollTo("#transformations")}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-semibold text-sm tracking-wider transition-all duration-500 transform hover:scale-[1.03]"
            >
              VIEW TRANSFORMATIONS
              <Play size={14} className="text-accent-gold fill-accent-gold" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer" onClick={() => handleScrollTo("#about")}>
        <span className="text-[10px] tracking-[0.3em] font-light text-gray-500 uppercase">Scroll to Discover</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-accent-gold to-transparent"
          animate={{ scaleY: [1, 0.4, 1], translateY: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </div>
    </section>
  );
}
