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
      <div className={className}>
        <div style={{ minWidth: "320px", minHeight: "700px" }} />
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
