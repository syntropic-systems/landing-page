"use client";

import React from "react";
import { motion } from "framer-motion";
import technologyData from "@/content/technology_new.json";
import { Section } from "@/components/ui/section";
import { CloudGlanceIconGreen } from "../../ui/cloudglance-icon-green";
import { Container } from "@/components/ui/container";

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
          background: "var(--bg-overlay-08)",
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
    <Section
      title={technologyData.sectionHeader.title}
      subtitle={technologyData.sectionHeader.subtitle}
    >
      <Container className="relative">
        {/* Background glow - matches bento section pattern */}
        <div className="w-[300px] h-[400px] md:w-[547px] md:h-[938px] absolute top-[40%] left-[15%] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] md:blur-[130px] z-0" />

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
      </Container>
    </Section>
  );
}
