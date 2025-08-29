"use client"

import React from "react"
import { ExpandableCardDemo } from "@/components/ui/expandable-card"

const roleCards = [
  {
    description: "Executive Leadership",
    title: "For the CEO",
    src: "/images/avatars/ceo.png",
    ctaText: "Learn More",
    ctaLink: "#demo",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Key Benefits:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Make faster, data-driven decisions on which market opportunities to pursue</li>
            <li>• Free up capital and focus strategic resources on winnable projects</li>
            <li>• Increase company-wide win rates and revenue</li>
          </ul>
          
          <h4 className="font-semibold text-foreground">Key Metrics:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">10x faster</div>
              <div className="text-sm text-muted-foreground">Decision Speed</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">40% improvement</div>
              <div className="text-sm text-muted-foreground">Resource Optimization</div>
            </div>
          </div>
          
          <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted rounded-r-lg">
            <p className="italic text-foreground">"Finally, I can see all our opportunities in one place and make strategic decisions based on data, not gut feeling."</p>
            <cite className="text-sm text-muted-foreground">— CEO, Fortune 500 Engineering Firm</cite>
          </blockquote>
        </div>
      );
    },
  },
  {
    description: "Bid Management",
    title: "For the Bid Manager",
    src: "/images/avatars/bid.png",
    ctaText: "Learn More",
    ctaLink: "#demo",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Key Benefits:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Reduce analysis time by up to 90%</li>
            <li>• Increase bid volume without adding headcount</li>
            <li>• Focus your team on the strategic elements of the win</li>
          </ul>
          
          <h4 className="font-semibold text-foreground">Key Metrics:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">90% reduction</div>
              <div className="text-sm text-muted-foreground">Analysis Time</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">3x increase</div>
              <div className="text-sm text-muted-foreground">Bid Capacity</div>
            </div>
          </div>
          
          <h4 className="font-semibold text-foreground">Features:</h4>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Automated compliance checking</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Smart deadline tracking</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Team workload balancing</div>
          </div>
        </div>
      );
    },
  },
  {
    description: "Legal & Compliance",
    title: "For the Legal Team",
    src: "/images/avatars/legal.png",
    ctaText: "Learn More",
    ctaLink: "#demo",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Key Benefits:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Proactively identify contractual risks and non-compliant clauses</li>
            <li>• Review liabilities in minutes, not weeks</li>
            <li>• Ensure 100% compliance before submission</li>
          </ul>
          
          <h4 className="font-semibold text-foreground">Key Metrics:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">100% coverage</div>
              <div className="text-sm text-muted-foreground">Risk Detection</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">95% faster</div>
              <div className="text-sm text-muted-foreground">Review Time</div>
            </div>
          </div>
          
          <h4 className="font-semibold text-foreground">Capabilities:</h4>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Automatic clause extraction</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Risk scoring and flagging</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Compliance verification</div>
          </div>
        </div>
      );
    },
  },
  {
    description: "Sales Leadership",
    title: "For the Sales Lead",
    src: "/images/avatars/sales.png",
    ctaText: "Learn More",
    ctaLink: "#demo",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Key Benefits:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Generate higher-quality proposals with unprecedented speed</li>
            <li>• Measurably increase your team's win rate</li>
            <li>• Focus on relationship building, not paperwork</li>
          </ul>
          
          <h4 className="font-semibold text-foreground">Key Metrics:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">+40%</div>
              <div className="text-sm text-muted-foreground">Win Rate</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">A+ rated</div>
              <div className="text-sm text-muted-foreground">Proposal Quality</div>
            </div>
          </div>
          
          <h4 className="font-semibold text-foreground">Results:</h4>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">More competitive proposals</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Faster turnaround times</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Higher client satisfaction</div>
          </div>
        </div>
      );
    },
  },
  {
    description: "Finance & Analysis",
    title: "For the Finance Team",
    src: "/images/avatars/finance.png",
    ctaText: "Learn More",
    ctaLink: "#demo",
    content: () => {
      return (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Key Benefits:</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Instantly pull pricing data and cost estimates from vast project documents</li>
            <li>• Quick review and analysis of financial terms</li>
            <li>• Accurate budget forecasting for proposals</li>
          </ul>
          
          <h4 className="font-semibold text-foreground">Key Metrics:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">Instant</div>
              <div className="text-sm text-muted-foreground">Data Extraction</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-semibold text-foreground">99.9%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
          
          <h4 className="font-semibold text-foreground">Tools:</h4>
          <div className="space-y-2">
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Automated cost calculation</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Margin analysis</div>
            <div className="px-3 py-2 bg-muted rounded-md text-sm text-foreground">Risk-adjusted pricing</div>
          </div>
        </div>
      );
    },
  }
]

export function SolutionsByRole() {
  return (
    <section className="w-full py-16 px-5 relative">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-foreground text-4xl font-semibold leading-tight mb-4">
            Solutions for Every Role
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform is a force multiplier for your entire team.
          </p>
        </div>

        {/* Expandable Cards */}
        <ExpandableCardDemo cards={roleCards} />

      </div>
    </section>
  )
}