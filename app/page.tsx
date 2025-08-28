import { HeroSection } from "@/components/hero-section"
import { ComparisonTimeline } from "@/components/comparison-timeline"
import { SocialProof } from "@/components/social-proof"
import { BentoSection } from "@/components/bento-section"
import { WorkflowSection } from "@/components/workflow-section"
import { SolutionsByRole } from "@/components/solutions-by-role"
import { TechnologySection } from "@/components/technology-section"
import { ComparisonSection } from "@/components/comparison-section"
import { LargeTestimonial } from "@/components/large-testimonial"
import { FAQSection } from "@/components/faq-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection />
        </main>
        <AnimatedSection id="comparison-timeline-section" className="relative z-10 mx-auto mt-16" delay={0.1}>
          <ComparisonTimeline />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto px-6 mt-16" delay={0.1}>
          <SocialProof />
        </AnimatedSection>
        <AnimatedSection id="workflow-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <WorkflowSection />
        </AnimatedSection>
        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <BentoSection />
        </AnimatedSection>
        <AnimatedSection id="solutions-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <SolutionsByRole />
        </AnimatedSection>
        <AnimatedSection id="technology-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <TechnologySection />
        </AnimatedSection>
        <AnimatedSection id="comparison-section" className="relative z-10 mx-auto mt-16" delay={0.2}>
          <ComparisonSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>
        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <FAQSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}
