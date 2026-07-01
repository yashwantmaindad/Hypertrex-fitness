export const siteConfig = {
  name: "Hypertrex Fitness",
  title: "Hypertrex Fitness | Premium Personal & Online Coaching",
  description: "Transform your body, build confidence, and unlock your full potential with personalized coaching designed around your goals, lifestyle, and commitment.",
  url: "https://hypertrexfitness.com",
  creator: "Hypertrex Fitness",
  contact: {
    email: "coaching@hypertrexfitness.com",
    phone: "+91 98603 98216",
    whatsapp: "919860398216", // Numbers only for wa.me/919860398216
    address: "", // Left empty to hide
    googleMaps: "",
  },
  socials: {
    instagram: "https://www.instagram.com/y.xsh_m?igsh=MXZyNmJ1b3NnenptYQ==",
    facebook: "", 
    youtube: "",
    linkedin: "",
    tiktok: "",
    googleBusiness: "",
    googleReviews: "",
  },
  programs: [
    { id: "12weeks", name: "12-Week Transformation", duration: "12 Weeks" },
    { id: "24weeks", name: "24-Week Performance Protocol", duration: "24 Weeks" },
    { id: "36weeks", name: "36-Week Ultimate Mastery", duration: "36 Weeks" },
  ],
  pricing: {
    "12weeks": "Premium Pricing",
    "24weeks": "Premium Pricing",
    "36weeks": "Premium Pricing",
  }
};

export type SiteConfig = typeof siteConfig;
