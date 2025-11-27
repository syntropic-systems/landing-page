'use client';

import React from "react";
import { cn } from "@/lib/utils";
import { InfiniteMovingLogos } from "@/components/ui/infinite-moving-logos";

const features = [
  {
    title: "Security",
    description:
      "Enterprise-grade protection with encryption, isolation and strong data handling",
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
  const badges = [
    { label: "SOC 2 Type II", status: "Continuous" },
    { label: "ISO 27001", status: "Certified" },
    { label: "GDPR", status: "Ready" },
  ];

  const controls = [
    { label: "Encryption", value: "AES-256" },
    { label: "Key Mgmt", value: "KMS / HSM" },
    { label: "SSO", value: "SAML / SCIM" },
    { label: "Audit", value: "Real-time" },
  ];

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs uppercase tracking-wide"
          >
            <span className="font-semibold">{badge.label}</span>
            <span className="text-muted-foreground font-normal">
              {badge.status}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-auto">
        {controls.map((control) => (
          <div
            key={control.label}
            className="rounded-xl border border-border/50 bg-background/80 p-4 shadow-sm"
          >
            <p className="text-xs uppercase text-muted-foreground">
              {control.label}
            </p>
            <p className="text-xl font-semibold mt-2">{control.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnterpriseSkeletonTwo() {
  const logos = [
    { src: '/client logos/logo01.svg', alt: 'Integration logo 1' },
    { src: '/client logos/logo02.svg', alt: 'Integration logo 2' },
    { src: '/client logos/logo03.svg', alt: 'Integration logo 3' }
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
        items={logos}
        direction="right"
        speed="normal"
        pauseOnHover
        variant="infinite"
      />
      <InfiniteMovingLogos
        items={logos}
        direction="left"
        speed="normal"
        pauseOnHover
        variant="infinite"
      />
    </div>
  );
}

function EnterpriseSkeletonThree() {
  const checklist = [
    {
      step: "01",
      title: "Observability",
      description: "Full audit trails with immutable event history.",
    },
    {
      step: "02",
      title: "Automation Guardrails",
      description: "Role-based approvals before actions are executed.",
    },
    {
      step: "03",
      title: "Dedicated Success",
      description: "Launch engineers embedded with your team.",
    },
  ];

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center h-full">
      <div className="flex-1 space-y-6">
        {checklist.map((item) => (
          <div key={item.step} className="flex gap-4 items-start">
            <span className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
              {item.step}
            </span>
            <div>
              <p className="font-semibold text-base">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-72 rounded-2xl border border-border/60 bg-card/60 p-6 shadow-lg">
        <p className="text-xs uppercase text-muted-foreground tracking-wide">
          Reliability Snapshot
        </p>
        <p className="text-4xl font-semibold mt-3">99.95%</p>
        <p className="text-sm text-muted-foreground">12-month uptime</p>
        <div className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Support SLA</span>
            <span className="font-semibold">15 min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Data retention</span>
            <span className="font-semibold">7 years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Backups</span>
            <span className="font-semibold">4x daily</span>
          </div>
        </div>
      </div>
    </div>
  );
}


