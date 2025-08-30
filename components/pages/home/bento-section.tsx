"use client";

import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";
import { Section } from "@/components/ui/section";

export function BentoSection() {
  return (
    <Section
      title="The AI-Powered Intelligence Engine"
      subtitle="This is the core of our platform, working in the background to turn your scattered documents into a strategic advantage. It's the brain of the operation."
    >
      <div className="w-full relative flex flex-col justify-start items-start gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full z-10">
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-[hsl(210_11%_12%)] to-[hsl(160_14%_8%)] min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Tender Synopsis
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Instant auto-generated summary of long RFPs/tenders. Understand
                200+ page documents in seconds and never miss critical details.
              </p>
            </div>
            {/* <Image
              src="/images/synopsis.png"
              width={500}
              height={500}
              alt="Document analysis visualization"
              className="absolute right-8 grayscale filter bottom-[-30%] object-contain rounded-2xl"
            /> */}
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 h-[400px] bg-gradient-to-br from-[hsl(160_48%_20%)] to-[hsl(165_96%_15%)]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Go/No-Go Analysis
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Get definitive bid/no-bid recommendations in minutes with clear
              risk-reward scoring.
            </p>
            <div className="bg-primary-foreground/80 rounded-xl absolute w-[250px] h-[250px] -bottom-[120px] left-1/2 -translate-x-1/2">
              {/* <Image
                src="/images/gonogo.png"
                width={250}
                height={250}
                alt="Go/No-Go analysis dashboard"
                className="w-[250px] h-[250px] object-contain rounded-lg opacity-80"
              /> */}
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-[hsl(240_2%_20%)] to-[hsl(160_14%_15%)]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Contextual Q&A
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Stop searching, start asking. Get precise answers with source
              citations in seconds.
            </p>
            {/* <Image
              src="/images/qa.png"
              width={120}
              height={120}
              alt="Contextual Q&A interface"
              className="absolute -right-2 -bottom-2 object-contain rounded-lg opacity-80"
            /> */}
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-[hsl(165_96%_18%)] to-[hsl(210_11%_12%)] min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                AI-Powered Content Library
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Your organization&apos;s collective brain. A dynamic, searchable
                library of all your past bids, contracts, and documents.
              </p>
            </div>
            {/* <Image
              src="/images/contextual.png"
              width={300}
              height={300}
              alt="Content library visualization"
              className="absolute -right-4 md:-right-[30%] lg:-right-[15%] -bottom-4 object-contain rounded-xl opacity-80"
            /> */}
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-[hsl(160_14%_18%)] to-[hsl(160_48%_22%)] min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Auto-Drafting & Content Generation
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Move from blank page to near-final draft in a fraction of the
                time. Reduce draft time by 90%.
              </p>
            </div>
            {/* <Image
              src="/images/realtime-coding-previews.png"
              width={500}
              height={500}
              alt="Auto-drafting interface"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            /> */}
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-[hsl(160_14%_25%)] to-[hsl(160_48%_18%)]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Solution Matching
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              AI connects the dots to suggest the most relevant offerings for
              specific proposals.
            </p>
            {/* <Image
              src="/images/solutionmatching.png"
              width={120}
              height={120}
              alt="Solution matching visualization"
              className="absolute -right-2 -bottom-2 object-contain rounded-lg opacity-80"
            /> */}
          </WobbleCard>
        </div>
      </div>
    </Section>
  );
}
