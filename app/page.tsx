import dynamic from "next/dynamic";
import { HeroSection } from "@/components/pages/home/hero-section";
const ComparisonTimeline = dynamic(() =>
  import("@/components/pages/home/comparison-timeline").then(
    (m) => m.ComparisonTimeline
  )
);
const WorkflowSection = dynamic(
  () =>
    import("@/components/pages/home/workflow-section").then(
      (m) => m.WorkflowSection
    ),
  { ssr: false }
);
const TechnologySection = dynamic(() =>
  import("@/components/pages/home/technology-section").then(
    (m) => m.TechnologySection
  )
);
const BentoSection = dynamic(() =>
  import("@/components/pages/home/bento-section").then((m) => m.BentoSection)
);
const SolutionsByRole = dynamic(() =>
  import("@/components/pages/home/solutions-by-role").then(
    (m) => m.SolutionsByRole
  )
);
const TestimonialsInfinite = dynamic(() =>
  import("@/components/pages/home/testimonials-infinite").then(
    (m) => m.TestimonialsInfinite
  )
);
const FAQSection = dynamic(() =>
  import("@/components/pages/home/faq-section").then((m) => m.FAQSection)
);
const CTASection = dynamic(() =>
  import("@/components/pages/home/cta-section").then((m) => m.CTASection)
);
const ContactSection = dynamic(() =>
  import("@/components/pages/home/contact-section").then(
    (m) => m.ContactSection
  )
);
const FooterSection = dynamic(() =>
  import("@/components/footer-section").then((m) => m.FooterSection)
);
import { AnimatedSection } from "@/components/animated-section";

export const GUTTERS_MARGIN = "mx-6 md:mx-30 xl:mx-36";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="relative">
          <HeroSection />
        </main>
        <div className={`${GUTTERS_MARGIN} pt-12 sm:pt-16 md:pt-20 xl:pt-40`}>
          <AnimatedSection
            id="comparison-timeline-section"
            className="relative z-10"
            delay={0.1}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <ComparisonTimeline />
          </AnimatedSection>
          <AnimatedSection
            id="features-section"
            className="relative z-10 max-w-[1320px]"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <BentoSection />
          </AnimatedSection>
          <AnimatedSection
            id="workflow-section"
            className=""
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <WorkflowSection />
          </AnimatedSection>
          <AnimatedSection
            id="technology-section"
            className="relative z-10 max-w-[1320px]"
            delay={0.17}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <TechnologySection />
          </AnimatedSection>
          <AnimatedSection
            id="solutions-section"
            className="relative z-10 max-w-[1320px]"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <SolutionsByRole />
          </AnimatedSection>
          <AnimatedSection
            className="relative z-10 max-w-[1320px]"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <TestimonialsInfinite />
          </AnimatedSection>
          <AnimatedSection
            id="faq-section"
            className="relative z-10 max-w-[1320px]"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <FAQSection />
          </AnimatedSection>
          <AnimatedSection
            id="cta-section"
            className="relative z-10 max-w-[1320px]"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <CTASection />
          </AnimatedSection>
          <AnimatedSection
            id="contact-section"
            className="relative z-10"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <ContactSection />
          </AnimatedSection>
          <AnimatedSection
            className="relative z-10 max-w-[1320px]"
            delay={0.2}
            style={{ contentVisibility: "auto", containIntrinsicSize: "600px" }}
          >
            <FooterSection />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
