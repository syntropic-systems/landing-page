'use client';

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { InfiniteMovingLogos } from "@/components/ui/infinite-moving-logos";

const features = [
  {
    title: "Security",
    description:
      "Enterprise-grade protection with encryption, isolation and strict data privacy controls.",
    skeleton: <EnterpriseSkeletonOne />,
    className: "col-span-1 lg:col-span-3 border-border/80 border-b lg:border-r",
  },
  {
    title: "Integration",
    description:
      "Connect with ERPs, drives, SSO and document systems without changing your setup.",
    skeleton: <EnterpriseSkeletonTwo />,
    className: "col-span-1 lg:col-span-3 border-border/80 border-b",
  },
  {
    title: "Governance & Control",
    description:
      "Role-based access, audit logs and approvals that keep every action traceable.",
    skeleton: <EnterpriseSkeletonThree />,
    className: "col-span-1 lg:col-span-6",
  },
];

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "p-4 sm:p-8 relative overflow-hidden bg-card",
      className
    )}
  >
    {children}
  </div>
);

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => (
  <p className="text-left tracking-tight text-foreground font-semibold text-xl md:text-2xl md:leading-snug">
    {children}
  </p>
);

function FeatureDescription({ children }: { children?: React.ReactNode }) {
  return (
    <p
      className={cn(
        "text-sm md:text-base text-muted-foreground font-normal",
        "text-left max-w-sm mt-2 mb-6"
      )}
    >
      {children}
    </p>
  );
}

export default function EnterpriseReady() {
  return (
    <div className="relative z-20 max-w-7xl mx-auto w-full">
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-6 rounded-xl overflow-hidden border-border/80 shadow-lg">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnterpriseSkeletonOne() {
  const infraVendors = [
    { name: "Azure", src: "/integrations/azure.svg" },
    { name: "AWS S3", src: "/integrations/aws.svg" },
    { name: "GCP", src: "/integrations/google cloud.svg" },
    { name: "Cloudflare", src: "/integrations/cloudflare.svg" },
    { name: "Vercel", src: "/integrations/vercel.svg" },
  ];

  const badges = [
    { label: "SOC 2 Type II", status: "Aligned" },
    { label: "ISO 27001", status: "Aligned" },
    { label: "GDPR", status: "Ready" },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap gap-4">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-3 rounded-full border border-border/60 bg-muted px-4 py-2 text-sm uppercase tracking-wide"
          >
            <span className="font-semibold">{badge.label}</span>
            <span className="text-muted-foreground font-normal">{badge.status}</span>
          </div>
        ))}
      </div>

      <div>
        <p className="text-lg md:text-xl text-foreground leading-snug">
          We leverage world-class infrastructure providers to ensure your data is
          encrypted, protected, and available. Security isn’t an afterthought; it’s
          our foundation.
        </p>
      </div>

      <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-accent/30 to-background p-4 lg:p-5 shadow-inner">
        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
          Built on audited, industry-leading infrastructure
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {infraVendors.map((vendor) => (
            <div
              key={vendor.name}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-2"
            >
              {vendor.src ? (
                <Image
                  src={vendor.src}
                  alt={`${vendor.name} logo`}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded-sm bg-primary/10 text-[0.65rem] font-semibold uppercase text-primary">
                  {vendor.name.charAt(0)}
                </span>
              )}
              <span className="text-xs font-semibold text-foreground/80">
                {vendor.name}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function EnterpriseSkeletonTwo() {
  const logos = [
    { src: '/integrations/gmail.svg', alt: 'Gmail' },
    { src: '/integrations/outlook.svg', alt: 'Outlook' },
    { src: '/integrations/whatsapp.svg', alt: 'WhatsApp' },
  ];
  const logos2 = [
    { src: '/integrations/azure.svg', alt: 'Azure' },
    { src: '/integrations/google cloud.svg', alt: 'Google Cloud' },
    { src: '/integrations/aws.svg', alt: 'AWS' },
    { src: '/integrations/postgresql.svg', alt: 'PostgreSQL' }
  ];
  const logos3 = [
    { src: '/integrations/slack.svg', alt: 'Slack' },
    { src: '/integrations/teams.svg', alt: 'Microsoft Teams' },
    { src: '/integrations/linear.svg', alt: 'Linear' }
  ];
  return (
    <div className="flex flex-col h-full">
      <InfiniteMovingLogos
        items={logos}
        direction="left"
        speed="normal"
        pauseOnHover
        variant="infinite"
      />
      <InfiniteMovingLogos
        items={logos2}
        direction="right"
        speed="normal"
        pauseOnHover
        variant="infinite"
      />
      <InfiniteMovingLogos
        items={logos3}
        direction="left"
        speed="normal"
        pauseOnHover
        variant="infinite"
      />
    </div>
  );
}

function EnterpriseSkeletonThree() {
  const operationalControls = [
    {
      title: "Hosted on Azure",
      description:
        "We host on Azure, leveraging their physical security, environmental controls, and redundant power systems for availability.",
    },
    {
      title: "Data Encryption",
      description:
        "Application data, databases, and storage buckets are encrypted at rest with AES-256 and in transit with TLS 1.3.",
    },
    {
      title: "Network Protection",
      description:
        "Cloudflare provides WAF rules, DDoS protection, and global CDN acceleration for every request before it reaches our edge.",
    },
    {
      title: "Strict Access Control",
      description:
        "Internal production access is restricted, auditable, and short-lived. Least-privilege IAM governs every credential.",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {operationalControls.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/30 to-background p-5 shadow-sm"
        >
          <p className="text-base font-semibold text-foreground">{item.title}</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}


