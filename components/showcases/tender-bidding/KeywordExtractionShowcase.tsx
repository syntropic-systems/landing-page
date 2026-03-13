"use client";

import {
  FileSpreadsheet,
  FileText,
  CheckCircle,
  Check,
  Loader2,
  Play,
  Circle,
  Clock,
  Search,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=files+btn, 3=files selected+btn active,
// 4=processing starts, 5-8=processing steps, 9=last done, 10=summary metrics, 11=results
const STEP_DELAYS = [0, 500, 600, 800, 700, 800, 800, 800, 800, 800, 600, 400];
const RESET_DELAY = 4500;

const PROCESSING_STEPS = [
  { label: "Parse keyword groups", description: "4 groups · 32 keywords" },
  { label: "Search documents", description: "3 PDFs analyzed" },
  { label: "Extract answers", description: "32 answers generated" },
  { label: "Compile results", description: "32 answers compiled" },
];

const QA_RESULTS = [
  {
    query: "What is the minimum turnover requirement?",
    answer: "The bidder must have an average annual turnover of INR 25 Crore over the last 3 financial years.",
    source: "p. 3–6",
  },
  {
    query: "Is EMD exemption available for MSMEs?",
    answer: "Yes, MSME registered bidders are exempt from EMD as per government guidelines.",
    source: "p. 7–10",
  },
  {
    query: "Does the tender require ISO 9001 certification?",
    answer: "ISO 9001:2015 certification is mandatory for all bidders as per clause 4.2.1.",
    source: "p. 11–14",
  },
  {
    query: "What is the completion timeline?",
    answer: "The project must be completed within 18 months from the date of award, with milestones at 6 and 12 months.",
    source: "p. 15–18",
  },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Complete" },
];

export function KeywordExtractionShowcase() {
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
          <Search className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Information Extraction
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Search keywords across documents and extract structured answers
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Processing</span>
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
                <FileSpreadsheet className="h-3.5 w-3.5 shrink-0 text-success-foreground" />
                <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                  <span className="truncate text-xs font-medium">Eligibility_Keywords.xlsx</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">48 KB</span>
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
                <FileText className="h-3.5 w-3.5 shrink-0 text-destructive-foreground" />
                <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                  <span className="truncate text-xs font-medium">KNPAGT-05_NIT.pdf</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">2.4 MB</span>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-success-foreground" />
                  <span className="text-[9px] font-medium text-success-foreground">Indexed</span>
                </div>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem visible={filesVisible}>
            {/* Answer style selector */}
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="text-[10px] text-muted-foreground">Answer Style:</span>
              <div className="flex gap-1">
                {["Direct", "Detailed", "Both"].map((style, i) => (
                  <span
                    key={style}
                    className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-medium transition-colors",
                      i === 2
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
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
          {/* Go/No-Go metrics */}
          <AnimatedItem visible={step >= 10}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Total Questions", value: "32", color: "text-foreground" },
                { label: "Answers Found", value: "30", color: "text-success-foreground" },
                { label: "Not Found", value: "2", color: "text-destructive-foreground" },
              ].map((m) => (
                <div key={m.label} className="rounded-lg border bg-card p-1 text-center">
                  <p className={cn("text-lg font-bold", m.color)}>{m.value}</p>
                  <p className="text-[10px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </AnimatedItem>

          {/* QA Results */}
          <AnimatedItem visible={step >= 11}>
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold">Keyword Results</span>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">2m 15s</span>
              </div>
            </div>
          </AnimatedItem>

          {QA_RESULTS.map((result, i) => (
            <AnimatedItem key={i} visible={step >= 11}>
              <div
                className="overflow-hidden rounded-lg border border-border/60 bg-card"
                style={{ transitionDelay: showResults ? `${i * 150}ms` : "0ms" }}
              >
                <div className="px-3 pt-2.5 pb-2">
                  <div className="flex items-start gap-1">
                    <span className="text-[11px] font-medium text-primary">
                      {i + 1}.
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-primary">{result.query}</p>
                      <p className="text-[10px] leading-relaxed text-muted-foreground">
                        {result.answer}
                      </p>
                      <div className="mt-1.5 flex items-center gap-0.5 text-muted-foreground">
                        <span className="text-[10px] font-medium">Detailed Answer</span>
                        <ChevronDown className="h-2.5 w-2.5" />
                      </div>
                    </div>
                    <span className="shrink-0 rounded bg-success/50 px-1.5 py-0.5 font-mono text-[9px] font-medium text-success-foreground">
                      Found
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 border-t border-border/40 px-3 py-1.5">
                  <FileText className="h-2.5 w-2.5 text-primary"/>
                  <span className="text-[9px] text-primary">
                    KNPAGT-05_NIT.pdf ({result.source})
                  </span>
                </div>
              </div>
            </AnimatedItem>
          ))}

          <AnimatedItem visible={step >= 11}>
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
                Download Excel Report
              </span>
              <span className="text-border">·</span>
              <span className="cursor-pointer text-[11px] font-medium text-primary hover:underline">
                Download PDF Report
              </span>
            </div>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
