"use client";

import React from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/site";

// Inline SVG components for social brand icons to ensure build stability
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0 -5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9" fill="currentColor" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialIcons: Record<string, React.ComponentType<any>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
};

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter out socials that are empty strings
  const activeSocials = Object.entries(siteConfig.socials).filter(
    ([_, url]) => url !== ""
  );

  return (
    <footer className="bg-primary-bg border-t border-glass-border pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-2 space-y-6">
            <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2 group">
              <Image
                src="/assets/logo.png"
                alt="Hypertrex Fitness Logo"
                width={38}
                height={38}
                className="object-contain mix-blend-screen transition-transform duration-500 group-hover:scale-105"
              />
              <span className="text-xl font-bold tracking-[0.1em] text-white group-hover:text-accent-gold transition-colors flex items-baseline gap-1.5">
                HYPERTREX<span className="text-accent-gold font-medium text-xs tracking-widest uppercase">FITNESS</span>
              </span>
            </a>
            <p className="text-xs text-gray-500 font-light max-w-sm leading-relaxed">
              Bespoke physical optimization frameworks for high-achievers. We combine advanced biomechanical planning, data-driven supplementation, and custom metabolic structures to sculpt elite conditioning.
            </p>

            {/* Dynamic Social Icons */}
            {activeSocials.length > 0 && (
              <div className="flex gap-4">
                {activeSocials.map(([key, url]) => {
                  const Icon = socialIcons[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white/5 border border-glass-border text-gray-400 hover:text-accent-gold hover:border-accent-gold/40 transition-all duration-300"
                      aria-label={`Follow us on ${key}`}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">NAVIGATION</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Transformations", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                    className="text-xs text-gray-500 hover:text-accent-gold transition-colors duration-300 font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-white uppercase">PROTOCOLS</h4>
            <ul className="space-y-2 text-xs text-gray-500 font-light">
              <li>Online High Performance</li>
              <li>1-on-1 VIP Biomechanics</li>
              <li>Visceral Fat Reduction</li>
              <li>Progressive Hypertrophy</li>
              <li>Recomposition & Macro Styling</li>
            </ul>
          </div>

        </div>

        {/* Bottom Details Block */}
        <div className="border-t border-glass-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-[10px] text-gray-500 font-light tracking-wide order-2 sm:order-1">
            <span>&copy; {new Date().getFullYear()} Hypertrex Fitness. All Rights Reserved.</span>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-glass-border text-[10px] font-bold tracking-widest text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300 order-1 sm:order-2"
          >
            BACK TO TOP
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}
