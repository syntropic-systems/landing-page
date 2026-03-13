"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileText,
  CheckCircle,
  Check,
  Loader2,
  Play,
  Circle,
  Clock,
  AlertTriangle,
  Shield,
  Lock,
  XCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useStepAnimation } from "../useStepAnimation";
import { useInView } from "../useInView";

const STEP_DELAYS = [0, 500, 600, 800, 700, 800, 800, 800, 800, 800, 600, 800];
const RESET_DELAY = 4000;

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

interface ShowcaseContent {
  taskTitle: string;
  taskDescription: string;
  fileName: string;
  fileInfo: string;
  filePrompt: string;
  buttonText: string;
  processingSteps: { label: string; description: string }[];
  summaryTitle: string;
  summaryValue: string;
  summaryBars: { color: string; width: string }[];
  summaryBreakdown: { value: string; label: string; color: string }[];
  resultCards: {
    title: string;
    risk: "high" | "medium";
    summary: string;
    type: string;
  }[];
  resultHeader: string;
  resultTime: string;
  resultLink: string;
  overlayDescription: string;
}

const CONTRACT_REVIEW_CONTENT: ShowcaseContent = {
  taskTitle: "Contract Review & Risk Analysis",
  taskDescription: "Identify obligations, risks, and key clauses from contract documents",
  fileName: "KNPAGT-05_Contract_Agreement.pdf",
  fileInfo: "8.2 MB",
  filePrompt: "Select contract document",
  buttonText: "Start Review",
  processingSteps: [
    { label: "Parse contract structure", description: "48 clauses found" },
    { label: "Identify obligations", description: "12 obligations flagged" },
    { label: "Detect risk clauses", description: "5 risks identified" },
    { label: "Generate summary", description: "Report ready" },
  ],
  summaryTitle: "Risk Assessment",
  summaryValue: "5 Risks",
  summaryBars: [
    { color: "bg-destructive-foreground", width: "40%" },
    { color: "bg-warning-foreground", width: "35%" },
    { color: "bg-success-foreground", width: "25%" },
  ],
  summaryBreakdown: [
    { value: "2", label: "High Risk", color: "text-destructive-foreground" },
    { value: "2", label: "Medium Risk", color: "text-warning-foreground" },
    { value: "1", label: "Low Risk", color: "text-success-foreground" },
  ],
  resultCards: [
    {
      title: "Clause 14.3 — Liquidated Damages",
      risk: "high",
      summary: "Penalty of 1% per week, capped at 10% of contract value",
      type: "Financial Risk",
    },
    {
      title: "Clause 8.1 — Performance Guarantee",
      risk: "medium",
      summary: "Bank guarantee of 5% valid for 24 months post-completion",
      type: "Obligation",
    },
    {
      title: "Clause 22.5 — Termination for Convenience",
      risk: "high",
      summary: "Client may terminate with 30-day notice without cause",
      type: "Termination Risk",
    },
  ],
  resultHeader: "Flagged Clauses",
  resultTime: "2m 18s",
  resultLink: "View full clause breakdown →",
  overlayDescription: "AI-powered contract review and risk analysis",
};

const ENGINEERING_SEARCH_CONTENT: ShowcaseContent = {
  taskTitle: "Engineering Document Search",
  taskDescription: "Identify methods, techniques, and procedures across technical documents",
  fileName: "Project_Specs_Bundle.zip",
  fileInfo: "186 MB",
  filePrompt: "Select document set",
  buttonText: "Start Search",
  processingSteps: [
    { label: "Index document structure", description: "2,340 pages indexed" },
    { label: "Extract technical methods", description: "89 methods found" },
    { label: "Map procedures & standards", description: "34 procedures mapped" },
    { label: "Build knowledge graph", description: "Graph ready" },
  ],
  summaryTitle: "Search Results",
  summaryValue: "156 Matches",
  summaryBars: [
    { color: "bg-primary", width: "45%" },
    { color: "bg-warning-foreground", width: "30%" },
    { color: "bg-success-foreground", width: "25%" },
  ],
  summaryBreakdown: [
    { value: "89", label: "Methods", color: "text-primary" },
    { value: "34", label: "Procedures", color: "text-warning-foreground" },
    { value: "33", label: "Standards", color: "text-success-foreground" },
  ],
  resultCards: [
    {
      title: "IS 456:2000 — Concrete Mix Design",
      risk: "high",
      summary: "Referenced in 12 documents, mandatory compliance for structural work",
      type: "Standard",
    },
    {
      title: "CPWD Method — Rate Analysis",
      risk: "medium",
      summary: "Applied across 8 BOQ items, cross-referenced with schedule rates",
      type: "Method",
    },
    {
      title: "IRC SP:62 — Road Safety Audit",
      risk: "high",
      summary: "Required at 3 project stages, linked to milestone approvals",
      type: "Procedure",
    },
  ],
  resultHeader: "Top Matches",
  resultTime: "1m 42s",
  resultLink: "View full search results →",
  overlayDescription: "Analytics across complex engineering documents",
};

export const SHOWCASE_PRESETS = {
  "contract-review": CONTRACT_REVIEW_CONTENT,
  "engineering-search": ENGINEERING_SEARCH_CONTENT,
} as const;

interface ComingSoonShowcaseProps {
  preset?: keyof typeof SHOWCASE_PRESETS;
  content?: ShowcaseContent;
  frozen?: number;
}

export function ComingSoonShowcase({ preset = "contract-review", content, frozen }: ComingSoonShowcaseProps) {
  const c = content || SHOWCASE_PRESETS[preset];
  const { ref: inViewRef, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, frozen, !inView);
  const containerRef = useRef<HTMLDivElement>(null);

  const showInputs = step >= 1 && step < 4;
  const fileVisible = step >= 2;
  const fileSelected = step >= 3;
  const showProcessing = step >= 4 && step < 10;
  const showResults = step >= 10;

  const activeStepIndex = step - 5;
  const activePhase = step >= 10 ? 2 : step >= 4 ? 1 : step >= 1 ? 0 : -1;
  const allDone = step >= 10;

  // Overlay: fades in with result cards (step 11), fades out after content disappears on reset
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState<number>(0);
  const prevStepRef = useRef(0);

  useEffect(() => {
    if (step >= 11 && prevStepRef.current < 11) {
      if (containerRef.current) {
        setOverlayHeight(containerRef.current.offsetHeight);
      }
      setOverlayVisible(true);
    } else if (step === 0 && prevStepRef.current > 0) {
      // Reset immediately — the fade-out is handled by CSS transition
      setOverlayVisible(false);
    }
    prevStepRef.current = step;
  }, [step]);

  return (
    <div ref={(el) => {
      containerRef.current = el;
      (inViewRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    }} className="relative flex flex-1 flex-col gap-3 p-4 overflow-hidden min-w-0 w-full">
      {/* Task card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              {c.taskTitle}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {c.taskDescription}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Scanning</span>
              </>
            )}
            {fileSelected && !showProcessing && !showResults && (
              <span className="text-[10px] font-medium text-muted-foreground">
                1 file selected
              </span>
            )}
            {showResults && (
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

      {/* Phase 1: Configure */}
      {showInputs && (
        <>
          <AnimatedItem visible={fileVisible}>
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                fileSelected ? "border-primary bg-accent" : "border-border/60 bg-card"
              )}
            >
              <div
                className={cn(
                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                  fileSelected
                    ? "border-primary bg-primary/20"
                    : "border-muted-foreground/30"
                )}
              >
                {fileSelected && (
                  <Check className="h-2.5 w-2.5 text-foreground" />
                )}
              </div>
              <FileText className="h-3.5 w-3.5 shrink-0 text-destructive-foreground" />
              <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                <span className="truncate text-xs font-medium">{c.fileName}</span>
                <span className="shrink-0 text-[10px] text-muted-foreground">{c.fileInfo}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <CheckCircle className="h-3 w-3 text-success-foreground" />
                <span className="text-[9px] font-medium text-success-foreground">Indexed</span>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem visible={fileVisible}>
            <button
              className={cn(
                "w-full rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300",
                fileSelected
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Play className="h-3 w-3" />
                {c.buttonText}
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
                {c.processingSteps.map((s, i) => {
                  const status =
                    i < activeStepIndex ? "completed"
                    : i === activeStepIndex ? "processing"
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
                      <div className="flex-1 text-xs font-medium">{s.label}</div>
                      {status === "completed" && (
                        <span className="text-[11px] text-muted-foreground">{s.description}</span>
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
          {/* Summary */}
          <AnimatedItem visible={step >= 10}>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold">{c.summaryTitle}</span>
                <span className="text-sm font-bold text-destructive-foreground">{c.summaryValue}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="flex h-full">
                  {c.summaryBars.map((bar, i) => (
                    <div key={i} className={cn("h-full", bar.color)} style={{ width: bar.width }} />
                  ))}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {c.summaryBreakdown.map((item, i) => (
                  <div key={i} className="text-center">
                    <p className={cn("text-sm font-bold", item.color)}>{item.value}</p>
                    <p className="text-[9px] text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedItem>

          {/* Result header */}
          <AnimatedItem visible={step >= 11}>
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold">{c.resultHeader}</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">{c.resultTime}</span>
              </div>
            </div>
          </AnimatedItem>

          {/* Result cards */}
          {c.resultCards.map((card, i) => (
            <AnimatedItem key={i} visible={step >= 11}>
              <div
                className="overflow-hidden rounded-lg border border-border/60 bg-card"
                style={{ transitionDelay: showResults ? `${i * 150}ms` : "0ms" }}
              >
                <div className="px-3 pt-2.5 pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold truncate min-w-0">{card.title}</span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9px] font-medium uppercase",
                        card.risk === "high"
                          ? "bg-destructive/50 text-destructive-foreground"
                          : "bg-warning/50 text-warning-foreground"
                      )}
                    >
                      {card.risk}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
                    {card.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 border-t border-border/40 bg-muted/20 px-3 py-1.5">
                  <span className="flex items-center gap-1 text-[10px] min-w-0">
                    {card.risk === "high" ? (
                      <XCircle className="h-2.5 w-2.5 shrink-0 text-destructive-foreground" />
                    ) : (
                      <AlertTriangle className="h-2.5 w-2.5 shrink-0 text-warning-foreground" />
                    )}
                    <span className="text-muted-foreground truncate">{card.type}</span>
                  </span>
                </div>
              </div>
            </AnimatedItem>
          ))}

          <AnimatedItem visible={step >= 11}>
            <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
              {c.resultLink}
            </span>
          </AnimatedItem>
        </>
      )}

      {/* Coming Soon overlay */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 z-10 flex flex-col items-center justify-center gap-3 rounded-lg bg-card/80 backdrop-blur-md transition-opacity duration-500 ease-out",
          overlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        style={{ height: overlayHeight || '100%' }}
      >
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 border border-primary/20">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">Coming Soon</p>
          <p className="text-[11px] text-muted-foreground mt-1 max-w-[220px]">
            {c.overlayDescription}
          </p>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <Sparkles className="h-3 w-3 text-primary" />
          <span className="text-[10px] text-primary font-medium">In Development</span>
        </div>
      </div>
    </div>
  );
}

// Keep backward-compatible export
export { ComingSoonShowcase as ContractReviewShowcase };
