"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The RAG-Powered Difference
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform is engineered on a custom Retrieval-Augmented Generation (RAG) architecture. It doesn't just guess; it retrieves facts from your data first, then intelligently generates answers. This is our core advantage, and it delivers on four promises other platforms can't match:
          </p>
        </div>
        <div className="w-full">
          <StickyScroll content={content} />
        </div>
      </div>
    </section>
  );
}
