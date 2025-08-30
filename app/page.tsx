import { HeroSection } from "@/components/pages/home/hero-section";
import { ComparisonTimeline } from "@/components/pages/home/comparison-timeline";
import { SocialProof } from "@/components/pages/home/social-proof";
import { BentoSection } from "@/components/pages/home/bento-section";
import { WorkflowSection } from "@/components/pages/home/workflow-section";
import { SolutionsByRole } from "@/components/pages/home/solutions-by-role";
import { TechnologySection } from "@/components/pages/home/technology-section";
import { TestimonialsInfinite } from "@/components/pages/home/testimonials-infinite";
import { FAQSection } from "@/components/pages/home/faq-section";
import { FooterSection } from "@/components/footer-section";
import { AnimatedSection } from "@/components/animated-section";

export const GUTTERS_MARGIN = "mx-6 md:mx-30 xl:mx-36";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="relative">
          <HeroSection />
        </main>
        <div className={`${GUTTERS_MARGIN}`}>
          <AnimatedSection
            id="comparison-timeline-section"
            className="relative z-10 mx-auto mt-16"
            delay={0.1}
          >
            <ComparisonTimeline />
          </AnimatedSection>
          <AnimatedSection
            className="relative z-10 max-w-[1320px] mx-auto px-6 mt-16"
            delay={0.1}
          >
            <SocialProof />
          </AnimatedSection>
          <AnimatedSection id="workflow-section" className="" delay={0.2}>
            <WorkflowSection />
          </AnimatedSection>
          <AnimatedSection
            id="technology-section"
            className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
            delay={0.17}
          >
            <TechnologySection />
          </AnimatedSection>
          <AnimatedSection
            id="features-section"
            className="relative z-10 max-w-[1320px] mx-auto mt-16"
            delay={0.2}
          >
            <BentoSection />
          </AnimatedSection>
          <AnimatedSection
            id="solutions-section"
            className="relative z-10 max-w-[1320px] mx-auto mt-16"
            delay={0.2}
          >
            <SolutionsByRole />
          </AnimatedSection>
          <AnimatedSection
            className="relative z-10 max-w-[1320px] mx-auto mt-16"
            delay={0.2}
          >
            <TestimonialsInfinite />
          </AnimatedSection>
          <AnimatedSection
            id="faq-section"
            className="relative z-10 max-w-[1320px] mx-auto mt-16"
            delay={0.2}
          >
            <FAQSection />
          </AnimatedSection>
          <AnimatedSection
            className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
            delay={0.2}
          >
            <FooterSection />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
