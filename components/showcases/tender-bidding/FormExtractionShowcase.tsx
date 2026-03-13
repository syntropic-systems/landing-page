"use client";

import {
  FileText,
  CheckCircle,
  Check,
  Loader2,
  Play,
  Clock,
  FileOutput,
  Circle,
  Download,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "../useInView";
import { AnimatedItem } from "../AnimatedItem";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 1=task card, 2=files+disabled btn, 3=files selected+btn active,
// 4=click→processing, 5-8=processing steps, 9=last step done, 10=results header, 11=form cards
const STEP_DELAYS = [0, 500, 600, 800, 700, 600, 1000, 1000, 1000, 1000, 600, 400];
const RESET_DELAY = 4500;

const PROCESSING_STEPS = [
  { label: "Detect forms", description: "23 forms found" },
  { label: "Extract fields", description: "186 fields identified" },
  { label: "Fill values", description: "142 values filled" },
  { label: "Validate results", description: "94% confidence" },
];

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

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

export function FormExtractionShowcase({ frozen }: { frozen?: number } = {}) {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, frozen, !inView);

  const showInputs = step >= 1 && step < 5;
  const filesVisible = step >= 2;
  const filesSelected = step >= 3;
  const buttonActive = step >= 3;
  const showProcessing = step >= 5 && step < 10;
  const showResults = step >= 10;

  const activeStepIndex = step - 5;
  const activePhase = step >= 10 ? 2 : step >= 5 ? 1 : step >= 1 ? 0 : -1;
  const allDone = step >= 10;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 overflow-hidden p-4 min-w-0 w-full">
      {/* Task selector card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <FileOutput className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Form Extraction & Filling
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Detect forms from documents, extract fields, and auto-fill with AI
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">
                  Processing
                </span>
              </>
            )}
            {filesSelected && !showProcessing && !showResults && (
              <span className="text-[10px] font-medium text-muted-foreground">
                2 sources selected
              </span>
            )}
            {showResults && (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                <span className="text-[10px] font-medium text-success-foreground">
                  Complete
                </span>
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
                    ? allDone
                      ? "bg-success-foreground"
                      : "bg-info-foreground"
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

      {/* Phase 1: Input Selection */}
      {showInputs && (
        <>
          <AnimatedItem visible={filesVisible}>
            <div className="space-y-2">
              {[
                { name: "KNPAGT-05_NIT.pdf", size: "2.4 MB" },
                { name: "Tender_Forms.pdf", size: "1.8 MB" },
              ].map((file, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                    filesSelected
                      ? "border-primary bg-accent"
                      : "border-border/60 bg-card"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                      filesSelected
                        ? "border-primary bg-primary/20"
                        : "border-muted-foreground/30"
                    )}
                  >
                    {filesSelected && (
                      <Check className="h-2.5 w-2.5 text-foreground" />
                    )}
                  </div>
                  <FileText className="h-3.5 w-3.5 shrink-0 text-destructive-foreground" />
                  <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                    <span className="truncate text-xs font-medium">
                      {file.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">
                      {file.size}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-success-foreground" />
                    <span className="text-[9px] font-medium text-success-foreground">
                      Indexed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={filesVisible}>
            <button
              className={cn(
                "w-full rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300",
                buttonActive
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Play className="h-3 w-3" />
                Start Extraction
              </span>
            </button>
          </AnimatedItem>
        </>
      )}

      {/* Phase 2: Processing */}
      {showProcessing && (
        <AnimatedItem visible={showProcessing}>
          <div className="flex justify-center">
            <div className="w-full max-w-[75%] p-6">
              <div className="space-y-4">
                {PROCESSING_STEPS.map((s, i) => {
                  const status =
                    i < activeStepIndex
                      ? "completed"
                      : i === activeStepIndex
                        ? "processing"
                        : "pending";
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <div>
                        {status === "completed" ? (
                          <CheckCircle className="h-4 w-4 text-success-foreground" />
                        ) : status === "processing" ? (
                          <Loader2 className="h-4 w-4 animate-spin text-info-foreground" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 text-xs font-medium">
                        {s.label}
                      </div>
                      {status === "completed" && (
                        <span className="text-[11px] text-muted-foreground">
                          {s.description}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedItem>
      )}

      {/* Phase 3: Results */}
      {showResults && (
        <>
          <AnimatedItem visible={step >= 10}>
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
            <AnimatedItem key={i} visible={step >= 11}>
              <div
                className="overflow-hidden rounded-lg border border-border/60 bg-card"
                style={{
                  transitionDelay: showResults ? `${i * 200}ms` : "0ms",
                }}
              >
                {/* Form title + badges + action */}
                <div className="flex items-start gap-2 px-3 pt-2.5 pb-1.5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="truncate text-xs font-semibold">
                        {form.name}
                      </span>
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
                      <span className="font-medium text-foreground">
                        {form.stats.total}
                      </span>{" "}
                      fields
                    </span>
                    <span className="text-[10px] text-success-foreground">
                      {form.stats.found} found
                    </span>
                    {form.stats.verify > 0 && (
                      <span className="text-[10px] text-warning-foreground">
                        {form.stats.verify} verify
                      </span>
                    )}
                  </div>
                )}
              </div>
            </AnimatedItem>
          ))}

          <AnimatedItem visible={step >= 11}>
            <div
              className="-mt-2 text-center"
              style={{
                transitionDelay: showResults
                  ? `${FORM_CARDS.length * 200}ms`
                  : "0ms",
              }}
            >
              <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
                View all 23 forms →
              </span>
            </div>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
