"use client";

import {
  FolderOpen,
  CheckCircle,
  Check,
  Loader2,
  Play,
  Circle,
  ShieldCheck,
  XCircle,
  Info,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=folders+btn, 3=selected+active,
// 4=processing, 5-8=steps, 9=done, 10=compliance bar, 11=all bidders, 12=expand bidder1
const STEP_DELAYS = [0, 500, 600, 800, 700, 800, 800, 800, 800, 800, 600, 500, 900];
const RESET_DELAY = 4500;

const PROCESSING_STEPS = [
  { label: "Catalog tender forms", description: "14 forms required" },
  { label: "Scan bidder packages", description: "3 bidders scanned" },
  { label: "Match & score forms", description: "42 matches evaluated" },
  { label: "Generate compliance report", description: "78.4% avg compliance" },
];

const BIDDER_RANKINGS = [
  {
    rank: 1, name: "L&T Infrastructure", compliance: 92.9, avgScore: 85.2, matched: 13, missing: 1, extra: 4,
    forms: [
      { name: "Bank Guarantee (Appendix A)", score: 83, quality: "High" },
      { name: "Tender Acceptance Letter", score: 88, quality: "High" },
      { name: "Schedule 'A': Material Supply", score: null, quality: "Missing" },
    ],
  },
  { rank: 2, name: "Tata Projects Ltd", compliance: 78.6, avgScore: 74.8, matched: 11, missing: 3, extra: 8 },
  { rank: 3, name: "Afcons Infra", compliance: 64.3, avgScore: 68.1, matched: 9, missing: 5, extra: 12 },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

export function ComplianceShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showInputs = step >= 1 && step < 4;
  const foldersVisible = step >= 2;
  const foldersSelected = step >= 3;
  const showProcessing = step >= 4 && step < 10;
  const showResults = step >= 10;

  const activeStepIndex = step - 5;
  const activePhase = step >= 10 ? 2 : step >= 4 ? 1 : step >= 1 ? 0 : -1;
  const allDone = step >= 10;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
      {/* Task card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Bidders Package Compliance
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Check if bidders submitted all required forms with quality scoring
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Analyzing</span>
              </>
            )}
            {foldersSelected && !showProcessing && !showResults && (
              <span className="text-[10px] font-medium text-muted-foreground">
                2 folders selected
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
          <AnimatedItem visible={foldersVisible}>
            <div className="space-y-2">
              {[
                { name: "Tender Documents Folder", path: "/KNPAGT-05/Tender Docs/", files: 8 },
                { name: "Bidders Parent Folder", path: "/KNPAGT-05/Bidders/", files: 15 },
              ].map((folder, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                    foldersSelected ? "border-primary bg-accent" : "border-border/60 bg-card"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                      foldersSelected
                        ? "border-primary bg-primary/20"
                        : "border-muted-foreground/30"
                    )}
                  >
                    {foldersSelected && (
                      <Check className="h-2.5 w-2.5 text-foreground" />
                    )}
                  </div>
                  <FolderOpen className="h-3.5 w-3.5 shrink-0 text-info-foreground" />
                  <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                    <span className="truncate text-xs font-medium">{folder.name}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{folder.path}</span>
                  </div>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {folder.files} files
                  </span>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={foldersVisible}>
            <button
              className={cn(
                "w-full rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300",
                foldersSelected
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Play className="h-3 w-3" />
                Start Analysis
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
          {/* Average compliance bar */}
          <AnimatedItem visible={step >= 10}>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-foreground">Evaluation Summary</span>
                <span className="text-[11px] font-bold text-primary">78.6/100</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: step >= 10 ? "78.6%" : "0%" }}
                />
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <div className="rounded border border-border/40 py-1.5 text-center">
                  <p className="text-sm font-bold text-foreground">3</p>
                  <p className="text-[9px] text-muted-foreground">Evaluated</p>
                </div>
                <div className="rounded border border-border/40 py-1.5 text-center">
                  <p className="text-sm font-bold text-primary">12</p>
                  <p className="text-[9px] text-muted-foreground">Required Forms</p>
                </div>
                <div className="rounded border border-border/40 py-1.5 text-center">
                  <p className="text-sm font-bold text-success-foreground">7</p>
                  <p className="text-[9px] text-muted-foreground">Avg Matched</p>
                </div>
              </div>
            </div>
          </AnimatedItem>

          {/* All bidder cards */}
          {BIDDER_RANKINGS.map((bidder, i) => {
            const isFirst = i === 0;
            const expanded = isFirst && step >= 12;
            return (
              <AnimatedItem key={bidder.rank} visible={step >= 11}>
                <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-muted-foreground">{bidder.rank}.</span>
                        <span className="text-xs font-semibold truncate">{bidder.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "rounded px-1.5 py-0.5 font-mono text-[9px] font-medium",
                            bidder.compliance >= 80
                              ? "bg-success/50 text-success-foreground"
                              : bidder.compliance >= 60
                                ? "bg-warning/50 text-warning-foreground"
                                : "bg-destructive/50 text-destructive-foreground"
                          )}
                        >
                          {bidder.compliance}%
                        </span>
                        {isFirst && (
                          <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", expanded && "rotate-180")} />
                        )}
                      </div>
                    </div>
                    {/* Matched / Missing / Extra mini-bars */}
                    <div className="mt-2 grid grid-cols-3 gap-1.5">
                      <div className="flex items-center gap-1.5 rounded border border-success-foreground/20 bg-success/10 px-2 py-1">
                        <CheckCircle className="h-3 w-3 shrink-0 text-success-foreground" />
                        <div>
                          <p className="text-[11px] font-bold text-success-foreground leading-none">{bidder.matched}</p>
                          <p className="text-[8px] text-muted-foreground">Matched</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded border border-destructive-foreground/20 bg-destructive/10 px-2 py-1">
                        <XCircle className="h-3 w-3 shrink-0 text-destructive-foreground" />
                        <div>
                          <p className="text-[11px] font-bold text-destructive-foreground leading-none">{bidder.missing}</p>
                          <p className="text-[8px] text-muted-foreground">Missing</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded border border-info-foreground/20 bg-info/10 px-2 py-1">
                        <Info className="h-3 w-3 shrink-0 text-info-foreground" />
                        <div>
                          <p className="text-[11px] font-bold text-info-foreground leading-none">{bidder.extra}</p>
                          <p className="text-[8px] text-muted-foreground">Extra</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded form details (first bidder only) */}
                  {isFirst && (
                    <div
                      className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-in-out"
                      style={{
                        gridTemplateRows: expanded ? "1fr" : "0fr",
                        opacity: expanded ? 1 : 0,
                      }}
                    >
                    <div className="min-h-0">
                      <div className="border-t border-border/40">
                        <div className="grid grid-cols-[1fr_2.5rem_3.5rem] gap-0 border-b bg-muted/50 px-3 py-1">
                          <span className="text-[9px] font-semibold text-muted-foreground">FORM</span>
                          <span className="text-[9px] font-semibold text-muted-foreground text-center">SCORE</span>
                          <span className="text-[9px] font-semibold text-muted-foreground text-center">QUALITY</span>
                        </div>
                        {bidder.forms?.map((f, fi) => (
                          <div
                            key={fi}
                            className={cn(
                              "grid grid-cols-[1fr_2.5rem_3.5rem] gap-0 px-3 py-1.5",
                              fi < (bidder.forms?.length ?? 0) - 1 && "border-b border-border/40"
                            )}
                          >
                            <span className="text-[10px] text-foreground truncate">{f.name}</span>
                            <span className={cn(
                              "text-center text-[10px] font-medium",
                              f.score === null ? "text-destructive-foreground" : f.score >= 80 ? "text-success-foreground" : "text-warning-foreground"
                            )}>
                              {f.score ?? "—"}
                            </span>
                            <span className={cn(
                              "text-center text-[9px] font-medium",
                              f.quality === "High" ? "text-success-foreground"
                                : f.quality === "Missing" ? "text-destructive-foreground"
                                : "text-warning-foreground"
                            )}>
                              {f.quality}
                            </span>
                          </div>
                        ))}
                        <p className="border-t border-border/40 px-3 py-1 text-center text-[9px] text-primary font-medium">View all 13 forms</p>
                      </div>
                    </div>
                    </div>
                  )}
                </div>
              </AnimatedItem>
            );
          })}
        </>
      )}
    </div>
  );
}
