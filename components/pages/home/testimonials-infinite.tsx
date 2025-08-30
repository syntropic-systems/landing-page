"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function TestimonialsInfinite() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from the teams who've transformed their bid process with CloudGlance.
          </p>
        </div>
        
        <div className="h-[40rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "CloudGlance transformed our entire bid process. We went from analyzing 200+ page documents in weeks to getting actionable insights in minutes. Our win rate increased by 40% in the first quarter alone.",
    name: "Sarah Chen",
    title: "VP Business Development, Global Engineering Firm",
  },
  {
    quote:
      "The legal risk detection is phenomenal. What used to take our team weeks of document review now happens in minutes. We caught compliance issues that could have cost us millions.",
    name: "Michael Rodriguez",
    title: "Chief Legal Counsel, Infrastructure Solutions Inc.",
  },
  {
    quote:
      "As a CEO, I needed fast, data-driven insights to make strategic decisions. CloudGlance gives me exactly that - clear recommendations on which opportunities to pursue and which to pass on.",
    name: "Jennifer Park",
    title: "CEO, Advanced Construction Technologies",
  },
];