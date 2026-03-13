"use client";

import {
  CheckCircle,
  Clock,
  Loader2,
  ShieldAlert,
  AlertTriangle,
  Paperclip,
  ChevronDown,
  ArrowLeft,
  Download,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=phase row
// Phase 1 — Forms: 3=summary header, 4=form cards, 5=select first form
// Phase 2 — Detail: 6=form header, 7=form info, 8=physical copy card, 9=attachments card
const STEP_DELAYS = [0, 500, 400, 600, 500, 800, 800, 500, 600, 600];
const RESET_DELAY = 5000;

const FORM_CARDS = [
  {
    name: "Annexure-B: Price Bid",
    badges: [
      { label: "Template Provided", variant: "emerald" as const },
      { label: "Financial", variant: "blue" as const },
    ],
    source: "KNPAGT-05_NIT.pdf (p. 22–28)",
    stats: { found: 8, verify: 1, total: 9 },
    filled: true,
  },
  {
    name: "Scope of Work and Acceptance of Terms",
    badges: [
      { label: "Template Provided", variant: "emerald" as const },
      { label: "Technical", variant: "blue" as const },
      { label: "Attachments (2)", variant: "muted" as const },
    ],
    source: "KNPAGT-05_NIT.pdf (p. 12–15)",
    stats: { found: 6, verify: 0, total: 6 },
    filled: true,
  },
  {
    name: "MSME Registration Certificate",
    badges: [
      { label: "Self-Draft Form", variant: "amber" as const },
      { label: "Technical", variant: "blue" as const },
    ],
    source: "Tender_Forms.pdf (p. 1)",
    stats: { found: 3, verify: 2, total: 5 },
    filled: false,
  },
  {
    name: "Power of Attorney",
    badges: [
      { label: "Self-Draft Form", variant: "amber" as const },
      { label: "Physical Copy", variant: "red" as const },
    ],
    source: "Tender_Forms.pdf (p. 3–4)",
    stats: { found: 2, verify: 1, total: 3 },
    filled: false,
  },
];

const BADGE_STYLES = {
  emerald: "bg-success/50 text-success-foreground",
  blue: "bg-info/50 text-info-foreground",
  amber: "bg-warning/50 text-warning-foreground",
  red: "bg-destructive/50 text-destructive-foreground",
  muted: "bg-muted text-muted-foreground",
};

const FORM_DETAILS_LEFT = [
  { label: "Submission Context", value: "Technical" },
  { label: "Form Type", value: "Template Provided" },
  { label: "Tags", value: "Physical Copy, Attachments (4)" },
  { label: "Source", value: "Tendernotice_2.pdf (p. 6–7)" },
];

const FORM_DETAILS_RIGHT = [
  { label: "Clause Reference", value: "MCD-A-33/A-34" },
  { label: "Appendix Reference", value: "Appendix-B" },
  { label: "Form Requirements", value: "Stamp Required" },
];

const PHYSICAL_COPY_TAGS = [
  "EMD submission", "manual mode", "Account Payee Demand Draft", "Banker's Cheque", "Bank Guarantee",
];

const ATTACHMENTS = [
  { name: "Earnest Money Deposit Receipt", desc: "Copy of EMD deposited in the form of Insurance Surety Bonds" },
  { name: "Performance Guarantee", desc: "Form of Performance Security/Guarantee, as per Schedule F" },
];

const PHASES = [
  { label: "Forms" },
  { label: "Detail" },
];

export function RiskComplianceShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showForms = step >= 3 && step < 6;
  const formSelected = step >= 5 && step < 6; // highlight first form before detail
  const showDetail = step >= 6;
  const activePhase = showDetail ? 1 : step >= 1 ? 0 : -1;
  const allDone = step >= 9;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 overflow-hidden p-4 min-w-0 w-full">
      {/* Task card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Risk & Compliance Review
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Review form details, flag risks and verify compliance
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showForms && (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                <span className="text-[10px] font-medium text-success-foreground">23 Forms</span>
              </>
            )}
            {showDetail && !allDone && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Reviewing</span>
              </>
            )}
            {allDone && (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                <span className="text-[10px] font-medium text-success-foreground">Complete</span>
              </>
            )}
          </div>
        </div>
      </AnimatedItem>

      {/* Phase indicators */}
      <AnimatedItem visible={step >= 2}>
        <div className="flex items-center gap-1 px-1">
          {PHASES.map((phase, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={cn(
                  "h-1 w-full rounded-full transition-colors duration-500",
                  i <= activePhase
                    ? allDone ? "bg-success-foreground" : "bg-info-foreground"
                    : "bg-muted"
                )}
              />
              <span
                className={cn(
                  "text-[9px] transition-colors duration-300",
                  i === activePhase && !allDone
                    ? "font-medium text-info-foreground"
                    : i < activePhase || allDone
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                )}
              >
                {phase.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedItem>

      {/* ── Phase 1: Forms list (same as FormExtraction Phase 3) ── */}
      {showForms && (
        <>
          <AnimatedItem visible={step >= 3}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                <span className="min-w-0 truncate text-xs font-semibold">
                  23 Forms Found · 19 Extracted · 165 Filled
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">5m 30s</span>
              </div>
            </div>
          </AnimatedItem>

          {FORM_CARDS.map((form, i) => (
            <AnimatedItem key={i} visible={step >= 4}>
              <div
                className={cn(
                  "overflow-hidden rounded-lg border transition-all duration-400",
                  i === 0 && formSelected
                    ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                    : "border-border/60 bg-card",
                  i !== 0 && formSelected && "opacity-40"
                )}
                style={{ transitionDelay: showForms ? `${i * 200}ms` : "0ms" }}
              >
                {/* Form title + badges + action */}
                <div className="flex items-start gap-2 px-3 pt-2.5 pb-1.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="truncate text-xs font-semibold">{form.name}</span>
                      {form.badges.map((badge, j) => (
                        <span
                          key={j}
                          className={cn(
                            "shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-medium",
                            BADGE_STYLES[badge.variant]
                          )}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                    <p className="my-2 text-[10px] text-muted-foreground">
                      Source: {form.source}
                    </p>
                  </div>
                  {form.filled && (
                    <div className="flex min-w-0 shrink flex-col items-end gap-1">
                      <div className="flex items-center gap-1 rounded-sm bg-success-foreground px-2 py-1 text-success">
                        <Download className="h-3 w-3" />
                        <span className="text-[9px] font-medium">Download</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Sparkles className="h-2.5 w-2.5 text-success-foreground" />
                        <span className="truncate text-[9px] font-medium text-success-foreground">
                          AI-Filled · Template Extracted
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {/* Field stats bar */}
                {form.filled && (
                  <div className="flex items-center gap-3 border-t border-border/40 bg-muted/20 px-3 py-1.5">
                    <span className="text-[10px] text-muted-foreground">
                      <span className="font-medium text-foreground">{form.stats.total}</span>{" "}fields
                    </span>
                    <span className="text-[10px] text-success-foreground">{form.stats.found} found</span>
                    {form.stats.verify > 0 && (
                      <span className="text-[10px] text-warning-foreground">{form.stats.verify} verify</span>
                    )}
                  </div>
                )}
              </div>
            </AnimatedItem>
          ))}

          <AnimatedItem visible={step >= 4}>
            <div
              className="-mt-2 text-center"
              style={{ transitionDelay: showForms ? `${FORM_CARDS.length * 200}ms` : "0ms" }}
            >
              <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
                View all 23 forms →
              </span>
            </div>
          </AnimatedItem>
        </>
      )}

      {/* ── Phase 2: Per-form detail (like TenderSearch Phase 3) ── */}
      {showDetail && (
        <>
          {/* Header bar */}
          <AnimatedItem visible={step >= 6}>
            <div className="flex flex-wrap items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 text-xs font-semibold text-foreground truncate">Tender Form MCD-A-33/A-34</span>
              <span className="shrink-0 rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground">Pre-Award</span>
              <span className="shrink-0 rounded-md bg-info/50 px-1.5 py-0.5 text-[9px] font-medium text-info-foreground">Technical</span>
              <span className="shrink-0 rounded-md bg-success/50 px-1.5 py-0.5 text-[9px] font-medium text-success-foreground">Template Provided</span>
              <div className="ml-auto flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1 text-primary-foreground">
                <Sparkles className="h-3 w-3" />
                <span className="text-[9px] font-medium whitespace-nowrap">AI-Filled Form</span>
                <ChevronDown className="h-2.5 w-2.5" />
              </div>
            </div>
          </AnimatedItem>

          {/* Form details card */}
          <AnimatedItem visible={step >= 7}>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <div className="grid grid-cols-2 gap-x-4">
                <div className="space-y-1">
                  {FORM_DETAILS_LEFT.map((d) => (
                    <div key={d.label} className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{d.label}</span>
                      <span className="font-medium text-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {FORM_DETAILS_RIGHT.map((d) => (
                    <div key={d.label} className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{d.label}</span>
                      <span className="font-medium text-foreground">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedItem>

          {/* SME Feedback: Physical Copy Required */}
          <AnimatedItem visible={step >= 8}>
            <div className="overflow-hidden rounded-lg border border-destructive bg-destructive/50 px-3 py-2">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-destructive-foreground" />
                <span className="text-[11px] font-semibold text-destructive-foreground">Physical Copy Required</span>
                <span className="rounded border px-1 text-[8px] font-mono text-muted-foreground">Physical Original</span>
              </div>
              <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
                EMD must be deposited physically. Requires Insurance Surety Bonds, Account Payee Demand Draft, or Bank Guarantee.
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {PHYSICAL_COPY_TAGS.map((tag) => (
                  <span key={tag} className="rounded bg-card px-1.5 py-0.5 text-[8px] font-mono text-muted-foreground">{tag}</span>
                ))}
              </div>
            </div>
          </AnimatedItem>

          {/* SME Feedback: Attachments Required */}
          <AnimatedItem visible={step >= 9}>
            <div className="overflow-hidden rounded-lg border border-info bg-info/50">
              <div className="px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <Paperclip className="h-3.5 w-3.5 shrink-0 text-info-foreground" />
                  <span className="text-[11px] font-semibold text-foreground">Attachments Required</span>
                  <span className="rounded bg-info/20 px-1.5 py-0.5 text-[8px] font-medium text-info-foreground">4 items</span>
                </div>
                <div className="mt-1.5 space-y-1">
                  {ATTACHMENTS.map((a) => (
                    <div key={a.name} className="rounded border bg-card px-2 py-1">
                      <p className="text-[10px] font-medium text-foreground">{a.name}</p>
                      <p className="text-[9px] text-muted-foreground">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center gap-0.5 border-t border-border/40 py-1 text-muted-foreground">
              <p className="text-[9px] text-primary">View All 4 Attachments</p>
              <ChevronDown className="h-2.5 w-2.5" />
              </div>
            </div>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
