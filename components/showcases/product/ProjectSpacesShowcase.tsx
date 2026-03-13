"use client";

import {
  Landmark,
  HardHat,
  Truck,
  CheckCircle2,
  Pin,
  Link2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=first card, 2=second card, 3=third card,
// 4=highlight+expand (pre-completed step visible), 5=status spinner,
// 6=activity 2 processing, 7=activity 2 done + activity 3 processing,
// 8=activity 3 done, 9=status complete, 10=summary stats
const STEP_DELAYS = [0, 500, 400, 400, 800, 800, 800, 800, 800, 600, 600];
const RESET_DELAY = 4500;

// Icons match project-icons.ts smart selection:
// "Kanpur Metro" → truck (logistics/transport/railway keywords)
// "Highway NH-44" → hardhat (highway/construction keywords)
// "UPMRC Signalling" → landmark (authority/corporation keywords)
const PROJECTS = [
  {
    icon: Truck,
    name: "Kanpur Metro Phase 2",
    type: "Bidder",
    due: "Apr 15, 2026",
    pinned: true,
    linked: true,
  },
  {
    icon: HardHat,
    name: "Highway NH-44 Expansion",
    type: "Bidder",
    due: "Mar 1, 2026",
    pinned: false,
    linked: false,
  },
  {
    icon: Landmark,
    name: "UPMRC Signalling Works",
    type: "Issuer",
    due: "May 20, 2026",
    pinned: false,
    linked: false,
  },
];

const ACTIVITY_FEED = [
  { label: "Documents Indexed", preCompleted: true },
  { label: "Automation Outputs Created", preCompleted: false },
  { label: "Bid Package Submitted", preCompleted: false },
];

type Status = "active" | "completed" | "on-hold";

// Matches badge.tsx variants: bg-{color} text-{color}-foreground
const STATUS_CONFIG: Record<Status, { label: string; classes: string }> = {
  active: {
    label: "Active",
    classes: "bg-info/50 text-info-foreground",
  },
  completed: {
    label: "Completed",
    classes: "bg-success/50 text-success-foreground",
  },
  "on-hold": {
    label: "On Hold",
    classes: "bg-warning/50 text-warning-foreground",
  },
};

const INITIAL_STATUSES: Status[] = ["active", "active", "on-hold"];

export function ProjectSpacesShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  // First card transitions: active → completed at step 9
  const statuses: Status[] = [
    step >= 9 ? "completed" : INITIAL_STATUSES[0],
    INITIAL_STATUSES[1],
    INITIAL_STATUSES[2],
  ];

  const isHighlighted = step >= 4 && step < 10;
  const showActivity = step >= 4 && step < 10;
  const showSummary = step >= 10;

  return (
    <div ref={ref} className="flex flex-col gap-2.5 p-4">
      {/* Project cards — matches project-card.tsx layout */}
      {PROJECTS.map((project, i) => {
        const visible = step >= i + 1;
        const status = STATUS_CONFIG[statuses[i]];
        const highlighted = i === 0 && isHighlighted;
        const transitioning = i === 0 && step >= 5 && step < 9;

        return (
          <AnimatedItem key={i} visible={visible}>
            <div
              className={cn(
                "rounded-lg border transition-all duration-500",
                highlighted
                  ? "border-accent bg-accent/50 shadow-lg"
                  : "border-border bg-card shadow-md"
              )}
            >
              {/* Header row — matches CardHeader: icon + name + pin + actions */}
              <div className="flex items-center gap-2 px-3 pt-3 pb-2">
                {/* Icon in muted bg — matches: bg-muted rounded-md p-2 */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
                  <project.icon className="h-4 w-4" />
                </div>

                <span className="min-w-0 flex-1 truncate text-xs font-semibold">
                  {project.name}
                </span>

                {/* Linked to Tender badge — matches: Badge variant="secondary" */}
                {project.linked && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-md border-transparent bg-secondary px-1.5 py-0.5 text-[9px] font-medium text-secondary-foreground">
                    <Link2 className="h-2.5 w-2.5" />
                    Linked to Tender
                  </span>
                )}

                {/* Pin — matches: text-primary fill-current when pinned */}
                {project.pinned && (
                  <Pin className="h-3.5 w-3.5 shrink-0 text-primary fill-current" />
                )}
              </div>

              {/* Content rows — matches CardContent: grid h-8 grid-cols-2 */}
              <div className="px-3 pb-2.5 space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-primary">{project.type}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Status</span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[9px] font-medium transition-colors duration-500",
                      transitioning
                        ? "bg-info/50 text-info-foreground"
                        : status.classes
                    )}
                  >
                    {transitioning ? (
                      <>
                        <Loader2 className="h-2.5 w-2.5 animate-spin" />
                        Updating
                      </>
                    ) : (
                      status.label
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium text-primary">{project.due}</span>
                </div>
              </div>

              {/* Activity feed — smooth expand/collapse via max-height */}
              {i === 0 && (
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    showActivity ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="border-t border-border px-3 py-2">
                    <div className="space-y-1">
                      {ACTIVITY_FEED.map((activity, j) => {
                        // Step 0 (Documents indexed): pre-completed, visible immediately
                        // Step 1 (Bid automation): appears at step 6, processing until step 7
                        // Step 2 (Bid submitted): appears at step 7, processing until step 8
                        const visible = j === 0 || step >= 6 + (j - 1);
                        const done = j === 0 || (j === 1 && step >= 7) || (j === 2 && step >= 8);
                        const processing = visible && !done;

                        return (
                          <div
                            key={j}
                            className={cn(
                              "flex items-center gap-1.5 text-[10px] transition-all duration-300",
                              visible
                                ? "translate-y-0 opacity-100"
                                : "translate-y-1 opacity-0"
                            )}
                          >
                            {processing ? (
                              <Loader2 className="h-2.5 w-2.5 animate-spin text-info-foreground" />
                            ) : (
                              <CheckCircle2 className="h-2.5 w-2.5 text-success-foreground" />
                            )}
                            <span className={cn(
                              processing ? "text-info-foreground" : "text-muted-foreground"
                            )}>
                              {activity.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedItem>
        );
      })}

      {/* Summary stats */}
      <AnimatedItem visible={showSummary}>
        <div className="flex items-center justify-center gap-3 rounded-lg border border-info bg-info/20 p-1 shadow-xs">
          {[
            { count: 10, label: "Active", color: "text-info-foreground" },
            { count: 15, label: "Completed", color: "text-success-foreground" },
            { count: 2, label: "On Hold", color: "text-warning-foreground" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className={cn("text-xs font-bold", stat.color)}>
                {stat.count}
              </span>
              <span className="text-xs text-foreground">
                {stat.label}
              </span>
              {i < 2 && (
                <span className="ml-1.5 text-border">&middot;</span>
              )}
            </div>
          ))}
        </div>
      </AnimatedItem>
    </div>
  );
}
