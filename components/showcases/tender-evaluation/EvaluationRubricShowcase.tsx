"use client";

import {
  CheckCircle,
  Circle,
  Loader2,
  FileText,
  Play,
  Check,
  FolderOpen,
  ChevronDown,
  Settings2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=phase indicators
// Phase 1 (Configure): 3=tender doc, 4=selected+button
// Phase 2 (Processing): 5=enter, 6-9=steps
// Phase 3 (Results): 10=header+bar, 11=criterion1, 12=criterion1 expand, 13=criterion2, 14=configure btn
const STEP_DELAYS = [0, 500, 400, 600, 700, 600, 700, 700, 700, 700, 700, 500, 600, 500, 600];
const RESET_DELAY = 5000;

const PROCESSING_STEPS = [
  { label: "Extract tender requirements", description: "42 requirements found" },
  { label: "Identify evaluation criteria", description: "5 criteria defined" },
  { label: "Generate scoring questions", description: "14 questions created" },
  { label: "Assign weights & marks", description: "100 marks allocated" },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Rubric" },
];

const CRITERIA = [
  {
    name: "Financial Stability & Capacity",
    marks: 20,
    color: "bg-success-foreground",
    description: "Assesses financial health and capacity to undertake the project.",
    questions: [
      {
        text: "Average Annual Financial Turnover for last 3 audited years?",
        marks: 8,
        levels: [
          { award: 8, condition: "turnover ≥ ₹20 Lakhs" },
          { award: 5, condition: "turnover ≥ ₹16.27 Lakhs but < ₹20 Lakhs" },
          { award: 3, condition: "turnover ≥ ₹12 Lakhs but < ₹16.27 Lakhs" },
        ],
      },
      {
        text: "Losses incurred in last 5 audited financial years?",
        marks: 6,
        levels: [
          { award: 6, condition: "no losses in 5 years" },
          { award: 4, condition: "losses in exactly 1 year" },
        ],
      },
    ],
  },
  {
    name: "Relevant Work Experience",
    marks: 38,
    color: "bg-info-foreground",
    description: "Evaluates track record in similar non-destructive examination projects.",
    questions: [
      {
        text: "List of similar works completed in last 7 years?",
        marks: 15,
        levels: [
          { award: 15, condition: "2+ similar works ≥ ₹13.02 Lakhs each" },
          { award: 10, condition: "meets one minimum requirement" },
        ],
      },
    ],
  },
  {
    name: "Technical Capability",
    marks: 22,
    color: "bg-warning-foreground",
  },
  {
    name: "Quality & Safety",
    marks: 12,
    color: "bg-primary",
  },
  {
    name: "Project Approach",
    marks: 8,
    color: "bg-caution-foreground",
  },
];

const TOTAL_MARKS = 100;

export function EvaluationRubricShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showConfig = step >= 3 && step < 5;
  const showProcessing = step >= 5 && step < 10;
  const showResults = step >= 10;
  const activePhase = showResults ? 2 : showProcessing ? 1 : step >= 1 ? 0 : -1;
  const allDone = step >= 10;
  const selected = step >= 4;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
      {/* Task card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Generate Evaluation Rubric
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              AI creates scoring criteria, questions and weights from tender documents
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showConfig && (
              <>
                <Settings2 className="h-3.5 w-3.5 text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Configuring</span>
              </>
            )}
            {showProcessing && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Generating</span>
              </>
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
      {showConfig && (
        <>
          <AnimatedItem visible={step >= 3}>
            <div className="space-y-2">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg border p-4 transition-colors duration-300",
                  selected ? "border-primary bg-accent" : "border-border/60 bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border transition-all duration-300",
                    selected ? "border-primary bg-primary/20" : "border-muted-foreground/30"
                  )}
                >
                  {selected && <Check className="h-2.5 w-2.5 text-foreground" />}
                </div>
                <FolderOpen className="h-3.5 w-3.5 shrink-0 text-info-foreground" />
                <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
                  <span className="truncate text-xs font-medium">Tender Documents</span>
                  <span className="shrink-0 text-[10px] text-muted-foreground">/BARC-NDE/</span>
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground">8 files</span>
              </div>
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 3}>
            <button
              className={cn(
                "w-full rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300",
                selected
                  ? "bg-primary text-primary-foreground"
                  : "cursor-not-allowed bg-muted text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Play className="h-3 w-3" />
                Generate Rubric
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
                    i < step - 6
                      ? "completed"
                      : i === step - 6
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

      {/* Phase 3: Results — Rubric */}
      {showResults && (
        <>
          {/* Rubric header + multi-color progress bar */}
          <AnimatedItem visible={step >= 10}>
            <div className="rounded-lg border border-border/60 bg-card p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-foreground" />
                  <span className="text-[11px] font-semibold text-foreground">Evaluation Rubric</span>
                </div>
                <span className="text-[10px] text-muted-foreground">5 criteria · 100 marks</span>
              </div>
              {/* Multi-segment progress bar */}
              <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full">
                {CRITERIA.map((c, i) => (
                  <div
                    key={i}
                    className={cn("h-full rounded-full transition-all duration-700", c.color)}
                    style={{ width: `${(c.marks / TOTAL_MARKS) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </AnimatedItem>

          {/* Criterion 1: Financial Stability — expandable */}
          <AnimatedItem visible={step >= 11}>
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
              <div className="flex items-center gap-2 p-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-success-foreground" />
                <span className="flex-1 text-[11px] font-semibold text-foreground truncate">
                  {CRITERIA[0].name}
                </span>
                <span className="shrink-0 rounded bg-success/30 px-1.5 py-0.5 text-[9px] font-semibold text-success-foreground">
                  {CRITERIA[0].marks} marks
                </span>
                <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", step >= 12 && "rotate-180")} />
              </div>

              {/* Expanded questions */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: step >= 12 ? "400px" : "0px", opacity: step >= 12 ? 1 : 0 }}
              >
                <div className="border-t border-border/40 px-3 py-2 space-y-2">
                  {CRITERIA[0].questions?.map((q, qi) => (
                    <div key={qi} className="rounded border border-border/40 bg-muted/30 p-2">
                      <div className="flex items-start gap-1.5 mb-1.5">
                        <span className="text-[9px] text-muted-foreground mt-0.5">{qi + 1}.</span>
                        <p className="flex-1 text-[10px] font-medium text-foreground leading-snug">{q.text}</p>
                        <span className="shrink-0 rounded bg-info/30 px-1 py-0.5 text-[8px] font-semibold text-info-foreground">
                          {q.marks} marks
                        </span>
                      </div>
                      <div className="space-y-0.5 pl-3">
                        {q.levels.map((l, li) => (
                          <div key={li} className="flex items-center gap-1.5 text-[9px]">
                            <span className="font-medium text-foreground w-3 text-right">{l.award}</span>
                            <span className="text-muted-foreground">if</span>
                            <span className="text-foreground">{l.condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedItem>

          {/* Criterion 2: Work Experience — collapsed */}
          <AnimatedItem visible={step >= 13}>
            <div className="rounded-lg border border-border/60 bg-card">
              <div className="flex items-center gap-2 p-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-info-foreground" />
                <span className="flex-1 text-[11px] font-semibold text-foreground truncate">
                  {CRITERIA[1].name}
                </span>
                <span className="shrink-0 rounded bg-info/30 px-1.5 py-0.5 text-[9px] font-semibold text-info-foreground">
                  {CRITERIA[1].marks} marks
                </span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          </AnimatedItem>

          {/* Remaining criteria hints + Configure button */}
          <AnimatedItem visible={step >= 13}>
            <div className="flex items-center gap-1.5 px-1">
              {CRITERIA.slice(2).map((c, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className={cn("h-1.5 w-1.5 rounded-full", c.color)} />
                  <span className="text-[9px] text-muted-foreground">{c.name}</span>
                </div>
              ))}
            </div>
          </AnimatedItem>

          <AnimatedItem visible={step >= 14}>
            <button className="w-full rounded-lg border border-primary bg-primary/5 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
              <span className="flex items-center justify-center gap-1.5">
                <Settings2 className="h-3 w-3" />
                Configure Rubric
              </span>
            </button>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
