"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const content = [
  {
    title: "AI-Powered Analysis",
    description:
      "Our RAG system intelligently analyzes your documents, contracts, and legal data in real-time. Using advanced machine learning algorithms, we extract key insights and provide instant answers to complex legal questions with unprecedented accuracy.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/avatars/ceo.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="CEO demonstrating AI analysis"
        />
      </div>
    ),
  },
  {
    title: "Real-time Legal Insights",
    description:
      "Get instant access to relevant legal precedents, regulations, and case law. Our RAG technology continuously updates its knowledge base, ensuring you always have the most current and accurate legal information at your fingertips.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/avatars/legal.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="Legal professional using real-time insights"
        />
      </div>
    ),
  },
  {
    title: "Smart Contract Review",
    description:
      "Transform your contract review process with our intelligent RAG system. Automatically identify risks, missing clauses, and compliance issues. Our AI understands context and nuance, providing detailed explanations and recommendations for every document.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/avatars/finance.png"
          width={300}
          height={300}
          className="h-full w-full object-contain rounded-lg"
          alt="Finance team reviewing contracts"
        />
      </div>
    ),
  },
  {
    title: "Seamless Team Collaboration",
    description:
      "Enable your entire team to leverage RAG-powered insights. Sales, legal, and finance teams can access the same intelligent analysis, ensuring consistent decision-making across your organization. Share insights, collaborate on documents, and maintain alignment effortlessly.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/images/avatars/sales.png"
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