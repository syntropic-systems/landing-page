"use client"

import React from "react"

export function TechnologySection() {
  return (
    <section className="w-full py-16 px-5 relative">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-foreground text-4xl font-semibold leading-tight mb-4">
            Technology: The RAG-Powered Difference
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
            Most AI tools just summarize data; ours understands it.
          </p>
          <p className="text-foreground max-w-4xl mx-auto">
            Our platform is engineered on a custom Retrieval-Augmented Generation (RAG) architecture. Think of it as giving our AI a perfect, long-term memory of your entire organization. It doesn't just guess; it retrieves facts from your data first, then intelligently generates answers. This is our core advantage, and it delivers on four promises other platforms can't match:
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