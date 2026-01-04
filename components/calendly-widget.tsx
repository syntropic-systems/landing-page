"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface CalendlyWidgetProps {
  url: string;
  className?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
        resize?: boolean;
      }) => void;
    };
  }
}

export function CalendlyWidget({ url, className }: CalendlyWidgetProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const isDark = resolvedTheme === "dark";
    const bgColor = isDark ? "17181b" : "fafafa";
    const textColor = isDark ? "f5f5f5" : "1a1a1a";
    const primaryColor = isDark ? "5a9fd4" : "3d6f9f";

    const fullUrl = `${url}?background_color=${bgColor}&text_color=${textColor}&primary_color=${primaryColor}`;

    const initWidget = () => {
      if (containerRef.current && window.Calendly) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: fullUrl,
          parentElement: containerRef.current,
          resize: true,
        });
      }
    };

    if (window.Calendly) {
      initWidget();
    } else {
      const checkCalendly = setInterval(() => {
        if (window.Calendly) {
          clearInterval(checkCalendly);
          initWidget();
        }
      }, 100);
      return () => clearInterval(checkCalendly);
    }
  }, [mounted, url, resolvedTheme]);

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

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="calendly-inline-widget"
        style={{ minWidth: "320px", minHeight: "700px" }}
      />
    </div>
  );
}
