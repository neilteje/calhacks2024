/* eslint-disable @next/next/no-img-element */
"use client";

import { Section } from "@/components/section";
import { easeInOutCubic } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const bentoItems = [
  {
    title: "Voice-First Journaling",
    content:
      "Easily capture your thoughts by speaking instead of writing. JOLO makes self-reflection quick, natural, and intuitive.",
    imageSrc: "/Recording.png",
    imageAlt: "Voice-first journaling illustration",
    fullWidth: true,
  },
  {
    title: "AI-Powered Emotional Insights",
    content:
      "Our advanced AI analyzes your voice entries to provide real-time emotional feedback, helping you understand your mood and thoughts.",
    imageSrc: "/DetailedArchive.png",
    imageAlt: "AI emotional analysis illustration",
    fullWidth: false,
  },
  {
    title: "Time-Based Prompts",
    content:
      "Receive personalized, time-based prompts to guide your reflections. Stay motivated with a new prompt each day, no matter where you are.",
    imageSrc: "/HomeScreen.png",
    imageAlt: "Time-based journaling prompts illustration",
    fullWidth: false,
  },
  {
    title: "Gamified Progress Tracking",
    content:
      "Maintain streaks, earn badges, and track your self-reflection journey. JOLO makes self-care engaging and rewarding.",
    imageSrc: "/CalendarView.png",
    imageAlt: "Gamified progress tracking illustration",
    fullWidth: true,
  },
];

export function BentoGrid() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacities = [
    useTransform(scrollYProgress, [0, 0.1, 0.3], [0, 0, 1], {
      ease: easeInOutCubic,
    }),
    useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1], {
      ease: easeInOutCubic,
    }),
    useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0, 1], {
      ease: easeInOutCubic,
    }),
    useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0, 1], {
      ease: easeInOutCubic,
    }),
  ];

  const yTransforms = [
    useTransform(scrollYProgress, [0, 0.1, 0.3], [100, 100, 0], {
      ease: easeInOutCubic,
    }),
    useTransform(scrollYProgress, [0, 0.2, 0.4], [100, 100, 0], {
      ease: easeInOutCubic,
    }),
    useTransform(scrollYProgress, [0, 0.3, 0.5], [100, 100, 0], {
      ease: easeInOutCubic,
    }),
    useTransform(scrollYProgress, [0, 0.4, 0.6], [100, 100, 0], {
      ease: easeInOutCubic,
    }),
  ];

  return (
    <Section
      id="bento"
      title="Benefits"
      subtitle="How JOLO makes self-reflection easier and more engaging"
      className="mx-auto max-w-screen-md px-10"
      ref={ref}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bentoItems.map((bentoItem, index) => (
          <motion.div
            key={index}
            style={{ opacity: opacities[index], y: yTransforms[index] }}
            className={cn(
              "bg-muted p-4 sm:p-6 !pb-0 rounded-3xl grid grid-rows-1",
              bentoItem.fullWidth && "md:col-span-2"
            )}
          >
            <div className="flex flex-col">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                {bentoItem.title}
              </h2>
              <p className="text-sm sm:text-base text-foreground mb-4">
                {bentoItem.content}
              </p>
            </div>
            <div
              className={cn(
                "flex justify-center",
                bentoItem.fullWidth && "sm:space-x-4"
              )}
            >
              <img
                src={bentoItem.imageSrc}
                alt={bentoItem.imageAlt}
                className="w-full h-64 sm:h-96 rounded-xl object-cover object-top"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
