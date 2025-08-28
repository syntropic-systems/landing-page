"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./animated-section";
import technologyData from "@/content/technology_new.json";
import { CloudGlanceIconGreen } from "./ui/cloudglance-icon-green";

// Technology card configurations similar to workflow OutputNode
const getTechCardConfig = (index: number) => {
  const configs = [
    {
      borderClass: "border-white/20",
      iconBg: "bg-white/20",
    },
    {
      borderClass: "border-white/20",
      iconBg: "bg-white/20",
    },
    {
      borderClass: "border-white/20",
      iconBg: "bg-white/20",
    },
    {
      borderClass: "border-white/20",
      iconBg: "bg-white/20",
    },
  ];
  return configs[index % configs.length];
};

const TechnologyCard = ({
  title,
  problem,
  solution,
  index,
  isHighlighted = false,
}: {
  title: string;
  problem: { title: string; description: string; color: string };
  solution: { title: string; description: string; color: string };
  index: number;
  isHighlighted?: boolean;
}) => {
  const config = getTechCardConfig(index);

  return (
    <motion.div
      className={`flex flex-col gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border ${
        config.borderClass
      } relative group hover:scale-[1.02] transition-all duration-300 overflow-hidden ${
        isHighlighted ? "ring-2 ring-primary/30" : ""
      }`}
      style={
        {
          "--realtime-primary-color": "hsl(var(--primary))",
        } as React.CSSProperties
      }
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        delay: index * 0.1,
      }}
    >
      {/* Background with blur effect */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "rgba(231, 236, 235, 0.08)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />
      {/* Additional subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

      {/* Number indicator */}
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          className={`w-8 h-8 rounded-full ${config.iconBg} border ${config.borderClass} flex items-center justify-center`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
        >
          <span className="text-sm font-bold text-foreground">{index}</span>
        </motion.div>
      </div>

      {/* Title */}
      <div className="text-center relative z-10">
        <h3 className="text-lg md:text-xl font-semibold text-foreground leading-tight">
          {title}
        </h3>
      </div>

      {/* Problem Section */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-start gap-3">
          <motion.div
            className="w-3 h-3 rounded-full bg-red-400/70 mt-1 flex-shrink-0"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              delay: 0.5,
            }}
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-400/90 mb-2">
              {problem.title}:
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-start gap-3">
          <motion.div
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: "var(--realtime-primary-color)" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              delay: 1,
            }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CloudGlanceIconGreen width={16} height={16} />
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--realtime-primary-color)" }}
              >
                {solution.title}:
              </p>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {solution.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function TechnologySection() {
  return (
    <section className="w-full px-5 py-8 md:py-16 flex flex-col justify-center items-center bg-transparent">
      <div className="w-full max-w-6xl relative">
        {/* Background glow - matches bento section pattern */}
        <div className="w-[300px] h-[400px] md:w-[547px] md:h-[938px] absolute top-[40%] left-[15%] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] md:blur-[130px] z-0" />

        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-16 relative z-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-6xl md:leading-[67px] text-foreground mb-2 md:mb-4">
            {technologyData.sectionHeader.title}
          </h2>
          <p className="text-sm md:text-lg lg:text-xl font-medium leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-4">
            {technologyData.sectionHeader.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/60 to-primary/30 mx-auto rounded-full mb-6" />
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            {technologyData.introduction}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        >
          {technologyData.differentiators.map((differentiator, index) => (
            <TechnologyCard
              key={differentiator.id}
              title={differentiator.title}
              problem={differentiator.problem}
              solution={differentiator.solution}
              index={parseInt(differentiator.number)}
              isHighlighted={differentiator.highlight}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-8 md:mt-16 max-w-4xl mx-auto relative z-10"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.9 }}
        >
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            {technologyData.callToAction.text}
          </p>
          <motion.button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary-foreground"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: [0.4, 0, 0.6, 1],
              }}
            />
            <span>{technologyData.callToAction.button.label}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
