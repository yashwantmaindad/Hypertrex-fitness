"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Edit2, Shield, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

// Form Validation Schema using Zod
const formSchema = z.object({
  // Step 1: Personal Details
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Invalid phone number"),
  whatsapp: z.string().min(6, "Invalid WhatsApp number"),
  instagram: z.string().min(2, "Invalid Instagram username"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender selection is required"),
  weight: z.string().min(1, "Weight is required"),
  height: z.string().min(1, "Height is required"),
  location: z.string().min(2, "Location is required"),

  // Step 2: Fitness Goal
  goal: z.string().min(1, "Please select your primary fitness goal"),

  // Step 3: Background
  experience: z.string().min(1, "Experience is required"),
  profession: z.string().min(2, "Profession is required"),
  activityLevel: z.string().min(1, "Activity level is required"),
  workoutTime: z.string().min(1, "Workout time available is required"),
  diet: z.string().min(1, "Diet type selection is required"),
  sleep: z.string().min(1, "Sleep duration selection is required"),
  medical: z.string(),
  medications: z.string(),

  // Step 4: Challenges
  struggle: z.string().min(5, "Struggle details must be at least 5 characters"),
  failedBefore: z.string().min(5, "Reason must be at least 5 characters"),
  motivation: z.string().min(5, "Motivation must be at least 5 characters"),
  expectedOutcome: z.string().min(5, "Expected outcome must be at least 5 characters"),

  // Step 5: Discovery
  source: z.string().min(1, "Please select where you found us"),
  referral: z.string(),

  // Step 6: Commitment
  duration: z.string().min(1, "Preferred program selection is required"),
  budget: z.string().min(1, "Budget selection is required"),
  start: z.string().min(1, "Start date selection is required"),
});

type FormData = z.infer<typeof formSchema>;

const STEPS = [
  { id: 1, name: "Personal Details" },
  { id: 2, name: "Fitness Goal" },
  { id: 3, name: "Background" },
  { id: 4, name: "Challenges" },
  { id: 5, name: "Discovery" },
  { id: 6, name: "Commitment" },
  { id: 7, name: "Review & Submit" },
];

interface ApplicationWizardProps {
  selectedService?: string | null;
  onClearSelectedService?: () => void;
}

export default function ApplicationWizard({ selectedService, onClearSelectedService }: ApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      whatsapp: "",
      instagram: "",
      age: "",
      gender: "",
      weight: "",
      height: "",
      location: "",
      goal: "",
      experience: "",
      profession: "",
      activityLevel: "",
      workoutTime: "",
      diet: "",
      sleep: "",
      medical: "None",
      medications: "None",
      struggle: "",
      failedBefore: "",
      motivation: "",
      expectedOutcome: "",
      source: "",
      referral: "None",
      duration: "",
      budget: "",
      start: "",
    },
  });

  const watchedGoal = watch("goal");
  const watchedSource = watch("source");
  const formValues = watch();

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem("hypertrex_coaching_app");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof FormData, parsed[key]);
        });
      } catch (e) {
        console.error("Error parsing saved form", e);
      }
    }
  }, [setValue]);

  // Automatically save to localStorage whenever form values change
  useEffect(() => {
    if (typeof window !== "undefined" && isClient) {
      localStorage.setItem("hypertrex_coaching_app", JSON.stringify(formValues));
    }
  }, [formValues, isClient]);

  const getFieldsForStep = (step: number): (keyof FormData)[] => {
    switch (step) {
      case 1:
        return ["name", "email", "phone", "whatsapp", "instagram", "age", "gender", "weight", "height", "location"];
      case 2:
        return ["goal"];
      case 3:
        return ["experience", "profession", "activityLevel", "workoutTime", "diet", "sleep", "medical", "medications"];
      case 4:
        return ["struggle", "failedBefore", "motivation", "expectedOutcome"];
      case 5:
        return ["source", "referral"];
      case 6:
        return ["duration", "budget", "start"];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fields = getFieldsForStep(currentStep);
    const isValid = await trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEdit = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "application",
          data: data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application.");
      }

      // Clear local storage and reset form
      localStorage.removeItem("hypertrex_coaching_app");
      reset();

      if (onClearSelectedService) {
        onClearSelectedService();
      }

      // Trigger success confirmation modal
      setShowSuccessModal(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to submit application. Please check your connection or contact settings.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent hydration issues by not mounting layout logic until client is active
  if (!isClient) return null;

  return (
    <section id="application" className="py-24 md:py-32 bg-primary-bg relative overflow-hidden border-t border-glass-border">
      {/* Background visual details */}
      <div className="absolute right-[-200px] top-[10%] w-[400px] h-[400px] rounded-full bg-accent-gold/4 blur-[100px] pointer-events-none" />
      <div className="absolute left-[-200px] bottom-[10%] w-[400px] h-[400px] rounded-full bg-accent-gold/4 blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-accent-gold uppercase mb-3 flex items-center gap-1.5">
            <Sparkles size={12} />
            Exclusive Access
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            APPLY FOR ELITE COACHING
          </h2>
          <div className="h-0.5 w-16 bg-accent-gold mb-6" />
          <p className="text-gray-400 font-light text-sm leading-relaxed max-w-lg">
            Our private coaching roster is highly curated to ensure absolute dedication. Complete the application below, and Coach Vance will review your file.
          </p>
        </div>

        {/* Wizard Panel */}
        <div className="glass-panel p-8 md:p-10 rounded-2xl border border-glass-border shadow-2xl relative overflow-hidden">
          
          {/* Progress Indicator Header */}
          <div className="flex justify-between items-center text-xs tracking-wider font-semibold text-gray-500 uppercase mb-4">
            <span>Step {currentStep} of {STEPS.length}</span>
            <span className="text-accent-gold font-bold">{STEPS[currentStep - 1].name}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-10">
            <motion.div 
              className="h-full bg-accent-gold" 
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                
                {/* STEP 1: Personal Details */}
                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Full Name *</label>
                      <input {...register("name")} className="w-full px-4 py-3 premium-input text-sm" placeholder="Alexander Pierce" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Email Address *</label>
                      <input {...register("email")} type="email" className="w-full px-4 py-3 premium-input text-sm" placeholder="alex@gmail.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Phone Number *</label>
                      <input {...register("phone")} className="w-full px-4 py-3 premium-input text-sm" placeholder="+1 (555) 123-4567" />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">WhatsApp Number *</label>
                      <input {...register("whatsapp")} className="w-full px-4 py-3 premium-input text-sm" placeholder="+1 (555) 123-4567" />
                      {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Instagram Username *</label>
                      <input {...register("instagram")} className="w-full px-4 py-3 premium-input text-sm" placeholder="@alex_performance" />
                      {errors.instagram && <p className="text-red-500 text-xs mt-1">{errors.instagram.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Age *</label>
                      <input {...register("age")} type="number" className="w-full px-4 py-3 premium-input text-sm" placeholder="32" />
                      {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Gender *</label>
                      <select {...register("gender")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Current Weight (kg/lbs) *</label>
                      <input {...register("weight")} className="w-full px-4 py-3 premium-input text-sm" placeholder="85 kg" />
                      {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Current Height (cm/in) *</label>
                      <input {...register("height")} className="w-full px-4 py-3 premium-input text-sm" placeholder="182 cm" />
                      {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Location (City, Country) *</label>
                      <input {...register("location")} className="w-full px-4 py-3 premium-input text-sm" placeholder="Beverly Hills, USA" />
                      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 2: Fitness Goal */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-4 text-center">What is your primary physical goal? *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {["Fat Loss", "Muscle Gain", "Strength", "Body Recomposition", "General Fitness", "Other"].map((g) => (
                        <label 
                          key={g} 
                          className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                            watchedGoal === g 
                              ? "bg-accent-gold/10 border-accent-gold text-white" 
                              : "bg-white/3 border-glass-border text-gray-400 hover:border-white/20 hover:bg-white/5"
                          }`}
                        >
                          <input 
                            type="radio" 
                            value={g} 
                            {...register("goal")} 
                            className="hidden" 
                          />
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${watchedGoal === g ? "border-accent-gold" : "border-gray-500"}`}>
                            {watchedGoal === g && <div className="w-2 h-2 rounded-full bg-accent-gold" />}
                          </div>
                          <span className="text-sm font-semibold">{g}</span>
                        </label>
                      ))}
                    </div>
                    {errors.goal && <p className="text-red-500 text-xs text-center mt-2">{errors.goal.message}</p>}
                  </div>
                )}

                {/* STEP 3: Background */}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Training Experience *</label>
                      <select {...register("experience")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Experience</option>
                        <option value="Beginner (<1 year)">Beginner (&lt;1 year)</option>
                        <option value="Intermediate (1-3 years)">Intermediate (1-3 years)</option>
                        <option value="Advanced (3+ years)">Advanced (3+ years)</option>
                      </select>
                      {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Profession *</label>
                      <input {...register("profession")} className="w-full px-4 py-3 premium-input text-sm" placeholder="Software Architect" />
                      {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Daily Activity Level *</label>
                      <select {...register("activityLevel")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Activity</option>
                        <option value="Sedentary (Desk Job)">Sedentary (Desk Job)</option>
                        <option value="Lightly Active (Walking)">Lightly Active (Walking)</option>
                        <option value="Moderately Active">Moderately Active</option>
                        <option value="Very Active (Athlete)">Very Active (Athlete)</option>
                      </select>
                      {errors.activityLevel && <p className="text-red-500 text-xs mt-1">{errors.activityLevel.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Workout Time Available *</label>
                      <select {...register("workoutTime")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Time</option>
                        <option value="2-3 hours/week">2-3 hours/week</option>
                        <option value="4-5 hours/week">4-5 hours/week</option>
                        <option value="6+ hours/week">6+ hours/week</option>
                      </select>
                      {errors.workoutTime && <p className="text-red-500 text-xs mt-1">{errors.workoutTime.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Diet Type *</label>
                      <select {...register("diet")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Diet</option>
                        <option value="Standard/Everything">Standard/Everything</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Keto/Low Carb">Keto/Low Carb</option>
                        <option value="Carnivore">Carnivore</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.diet && <p className="text-red-500 text-xs mt-1">{errors.diet.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Sleep Duration *</label>
                      <select {...register("sleep")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Sleep</option>
                        <option value="<6 hours">&lt;6 hours</option>
                        <option value="6-7 hours">6-7 hours</option>
                        <option value="7-8 hours">7-8 hours</option>
                        <option value="8+ hours">8+ hours</option>
                      </select>
                      {errors.sleep && <p className="text-red-500 text-xs mt-1">{errors.sleep.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Medical Conditions (Optional)</label>
                      <input {...register("medical")} className="w-full px-4 py-3 premium-input text-sm" placeholder="Asthma, etc." />
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Current Medications (Optional)</label>
                      <input {...register("medications")} className="w-full px-4 py-3 premium-input text-sm" placeholder="None" />
                    </div>
                  </div>
                )}

                {/* STEP 4: Challenges */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">What is your biggest fitness struggle? *</label>
                      <textarea {...register("struggle")} rows={3} className="w-full px-4 py-3 premium-input text-sm" placeholder="Consistency, energy slumps, planning..." />
                      {errors.struggle && <p className="text-red-500 text-xs mt-1">{errors.struggle.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Why did previous attempts fail? *</label>
                      <textarea {...register("failedBefore")} rows={3} className="w-full px-4 py-3 premium-input text-sm" placeholder="Lack of customized guidance, too restrictive diet..." />
                      {errors.failedBefore && <p className="text-red-500 text-xs mt-1">{errors.failedBefore.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">What is your current motivation? *</label>
                      <textarea {...register("motivation")} rows={3} className="w-full px-4 py-3 premium-input text-sm" placeholder="Preparing for a photoshoot, executive performance..." />
                      {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">What is your expected outcome? *</label>
                      <textarea {...register("expectedOutcome")} rows={3} className="w-full px-4 py-3 premium-input text-sm" placeholder="Build 5kg of muscle, feel fully focused during calls..." />
                      {errors.expectedOutcome && <p className="text-red-500 text-xs mt-1">{errors.expectedOutcome.message}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 5: Discovery */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Where did you find us? *</label>
                      <select 
                        {...register("source")} 
                        className="w-full px-4 py-3 premium-input text-sm"
                      >
                        <option value="">Select Option</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Google">Google</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Referral">Referral</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>}
                    </div>

                    {/* Show Referral Name if source is Referral or Friend */}
                    {(watchedSource === "Referral" || watchedSource === "Friend") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Referral Name</label>
                        <input {...register("referral")} className="w-full px-4 py-3 premium-input text-sm" placeholder="Johnathan Doe" />
                      </motion.div>
                    )}
                  </div>
                )}

                {/* STEP 6: Commitment */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Preferred Program *</label>
                      <select {...register("duration")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Duration</option>
                        <option value="12 Weeks">12-Week Elite Transformation</option>
                        <option value="24 Weeks">24-Week High Performance Protocol</option>
                        <option value="36 Weeks">36-Week Ultimate Mastery</option>
                      </select>
                      {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Ready to Invest? *</label>
                      <select {...register("budget")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Option</option>
                        <option value="Ready To Invest">Yes, I am ready to invest in premium coaching</option>
                        <option value="Need More Information">I need more details on pricing structure first</option>
                      </select>
                      {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold tracking-wider text-gray-400 uppercase mb-2">Preferred Start Date *</label>
                      <select {...register("start")} className="w-full px-4 py-3 premium-input text-sm">
                        <option value="">Select Start Date</option>
                        <option value="Immediately">Immediately</option>
                        <option value="Within One Week">Within One Week</option>
                        <option value="Within One Month">Within One Month</option>
                      </select>
                      {errors.start && <p className="text-red-500 text-xs mt-1">{errors.start.message}</p>}
                    </div>
                  </div>
                )}

                {/* STEP 7: Review all answers */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-accent-gold mb-4 justify-center">
                      <Shield size={16} />
                      <span className="text-xs font-bold tracking-widest uppercase">Verify Your Protocol Answers</span>
                    </div>

                    <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 border-b border-glass-border pb-6">
                      
                      {/* Step 1 Review */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-glass-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">01. Personal Details</span>
                          <button type="button" onClick={() => handleEdit(1)} className="text-gray-400 hover:text-white"><Edit2 size={12} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-light text-gray-400">
                          <div><span className="font-semibold text-white">Name:</span> {getValues("name")}</div>
                          <div><span className="font-semibold text-white">Email:</span> {getValues("email")}</div>
                          <div><span className="font-semibold text-white">Phone:</span> {getValues("phone")}</div>
                          <div><span className="font-semibold text-white">WhatsApp:</span> {getValues("whatsapp")}</div>
                          <div><span className="font-semibold text-white">Instagram:</span> {getValues("instagram")}</div>
                          <div><span className="font-semibold text-white">Age/Gender:</span> {getValues("age")} / {getValues("gender")}</div>
                          <div><span className="font-semibold text-white">Weight/Height:</span> {getValues("weight")} / {getValues("height")}</div>
                          <div className="col-span-2"><span className="font-semibold text-white">Location:</span> {getValues("location")}</div>
                        </div>
                      </div>

                      {/* Step 2 Review */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-glass-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">02. Fitness Goal</span>
                          <button type="button" onClick={() => handleEdit(2)} className="text-gray-400 hover:text-white"><Edit2 size={12} /></button>
                        </div>
                        <p className="text-xs font-light text-gray-400"><span className="font-semibold text-white">Goal:</span> {getValues("goal")}</p>
                      </div>

                      {/* Step 3 Review */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-glass-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">03. Background</span>
                          <button type="button" onClick={() => handleEdit(3)} className="text-gray-400 hover:text-white"><Edit2 size={12} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-light text-gray-400">
                          <div><span className="font-semibold text-white">Experience:</span> {getValues("experience")}</div>
                          <div><span className="font-semibold text-white">Profession:</span> {getValues("profession")}</div>
                          <div><span className="font-semibold text-white">Activity:</span> {getValues("activityLevel")}</div>
                          <div><span className="font-semibold text-white">Workout Time:</span> {getValues("workoutTime")}</div>
                          <div><span className="font-semibold text-white">Diet:</span> {getValues("diet")}</div>
                          <div><span className="font-semibold text-white">Sleep:</span> {getValues("sleep")}</div>
                          <div><span className="font-semibold text-white">Medical:</span> {getValues("medical")}</div>
                          <div><span className="font-semibold text-white">Medication:</span> {getValues("medications")}</div>
                        </div>
                      </div>

                      {/* Step 4 Review */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-glass-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">04. Challenges</span>
                          <button type="button" onClick={() => handleEdit(4)} className="text-gray-400 hover:text-white"><Edit2 size={12} /></button>
                        </div>
                        <div className="space-y-2 text-xs font-light text-gray-400">
                          <div><span className="font-semibold text-white block">Biggest Struggle:</span> {getValues("struggle")}</div>
                          <div><span className="font-semibold text-white block">Why Previous Failed:</span> {getValues("failedBefore")}</div>
                          <div><span className="font-semibold text-white block">Motivation:</span> {getValues("motivation")}</div>
                          <div><span className="font-semibold text-white block">Expected Outcome:</span> {getValues("expectedOutcome")}</div>
                        </div>
                      </div>

                      {/* Step 5 Review */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-glass-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">05. Discovery</span>
                          <button type="button" onClick={() => handleEdit(5)} className="text-gray-400 hover:text-white"><Edit2 size={12} /></button>
                        </div>
                        <p className="text-xs font-light text-gray-400"><span className="font-semibold text-white">Source:</span> {getValues("source")} {getValues("referral") !== "None" && `(Referral: ${getValues("referral")})`}</p>
                      </div>

                      {/* Step 6 Review */}
                      <div className="p-4 rounded-lg bg-white/[0.02] border border-glass-border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold text-accent-gold uppercase tracking-wider">06. Commitment</span>
                          <button type="button" onClick={() => handleEdit(6)} className="text-gray-400 hover:text-white"><Edit2 size={12} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-light text-gray-400">
                          <div><span className="font-semibold text-white">Duration:</span> {getValues("duration")}</div>
                          <div><span className="font-semibold text-white">Budget Status:</span> {getValues("budget")}</div>
                          <div className="col-span-2"><span className="font-semibold text-white">Start Date:</span> {getValues("start")}</div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Form Nav Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-glass-border">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-glass-border text-xs font-semibold tracking-wider text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                >
                  <ArrowLeft size={14} />
                  BACK
                </button>
              ) : (
                <div />
              )}

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black hover:bg-accent-gold text-xs font-bold tracking-widest transition-all duration-300"
                >
                  CONTINUE
                  <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-accent-gold text-black hover:bg-white text-xs font-extrabold tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      SUBMITTING...
                      <div className="h-3 w-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      SUBMIT APPLICATION
                      <Check size={14} />
                    </>
                  )}
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="text-red-500 text-xs mt-4 text-center">
                {errorMessage}
              </div>
            )}
          </form>

        </div>
      </div>

      {/* Success Modal Popup */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseSuccess}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Content Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md glass-panel p-8 rounded-2xl border border-glass-border bg-[#0a0a0a]/95 text-center z-10 shadow-2xl"
            >
              {/* Success Checkmark Circle */}
              <div className="w-16 h-16 bg-accent-gold/10 border border-accent-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-gold">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold tracking-wide text-white mb-2 uppercase">Application Submitted</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                Yashwant will get in touch with you.
              </p>

              {/* Action Button */}
              <button
                onClick={handleCloseSuccess}
                className="w-full py-3.5 rounded-xl bg-accent-gold text-black hover:bg-white font-bold text-xs tracking-widest transition-all duration-300 transform hover:scale-[1.02]"
              >
                CLOSE
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
