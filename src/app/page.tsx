"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Transformations from "@/components/Transformations";
import ApplicationWizard from "@/components/ApplicationWizard";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <Hero />
      <About />
      <Services onSelectService={setSelectedService} />
      <Transformations />
      <ApplicationWizard selectedService={selectedService} onClearSelectedService={() => setSelectedService(null)} />
      <FAQ />
      <Contact />
    </>
  );
}
