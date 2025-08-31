"use client";

import React from "react";
import { H1, Subtitle } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Header } from "../../header";
import Link from "next/link";
import { useDemoModal } from "@/hooks/use-demo-modal";
import ShaderBackground from "@/components/shader-background";

function HeroContent() {
  const { openModal } = useDemoModal();

  return (
    <>
      <div className="absolute top-1/2 -translate-y-1/2 max-w-[1320px] mx-auto">
        <div className="relative z-10 space-y-4 md:space-y-5 lg:space-y-6 mb-6 md:mb-7 lg:mb-9 max-w-md md:max-w-[500px] lg:max-w-[588px] xl:max-w-[1000px] mt-16 px-4">
          <H1 className="text-foreground text-3xl md:text-4xl lg:text-6xl font-semibold leading-tight">
            The AI-Powered Command Centre for Your Bid Process.
          </H1>
          <Subtitle>
            Automate document analysis, generate winning proposals, and empower
            your team to focus on high-value strategy.
          </Subtitle>
        </div>

        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 items-center justify-center gap-x-6">
          <Button
            onClick={openModal}
            className="relative z-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10"
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
              className="relative z-10 px-8 py-3 rounded-full font-medium text-base border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Try Live Demo
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export function HeroSection() {
  return (
    <section
      className="flex flex-col items-center text-center relative overflow-hidden
         w-full h-[100vh] rounded-b-3xl"
    >
      {/* Header positioned at top of hero container */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header />
      </div>
      <ShaderBackground>
        <HeroContent />
      </ShaderBackground>
    </section>
  );
}
