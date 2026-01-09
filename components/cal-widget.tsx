"use client";

import { useEffect, useState, useMemo } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";

interface CalWidgetProps {
  url: string;
  className?: string;
  namespace?: string;
}

// Parse Cal.com URL to extract calLink (username/event-slug format)
// Format: https://cal.com/username/event-slug or https://cal.com/username/event-slug?params
function parseCalUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/").filter(Boolean);
    
    // Handle cal.com format: /username/event-slug
    if (pathParts.length >= 2 && urlObj.hostname.includes("cal.com")) {
      // Return in format: "username/event-slug"
      return pathParts.join("/");
    }
    
    return null;
  } catch {
    // If URL parsing fails, try simple string parsing
    const match = url.match(/cal\.com\/(.+?)(?:\?|$)/);
    if (match) {
      return match[1];
    }
    return null;
  }
}

export function CalWidget({ url, className, namespace }: CalWidgetProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse URL to extract calLink
  const calLink = useMemo(() => {
    // If URL is already in calLink format (username/event-slug), use it directly
    if (url && !url.startsWith("http") && url.includes("/")) {
      return url;
    }
    // Otherwise, parse from full URL
    return parseCalUrl(url);
  }, [url]);

  // ============================================
  // CAL.COM BRAND COLORS - Uses site's primary colors
  // ============================================
  // Light theme: hsl(208.1013 46.1988% 33.5294%) = #3d6f9f
  // Dark theme: hsl(207.8182 47.8261% 45.0980%) = #5a9fd4
  const lightBrandColor = "#3d6f9f";
  const darkBrandColor = "#5a9fd4";
  // ============================================

  // Initialize and update Cal API with theme-aware CSS variables
  useEffect(() => {
    if (!mounted || !calLink) return;

    (async function () {
      try {
        // Pass namespace to getCalApi if provided
        const cal = namespace 
          ? await getCalApi({ namespace })
          : await getCalApi();
        
        const isDark = resolvedTheme === "dark";

        // Wait for iframe to be ready before configuring
        await new Promise(resolve => setTimeout(resolve, 300));

        // Configure UI with theme-aware colors and explicitly set theme
        cal("ui", {
          theme: isDark ? "dark" : "light",
          cssVarsPerTheme: {
            light: {
              "cal-brand": lightBrandColor,
            },
            dark: {
              "cal-brand": darkBrandColor,
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });

        // Hide skeleton once widget is loaded
        setTimeout(() => {
          try {
            const iframe = document.querySelector('.cal-booker-embed iframe') as HTMLIFrameElement;
            if (iframe?.contentDocument) {
              const skeleton = iframe.contentDocument.getElementById('skeleton-container');
              if (skeleton) {
                skeleton.style.display = 'none';
              }
            }
          } catch (e) {
            // Cross-origin restrictions may prevent access
          }
        }, 1000);
      } catch (error) {
        console.error("Failed to initialize/update Cal.com API:", error);
      }
    })();
  }, [mounted, calLink, namespace, resolvedTheme, lightBrandColor, darkBrandColor]);

  // Debug: log the calLink being used (remove in production if needed)
  // Must be called before any conditional returns to follow Rules of Hooks
  useEffect(() => {
    if (mounted && calLink) {
      console.log("Cal.com calLink:", calLink);
    }
  }, [mounted, calLink]);

  if (!mounted) {
    return (
      <div className={className}>
        <div style={{ minWidth: "320px", minHeight: "700px" }} />
      </div>
    );
  }

  if (!calLink) {
    console.error(`Failed to parse Cal.com URL: ${url}`);
    return (
      <div className={className}>
        <div style={{ minWidth: "320px", minHeight: "700px", padding: "2rem" }}>
          <p className="text-muted-foreground">Invalid Cal.com booking URL</p>
          <p className="text-sm text-muted-foreground mt-2">
            Please provide a valid Cal.com URL (e.g., https://cal.com/username/event-slug)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`cal-booker-embed ${className || ""}`} 
      style={{ width: "100%", minHeight: "700px" }}
      data-theme={resolvedTheme}
    >
      <Cal
        key={`${calLink}-${resolvedTheme}-${lightBrandColor}-${darkBrandColor}`}
        namespace={namespace}
        calLink={calLink}
        style={{ width: "100%", height: "100%", minHeight: "700px" }}
        config={{
          layout: "month_view",
          theme: resolvedTheme === "dark" ? "dark" : "light",
        }}
      />
    </div>
  );
}

