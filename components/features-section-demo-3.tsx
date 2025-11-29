'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { ThemeAwareImage } from "@/components/theme-aware-image";


export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Document Intelligence",
      description:
        "Cloudglance is built to understand information across a wide range of document types. It can interpret text, tables, drawings and long technical content from PDFs, Excel sheets, forms and engineering documents such as SLDs, schematics, layouts, BOQs and equipment schedules. The platform turns all of this complexity into clean, structured data that is easy to work with. \n\n This structured understanding is the base for the automations built on top of it. It supports tender and RFX workflows today and will extend to contracts, compliance and other document-heavy processes across industries.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r",
    },
    {
      title: "Project Spaces",
      description:
        "Cloudglance gives each tender or document-heavy process a dedicated space where the entire project can run end to end. Documents, automations and team activity stay connected, so work moves through its stages with clarity and continuity. \n\nReviews, approvals and updates remain organised within the same environment, creating a predictable, steady workflow from intake to completion.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2",
    },
    {
      title: "Centralized Repository",
      description:
        "The Centralised Repository is the home for every document and reference a team relies on. Project files, company details, past projects and question sets stay organised in one place, forming the knowledge base the platform draws from. \n\n Files can follow any structure the organisation prefers, and each one remains linked to the work it supports. Information stays current, accessible and ready to power the automations and decisions that depend on it.",
      skeleton: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r",
    },
    {
      title: "AI Assistant",
      description:
        "The AI Assistant gives instant, cited answers drawn from the organisation’s documents. It understands the material stored in the Central Repository and brings the relevant information forward as soon as a question is asked, whether the query relates to a project, a requirement or company data. \n\n For management and project teams, it works much like a well-briefed personal assistant who always has the right information ready without any searching or follow-ups. Decisions move faster, context is clear and work progresses without losing time or momentum.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 max-w-7xl mx-auto">
      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-xl border-border overflow-hidden shadow-xl">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="mt-auto w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden bg-card flex flex-col`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-left tracking-tight text-foreground font-semibold text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  const renderContent = () => {
    if (typeof children === "string") {
      const lines = children.split("\n");
      return lines.map((line, index) => (
        <React.Fragment key={`desc-line-${index}`}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return children;
  };

  return (
    <p
      className={cn(
        "text-sm md:text-base text-left md:text-sm my-2",
        "text-muted-foreground font-normal",
      )}
    >
      {renderContent()}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative w-full">
      <div className="w-full mx-auto shadow-2xl border border-border overflow-hidden rounded-lg shadow-primary/20 group">
        <div className="flex flex-1 w-full flex-col">
          <ThemeAwareImage
            src="/product/document_white.png"
            srcDark="/product/document_black.png"
            alt="Document Intelligence"
            width={1600}
            height={900}
            className="w-full object-cover object-left-top rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="relative w-full">
      <div className="w-full mx-auto shadow-2xl border border-border overflow-hidden rounded-lg shadow-primary/20 group">
        <div className="flex flex-1 w-full flex-col">
          <ThemeAwareImage
            src="/product/file_manager_white.png"
            srcDark="/product/file_manager_black.png"
            alt="Centralized Repository"
            width={1600}
            height={900}
            className="w-full object-cover object-center rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonTwo = () => {
  return (
    <div className="relative w-full">
      <div className="w-full mx-auto shadow-2xl border border-border overflow-hidden rounded-lg shadow-primary/20 group">
        <div className="flex flex-1 w-full flex-col">
          <ThemeAwareImage
            src="/product/projects_white.png"
            srcDark="/product/projects_black.png"
            alt="Project Spaces"
            width={1600}
            height={900}
            className="w-full object-cover object-center rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="relative w-full">
      <div className="w-full mx-auto shadow-2xl border border-border overflow-hidden rounded-lg shadow-primary/20 group">
        <div className="flex flex-1 w-full flex-col bg-transparent">
          <ThemeAwareImage
            src="/product/chat_white.png"
            srcDark="/product/chat_black.png"
            alt="AI Assistant"
            width={1600}
            height={900}
            className="w-full object-contain object-center rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};
