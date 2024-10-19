import {
  ActivityIcon,
  CloudIcon,
  GamepadIcon,
  MusicIcon,
  NewspaperIcon,
  TvIcon,
} from "lucide-react";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "JOLO",
  description: "talk to take notes.",
  cta: "Download App",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["Voice Notes", "Speech-to-Text", "Productivity", "Mobile App"],
  links: {
    email: "neilteje@gmail.com",
    twitter: "https://twitter.com/itsTeilio",
    discord: "https://discord.gg/teilio",
    github: "https://github.com/neilteje",
    instagram: "https://instagram.com/neilteje",
  },
  features: [
    {
      name: "Voice-First Journaling",
      description:
        "Easily capture your thoughts by speaking instead of typing. JOLO makes self-reflection quick, natural, and intuitive.",
      icon: <MusicIcon className="h-6 w-6" />,
    },
    {
      name: "AI-Powered Emotional Insights",
      description:
        "Get real-time feedback on your mood and emotions through advanced AI that listens and understands your voice.",
      icon: <CloudIcon className="h-6 w-6" />,
    },
    {
      name: "Gamified Progress Tracking",
      description:
        "Stay motivated with badges, streaks, and achievements. Track your self-reflection journey in a fun and engaging way.",
      icon: <GamepadIcon className="h-6 w-6" />,
    },
    {
      name: "Time-Based Prompts",
      description: "Receive daily prompts to guide your reflections, helping you build a consistent journaling habit.",
      icon: <ActivityIcon className="h-6 w-6" />,
    },
    {
      name: "Cloud Sync",
      description:
        "Securely store and access your voice entries across all your devices. Your thoughts are safe, organized, and always available.",
      icon: <CloudIcon className="h-6 w-6" />,
    },
    {
      name: "Smart Emotional Tagging",
      description: "Automatically tag and categorize your entries based on keywords and emotions, making it easy to track patterns.",
      icon: <ActivityIcon className="h-6 w-6" />,
    },
  ],

  benefits: [
    {
      id: 1,
      text: "Easily express your thoughts with hands-free voice journaling.",
      image: "/iphone.png",
    },
    {
      id: 2,
      text: "Gain insights into your emotions with AI-powered feedback.",
      image: "/iphone.png",
    },
    {
      id: 3,
      text: "Build consistency with engaging daily prompts and gamified streaks.",
      image: "/iphone.png",
    },
    {
      id: 4,
      text: "Keep your entries secure and accessible with cloud sync.",
      image: "/iphone.png",
    },
  ],

  pricing: [
    {
      name: "Free",
      href: "#",
      price: "$0",
      period: "month",
      yearlyPrice: "$0",
      features: [
        "Up to 10 voice entries per month",
        "Basic emotional insights",
        "Daily prompts",
        "5 GB cloud storage",
        "Standard AI accuracy",
      ],
      description: "Perfect for casual users starting their self-reflection journey.",
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "JOLO+",
      href: "#",
      price: "$12",
      period: "month",
      yearlyPrice: "$120",
      features: [
        "Unlimited voice entries",
        "Advanced emotional insights with detailed feedback",
        "Access to exclusive prompts",
        "50 GB cloud storage",
        "Enhanced AI accuracy",
        "Priority customer support",
      ],
      description: "Ideal for users seeking a deeper and more consistent journaling experience.",
      buttonText: "Subscribe",
      isPopular: true,
    },
  ],

  faqs: [
    {
      question: "How accurate is the speech-to-text conversion?",
      answer: (
        <span>
          Talky uses advanced AI algorithms to provide high accuracy in
          speech-to-text conversion. Our Pro plan offers enhanced accuracy with
          continuous improvements.
        </span>
      ),
    },
    {
      question: "Can I use Talky offline?",
      answer: (
        <span>
          Yes, you can record voice notes offline. The transcription and sync
          will occur when you&apos;re back online.
        </span>
      ),
    },
    {
      question: "What languages does Talky support?",
      answer: (
        <span>
          Talky supports over 30 languages for voice-to-text conversion,
          including English, Spanish, French, German, and Mandarin. We&apos;re
          constantly adding more languages.
        </span>
      ),
    },
    {
      question: "How secure are my notes?",
      answer: (
        <span>
          We take security seriously. All your notes are encrypted end-to-end
          and stored securely in the cloud. Only you have access to your notes
          unless you choose to share them.
        </span>
      ),
    },
    {
      question: "Can I export my notes to other formats?",
      answer: (
        <span>
          Absolutely! Talky allows you to export your notes in various formats
          including TXT, PDF, and DOC. You can also integrate with popular
          note-taking apps.
        </span>
      ),
    },
  ],
  footer: [
    {
      id: 1,
      menu: [
        { href: "#", text: "Features" },
        { href: "#", text: "Pricing" },
        { href: "#", text: "FAQs" },
        { href: "#", text: "Contact" },
        { href: "#", text: "Blog" },
      ],
    },
  ],
  testimonials: [
    {
      id: 1,
      text: "JOLO's voice-first approach has made self-reflection a daily habit for me. It's so easy to use!",
      name: "Emily Reed",
      role: "Mental Health Advocate",
      image:
        "https://plus.unsplash.com/premium_photo-1669725687150-15c603ac6a73?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pbi1zYW1lLXNlcmllc3w1fHx8ZW58MHx8fHx8",
    },
    {
      id: 2,
      text: "The AI insights have been a game-changer for understanding my mood patterns.",
      name: "Sophia Martinez",
      role: "Life Coach",
      image:
        "https://plus.unsplash.com/premium_photo-1669740462444-ba6e0c316b59?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D",
    },
    {
      id: 3,
      text: "JOLO has made journaling fun and rewarding. I love collecting badges!",
      name: "Liam Johnson",
      role: "College Student",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      text: "It's amazing how a simple voice entry can give so much insight. JOLO is truly revolutionary!",
      name: "Ethan Green",
      role: "Product Manager",
      image:
        "https://plus.unsplash.com/premium_photo-1669725687221-6fe12c2da6b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
