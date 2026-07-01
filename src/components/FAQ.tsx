"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does online coaching work?",
    answer: "Online coaching is our most comprehensive optimization system. We start with your detailed physical, biomechanical, and medical assessment. Marcus then constructs your bespoke training, supplement, and nutrition blueprint. Every week, you complete a comprehensive biofeedback audit, and we make precise structural adjustments. You have 24/7 direct communication with Marcus via WhatsApp for support and alignment."
  },
  {
    question: "Do I get a nutrition plan?",
    answer: "Yes, but not a generic meal template. We construct a dynamic cellular nutrition framework that outlines exact macronutrient profiles, nutrient timing schedules, and specific supplemental selections based on your blood work, energy cycles, and professional schedule. We also provide business travel dining guides for dining at premium restaurants."
  },
  {
    question: "Can beginners join?",
    answer: "Absolutely. In fact, beginning your journey with elite instruction ensures you construct flawless biomechanical habits, avoid injuries, and build a highly responsive metabolic foundation from day one. The protocol is adapted to your starting level."
  },
  {
    question: "How soon will I see results?",
    answer: "Initial cognitive and energy enhancements are typically reported within the first 7-10 days of alignment. Observable physique changes, vascularity shifts, and body fat reduction are visible by week 3 or 4. By week 12, a significant and dramatic body recomposition is fully established."
  },
  {
    question: "How many workouts per week?",
    answer: "We design the program around your professional schedule and current physical capacity. Typically, clients train between 3 to 5 times per week. The sessions are engineered to be highly time-efficient, maximizing muscle stimulation and minimizing wasted recovery time."
  },
  {
    question: "Can I train from home?",
    answer: "Yes. We can design your programming for fully equipped commercial training labs, private fitness suites, or home gyms. We adapt your biomechanical plans to match the exact equipment available to you."
  },
  {
    question: "How are progress check-ins done?",
    answer: "Check-ins are conducted weekly through a private portal. You will submit key metrics (weight trends, sleep charts, digestion indicators, recovery states, stress levels, and form review videos). Marcus audits this biofeedback and responds with video/voice feedback detailing any programming adjustments."
  },
  {
    question: "How do I get started?",
    answer: "The first step is completing our multi-step application wizard above. If your application matches our criteria for dedication and alignment, we will contact you to book a free 30-minute diagnostic consultation where we review your objectives and map out your initial protocol."
  }
];

function FAQAccordionItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-glass-border py-5">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-2 text-white hover:text-accent-gold transition-colors duration-300 focus:outline-none group"
      >
        <span className="text-base md:text-lg font-semibold tracking-wide">{item.question}</span>
        <div className="p-2 rounded-lg bg-white/5 border border-glass-border text-gray-400 group-hover:text-accent-gold transition-all duration-300">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed pt-3 pb-2 pr-6">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-secondary-bg relative overflow-hidden border-t border-glass-border">
      {/* Background glow */}
      <div className="absolute right-[-200px] top-[20%] w-[450px] h-[450px] rounded-full bg-accent-gold/3 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] text-accent-gold uppercase mb-3">
            Questions
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
