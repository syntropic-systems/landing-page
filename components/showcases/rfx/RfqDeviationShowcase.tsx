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
  { label: "Load matched specifications", description: "42 specs loaded" },
  { label: "Analyze deviations", description: "6 deviations found" },
  { label: "Score compliance levels", description: "Scoring complete" },
  { label: "Generate clarification notes", description: "Report ready" },
];

const DEVIATION_ROWS = [
  { attribute: "Additional Tip", status: "deviation", rfq: "No additional", product: "2 ring CoFe alloy" },
  { attribute: "Arcing Time", status: "not_specified", rfq: "Not specified", product: "≤15ms" },
  { attribute: "Auxiliary Switches", status: "deviation", rfq: "4NO+4NC", product: "3NO+3NC" },
  { attribute: "Base Frame", status: "acceptable", rfq: "Steel, galvanised", product: "≤1mm" },
  { attribute: "Break Time", status: "acceptable", rfq: "3–4 cycles", product: "≤50ms" },
  { attribute: "Breaker", status: "partial", rfq: "36 kV Vacuum", product: "Vacuum Breaker" },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

export function RfqDeviationShowcase() {
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
          {/* Header */}
          <AnimatedItem visible={step >= 10}>
            <div className="flex items-center justify-between px-1">
              <div>
                <p className="text-xs font-semibold">Deviations & Clarifications</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">6 deviations & clarifications found</p>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">3m 18s</span>
              </div>
            </div>
          </AnimatedItem>

          {/* Deviation table */}
          <AnimatedItem visible={step >= 11}>
            <div className="overflow-hidden rounded-lg border border-border/60">
              {/* Header */}
              <div className="grid grid-cols-[minmax(0,1fr)_4.5rem_5rem_5rem] gap-0 border-b bg-muted/50 px-3 py-2">
                {["Attribute", "Status", "RFQ", "Product"].map((h) => (
                  <span key={h} className="text-[10px] font-semibold text-muted-foreground">
                    {h}
                  </span>
                ))}
              </div>
              {/* Rows */}
              {DEVIATION_ROWS.map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-[minmax(0,1fr)_4.5rem_5rem_5rem] gap-0 px-3 py-2",
                    i < DEVIATION_ROWS.length - 1 && "border-b border-border/40"
                  )}
                >
                  <span className="truncate text-[11px] font-medium">{row.attribute}</span>
                  <span
                    className={cn(
                      "w-fit rounded px-1.5 py-0.5 text-center text-[9px] font-medium",
                      row.status === "deviation" && "bg-destructive/50 text-destructive-foreground",
                      row.status === "not_specified" && "bg-warning/50 text-warning-foreground",
                      row.status === "acceptable" && "bg-success/50 text-success-foreground",
                      row.status === "partial" && "bg-caution/50 text-caution-foreground"
                    )}
                  >
                    {row.status === "deviation" ? "Deviation"
                      : row.status === "not_specified" ? "Not Spec'd"
                      : row.status === "acceptable" ? "Acceptable"
                      : "Partial"}
                  </span>
                  <span className="truncate text-[11px] text-primary">{row.rfq}</span>
                  <span className="truncate text-[11px] text-muted-foreground">{row.product}</span>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 11}>
            <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
              View all deviations & clarifications →
            </span>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
