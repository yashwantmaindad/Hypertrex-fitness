"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate elite submission behavior
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });

      // Clear success notification after 5s
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-primary-bg relative overflow-hidden border-t border-glass-border">
      {/* Background visual detail */}
      <div className="absolute left-[-150px] top-[30%] w-[350px] h-[350px] rounded-full bg-accent-gold/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="text-xs font-bold tracking-[0.3em] text-accent-gold uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            DIAGNOSTIC ENQUIRIES
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold" />
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Premium Contact Details Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl glass-panel relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute -right-20 -bottom-20 w-48 h-48 rounded-full bg-accent-gold/5 blur-3xl" />
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold tracking-wider text-white">HYPERTREX HEADQUARTERS</h3>
                <p className="text-xs text-gray-500 font-light mt-2 leading-relaxed">
                  For private training bookings, press enquiries, or direct coaching alignment.
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-6">
                {siteConfig.contact.email && (
                  <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-lg bg-white/5 border border-glass-border text-accent-gold">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase block">Email Address</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-sm font-semibold text-white hover:text-accent-gold transition-colors">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contact.phone && (
                  <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-lg bg-white/5 border border-glass-border text-accent-gold">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase block">Phone Number</span>
                      <a href={`tel:${siteConfig.contact.phone}`} className="text-sm font-semibold text-white hover:text-accent-gold transition-colors">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {siteConfig.contact.address && (
                  <div className="flex gap-4 items-center">
                    <div className="p-3 rounded-lg bg-white/5 border border-glass-border text-accent-gold">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase block">Location</span>
                      <span className="text-sm font-semibold text-white">
                        {siteConfig.contact.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom details */}
            <div className="border-t border-glass-border pt-6 mt-8">
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase block">ESTABLISHED</span>
              <p className="text-xs text-gray-400 font-light mt-1">
                Hypertrex Fitness Physical Optimization System © 2026.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-8 md:p-10 border border-glass-border relative">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 premium-input text-sm"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 premium-input text-sm"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 premium-input text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 premium-input text-sm"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 premium-input text-sm"
                  placeholder="Write your diagnostic inquiry details here..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-between pt-4">
                <span className="text-[10px] text-gray-500 font-medium">
                  * Required fields must be completed.
                </span>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-bold tracking-widest transition-all duration-500 ${
                    isSuccess
                      ? "bg-green-600 text-white"
                      : "bg-white text-black hover:bg-accent-gold"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="h-4 w-4 border border-black border-t-transparent rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>
                      MESSAGE SENT
                      <Check size={14} />
                    </>
                  ) : (
                    <>
                      SEND ENQUIRY
                      <Send size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
