"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { 
  User, 
  Globe, 
  Flame, 
  TrendingUp, 
  Dumbbell, 
  Apple, 
  Compass,
  ArrowRight
} from "lucide-react";

// Service data structure
const servicesData = [
  {
    icon: Globe,
    title: "Elite Online Coaching",
    description: "The complete global physical optimization system. Access bespoke planning and daily updates no matter where you travel.",
    benefits: [
      "Customized Weekly Programming",
      "Cellular Nutrition & Supplementation Protocols",
      "Direct Coach Access via WhatsApp",
      "Comprehensive Weekly Biofeedback Audits"
    ]
  },
  {
    icon: User,
    title: "1-on-1 Personal Training",
    description: "Private, high-intensity biomechanical coaching at an exclusive private facility. Designed for rapid strength and form mastery.",
    benefits: [
      "Private Studio Sessions (Zero Crowds)",
      "Real-time Biomechanical Corrections",
      "Post-Workout Assisted Stretching",
      "In-Person Body Assessment Tracking"
    ]
  },
  {
    icon: Flame,
    title: "Targeted Fat Loss Protocol",
    description: "Scientifically structured routines designed to maximize lipolysis while completely preserving vital lean muscle mass.",
    benefits: [
      "Optimized Metabolic Conditioning",
      "Hormonal Balance & Stress Strategies",
      "Cardiovascular Optimization Guide",
      "Strategic Refeed & Cheat Meal Allocation"
    ]
  },
  {
    icon: TrendingUp,
    title: "Hypertrophy & Muscle Gain",
    description: "Designed for high-performance muscle architecture. Focused on progressive mechanical tension and optimal recovery profiles.",
    benefits: [
      "Volume-Displacement Programming",
      "Anabolic Threshold Management",
      "High-Tension Biomechanical Focus",
      "Targeted Hypertrophy Exercises"
    ]
  },
  {
    icon: Dumbbell,
    title: "Body Recomposition Blueprint",
    description: "The holy grail of body training. Simultanously burn visceral fat and construct lean muscle architecture.",
    benefits: [
      "Intricate Caloric Cycling Systems",
      "Dual Fat-Loss & Muscle-Build Focus",
      "Advanced Nutrient Timing Protocols",
      "Strength-Maintenance Routines"
    ]
  },
  {
    icon: Apple,
    title: "Premium Nutrition & Lifestyle",
    description: "Bespoke meal planning aligned to your professional schedule. Build sustainable cellular energy and focus.",
    benefits: [
      "Custom Macro & Micro Balancing",
      "Business Travel Dining Guides",
      "Sleep Architecture Optimization",
      "Circadian Rhythm Alignment Guidance"
    ]
  }
];

// Interactive 3D Tilt Card Component
function TiltCard({ service, index, onSelect }: { service: typeof servicesData[0]; index: number; onSelect?: (title: string) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const rotateX = useSpring(useTransformYToRotation(y), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransformXToRotation(x), { stiffness: 150, damping: 20 });

  function useTransformYToRotation(val: any) {
    const valTrans = useMotionValue(0);
    val.on("change", (latest: number) => {
      // Scale from height coordinates [-150, 150] to rotation range [10, -10]
      valTrans.set(-latest / 15);
    });
    return valTrans;
  }

  function useTransformXToRotation(val: any) {
    const valTrans = useMotionValue(0);
    val.on("change", (latest: number) => {
      // Scale from width coordinates [-150, 150] to rotation range [-10, 10]
      valTrans.set(latest / 15);
    });
    return valTrans;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleScrollToApp = () => {
    if (onSelect) {
      onSelect(service.title);
    }
    const appSection = document.querySelector("#application");
    if (appSection) {
      appSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const IconComponent = service.icon;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-panel rounded-2xl p-8 relative overflow-hidden group cursor-pointer border border-glass-border transition-all duration-300 hover:border-accent-gold/30 hover:bg-white/[0.04]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Background Radial Light Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle bottom line gold indicator */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-gold transition-all duration-500 group-hover:w-full" />

      {/* Card Content inside preserve-3d */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Icon Box */}
          <div className="inline-flex p-3.5 rounded-xl bg-white/5 border border-glass-border text-accent-gold mb-6 group-hover:bg-accent-gold group-hover:text-black transition-all duration-500">
            <IconComponent size={24} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold tracking-wide text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 font-light leading-relaxed mb-6">
            {service.description}
          </p>

          {/* Bullet Points */}
          <ul className="space-y-3 mb-8">
            {service.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-gray-500 font-light">
                <span className="h-1 w-1 rounded-full bg-accent-gold mt-1.5 shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Link */}
        <button
          onClick={handleScrollToApp}
          className="flex items-center gap-2 text-xs font-bold tracking-widest text-accent-gold hover:text-white transition-colors duration-300 mt-auto"
        >
          APPLY PROTOCOL
          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Services({ onSelectService }: { onSelectService?: (title: string) => void }) {
  return (
    <section id="services" className="py-24 md:py-32 bg-primary-bg relative overflow-hidden border-t border-glass-border">
      {/* Ambient background gold glows */}
      <div className="absolute right-10 top-1/4 w-96 h-96 rounded-full bg-accent-gold/3 blur-[140px] pointer-events-none" />
      <div className="absolute left-10 bottom-1/4 w-96 h-96 rounded-full bg-accent-gold/4 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-accent-gold uppercase mb-3">
            Bespoke Services
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            THE COACHING PROTOCOLS
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold" />
          <p className="text-gray-400 font-light max-w-xl text-sm leading-relaxed mt-6">
            High-caliber methodologies structured specifically to sculpt elite physiques, optimize metabolism, and establish metabolic longevity.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <TiltCard key={index} service={service} index={index} onSelect={onSelectService} />
          ))}
        </div>
      </div>
    </section>
  );
}
