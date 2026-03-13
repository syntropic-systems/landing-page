"use client";

import {
  ChevronRight,
  Folder,
  FileText,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedItem } from "../AnimatedItem";
import { useInView } from "../useInView";
import { useStepAnimation } from "../useStepAnimation";

// Steps: 0=idle, 1=breadcrumb, 2=header+folders, 3-11=files stagger in,
// 12=not-indexed starts processing, 13=processing file completes,
// 14=not-indexed completes, 15=footer summary
const STEP_DELAYS = [0, 500, 400, 300, 300, 300, 300, 300, 300, 300, 300, 300, 800, 800, 800, 600];
const RESET_DELAY = 4500;

type IndexStatus = "indexed" | "not-indexed" | "processing";

type BrowserItem = {
  name: string;
  type: "folder" | "file";
  icon: typeof FileText;
  iconColor: string;
  size?: string;
  items?: string;
  initialStatus?: IndexStatus;
};

// Matches DataBrowser: folders use Folder text-info-foreground,
// files use getFileIcon() color mapping
const BROWSER_ITEMS: BrowserItem[] = [
  // Folders first
  {
    name: "Tender Documents",
    type: "folder",
    icon: Folder,
    iconColor: "text-info-foreground",
    items: "8 items",
  },
  {
    name: "Bidder Responses",
    type: "folder",
    icon: Folder,
    iconColor: "text-info-foreground",
    items: "12 items",
  },
  // Files
  {
    name: "NIT_Document.pdf",
    type: "file",
    icon: FileText,
    iconColor: "text-destructive-foreground",
    size: "2.4 MB",
    initialStatus: "indexed",
  },
  {
    name: "BOQ_Schedule.xlsx",
    type: "file",
    icon: FileSpreadsheet,
    iconColor: "text-success-foreground",
    size: "1.1 MB",
    initialStatus: "indexed",
  },
  {
    name: "Technical_Specs.docx",
    type: "file",
    icon: FileText,
    iconColor: "text-info-foreground",
    size: "850 KB",
    initialStatus: "not-indexed",
  },
  {
    name: "Site_Layout.pdf",
    type: "file",
    icon: FileText,
    iconColor: "text-destructive-foreground",
    size: "5.2 MB",
    initialStatus: "processing",
  },
  {
    name: "Compliance_Matrix.xlsx",
    type: "file",
    icon: FileSpreadsheet,
    iconColor: "text-success-foreground",
    size: "420 KB",
    initialStatus: "indexed",
  },
  {
    name: "EMD_Receipt.pdf",
    type: "file",
    icon: FileText,
    iconColor: "text-destructive-foreground",
    size: "310 KB",
    initialStatus: "not-indexed",
  },
  {
    name: "Evaluation_Criteria.xlsx",
    type: "file",
    icon: FileSpreadsheet,
    iconColor: "text-success-foreground",
    size: "680 KB",
    initialStatus: "indexed",
  },
  {
    name: "Pre_Qualification.pdf",
    type: "file",
    icon: FileText,
    iconColor: "text-destructive-foreground",
    size: "1.8 MB",
    initialStatus: "not-indexed",
  },
  // Outputs folder last
  {
    name: "Outputs",
    type: "folder",
    icon: Folder,
    iconColor: "text-info-foreground",
    items: "0 items",
  },
];

// Indexing status matches DataBrowser.tsx getIndexingStatusInline()
const STATUS_CONFIG: Record<
  IndexStatus,
  { label: string; icon: typeof CheckCircle2; color: string; spin?: boolean }
> = {
  indexed: {
    label: "Indexed",
    icon: CheckCircle2,
    color: "text-success-foreground",
  },
  "not-indexed": {
    label: "Not Indexed",
    icon: AlertTriangle,
    color: "text-warning-foreground",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    color: "text-info-foreground",
    spin: true,
  },
};

export function CentralizedRepoShowcase() {
  const { ref, inView } = useInView();
  const step = useStepAnimation(STEP_DELAYS, RESET_DELAY, undefined, !inView);

  // File indexing status transitions
  // Step 12: all not-indexed → processing
  // Step 13: Site_Layout (was processing) + Technical_Specs → indexed
  // Step 14: EMD_Receipt + Pre_Qualification → indexed (all done)
  const getFileStatus = (item: BrowserItem): IndexStatus | null => {
    if (item.type === "folder" || !item.initialStatus) return null;

    if (item.initialStatus === "not-indexed") {
      // not-indexed → processing (step 12) → indexed (step 13 or 14)
      const earlyBatch = item.name === "Technical_Specs.docx";
      const doneStep = earlyBatch ? 13 : 14;
      if (step >= doneStep) return "indexed";
      if (step >= 12) return "processing";
      return item.initialStatus;
    }
    if (item.name === "Site_Layout.pdf") {
      // processing → indexed (step 13)
      if (step >= 13) return "indexed";
      return item.initialStatus;
    }
    return item.initialStatus;
  };

  const allIndexed = step >= 14;
  const fileCount = BROWSER_ITEMS.filter((i) => i.type === "file").length;
  // 4 indexed initially, +2 at step 13 (Site_Layout + Technical_Specs), +2 at step 14 (EMD + PreQual)
  const indexedCount = step >= 14 ? fileCount : step >= 13 ? fileCount - 2 : fileCount - 4;

  return (
    <div ref={ref} className="flex flex-col gap-2 p-4">
      {/* Breadcrumb */}
      <AnimatedItem visible={step >= 1}>
        <div className="flex items-center gap-1 text-[10px]">
          <Home className="h-3 w-3 text-muted-foreground" />
          <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/50" />
          <span className="text-muted-foreground">Projects</span>
          <ChevronRight className="h-2.5 w-2.5 text-muted-foreground/50" />
          <span className="font-medium text-foreground">Kanpur Metro</span>
        </div>
      </AnimatedItem>

      {/* Item list */}
      <AnimatedItem visible={step >= 2}>
        <div className="overflow-hidden rounded-lg border border-border/60 bg-card">
          {/* List header */}
          <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b bg-muted/50 px-3 py-1.5">
            <span className="text-[9px] font-semibold text-muted-foreground">Name</span>
            <span className="w-12 text-right text-[9px] font-semibold text-muted-foreground">Size</span>
            <span className="w-[4.5rem] text-right text-[9px] font-semibold text-muted-foreground">Status</span>
          </div>

          {/* Rows */}
          {BROWSER_ITEMS.map((item, i) => {
            const visible = step >= 2 + i;
            const status = getFileStatus(item);
            const statusConf = status ? STATUS_CONFIG[status] : null;

            return (
              <div
                key={i}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto] items-center gap-2 px-3 py-1.5 transition-all duration-300",
                  visible ? "opacity-100" : "translate-y-1 opacity-0",
                  i < BROWSER_ITEMS.length - 1 && "border-b border-border/40"
                )}
              >
                {/* Name + icon */}
                <div className="flex min-w-0 items-center gap-2">
                  <item.icon className={cn("h-4 w-4 shrink-0", item.iconColor)} />
                  <span className="min-w-0 truncate text-[11px] font-medium">{item.name}</span>
                </div>

                {/* Size / items count */}
                <span className="w-12 text-right text-[10px] text-muted-foreground">
                  {item.type === "folder" ? item.items : item.size}
                </span>

                {/* Indexing status (files only) */}
                <div className="flex w-[4.5rem] items-center justify-end">
                  {statusConf ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[9px] font-medium transition-colors duration-500",
                        statusConf.color
                      )}
                    >
                      <statusConf.icon
                        className={cn(
                          "h-3 w-3 shrink-0",
                          statusConf.spin && "animate-spin"
                        )}
                      />
                      <span className="truncate">{statusConf.label}</span>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedItem>

      {/* Footer summary */}
      <AnimatedItem visible={step >= 15}>
        <div className="flex items-center justify-between rounded-lg border border-border/60 bg-card px-3 py-2">
          <span className="text-[10px] text-muted-foreground">
            {fileCount} files &middot; 3 folders &middot;{" "}
            <span className={cn("font-medium", allIndexed ? "text-success-foreground" : "text-foreground")}>
              {indexedCount} indexed
            </span>
          </span>
          {allIndexed && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-success-foreground">
              <CheckCircle2 className="h-3 w-3" />
              Ready for automations
            </span>
          )}
        </div>
      </AnimatedItem>
    </div>
  );
}
