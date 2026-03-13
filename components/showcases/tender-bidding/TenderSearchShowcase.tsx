"use client";

import {
  Search,
  MapPin,
  Clock,
  Star,
  Sparkles,
  Bookmark,
  Check,
  CheckCircle,
  Loader2,
  X,
  Settings2,
  ArrowLeft,
  AlertTriangle,
  ChevronDown,
  ArrowUpDown,
  Plus,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// 0=idle, 1=task card, 2=phase row
// Phase 1 — Configure: 3=identity+financials, 4=services+certs, 5=go-nogo+experience+save
// Phase 2 — Search: 6=search bar, 7=tender 1, 8=tender 2, 9=tender 3, 10=select first tender
// Phase 3 — Detail: 11=header, 12=tender details+docs, 13=AI+criteria+gonogo
const STEP_DELAYS = [0, 500, 400, 500, 500, 500, 1000, 500, 500, 500, 800, 800, 700, 700];
const RESET_DELAY = 4500;

const SERVICES = [
  "Waterproofing", "Structural Strengthening", "Structural Repair", "Retrofitting", "Jacketing", "Bridge Repair",
];

const CERTIFICATIONS = ["ISO 9001", "ISO 14001", "OHSAS 18001:2007", "NSIC", "MSME"];

const GONOGO_QUESTIONS = [
  "Is the tender estimated value more than 25 Lakh INR?",
  "Is EMD not present or less than Rs. 10,00,000?",
  "Bid Deadline should be before 30 March 2026",
];

const PAST_CLIENTS = ["DMRC", "NHPC", "NTPC", "Reliance", "L&T", "IOCL"];

const PHASES = [
  { label: "Configure" },
  { label: "Search" },
  { label: "Details" },
];

type Relevance = "high" | "relevant" | "possible";

const RELEVANCE_CONFIG: Record<Relevance, { label: string; icon: "sparkles" | "check" | "none"; color: string }> = {
  high: { label: "Highly Relevant", icon: "sparkles", color: "text-success-foreground" },
  relevant: { label: "Relevant", icon: "check", color: "text-success-foreground" },
  possible: { label: "Possible Match", icon: "none", color: "text-warning-foreground" },
};

const TENDERS = [
  {
    id: "CGID-97207526",
    title: "Widening of NH-244 Khellani-Khanabal Section",
    authority: "NHIDCL",
    location: "Doda, J&K",
    bidValue: "₹127.53 Cr",
    emd: "₹1.28 Cr",
    deadline: "22 Mar, 2026",
    daysLeft: 10,
    tags: ["Road"],
    relevance: "high" as Relevance,
    criteriaMatch: "10/10",
    criteriaPercent: 100,
    gonogoMatch: "3/4",
    gonogoPercent: 75,
  },
  {
    id: "CGID-97147048",
    title: "Construction of Doubling Work — Koderma to Kathautia",
    authority: "East Central Railway",
    location: "Dhanbad, JH",
    bidValue: "₹826.45 Cr",
    emd: "₹2 Cr",
    deadline: "06 Apr, 2026",
    daysLeft: 25,
    tags: ["Building", "Bridge"],
    relevance: "relevant" as Relevance,
    criteriaMatch: "8/10",
    criteriaPercent: 80,
    gonogoMatch: "4/4",
    gonogoPercent: 100,
  },
  {
    id: "CGID-96530724",
    title: "Feasibility Report — River Siang IWT Infrastructure",
    authority: "Inland Waterways Authority",
    location: "Arunachal Pradesh",
    bidValue: "₹1.05 Cr",
    emd: "₹2.10 Lakh",
    deadline: "30 Apr, 2026",
    daysLeft: 49,
    tags: ["Feasibility Report"],
    relevance: "possible" as Relevance,
    criteriaMatch: "7/10",
    criteriaPercent: 70,
    gonogoMatch: "3/4",
    gonogoPercent: 75,
  },
];

export function TenderSearchShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  const showConfig = step >= 3 && step < 6;
  const showSearch = step >= 6 && step < 11;
  const showResults = step >= 11;
  const tenderSelected = step >= 10 && step < 11; // highlight first tender before detail

  const activePhase = step >= 11 ? 2 : step >= 6 ? 1 : step >= 1 ? 0 : -1;
  const allDone = step >= 11;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 overflow-hidden p-4">
      {/* Task card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-start gap-2 rounded-lg border bg-card p-4">
          <Search className="mt-0.5 h-4 w-4 shrink-0 text-info-foreground" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-foreground">
              Tender Search
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Configure organization profile and discover relevant tenders
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {showConfig && (
              <>
                <Settings2 className="h-3.5 w-3.5 text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Configuring</span>
              </>
            )}
            {showSearch && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">Searching</span>
              </>
            )}
            {showResults && (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                <span className="text-[10px] font-medium text-success-foreground">AI Analysis</span>
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

          {/* Primary Services */}
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

          {/* Go/No-Go + Past Clients */}
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
                {GONOGO_QUESTIONS.map((q, i) => (
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

      {/* ── Phase 2: Search ── */}
      {showSearch && (
        <>
          <AnimatedItem visible={step >= 6}>
            <div className="flex items-center gap-1 rounded-lg border bg-card px-2 py-1.5">
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-[11px] text-muted-foreground mt-0.5">Search any keyword...</span>
              <span className="text-[10px] font-medium text-foreground">All Active</span>
            </div>
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="text-[10px] text-muted-foreground">Showing 1–20 of 101 items</span>
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[10px] font-medium text-primary">AI Relevance</span>
                <ArrowUpDown className="mt-0.5 h-2 w-2 text-muted-foreground" />
              </div>
            </div>
          </AnimatedItem>



          {TENDERS.map((tender, i) => (
            <AnimatedItem key={tender.id} visible={step >= 7 + i}>
              <div className={cn(
                "overflow-hidden rounded-lg border transition-all duration-400",
                i === 0 && tenderSelected
                  ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                  : "border-border/60 bg-card",
                i !== 0 && tenderSelected && "opacity-40"
              )}>
                <div className="px-3 pt-2.5 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] text-foreground">
                      Bid Value <span className="font-medium text-primary">{tender.bidValue}</span>
                    </span>
                    <span className="text-[11px] text-foreground">
                      EMD <span className="font-medium text-primary">{tender.emd}</span>
                    </span>
                    {(() => {
                      const rel = RELEVANCE_CONFIG[tender.relevance];
                      return (
                        <span className={cn("ml-auto flex items-center gap-1", rel.color)}>
                          {rel.icon === "sparkles" && <Sparkles className="h-2.5 w-2.5" />}
                          {rel.icon === "check" && <Check className="h-2.5 w-2.5" />}
                          <span className="text-[9px] font-semibold">{rel.label}</span>
                        </span>
                      );
                    })()}
                    <Bookmark className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-[11px] font-semibold text-foreground">{tender.authority}</p>
                  <div className="flex gap-1 my-1">
                    {tender.tags.map((tag) => (
                      <span key={tag} className="rounded border px-1 text-[9px] text-muted-foreground bg-muted">{tag}</span>
                    ))}
                  </div>
                  <p className="text-[10px] leading-snug text-muted-foreground line-clamp-1">{tender.title}</p>
                </div>
                <div className="flex items-center gap-3 border-t border-border/40 bg-muted/20 px-3 py-1.5">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <MapPin className="h-2.5 w-2.5" />{tender.location}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground ml-auto">
                    <Clock className="h-2.5 w-2.5" />{tender.deadline}
                  </span>
                  <span className={cn(
                    "rounded px-1.5 py-0.5 text-[9px] font-semibold",
                    tender.daysLeft <= 10 ? "bg-destructive/30 text-destructive-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {tender.daysLeft} Days Left
                  </span>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </>
      )}

      {/* ── Phase 3: Tender Detail Page ── */}
      {showResults && (() => {
        const t = TENDERS[0];
        return (
          <>
            {/* Header bar */}
            <AnimatedItem visible={step >= 11}>
              <div className="flex flex-wrap items-center gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="min-w-0 truncate text-xs font-semibold font-mono text-foreground">{t.id}</span>
                <span className="shrink-0 rounded-md bg-success/50 px-2 py-0.5 text-[9px] font-medium text-success-foreground flex items-center gap-1">
                  <Sparkles className="h-2.5 w-2.5" />Highly Relevant
                </span>
                <span className="ml-auto shrink-0 rounded-md bg-primary px-2 py-0.5 text-[9px] font-medium text-primary-foreground flex items-center gap-1">
                  <Plus className="h-2.5 w-2.5" />Add as Project</span>
              </div>
            </AnimatedItem>

            {/* Tender Details + Documents */}
            <AnimatedItem visible={step >= 12}>
              <div className="rounded-lg border border-border/60 bg-card p-3">
                {/* Authority + description */}
                <p className="text-[11px] font-semibold text-foreground">{t.authority}</p>
                <p className="text-[10px] leading-snug text-muted-foreground mt-0.5 mb-2">{t.title}</p>

                {/* Two-column: financials left, info right */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Bid Value</span>
                    <span className="font-medium text-primary">{t.bidValue}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium text-foreground">{t.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">EMD</span>
                    <span className="font-medium text-primary">{t.emd}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className="font-medium text-foreground">{t.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Tender Fee</span>
                    <span className="font-medium text-primary">₹5,000</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Days Left</span>
                    <span className={cn("font-medium", t.daysLeft <= 10 ? "text-destructive-foreground" : "text-foreground")}>{t.daysLeft}</span>
                  </div>
                </div>

                {/* Documents banner */}
                <div className="mt-2 flex items-center gap-2 rounded-md bg-muted/60 px-2.5 py-1.5">
                  <FileText className="h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="text-[10px] font-medium text-foreground">4 Documents Available</span>
                  <span className="ml-auto text-[9px] text-primary font-medium">View All →</span>
                </div>
              </div>
            </AnimatedItem>

            {/* AI Analysis */}
            <AnimatedItem visible={step >= 13}>
              <div className="rounded-lg border border-info bg-info/50 p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-[11px] font-semibold text-foreground">AI Analysis</span>
                  </div>
                  <span className="text-[9px] font-medium text-success-foreground">
                    Very High (100%)
                  </span>
                </div>
                <p className="text-[10px] leading-relaxed text-muted-foreground">
                  Strong contender due to extensive experience, proven track record with similar government clients, and substantial annual turnover.
                </p>
              </div>
            </AnimatedItem>

            {/* Criteria Evaluation */}
            <AnimatedItem visible={step >= 13}>
              <div className="rounded-lg border border-border/60 bg-card p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                    <span className="text-[11px] font-semibold text-foreground">Criteria Evaluation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-success-foreground">{t.criteriaMatch} matched</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-success-foreground" style={{ width: `${t.criteriaPercent}%` }} />
                </div>
              </div>
            </AnimatedItem>

            {/* Go/No-Go Analysis */}
            <AnimatedItem visible={step >= 13}>
              <div className="rounded-lg border border-border/60 bg-card p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-warning-foreground" />
                    <span className="text-[11px] font-semibold text-foreground">Go/No-Go Analysis</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-success-foreground">{t.gonogoMatch} satisfied</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="flex h-full">
                    <div className="h-full rounded-l-full bg-success-foreground" style={{ width: "75%" }} />
                    <div className="h-full rounded-r-full bg-destructive-foreground" style={{ width: "25%" }} />
                  </div>
                </div>
                <p className="mt-1.5 text-[9px] font-medium text-success-foreground text-right">Recommended to Proceed</p>
              </div>
            </AnimatedItem>
          </>
        );
      })()}
    </div>
  );
}
