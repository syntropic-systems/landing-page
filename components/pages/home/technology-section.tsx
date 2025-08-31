"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const content = [
  {
    title: "The Foundation: Your Intelligent Data Core",
    description:
      "Instead of generic summaries, our RAG system builds a deep, contextual understanding of your entire document library. It reads, classifies, and connects every clause, contract, and past proposal to create a secure, centralized knowledge base—your organization's single source of truth.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/features/foundation2.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="CEO demonstrating AI analysis"
        />
      </div>
    ),
  },
  {
    title: "The Application: Precision Contract Intelligence",
    description:
      "Leverage your intelligent data core to review contracts with unparalleled accuracy. The AI doesn't just find keywords; it understands legal nuance to proactively flag risks, identify non-compliant clauses, and highlight missing obligations in minutes, not weeks.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/features/application.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="Legal professional using real-time insights"
        />
      </div>
    ),
  },
  {
    title: "The Augmentation: Instant, Verifiable Answers",
    description:
      "Move beyond simple search. Ask complex questions in plain English and get precise, verifiable answers cited directly to the source document. Our system retrieves facts first, then generates hallucination-free responses your entire team can trust.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="images/features/augment.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="Finance team reviewing contracts"
        />
      </div>
    ),
  },
  {
    title: "The Collaboration: A Unified Intelligence Layer",
    description:
      "Extend this trusted intelligence across your entire organization. Legal, Sales, and Finance teams all work from the same AI-powered insights, ensuring total alignment. Share analysis, collaborate on drafts, and make faster, smarter decisions together.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/features/collab.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="Sales team collaborating"
        />
      </div>
    ),
  },
];

export function TechnologySection() {
  return (
    <Section
      title="The RAG-Powered Difference"
      subtitle="Most AI tools just summarize data; ours understands it."
    >
      <Container className="relative">
        {/* Background glow - matches bento section pattern */}
        <div className="w-[300px] h-[400px] md:w-[547px] md:h-[938px] absolute top-[40%] left-[15%] origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] md:blur-[130px] z-0" />
        
        {/* Introduction text */}
        <div className="relative z-10 text-center mb-8 max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-muted-foreground">
            Our platform is engineered on a custom Retrieval-Augmented Generation (RAG) architecture. It doesn't just guess; it retrieves facts from your data first, then intelligently generates answers. This is our core advantage, and it delivers on four promises other platforms can't match:
          </p>
        </div>

        {/* Sticky Scroll Component */}
        <div className="relative z-10 w-full">
          <StickyScroll content={content} />
        </div>
      </Container>
    </Section>
  );
}