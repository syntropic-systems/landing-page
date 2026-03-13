"use client";

import { Target, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=user msg, 2=first answer, 3=follow-up user,
// 4=thinking shimmer, 5=reasoning body, 6=collapse "Thought for 4s", 7=second answer
const STEP_DELAYS = [0, 500, 1200, 1400, 800, 1500, 1000, 1200];
const RESET_DELAY = 4500;

function Cite({ n }: { n: number }) {
  return (
    <span className="ml-0.5 cursor-default text-xs font-medium text-info-foreground">
      [{n}]
    </span>
  );
}

export function ChatShowcase({ frozen }: { frozen?: number } = {}) {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, frozen, !inView);

  return (
    <div ref={ref} className="flex flex-col gap-4 p-4">
      {/* User message with project badge */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex w-full flex-col items-end gap-1.5">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground">
              <Target className="h-2.5 w-2.5" />
              KANPUR METRO PROJECT
            </span>
          </div>
          <div className="max-w-[75%] rounded-lg bg-accent px-3 py-2 text-xs leading-relaxed text-accent-foreground break-words">
            Tell me the EMD value of Kanpur Metro tender
          </div>
          <span className="text-[11px] text-muted-foreground">8:04 PM</span>
        </div>
      </AnimatedItem>

      {/* First assistant response */}
      <AnimatedItem visible={step >= 2}>
        <div className="text-xs leading-relaxed text-foreground">
          <p>
            The Earnest Money Deposit (EMD) for the Kanpur Metro tender
            (KNPAGT-05) is{" "}
            <span className="font-semibold">Rs. 21,94,000/-</span>
            <Cite n={1} />
          </p>

          <h4 className="mt-2 text-sm font-semibold">Key Payment Details</h4>
          <ul className="mt-1.5 space-y-1">
            <li className="flex items-start gap-1.5 text-foreground/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
              <span>
                <span className="font-medium text-foreground">
                  Approximate Cost of Work:
                </span>{" "}
                INR 10.97 Crore
                <Cite n={2} />
              </span>
            </li>
            <li className="flex items-start gap-1.5 text-foreground/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
              <span>
                <span className="font-medium text-foreground">
                  Tender Validity:
                </span>{" "}
                90 days
                <Cite n={3} />
              </span>
            </li>
          </ul>

          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span>8:05 PM</span>
            <span>Citations +3</span>
          </div>
        </div>
      </AnimatedItem>

      {/* Follow-up user message */}
      <AnimatedItem visible={step >= 3}>
        <div className="flex w-full flex-col items-end gap-1.5">
          <div className="max-w-[75%] rounded-lg bg-accent px-3 py-2 text-xs leading-relaxed text-accent-foreground break-words">
            What are the latest UPMRC metro tender updates?
          </div>
          <span className="text-[11px] text-muted-foreground">8:06 PM</span>
        </div>
      </AnimatedItem>

      {/* Thinking + second response */}
      <div className="flex flex-col gap-1.5">
        <AnimatedItem visible={step >= 4}>
          <div className="relative">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {/* "Thinking..." shimmer */}
              <span
                className={cn(
                  "absolute transition-opacity duration-300",
                  step === 4 ? "animate-pulse opacity-100" : "invisible opacity-0"
                )}
              >
                Thinking...
              </span>

              {/* "Searching Latest Tenders" */}
              <span
                className={cn(
                  "absolute flex items-center gap-1 transition-opacity duration-300",
                  step === 5 ? "opacity-100" : "invisible opacity-0"
                )}
              >
                Searching Latest Tenders
                <ChevronDown className="h-4 w-4 rotate-180 text-muted-foreground" />
              </span>

              {/* Collapsed "Thought for 4 seconds" */}
              <span
                className={cn(
                  "absolute flex items-center gap-1 transition-opacity duration-300",
                  step >= 6 ? "opacity-100" : "opacity-0"
                )}
              >
                Thought for 4 seconds
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </span>

              {/* Invisible spacer */}
              <span className="invisible">Searching Latest Tenders</span>
            </div>

            {/* Expanded reasoning body */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out",
                step === 5
                  ? "mt-1 max-h-24 opacity-100"
                  : "mt-0 max-h-0 opacity-0"
              )}
            >
              <div className="text-xs leading-relaxed text-muted-foreground">
                <p className="font-medium">Fetching Recent Updates</p>
                <p>
                  Searching web sources for the latest UPMRC Kanpur Metro tender
                  announcements and deadline changes...
                </p>
              </div>
            </div>
          </div>
        </AnimatedItem>

        {/* Second assistant response */}
        <AnimatedItem visible={step >= 7}>
          <div className="text-xs leading-relaxed text-foreground">
            <h4 className="text-sm font-semibold">Latest UPMRC Updates</h4>
            <ul className="mt-1.5 space-y-1">
              <li className="flex items-start gap-1.5 text-foreground/80">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                <span>
                  <span className="font-medium text-foreground">
                    New Tender:
                  </span>{" "}
                  KNPAGT-07 for signalling works, EMD Rs. 15.2L
                  <Cite n={1} />
                </span>
              </li>
              <li className="flex items-start gap-1.5 text-foreground/80">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
                <span>
                  <span className="font-medium text-foreground">
                    Deadline Extended:
                  </span>{" "}
                  KNPAGT-05 bid submission now April 15
                  <Cite n={2} />
                </span>
              </li>
            </ul>

            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span>8:07 PM</span>
              <span>Sources 2</span>
            </div>
          </div>
        </AnimatedItem>
      </div>
    </div>
  );
}
