"use client";

import {
  CheckCircle,
  Circle,
  XCircle,
  ChevronDown,
  AlertTriangle,
  Shield,
  Loader2,
  Settings2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=task card, 2=phase row
// Phase 1 — Configure: 3=identity+financials, 4=services+certs, 5=gonogo questions+past clients
// Phase 2 — Processing: 6=analyze profile, 7=match criteria, 8=evaluate gonogo, 9=generate report
// Phase 3 — Results: 10=criteria bar, 11=criteria expand, 12=gonogo bar, 13=gonogo expand, 14=recommendation
const STEP_DELAYS = [0, 500, 400, 500, 500, 500, 600, 600, 600, 600, 800, 600, 500, 600, 600];
const RESET_DELAY = 5000;

const PROCESSING_STEPS = [
  { label: "Analyze organization profile", description: "Profile loaded" },
  { label: "Match eligibility criteria", description: "6 criteria matched" },
  { label: "Evaluate go/no-go questions", description: "4 questions evaluated" },
  { label: "Generate recommendation", description: "Report ready" },
];

const PHASES = [
  { label: "Configure" },
  { label: "Processing" },
  { label: "Results" },
];

const SERVICES = [
  "Waterproofing", "Structural Strengthening", "Structural Repair", "Retrofitting", "Jacketing", "Bridge Repair",
];

const CERTIFICATIONS = ["ISO 9001", "ISO 14001", "OHSAS 18001:2007", "NSIC", "MSME"];

const GONOGO_QUESTIONS_CONFIG = [
  "Is the tender estimated value more than 25 Lakh INR?",
  "Is EMD not present or less than Rs. 10,00,000?",
  "Bid Deadline should be before 30 March 2026",
];

const PAST_CLIENTS = ["DMRC", "NHPC", "NTPC", "Reliance", "L&T", "IOCL"];

const CRITERIA_ITEMS = [
  { criterion: "Scope of Work Match", weight: 10, evaluation: "Civil Construction and Repair, relevant to road widening.", pass: true },
  { criterion: "Bid Value in Range", weight: 5, evaluation: "Tender cost is within max bid capacity.", pass: true },
];

const GONOGO_RESULTS = [
  { question: "Estimated Value > 25 Lakh INR?", evaluation: "127.53 Cr is significantly higher than 25 Lakh.", pass: true },
  { question: "EMD < Rs. 10,00,000?", evaluation: "EMD of Rs 1.28 Cr exceeds the threshold.", pass: false },
];


export function EligibilityGoNoGoShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showConfig = step >= 3 && step < 6;
  const showProcessing = step >= 6 && step < 10;
  const showResults = step >= 10;
  const allDone = step >= 14;
  const activePhase = showResults ? 2 : showProcessing ? 1 : step >= 1 ? 0 : -1;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
      {/* Task card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Eligibility & Go/No-Go
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Configure organization profile and evaluate tender eligibility
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
                <span className="text-[10px] font-medium text-info-foreground">Evaluating</span>
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

      {/* ── Phase 1: Configure ── */}
      {showConfig && (
        <>
          {/* Identity & Financials */}
          <AnimatedItem visible={step >= 3}>
            <div>
              <p className="text-[11px] font-semibold text-foreground">Identity & Financials</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Organization Name", value: "CloudGlance Sensing Labs" },
                  { label: "Annual Turnover", value: "₹ 43 Cr" },
                  { label: "Max EMD Capacity", value: "₹ 10 Lakh" },
                  { label: "Experience (Years)", value: "21" },
                ].map((field) => (
                  <div key={field.label} className="grid grid-cols-2 text-[10px]">
                    <p className="text-muted-foreground my-auto">{field.label}</p>
                    <p className="font-medium text-foreground rounded border border-border/60 bg-card px-2 py-1">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedItem>

          {/* Primary Services + Certifications */}
          <AnimatedItem visible={step >= 4}>
            <div>
              <p className="text-[11px] font-semibold text-foreground mb-1">
                Primary Services <span className="font-normal text-muted-foreground">(31)</span>
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {SERVICES.map((s) => (
                  <span key={s} className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
                    {s}<X className="h-2 w-2" />
                  </span>
                ))}
              </div>
              <p className="text-[11px] font-semibold text-foreground mb-1">
                Certifications <span className="font-normal text-muted-foreground">(10)</span>
              </p>
              <div className="flex flex-wrap gap-1">
                {CERTIFICATIONS.map((c) => (
                  <span key={c} className="inline-flex items-center gap-0.5 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-medium text-secondary-foreground">
                    {c}<X className="h-2 w-2" />
                  </span>
                ))}
              </div>
            </div>
          </AnimatedItem>

          {/* Past Clients + Go/No-Go Questions */}
          <AnimatedItem visible={step >= 5}>
            <div>
              <p className="text-[11px] font-semibold text-foreground mb-1">
                Past Clients <span className="font-normal text-muted-foreground">(30)</span>
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {PAST_CLIENTS.map((c) => (
                  <span key={c} className="inline-flex items-center gap-0.5 rounded-full bg-muted px-2 py-0.5 text-[9px] font-medium text-foreground">
                    {c}<X className="h-2 w-2 text-muted-foreground" />
                  </span>
                ))}
              </div>
              <p className="text-[11px] font-semibold text-foreground mb-1">
                Go/No-Go Questions <span className="font-normal text-muted-foreground">(4)</span>
              </p>
              <div className="space-y-1 mb-2">
                {GONOGO_QUESTIONS_CONFIG.map((q, i) => (
                  <div key={i} className="flex items-start gap-1.5 rounded border border-border/60 bg-card px-2 py-1.5">
                    <span className="text-[9px] text-muted-foreground mt-px">{i + 1}.</span>
                    <span className="flex-1 text-[10px] text-foreground leading-snug">{q}</span>
                    <X className="h-3 w-3 shrink-0 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedItem>
        </>
      )}

      {/* ── Phase 2: Processing ── */}
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

      {/* ── Phase 3: Results ── */}
      {showResults && (
        <>
          {/* Criteria Evaluation — expandable */}
          <AnimatedItem visible={step >= 10}>
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
              <div className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                    <span className="text-[11px] font-semibold text-foreground">Criteria Evaluation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-success-foreground">9/10 matched</span>
                    <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", step >= 11 && "rotate-180")} />
                  </div>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-success-foreground transition-all duration-700"
                    style={{ width: step >= 10 ? "90%" : "0%" }}
                  />
                </div>
              </div>

              {/* Expanded table */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: step >= 11 ? "400px" : "0px", opacity: step >= 11 ? 1 : 0 }}
              >
                <div className="border-t border-border/40">
                  <div className="grid grid-cols-[auto_1fr] gap-0 border-b bg-muted/50 px-3 py-1.5">
                    <span className="text-[9px] font-semibold text-muted-foreground w-24">CRITERION</span>
                    <span className="text-[9px] font-semibold text-muted-foreground pl-2">EVALUATION</span>
                  </div>
                  {CRITERIA_ITEMS.map((c, i) => (
                    <div
                      key={i}
                      className={cn(
                        "grid grid-cols-[auto_1fr] gap-0 px-3 py-1.5",
                        i < CRITERIA_ITEMS.length - 1 && "border-b border-border/40"
                      )}
                    >
                      <div className="w-24 flex items-start gap-1.5">
                        <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-success-foreground" />
                        <div>
                          <p className="text-[10px] font-medium text-foreground leading-tight">{c.criterion}</p>
                          <p className="text-[8px] text-muted-foreground">Weight: {c.weight}</p>
                        </div>
                      </div>
                      <p className="text-[10px] leading-snug text-muted-foreground pl-2">{c.evaluation}</p>
                    </div>
                  ))}
                  <p className="border-t border-border/40 px-3 py-1 text-center text-[8px] text-primary font-medium">View All 10 Criteria →</p>
                </div>
              </div>
            </div>
          </AnimatedItem>

          {/* Go/No-Go Analysis — expandable */}
          <AnimatedItem visible={step >= 12}>
            <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
              <div className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning-foreground" />
                    <span className="text-[11px] font-semibold text-foreground">Go/No-Go Analysis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-success-foreground">3/4 satisfied</span>
                    <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", step >= 13 && "rotate-180")} />
                  </div>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div className="flex h-full">
                    <div
                      className="h-full rounded-l-full bg-success-foreground transition-all duration-700"
                      style={{ width: step >= 12 ? "75%" : "0%" }}
                    />
                    <div
                      className="h-full rounded-r-full bg-destructive-foreground transition-all duration-700"
                      style={{ width: step >= 12 ? "25%" : "0%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded questions */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: step >= 13 ? "400px" : "0px", opacity: step >= 13 ? 1 : 0 }}
              >
                <div className="border-t border-border/40">
                  <div className="grid grid-cols-[1fr_1fr] gap-0 border-b bg-muted/50 px-3 py-1.5">
                    <span className="text-[9px] font-semibold text-muted-foreground">QUESTION</span>
                    <span className="text-[9px] font-semibold text-muted-foreground">EVALUATION</span>
                  </div>
                  {GONOGO_RESULTS.map((q, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_1fr] gap-0 border-b border-border/40 px-3 py-1.5"
                    >
                      <div className="flex items-start gap-1.5 pr-2">
                        {q.pass ? (
                          <CheckCircle className="mt-0.5 h-3 w-3 shrink-0 text-success-foreground" />
                        ) : (
                          <XCircle className="mt-0.5 h-3 w-3 shrink-0 text-destructive-foreground" />
                        )}
                        <p className="text-[10px] font-medium text-foreground leading-tight">{q.question}</p>
                      </div>
                      <p className="text-[10px] leading-snug text-muted-foreground">{q.evaluation}</p>
                    </div>
                  ))}
                  <p className="border-t border-border/40 px-3 py-1 text-center text-[8px] text-primary font-medium">View All 4 Questions →</p>
                </div>
              </div>
            </div>
          </AnimatedItem>

          {/* Recommendation */}
          <AnimatedItem visible={step >= 14}>
            <div className="flex items-center justify-end px-1">
              <span className="text-[11px] font-semibold text-success-foreground">
                Recommended to Proceed
              </span>
            </div>
          </AnimatedItem>
        </>
      )}
    </div>
  );
}
