"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Transformations", href: "#transformations" },
  { name: "Application", href: "#application" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 backdrop-blur-md bg-primary-bg/70 border-b border-glass-border"
            : "py-6 bg-transparent border-b border-transparent"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/assets/logo.png"
              alt="Hypertrex Fitness Logo"
              width={38}
              height={38}
              className="object-contain mix-blend-screen transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <span className="text-xl font-bold tracking-[0.1em] text-white group-hover:text-accent-gold transition-colors duration-300 flex items-baseline gap-1.5">
              HYPERTREX<span className="text-accent-gold font-medium text-xs tracking-widest uppercase">FITNESS</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium tracking-wider text-gray-400 hover:text-white transition-colors duration-300 relative py-1 group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#application"
              onClick={(e) => handleNavClick(e, "#application")}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent-gold/40 text-xs font-semibold tracking-widest text-accent-gold hover:text-black hover:bg-accent-gold transition-all duration-500 transform hover:scale-105"
            >
              BOOK CONSULTATION
              <ArrowRight size={14} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-accent-gold transition-colors md:hidden focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-primary-bg/98 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
          >
            {/* Animated Menu Grid */}
            <div className="flex flex-col gap-6 my-auto pt-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-3xl font-light tracking-widest text-white hover:text-accent-gold transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <span className="text-accent-gold/30 text-lg mr-4">0{index + 1}</span>
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Footer Details */}
            <motion.div
              className="pb-12 border-t border-glass-border pt-6 flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href="#application"
                onClick={(e) => handleNavClick(e, "#application")}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-accent-gold text-black text-sm font-semibold tracking-widest hover:bg-white hover:text-black transition-colors"
              >
                APPLY FOR COACHING
                <ArrowRight size={16} />
              </a>
              <div className="text-center text-xs text-gray-500 tracking-wider">
                {siteConfig.contact.email}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
