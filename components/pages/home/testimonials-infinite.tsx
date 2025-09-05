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
      "Implementing CloudGlance was a strategic turning point for us. We've cut our tender analysis time from weeks to just a couple of days, allowing my team to focus on high-value strategy instead of low-value paperwork. Our bid capacity has tripled, and we're pursuing deals we previously couldn't even consider.",
    name: "Manish Bhari",
    title: "CEO, Cortex Construction Solutions",
  },
  {
    quote:
      "In our first month, the AI flagged a critical compliance risk in a high value bid that would have led to an immediate disqualification. That one catch alone made the platform worth it. It’s a true game changer for ensuring our bids are flawless.",
    name: "Shayak Ganguly",
    title: "Tender Manager, CCS",
  },
  // {
  //   quote:
  //     "As a CEO, I needed fast, data-driven insights to make strategic decisions. CloudGlance gives me exactly that - clear recommendations on which opportunities to pursue and which to pass on.",
  //   name: "Jennifer Park",
  //   title: "CEO, Advanced Construction Technologies",
  // },
];
