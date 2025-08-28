"use client"

import React from "react"
import { WobbleCard } from "@/components/ui/wobble-card"

export function BentoSection() {
  return (
    <section className="w-full px-5 flex flex-col justify-center items-center overflow-visible bg-transparent">
      <div className="w-full py-8 md:py-16 relative flex flex-col justify-start items-start gap-6">
        <div className="w-[547px] h-[938px] absolute top-[614px] left-[80px] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[130px] z-0" />
        <div className="self-stretch py-8 md:py-14 flex flex-col justify-center items-center gap-2 z-10">
          <div className="flex flex-col justify-start items-center gap-4">
            <h2 className="w-full max-w-[655px] text-center text-foreground text-4xl md:text-6xl font-semibold leading-tight md:leading-[66px]">
              The AI-Powered Intelligence Engine
            </h2>
            <p className="w-full max-w-[600px] text-center text-muted-foreground text-lg md:text-xl font-medium leading-relaxed">
              This is the core of our platform, working in the background to turn your scattered documents into a strategic advantage. It's the brain of the operation.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full z-10">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-gradient-to-br from-[hsl(210_11%_12%)] to-[hsl(160_14%_8%)] min-h-[500px] lg:min-h-[300px]"
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Tender Synopsis
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Instant auto-generated summary of long RFPs/tenders. Understand 200+ page documents in seconds and never miss critical details.
              </p>
            </div>
            <img
              src="/images/ai-code-reviews.png"
              width={500}
              height={500}
              alt="Document analysis visualization"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-[hsl(160_48%_20%)] to-[hsl(165_96%_15%)]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Go/No-Go Analysis
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Get definitive bid/no-bid recommendations in minutes with clear risk-reward scoring.
            </p>
          </WobbleCard>
          
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-[hsl(240_2%_20%)] to-[hsl(160_14%_15%)]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Contextual Q&A
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              Stop searching, start asking. Get precise answers with source citations in seconds.
            </p>
          </WobbleCard>
          
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-[hsl(165_96%_18%)] to-[hsl(210_11%_12%)] min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                AI-Powered Content Library
              </h2>
              <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                Your organization's collective brain. A dynamic, searchable library of all your past bids, contracts, and documents.
              </p>
            </div>
            <img
              src="/images/mcp-connectivity.png"
              width={500}
              height={500}
              alt="Content library visualization"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 bg-gradient-to-br from-[hsl(160_14%_18%)] to-[hsl(160_48%_22%)] min-h-[500px] lg:min-h-[300px]">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Auto-Drafting & Content Generation
              </h2>
              <p className="mt-4 text-left text-base/6 text-neutral-200">
                Move from blank page to near-final draft in a fraction of the time. Reduce draft time by 90%.
              </p>
            </div>
            <img
              src="/images/realtime-coding-previews.png"
              width={500}
              height={500}
              alt="Auto-drafting interface"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            />
          </WobbleCard>
          
          <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-gradient-to-br from-[hsl(160_14%_25%)] to-[hsl(160_48%_18%)]">
            <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Solution Matching
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
              AI connects the dots to suggest the most relevant offerings for specific proposals.
            </p>
          </WobbleCard>
        </div>
      </div>
    </section>
  )
}