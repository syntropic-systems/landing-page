"use client";

import React from "react";
import { Section } from "@/components/ui/section";
import { Timeline } from "@/components/ui/timeline";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export function ComparisonTimeline() {
  const data = [
    {
      title: "Bid Cycle Time",
      leftContent: (
        <CardSpotlight className="h-full w-full" color="var(--success)">
          <div className="text-xs font-medium text-emerald-400 mb-3">
            With Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-white mb-2">
            Under 1 week
          </p>
          <p className="text-neutral-300 mb-4">With automation</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300">
            75% faster
          </div>
        </CardSpotlight>
      ),
      rightContent: (
        <CardSpotlight className="h-full w-full" color="var(--gray-500)">
          <div className="text-xs font-medium text-gray-500 mb-3">
            Without Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-gray-300 mb-2">
            3-4 weeks
          </p>
          <p className="text-gray-500 mb-4">Manual work</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
            Slow & tedious
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Win Rate",
      leftContent: (
        <CardSpotlight className="h-full w-full" color="var(--success)">
          <div className="text-xs font-medium text-emerald-400 mb-3">
            With Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-white mb-2">
            Lifted by 40%
          </p>
          <p className="text-neutral-300 mb-4">
            With smarter go/no-go decisions
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300">
            +40% improvement
          </div>
        </CardSpotlight>
      ),
      rightContent: (
        <CardSpotlight className="h-full w-full" color="var(--gray-500)">
          <div className="text-xs font-medium text-gray-500 mb-3">
            Without Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-gray-300 mb-2">
            10-15%
          </p>
          <p className="text-gray-500 mb-4">Static win rate</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
            Stagnant
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Document Review",
      leftContent: (
        <CardSpotlight className="h-full w-full" color="var(--success)">
          <div className="text-xs font-medium text-emerald-400 mb-3">
            With Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-white mb-2">
            Minutes
          </p>
          <p className="text-neutral-300 mb-4">AI highlights key risks</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300">
            99% faster
          </div>
        </CardSpotlight>
      ),
      rightContent: (
        <CardSpotlight className="h-full w-full" color="var(--gray-500)">
          <div className="text-xs font-medium text-gray-500 mb-3">
            Without Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-gray-300 mb-2">
            Hours
          </p>
          <p className="text-gray-500 mb-4">200+ pages manually skimming</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
            Mind-numbing
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Team Focus",
      leftContent: (
        <CardSpotlight className="h-full w-full" color="var(--success)">
          <div className="text-xs font-medium text-emerald-400 mb-3">
            With Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-white mb-2">
            70% Strategy
          </p>
          <p className="text-neutral-300 mb-4">Time spent on high-value work</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300">
            Reversed ratio
          </div>
        </CardSpotlight>
      ),
      rightContent: (
        <CardSpotlight className="h-full w-full" color="var(--gray-500)">
          <div className="text-xs font-medium text-gray-500 mb-3">
            Without Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-gray-300 mb-2">
            70% Manual
          </p>
          <p className="text-gray-500 mb-4">Time spent copy-pasting</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
            Soul-crushing
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Team Capacity",
      leftContent: (
        <CardSpotlight className="h-full w-full" color="var(--success)">
          <div className="text-xs font-medium text-emerald-400 mb-3">
            With Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-white mb-2">
            15+ bids
          </p>
          <p className="text-neutral-300 mb-4">
            Per month without adding headcount
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300">
            3x capacity
          </div>
        </CardSpotlight>
      ),
      rightContent: (
        <CardSpotlight className="h-full w-full" color="var(--gray-500)">
          <div className="text-xs font-medium text-gray-500 mb-3">
            Without Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-gray-300 mb-2">
            4-5 bids
          </p>
          <p className="text-gray-500 mb-4">Per month</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
            Bottlenecked
          </div>
        </CardSpotlight>
      ),
    },
    {
      title: "Compliance Risk",
      leftContent: (
        <CardSpotlight className="h-full w-full" color="var(--success)">
          <div className="text-xs font-medium text-emerald-400 mb-3">
            With Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-white mb-2">
            Zero missed
          </p>
          <p className="text-neutral-300 mb-4">
            Requirements with AI risk-flagging
          </p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300">
            100% compliance
          </div>
        </CardSpotlight>
      ),
      rightContent: (
        <CardSpotlight className="h-full w-full" color="var(--gray-500)">
          <div className="text-xs font-medium text-gray-500 mb-3">
            Without Us
          </div>
          <p className="text-lg lg:text-xl font-bold text-gray-300 mb-2">
            Costly penalties
          </p>
          <p className="text-gray-500 mb-4">On missed clauses</p>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-400">
            High risk
          </div>
        </CardSpotlight>
      ),
    },
  ];

  return (
    <Section
      title="The New Standard for Proposal Teams"
      subtitle="From Manual Grind to Strategic Advantage"
    >
      <div>
        <Timeline data={data} />
      </div>
    </Section>
  );
}
