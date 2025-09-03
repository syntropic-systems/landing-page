"use client";

import { Button } from "@/components/ui/button";
import { useDemoModal } from "@/hooks/use-demo-modal";
import { DemoRequestForm } from "@/components/demo-request-form";
import { CyclingTypewriter } from "@/components/ui/cycling-typewriter";
import Link from "next/link";

export function CTASection() {
  const { isOpen, openModal, closeModal } = useDemoModal();

  // REVISED: More credible and industry-specific stats
  const stats = [
    "Trusted by Leaders in Engineering & Construction",
    "90% Reduction in Manual Work",
    "99.7% AI Accuracy"
  ];

  return (
    <>
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          {/* Background Glass Effect */}
          <div className="absolute inset-0 bg-card/20 backdrop-blur-sm rounded-3xl"></div>
          
          <div className="relative z-20 text-center py-12 md:py-16">
            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <CyclingTypewriter
                staticText="Ready to Transform Your"
                cyclingPhrases={["Bid Process?", "Tender Management?", "Proposal Strategy?"]}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground"
                highlightClassName="text-primary"
              />
            </h2>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Join our early adopters in transforming the bid process. Experience firsthand how our AI eliminates manual work and dramatically improves proposal quality, giving you a competitive edge from day one.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={openModal}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10"
              >
                Request Demo
              </Button>
              
              <Link
                href="https://app.cloudglancelab.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="px-8 py-3 rounded-full font-medium text-base border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Try Live Demo
                </Button>
              </Link>
            </div>
            
            {/* Stats Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground font-medium">{stat}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl"></div>
        </div>
      </section>

      <DemoRequestForm isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
