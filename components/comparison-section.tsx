"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"

export function ComparisonSection() {
  return (
    <section className="w-full py-16 px-5 relative bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">WITH US / WITHOUT US</Badge>
          <h2 className="text-foreground text-4xl font-semibold leading-tight mb-4">
            The New Standard for Proposal Teams
          </h2>
          <p className="text-muted-foreground text-lg">
            From Manual Grind to Strategic Advantage
          </p>
        </div>

        {/* Content will be added later */}
        <div className="min-h-[400px] flex items-center justify-center">
          {/* Placeholder - content to be added later */}
        </div>
      </div>
    </section>
  )
}