import { FileText, Target, MessageCircle, Database, Edit3, Link, Upload, Bell, Search, BarChart3 } from "lucide-react"

const BentoCard = ({ title, description, icon: Icon, features, highlight }) => (
  <div className={`overflow-hidden rounded-2xl border border-white/20 flex flex-col justify-start items-start relative ${highlight ? 'ring-2 ring-primary/20' : ''}`}>
    {/* Background with blur effect */}
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        background: "rgba(231, 236, 235, 0.08)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    />
    {/* Additional subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />

    <div className="self-stretch p-6 flex flex-col justify-start items-start gap-4 relative z-10 flex-grow">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <div className="self-stretch flex flex-col justify-start items-start gap-2">
        <h3 className="text-foreground text-lg font-semibold leading-7">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-6">
          {description}
        </p>
      </div>

      {features && (
        <div className="space-y-2 mt-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)

export function BentoSection() {
  const cards = [
    {
      title: "Tender Synopsis",
      description: "Instant auto-generated summary of long RFPs/tenders. Understand 200+ page documents in seconds and never miss critical details.",
      icon: FileText,
      features: [
        "Understand 200+ page documents in seconds",
        "Extract key requirements automatically", 
        "Never miss critical details"
      ],
      highlight: true
    },
    {
      title: "Go/No-Go Instant Analysis",
      description: "Get a definitive bid/no-bid recommendation in minutes with a clear risk-reward score, empowering you to focus your resources where they'll have the most impact.",
      icon: Target,
      features: [
        "Clear bid/no-bid recommendations",
        "Risk-reward scoring",
        "Resource optimization"
      ],
      highlight: true
    },
    {
      title: "Contextual Q&A",
      description: "Stop searching, start asking. Pose questions in plain English and get precise answers with source citations from across your entire document library—in seconds.",
      icon: MessageCircle,
      features: [
        "Natural language queries",
        "Source citations included",
        "Cross-document search"
      ]
    },
    {
      title: "AI-Powered Content Library",
      description: "Think of it as your organization's collective brain. Our AI creates a dynamic, searchable library of all your past bids, contracts, and documents.",
      icon: Database,
      features: [
        "Searchable knowledge base",
        "Reuse winning content", 
        "Learn from past bids"
      ]
    },
    {
      title: "Auto-Drafting & Content Generation",
      description: "Move from a blank page to a near-final draft in a fraction of the time. Our AI auto-drafts entire sections by referencing your past proposals.",
      icon: Edit3,
      features: [
        "Generate complete sections",
        "Maintain your voice and style",
        "Reduce draft time by 90%"
      ],
      highlight: true
    },
    {
      title: "Intelligent Solution Matching",
      description: "Let the AI connect the dots. Our platform learns your product and service suite to suggest the most relevant offering for a specific proposal.",
      icon: Link,
      features: [
        "Auto-match products to requirements",
        "Optimize solution configuration",
        "Ensure perfect alignment"
      ]
    }
  ]

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
        <div className="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
