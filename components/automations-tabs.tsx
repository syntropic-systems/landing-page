"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView as useFramerInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { FeatureSide } from "@/components/feature-side";
import { RevealOnScroll } from "@/components/animations/reveal-on-scroll";
import {
  TenderSearchShowcase,
  L1EvaluationShowcase,
  RfqMatchingShowcase,
} from "@/components/showcases";

const automations = [
  {
    title: "Tender Bidding",
    description:
      "Win more bids with a faster, more controlled response process. CloudGlance streamlines how your team discovers opportunities, validates eligibility, assembles responses, and ensures every submission is complete and compliant.",
    cta: { text: "Learn More", href: "/automations/tender-bidding" },
    secondaryCta: { text: "View All Automations", href: "/automations" },
    showcase: TenderSearchShowcase,
    duration: 12900,
  },
  {
    title: "Tender Evaluation",
    description:
      "Choose the best vendor in a fraction of the usual time. AI-powered evaluation rubrics, L1 bidder selection, and compliance analysis help your team evaluate faster with full confidence.",
    cta: { text: "Learn More", href: "/automations/tender-evaluation" },
    secondaryCta: { text: "View All Automations", href: "/automations" },
    showcase: L1EvaluationShowcase,
    duration: 12600,
  },
  {
    title: "RFX Response",
    description:
      "Respond to RFPs, RFQs, and RFIs with speed and precision. CloudGlance matches your products against requirements and surfaces every deviation before submission.",
    cta: { text: "Learn More", href: "/automations/rfx" },
    secondaryCta: { text: "View All Automations", href: "/automations" },
    showcase: RfqMatchingShowcase,
    duration: 12600,
  },
];

export function AutomationsTabs() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useFramerInView(sectionRef, { once: true, margin: "-60px" });

  const current = automations[active];
  const Showcase = current.showcase;

  const advanceTab = useCallback(() => {
    setActive((prev) => (prev + 1) % automations.length);
  }, []);

  // Progress bar animation synced to showcase duration — paused until in view
  useEffect(() => {
    if (!inView) return;

    const duration = automations[active].duration;
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(pct);

      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        advanceTab();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, advanceTab, inView]);

  const handleTabClick = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setActive(i);
  };

  return (
    <div ref={sectionRef}>
      {/* Tab bar */}
      <RevealOnScroll>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {automations.map((automation, i) => (
            <button
              key={automation.title}
              onClick={() => handleTabClick(i)}
              className="group relative flex flex-col items-start gap-2 pb-3 pt-1 cursor-pointer text-left"
            >
              <span
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  i === active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                )}
              >
                {automation.title}
              </span>

              {/* Track */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/60 rounded-full overflow-hidden">
                {i === active && (
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
                {i < active && (
                  <div className="h-full w-full bg-primary/40 rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Active section using FeatureSide */}
      <FeatureSide
        key={active}
        title={current.title}
        description={current.description}
        media={<Showcase />}
        primaryCta={current.cta}
        secondaryCta={current.secondaryCta}
        imageClassName="aspect-[3/4] lg:aspect-square"
        asSection={false}
      />
    </div>
  );
}
