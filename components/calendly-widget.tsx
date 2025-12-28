"use client";

import { useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { useTheme } from "next-themes";

interface CalendlyWidgetProps {
  url: string;
  className?: string;
}

export function CalendlyWidget({ url, className }: CalendlyWidgetProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center bg-muted/50 rounded-lg ${className}`}
        style={{ minHeight: "700px" }}
        aria-label="Loading calendar..."
      >
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span className="text-sm text-muted-foreground">Loading calendar...</span>
        </div>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const pageSettings = {
    backgroundColor: isDark ? "1a1a1a" : "fafafa",
    hideEventTypeDetails: false,
    hideLandingPageDetails: false,
    primaryColor: isDark ? "5a9fd4" : "3d6f9f",
    textColor: isDark ? "f5f5f5" : "1a1a1a",
  };

  return (
    <div className={className}>
      <InlineWidget
        url={url}
        pageSettings={pageSettings}
        styles={{
          height: "750px",
          minHeight: "750px",
        }}
      />
    </div>
  );
}
