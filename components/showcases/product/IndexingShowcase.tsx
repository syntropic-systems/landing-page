"use client";

import {
  FileText,
  CheckCircle,
  Loader2,
  Image,
  Table2,
  Type,
  Heading,
  AlignLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// ── Pipeline stages ──

const PIPELINE_STEPS = [
  { label: "Uploading" },
  { label: "Parsing" },
  { label: "Analyzing" },
  { label: "Indexing" },
  { label: "Ready" },
];

// ── Bounding box element definitions ──

const BBOX_ELEMENTS = [
  { label: "Title", icon: Type, colorVar: "--pdf-anno-heading" },
  { label: "Heading", icon: Heading, colorVar: "--pdf-anno-heading" },
  { label: "Body", icon: AlignLeft, colorVar: "--pdf-anno-text" },
  { label: "Table", icon: Table2, colorVar: "--pdf-anno-table" },
  { label: "Heading", icon: Heading, colorVar: "--pdf-anno-heading" },
  { label: "Body", icon: AlignLeft, colorVar: "--pdf-anno-text" },
  { label: "Image", icon: Image, colorVar: "--pdf-anno-image" },
  { label: "Body", icon: AlignLeft, colorVar: "--pdf-anno-text" },
];

// ── BboxOverlay ──

function BboxOverlay({
  el,
  visible,
  children,
}: {
  el: (typeof BBOX_ELEMENTS)[number];
  visible: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-sm transition-all duration-500 ease-out",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <div
          className="absolute inset-0 rounded-sm"
          style={{ backgroundColor: `var(${el.colorVar})`, opacity: 0.1 }}
        />
        <div
          className="absolute inset-0 rounded-sm"
          style={{ border: `1px solid var(${el.colorVar})` }}
        />
        <div
          className="absolute -top-3.5 left-0 flex items-center gap-0.5 rounded px-1 py-0.5 text-white"
          style={{ backgroundColor: `var(${el.colorVar})`, fontSize: "8px", lineHeight: 1 }}
        >
          <el.icon className="h-2 w-2" />
          {el.label}
        </div>
      </div>
    </div>
  );
}

// ── Steps: 0=idle, 1=file card+doc, 2=Uploading, 3=Parsing(scan),
//    4=Analyzing(highlights), 5=Indexing, 6-13=bbox elements, 14=Ready ──

const STEP_DELAYS = [
  0, 500, 800, 1500, 1400, 1500, 250, 250, 250, 250, 250, 250, 250, 250, 800,
];
const RESET_DELAY = 4000;

export function IndexingShowcase({ frozen }: { frozen?: number } = {}) {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, frozen, !inView);

  const activeStage =
    step >= 14 ? 4 : step >= 5 ? 3 : step >= 4 ? 2 : step >= 3 ? 1 : step >= 2 ? 0 : -1;
  const isReady = step >= 14;
  const visibleBoxes = step >= 6 ? Math.min(step - 5, BBOX_ELEMENTS.length) : 0;

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3 p-4">
      {/* File card */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-center gap-2 rounded-lg border bg-card p-4">
          <FileText className="h-4 w-4 shrink-0 text-destructive-foreground" />
          <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
            <p className="truncate text-xs font-medium text-foreground">
              KNPAGT-05_NIT.pdf
            </p>
            <p className="shrink-0 text-[10px] text-muted-foreground">
              2.4 MB
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            {activeStage >= 0 && !isReady && (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin text-info-foreground" />
                <span className="text-[10px] font-medium text-info-foreground">
                  {PIPELINE_STEPS[activeStage].label}
                </span>
              </>
            )}
            {isReady && (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-success-foreground" />
                <span className="text-[10px] font-medium text-success-foreground">
                  Indexed
                </span>
              </>
            )}
          </div>
        </div>
      </AnimatedItem>

      {/* Progress steps */}
      <AnimatedItem visible={step >= 2}>
        <div className="flex items-center gap-1 px-1">
          {PIPELINE_STEPS.map((s, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={cn(
                  "h-1 w-full rounded-full transition-colors duration-500",
                  i <= activeStage
                    ? isReady
                      ? "bg-success-foreground"
                      : "bg-info-foreground"
                    : "bg-muted"
                )}
              />
              <span
                className={cn(
                  "text-[9px] transition-colors duration-300",
                  i === activeStage && !isReady
                    ? "font-medium text-info-foreground"
                    : i < activeStage || isReady
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                )}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </AnimatedItem>

      {/* Mini document page */}
      <AnimatedItem visible={step >= 1} className="flex flex-1 flex-col">
        <div className="relative mx-auto flex w-full md:w-[45%] flex-1 flex-col overflow-hidden rounded border border-border/60 bg-card shadow-sm">
          <div className="relative flex flex-1 flex-col gap-2 p-3 pt-4">
            {/* Title */}
            <BboxOverlay el={BBOX_ELEMENTS[0]} visible={visibleBoxes > 0}>
              <div
                className={cn(
                  "h-[5px] w-[55%] rounded-full transition-all duration-400",
                  step === 4 ? "bg-info-foreground/30" : "bg-foreground/25"
                )}
              />
            </BboxOverlay>

            {/* Section heading 1 */}
            <BboxOverlay el={BBOX_ELEMENTS[1]} visible={visibleBoxes > 1}>
              <div
                className={cn(
                  "h-[4px] w-[38%] rounded-full transition-all duration-400",
                  step === 4 ? "bg-info-foreground/30" : "bg-foreground/20"
                )}
              />
            </BboxOverlay>

            {/* Body paragraphs 1 */}
            <BboxOverlay el={BBOX_ELEMENTS[2]} visible={visibleBoxes > 2}>
              <div className="space-y-[4px] py-0.5">
                {[100, 100, 100, 100, 100, 100, 100, 60].map((w, i) => (
                  <div
                    key={`b1-${i}`}
                    className={cn(
                      "h-[2px] rounded-full transition-all",
                      step === 4 ? "bg-info-foreground/30" : "bg-foreground/10"
                    )}
                    style={{
                      width: `${w}%`,
                      transitionDelay: step === 4 ? `${i * 60}ms` : "0ms",
                      transitionDuration: "400ms",
                    }}
                  />
                ))}
              </div>
            </BboxOverlay>

            {/* Table */}
            <BboxOverlay el={BBOX_ELEMENTS[3]} visible={visibleBoxes > 3}>
              <div
                className={cn(
                  "overflow-hidden rounded-sm border transition-colors duration-400",
                  step === 4 ? "border-info-foreground/20" : "border-foreground/10"
                )}
              >
                <div
                  className={cn(
                    "flex border-b transition-colors duration-400",
                    step === 4
                      ? "border-info-foreground/20 bg-info-foreground/10"
                      : "border-foreground/10 bg-foreground/[0.04]"
                  )}
                >
                  {[1, 2, 3].map((c) => (
                    <div
                      key={`th-${c}`}
                      className={cn(
                        "flex-1 px-1.5 py-[3px]",
                        c < 3 && "border-r border-foreground/10"
                      )}
                    >
                      <div
                        className={cn(
                          "h-[2px] w-[65%] rounded-full transition-all duration-400",
                          step === 4 ? "bg-info-foreground/30" : "bg-foreground/15"
                        )}
                      />
                    </div>
                  ))}
                </div>
                {[0, 1, 2, 3, 4].map((row) => (
                  <div
                    key={`tr-${row}`}
                    className={cn(
                      "flex",
                      row < 4 && "border-b border-foreground/[0.06]"
                    )}
                  >
                    {[1, 2, 3].map((c) => (
                      <div
                        key={`td-${row}-${c}`}
                        className={cn(
                          "flex-1 px-1.5 py-[3px]",
                          c < 3 && "border-r border-foreground/[0.06]"
                        )}
                      >
                        <div
                          className={cn(
                            "h-[2px] rounded-full transition-all",
                            step === 4 ? "bg-info-foreground/30" : "bg-foreground/8"
                          )}
                          style={{
                            width: `${40 + ((row * c * 17) % 45)}%`,
                            transitionDelay:
                              step === 4 ? `${row * 60}ms` : "0ms",
                            transitionDuration: "400ms",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </BboxOverlay>

            {/* Section heading 2 */}
            <BboxOverlay el={BBOX_ELEMENTS[4]} visible={visibleBoxes > 4}>
              <div
                className={cn(
                  "h-[4px] w-[42%] rounded-full transition-all duration-400",
                  step === 4 ? "bg-info-foreground/30" : "bg-foreground/20"
                )}
              />
            </BboxOverlay>

            {/* Body paragraphs 2 */}
            <BboxOverlay el={BBOX_ELEMENTS[5]} visible={visibleBoxes > 5}>
              <div className="space-y-[4px] py-0.5">
                {[100, 100, 100, 100, 100, 100, 55, 0, 100, 100, 100, 100, 70].map(
                  (w, i) => (
                    <div
                      key={`b2-${i}`}
                      className={cn(
                        "h-[2px] rounded-full transition-all",
                        step === 4 ? "bg-info-foreground/30" : "bg-foreground/10"
                      )}
                      style={{
                        width: `${w}%`,
                        transitionDelay: step === 4 ? `${i * 60}ms` : "0ms",
                        transitionDuration: "400ms",
                      }}
                    />
                  )
                )}
              </div>
            </BboxOverlay>

            {/* Image + text columns */}
            <div className="flex gap-2">
              <div className="flex-1">
                <BboxOverlay el={BBOX_ELEMENTS[6]} visible={visibleBoxes > 6}>
                  <div
                    className={cn(
                      "flex aspect-square items-center justify-center rounded border transition-all duration-400",
                      step === 4
                        ? "border-info-foreground/20 bg-info-foreground/10"
                        : "border-foreground/8 bg-foreground/[0.03]"
                    )}
                  >
                    <Image className="h-4 w-4 text-foreground/15" />
                  </div>
                </BboxOverlay>
              </div>
              <div className="flex-1">
                <BboxOverlay el={BBOX_ELEMENTS[7]} visible={visibleBoxes > 7}>
                  <div className="space-y-[4px] py-1">
                    {[
                      100, 100, 100, 100, 100, 50, 0, 100, 100, 100, 100, 100,
                      100, 20, 0, 100, 100, 100, 100, 100, 100, 100, 70,
                    ].map((w, i) => (
                      <div
                        key={`cap-${i}`}
                        className={cn(
                          "h-[2px] rounded-full transition-all",
                          step === 4 ? "bg-info-foreground/30" : "bg-foreground/10"
                        )}
                        style={{
                          width: `${w}%`,
                          transitionDelay:
                            step === 4 ? `${i * 60}ms` : "0ms",
                          transitionDuration: "400ms",
                        }}
                      />
                    ))}
                  </div>
                </BboxOverlay>
              </div>
            </div>

            {/* Effects layer */}

            {/* Uploading shimmer (step 2) */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                step === 2 ? "opacity-100" : "opacity-0"
              )}
            >
              <div
                className="h-full w-full animate-pulse"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, transparent 25%, var(--muted) 50%, transparent 75%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>

            {/* Parsing scan line (step 3) */}
            {step === 3 && (
              <div
                className="absolute left-0 h-[2px] w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--primary), transparent)",
                  boxShadow: "0 0 8px var(--primary)",
                  animation: "scan-down 1.4s ease-in-out infinite",
                }}
              />
            )}
          </div>
        </div>
      </AnimatedItem>

      {/* Completion */}
      <AnimatedItem visible={step >= 14}>
        <div className="flex items-center justify-center gap-1.5 py-1">
          <CheckCircle className="h-3 w-3 text-success-foreground" />
          <span className="text-[10px] font-medium text-success-foreground">
            Document indexed — 47 elements detected
          </span>
        </div>
      </AnimatedItem>
    </div>
  );
}
