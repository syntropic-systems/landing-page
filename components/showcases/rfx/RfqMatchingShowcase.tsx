"use client";

import {
  FileText,
  FileSpreadsheet,
  CheckCircle,
  Check,
  Loader2,
  Play,
  Circle,
  Clock,
  GitCompare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=files+btn, 3=selected+active,
// 4=processing, 5-8=steps, 9=done, 10=match header, 11=specs
const STEP_DELAYS = [0, 500, 600, 800, 700, 800, 800, 800, 800, 800, 600, 400];
const RESET_DELAY = 4500;

const PROCESSING_STEPS = [
  { label: "Parse RFQ requirements", description: "42 specs extracted" },
  { label: "Match product catalog", description: "HT Switchgear 245kV" },
  { label: "Compare specifications", description: "42 specs compared" },
  { label: "Generate deviation report", description: "5 deviations found" },
];

const SPEC_ROWS = [
  { keyword: "Rated Voltage", rfq: "245 kV", product: "245 kV", status: "match" },
  { keyword: "Rated Current", rfq: "3150 A", product: "3150 A", status: "match" },
  { keyword: "BIL", rfq: "1050 kV", product: "1050 kV", status: "match" },
  { keyword: "Short Circuit", rfq: "50 kA / 3s", product: "40 kA / 3s", status: "deviation" },
  { keyword: "Operating Temp", rfq: "-5°C to 55°C", product: "-10°C to 50°C", status: "partial" },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

export function RfqMatchingShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showInputs = step >= 1 && step < 4;
  const filesVisible = step >= 2;
  const filesSelected = step >= 3;
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
          <GitCompare className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              RFQ Product Matching
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Match product specs against RFQ requirements and identify deviations
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Matching</span>
              </>
            )}
            {filesSelected && !showProcessing && !showResults && (
              <span className="text-[10px] font-medium text-muted-foreground">
                2 files selected
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
          <AnimatedItem visible={filesVisible}>
            <div className="space-y-2">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                  filesSelected ? "border-primary bg-accent" : "border-border/60 bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                    filesSelected ? "border-primary bg-primary/20" : "border-muted-foreground/30"
                  )}
                >
                  {filesSelected && <Check className="h-2.5 w-2.5 text-foreground" />}
                </div>
                <FileText className="h-3.5 w-3.5 shrink-0 text-destructive-foreground" />
                <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                  <span className="truncate text-xs font-medium">RFQ_Switchgear_245kV.pdf</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">3.1 MB</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-success-foreground" />
                  <span className="text-[9px] font-medium text-success-foreground">Indexed</span>
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                  filesSelected ? "border-primary bg-accent" : "border-border/60 bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                    filesSelected ? "border-primary bg-primary/20" : "border-muted-foreground/30"
                  )}
                >
                  {filesSelected && <Check className="h-2.5 w-2.5 text-foreground" />}
                </div>
                <FileSpreadsheet className="h-3.5 w-3.5 shrink-0 text-success-foreground" />
                <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                  <span className="truncate text-xs font-medium">Product_Specs_Catalog.xlsx</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">156 KB</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-success-foreground" />
                  <span className="text-[9px] font-medium text-success-foreground">Indexed</span>
                </div>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem visible={filesVisible}>
            <button
              className={cn(
                "w-full rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300",
                filesSelected
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Play className="h-3 w-3" />
                Match Product & Generate Reports
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
          {/* Match score + product */}
          <AnimatedItem visible={step >= 10}>
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold">HT Switchgear 245kV</p>
                  <p className="text-[10px] text-muted-foreground">#PRD-SW-245 · Excellent Match</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">87.2</p>
                  <p className="text-[9px] text-muted-foreground">/ 100</p>
                </div>
              </div>
              {/* Score bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: "87.2%" }} />
              </div>
            </div>
          </AnimatedItem>

          {/* Metric tiles */}
          <AnimatedItem visible={step >= 10}>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Total Specs", value: "42", color: "text-foreground" },
                { label: "Matched", value: "35", color: "text-success-foreground" },
                { label: "Clarifications", value: "2", color: "text-warning-foreground" },
                { label: "Deviations", value: "5", color: "text-destructive-foreground" },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-card px-2 py-2 text-center">
                  <p className={cn("text-sm font-bold", m.color)}>{m.value}</p>
                  <p className="text-[9px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </AnimatedItem>

          {/* Specs table */}
          <AnimatedItem visible={step >= 11}>
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold">Specifications</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">3m 18s</span>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 11}>
            <div className="overflow-hidden rounded-lg border border-border/60">
              {/* Header */}
              <div className="grid grid-cols-4 gap-0 border-b bg-muted/50 px-3 py-2">
                {["Spec", "RFQ Value", "Product", "Status"].map((h) => (
                  <span key={h} className="text-[10px] font-semibold text-muted-foreground">
                    {h}
                  </span>
                ))}
              </div>
              {/* Rows */}
              {SPEC_ROWS.map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-4 gap-0 px-3 py-2",
                    i < SPEC_ROWS.length - 1 && "border-b border-border/40"
                  )}
                >
                  <span className="truncate text-[11px] font-medium">{row.keyword}</span>
                  <span className="truncate text-[11px] font-semibold text-primary">{row.rfq}</span>
                  <span className="truncate text-[11px] text-muted-foreground">{row.product}</span>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-center font-mono text-[9px] font-medium w-fit",
                      row.status === "match" && "bg-success/50 text-success-foreground",
                      row.status === "deviation" && "bg-destructive/50 text-destructive-foreground",
                      row.status === "partial" && "bg-warning/50 text-warning-foreground"
                    )}
                  >
                    {row.status === "match" ? "Match" : row.status === "deviation" ? "Deviation" : "Partial"}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 11}>
            <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
              View all 42 specifications →
            </span>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
