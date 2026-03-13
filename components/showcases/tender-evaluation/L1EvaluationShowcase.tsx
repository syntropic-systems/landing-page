"use client";

import {
  FolderOpen,
  CheckCircle,
  Check,
  Loader2,
  Play,
  Circle,
  Clock,
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=inputs+btn, 3=selected+active,
// 4=processing, 5-8=steps, 9=done, 10=winner, 11=rankings
const STEP_DELAYS = [0, 500, 600, 800, 700, 800, 800, 800, 800, 800, 600, 400];
const RESET_DELAY = 4500;

const PROCESSING_STEPS = [
  { label: "Score technical criteria", description: "5 criteria · 3 bidders" },
  { label: "Apply threshold check", description: "70/100 threshold" },
  { label: "Rank by financial bid", description: "2 qualified" },
  { label: "Determine L1 winner", description: "L&T Infrastructure" },
];

const RANKINGS = [
  {
    rank: 1,
    name: "L&T Infrastructure",
    status: "qualified",
    techScore: "82/100",
    financialBid: "₹47.25 Cr",
    result: "L1 Winner",
  },
  {
    rank: 2,
    name: "Tata Projects Ltd",
    status: "qualified",
    techScore: "78/100",
    financialBid: "₹51.80 Cr",
    result: "",
  },
  {
    rank: "-",
    name: "Afcons Infra",
    status: "disqualified",
    techScore: "62/100",
    financialBid: "₹44.10 Cr",
    result: "Below threshold",
  },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

export function L1EvaluationShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showInputs = step >= 1 && step < 4;
  const inputsVisible = step >= 2;
  const inputsSelected = step >= 3;
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
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              L1 Bidder Evaluation
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Technical scoring, threshold check, and lowest-cost selection
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Evaluating</span>
              </>
            )}
            {inputsSelected && !showProcessing && !showResults && (
              <span className="text-[10px] font-medium text-muted-foreground">
                3 bidders · 2 folders
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
          <AnimatedItem visible={inputsVisible}>
            <div className="space-y-2">
              {[
                { name: "Tender Documents", path: "/KNPAGT-05/", files: 12 },
                { name: "Root Bidders Folder", path: "/Bidders/", files: 9 },
              ].map((folder, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                    inputsSelected ? "border-primary bg-accent" : "border-border/60 bg-card"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                      inputsSelected
                        ? "border-primary bg-primary/20"
                        : "border-muted-foreground/30"
                    )}
                  >
                    {inputsSelected && (
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
              {/* Financial bids preview */}
              {inputsSelected && (
                <div className="rounded-lg border border-border/60 bg-card p-3">
                  <p className="text-[10px] font-medium text-muted-foreground mb-1.5">
                    Financial Bids (Optional)
                  </p>
                  <div className="space-y-1">
                    {["L&T Infrastructure", "Tata Projects", "Afcons Infra"].map((name) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-[11px]">{name}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          INR ••,••,••,•••
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={inputsVisible}>
            <button
              className={cn(
                "w-full rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300",
                inputsSelected
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Play className="h-3 w-3" />
                Start Evaluation
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
          {/* Winner card */}
          <AnimatedItem visible={step >= 10}>
            <div className="rounded-lg border border-success-foreground/30 bg-success/20 p-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-warning-foreground" />
                <span className="text-xs font-semibold text-foreground">
                  L1 Winner: L&T Infrastructure
                </span>
              </div>
              <p className="mt-1 pl-6 text-[11px] leading-relaxed text-muted-foreground">
                Highest qualified bidder with lowest financial bid of INR 47.25 Cr
              </p>
              <div className="mt-2 flex gap-2 pl-6">
                <span className="rounded border border-border/60 px-1.5 py-0.5 text-[9px] font-medium">
                  Financial Bid: INR 47.25 Cr
                </span>
                <span className="rounded border border-border/60 px-1.5 py-0.5 text-[9px] font-medium">
                  Technical: 82/100
                </span>
              </div>
            </div>
          </AnimatedItem>

          {/* Evaluation params */}
          <AnimatedItem visible={step >= 10}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Evaluated", value: "3", color: "text-foreground" },
                { label: "Qualified", value: "2", color: "text-success-foreground" },
                { label: "Disqualified", value: "1", color: "text-destructive-foreground" },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-card p-2.5 text-center">
                  <p className={cn("text-lg font-bold", m.color)}>{m.value}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </AnimatedItem>

          {/* Rankings table */}
          <AnimatedItem visible={step >= 11}>
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold">Rankings</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">6m 15s</span>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 11}>
            <div className="overflow-hidden rounded-lg border border-border/60">
              <div className="grid grid-cols-[1rem_minmax(0,1fr)_2rem_3rem_4rem_4.5rem] items-center gap-x-1.5 border-b bg-muted/50 px-3 py-2">
                {["#", "Bidder", "Status", "Score", "Bid", "Result"].map((h) => (
                  <span key={h} className="text-[9px] font-semibold text-muted-foreground whitespace-nowrap">
                    {h}
                  </span>
                ))}
              </div>
              {RANKINGS.map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-[1rem_minmax(0,1fr)_2rem_3rem_4rem_4.5rem] items-center gap-x-1.5 px-3 py-2",
                    i < RANKINGS.length - 1 && "border-b border-border/40"
                  )}
                >
                  <span className="text-[10px] font-medium">{row.rank}</span>
                  <span className="text-[10px] font-medium truncate">{row.name}</span>
                  <span className="flex items-center gap-0.5">
                    {row.status === "qualified" ? (
                      <CheckCircle2 className="h-3 w-3 text-success-foreground" />
                    ) : (
                      <XCircle className="h-3 w-3 text-destructive-foreground" />
                    )}
                  </span>
                  <span className="text-[10px] whitespace-nowrap">{row.techScore}</span>
                  <span className="text-[9px] font-mono text-muted-foreground whitespace-nowrap">{row.financialBid}</span>
                  <span
                    className={cn(
                      "text-[9px] font-medium whitespace-nowrap",
                      row.result === "L1 Winner"
                        ? "text-success-foreground"
                        : row.result
                          ? "text-destructive-foreground"
                          : "text-muted-foreground"
                    )}
                  >
                    {row.result || "—"}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 11}>
            <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
              View criterion summary & detailed comparison →
            </span>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
