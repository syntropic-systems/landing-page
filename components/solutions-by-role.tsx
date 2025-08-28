"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Clipboard, Shield, TrendingUp, DollarSign, Users, Clock, Target, Award } from "lucide-react"

const roles = [
  {
    id: "ceo",
    title: "For the CEO",
    icon: Briefcase,
    color: "purple",
    benefits: [
      "Make faster, data-driven decisions on which market opportunities to pursue",
      "Free up capital and focus strategic resources on winnable projects",
      "Increase company-wide win rates and revenue"
    ],
    keyMetrics: [
      {
        label: "Decision Speed",
        value: "10x faster",
        icon: TrendingUp
      },
      {
        label: "Resource Optimization", 
        value: "40% improvement",
        icon: Target
      }
    ],
    quote: {
      text: "Finally, I can see all our opportunities in one place and make strategic decisions based on data, not gut feeling.",
      author: "CEO, Fortune 500 Engineering Firm"
    }
  },
  {
    id: "bid-manager",
    title: "For the Bid Manager",
    icon: Clipboard,
    color: "blue",
    benefits: [
      "Reduce analysis time by up to 90%",
      "Increase bid volume without adding headcount",
      "Focus your team on the strategic elements of the win"
    ],
    keyMetrics: [
      {
        label: "Analysis Time",
        value: "90% reduction",
        icon: Clock
      },
      {
        label: "Bid Capacity",
        value: "3x increase", 
        icon: Users
      }
    ],
    features: [
      "Automated compliance checking",
      "Smart deadline tracking",
      "Team workload balancing"
    ]
  },
  {
    id: "legal-team",
    title: "For the Legal Team",
    icon: Shield,
    color: "green",
    benefits: [
      "Proactively identify contractual risks and non-compliant clauses",
      "Review liabilities in minutes, not weeks",
      "Ensure 100% compliance before submission"
    ],
    keyMetrics: [
      {
        label: "Risk Detection",
        value: "100% coverage",
        icon: Shield
      },
      {
        label: "Review Time",
        value: "95% faster",
        icon: Clock
      }
    ],
    capabilities: [
      "Automatic clause extraction",
      "Risk scoring and flagging",
      "Compliance verification"
    ]
  },
  {
    id: "sales-lead",
    title: "For the Sales Lead",
    icon: TrendingUp,
    color: "orange",
    benefits: [
      "Generate higher-quality proposals with unprecedented speed",
      "Measurably increase your team's win rate",
      "Focus on relationship building, not paperwork"
    ],
    keyMetrics: [
      {
        label: "Win Rate",
        value: "+40%",
        icon: Award
      },
      {
        label: "Proposal Quality",
        value: "A+ rated",
        icon: TrendingUp
      }
    ],
    results: [
      "More competitive proposals",
      "Faster turnaround times",
      "Higher client satisfaction"
    ]
  },
  {
    id: "finance-team",
    title: "For the Finance Team",
    icon: DollarSign,
    color: "teal",
    benefits: [
      "Instantly pull pricing data and cost estimates from vast project documents",
      "Quick review and analysis of financial terms",
      "Accurate budget forecasting for proposals"
    ],
    keyMetrics: [
      {
        label: "Data Extraction",
        value: "Instant",
        icon: Clock
      },
      {
        label: "Accuracy",
        value: "99.9%",
        icon: Target
      }
    ],
    tools: [
      "Automated cost calculation",
      "Margin analysis",
      "Risk-adjusted pricing"
    ]
  }
]

export function SolutionsByRole() {
  const [activeRole, setActiveRole] = useState(roles[0].id)
  const currentRole = roles.find(role => role.id === activeRole) || roles[0]
  const IconComponent = currentRole.icon

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

        {/* Role Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={activeRole === role.id ? "default" : "outline"}
              className={`px-4 py-2 rounded-full ${
                activeRole === role.id 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
              onClick={() => setActiveRole(role.id)}
            >
              <role.icon className="w-4 h-4 mr-2" />
              {role.title}
            </Button>
          ))}
        </div>

        {/* Active Role Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-foreground">
              {currentRole.title}
            </h3>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Benefits */}
            <div>
              <h4 className="text-lg font-medium text-foreground mb-3">Key Benefits</h4>
              <ul className="space-y-2">
                {currentRole.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 gap-4">
              {currentRole.keyMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <metric.icon className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote or Additional Content */}
            {currentRole.quote && (
              <blockquote className="border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded-r-lg">
                <p className="text-foreground italic mb-2">"{currentRole.quote.text}"</p>
                <cite className="text-sm text-muted-foreground">— {currentRole.quote.author}</cite>
              </blockquote>
            )}

            {/* Additional Features/Capabilities/Tools */}
            {(currentRole.features || currentRole.capabilities || currentRole.tools || currentRole.results) && (
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">
                  {currentRole.features ? "Features" : 
                   currentRole.capabilities ? "Capabilities" :
                   currentRole.tools ? "Tools" : "Results"}
                </h4>
                <div className="grid md:grid-cols-3 gap-2">
                  {(currentRole.features || currentRole.capabilities || currentRole.tools || currentRole.results)?.map((item, index) => (
                    <div key={index} className="px-3 py-2 bg-muted/20 rounded-md text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button size="lg" className="px-8">
            Get Role-Specific Demo
          </Button>
        </div>
      </div>
    </section>
  )
}