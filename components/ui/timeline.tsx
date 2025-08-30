"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Calculate which timeline item should be active based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const newActiveIndex = Math.floor(latest * data.length);
      const clampedIndex = Math.min(
        Math.max(newActiveIndex, 0),
        data.length - 1
      );
      setActiveIndex(clampedIndex);
    });

    return () => unsubscribe();
  }, [scrollYProgress, data.length]);

  return (
    <div className="w-full bg-background font-sans px-4" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-0">
        <div ref={ref} className="relative max-w-7xl pb-10">
          {data.map((item, index) => (
            <div key={index} className="flex justify-start pt-5 md:pt-10">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div
                  className={`h-10 absolute left-3 md:left-3 w-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    activeIndex === index
                      ? "bg-emerald-500/20 border-emerald-500 shadow-lg shadow-emerald-500/25"
                      : "bg-background border-neutral-300 dark:border-neutral-700"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full border transition-all duration-500 ${
                      activeIndex === index
                        ? "bg-emerald-500 border-emerald-400"
                        : "bg-neutral-200 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700"
                    }`}
                  />
                </div>
                <h3
                  className={`hidden md:block text-xl md:pl-20 md:text-2xl xl:text-4xl font-bold transition-colors duration-500 ${
                    activeIndex === index
                      ? "text-emerald-400"
                      : "text-neutral-500 dark:text-neutral-500"
                  }`}
                >
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-16 pr-1 md:pl-4 w-full">
                <h3
                  className={`md:hidden block text-2xl mb-4 text-left font-bold transition-colors duration-500 ${
                    activeIndex === index
                      ? "text-emerald-400"
                      : "text-neutral-500 dark:text-neutral-500"
                  }`}
                >
                  {item.title}
                </h3>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div
                    className={`transition-all duration-500 ${
                      activeIndex === index ? "transform scale-105" : ""
                    }`}
                    style={{
                      filter:
                        activeIndex === index
                          ? "drop-shadow(0 0 20px var(--react-flow-emerald) / 0.3) drop-shadow(0 0 40px var(--react-flow-emerald) / 0.15)"
                          : "none",
                    }}
                  >
                    {item.leftContent}
                  </div>
                  <div>{item.rightContent}</div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] gradient-timeline dark:gradient-timeline-dark gradient-mask-linear"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0  w-[2px] gradient-timeline-primary rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
