"use client";

import React, { useState } from "react";

const roles = [
  {
    id: "ceo",
    title: "For the CEO",
    description: "Executive Leadership",
    src: "/images/avatars/ceo2.png",
    content: {
      benefits: [
        "Make faster, data-driven decisions on which market opportunities to pursue",
        "Free up capital and focus strategic resources on winnable projects",
        "Increase company-wide win rates and revenue"
      ],
      metrics: [
        { value: "10x faster", label: "Decision Speed" },
        { value: "40% improvement", label: "Resource Optimization" }
      ]
    }
  },
  {
    id: "bid-manager",
    title: "For the Bid Manager", 
    description: "Bid Management",
    src: "/images/avatars/bid2.png",
    content: {
      benefits: [
        "Reduce analysis time by up to 90%",
        "Increase bid volume without adding headcount",
        "Focus your team on the strategic elements of the win"
      ],
      metrics: [
        { value: "90% reduction", label: "Analysis Time" },
        { value: "3x increase", label: "Bid Capacity" }
      ]
    }
  },
  {
    id: "legal",
    title: "For the Legal Team",
    description: "Legal & Compliance", 
    src: "/images/avatars/legal2.png",
    content: {
      benefits: [
        "Proactively identify contractual risks and non-compliant clauses",
        "Review liabilities in minutes, not weeks",
        "Ensure 100% compliance before submission"
      ],
      metrics: [
        { value: "100% coverage", label: "Risk Detection" },
        { value: "95% faster", label: "Review Time" }
      ]
    }
  },
  {
    id: "sales",
    title: "For the Sales Lead",
    description: "Sales Leadership",
    src: "/images/avatars/sales2.png",
    content: {
      benefits: [
        "Generate higher-quality proposals with unprecedented speed",
        "Measurably increase your team's win rate",
        "Focus on relationship building, not paperwork"
      ],
      metrics: [
        { value: "+40%", label: "Win Rate" },
        { value: "A+ rated", label: "Proposal Quality" }
      ]
    }
  },
  {
    id: "finance",
    title: "For the Finance Team",
    description: "Finance & Analysis",
    src: "/images/avatars/finance2.png",
    content: {
      benefits: [
        "Instantly pull pricing data and cost estimates from vast project documents",
        "Quick review and analysis of financial terms",
        "Accurate budget forecasting for proposals"
      ],
      metrics: [
        { value: "Instant", label: "Data Extraction" },
        { value: "99.9%", label: "Accuracy" }
      ]
    }
  },
];

export function SolutionsByRole() {
  const [activeTab, setActiveTab] = useState(roles[0].id);
  const activeRole = roles.find(role => role.id === activeTab) || roles[0];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Solutions for Every Role
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform is a force multiplier for your entire team.
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-between gap-4 md:gap-6 max-w-5xl mx-auto">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveTab(role.id)}
                className={`relative px-4 py-3 transition-all duration-200 ${
                  activeTab === role.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="font-medium text-sm md:text-base whitespace-nowrap">
                  {role.title}
                </span>
                {activeTab === role.id && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-muted/20 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              {/* Left side - Large Image */}
              <div className="flex-shrink-0">
                <img
                  src={activeRole.src}
                  alt={activeRole.title}
                  className="w-72 h-72 md:w-96 md:h-96 rounded-lg object-cover mx-auto md:mx-0"
                />
              </div>

              {/* Right side - Title, Description, and Key Benefits */}
              <div className="flex-1 max-w-2xl space-y-6">
                {/* Title and Description */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    {activeRole.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-2">
                    {activeRole.description}
                  </p>
                  <div className="text-sm text-primary font-medium">
                    {activeRole.content.metrics[0]?.value} {activeRole.content.metrics[0]?.label}
                  </div>
                </div>

                {/* Key Benefits */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-3">
                    {activeRole.content.benefits.map((benefit, index) => (
                      <li key={index} className="text-muted-foreground flex items-start gap-3">
                        <span className="text-primary font-bold mt-1 text-lg">•</span>
                        <span className="text-base leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
