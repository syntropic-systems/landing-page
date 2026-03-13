"use client";

import { useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Monitor, Play } from "lucide-react";
import { ThemeAwareImage } from "@/components/theme-aware-image";

interface ImageShowcaseToggleProps {
  image: string;
  imageDark?: string;
  alt: string;
  showcase?: ComponentType;
}

export function ImageShowcaseToggle({
  image,
  imageDark,
  alt,
  showcase: Showcase,
}: ImageShowcaseToggleProps) {
  const [showLive, setShowLive] = useState(false);

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 md:col-span-2 overflow-hidden">
      {/* Toggle row — only when showcase exists */}
      {Showcase && (
        <div className="flex justify-end">
          <button
            onClick={() => setShowLive((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all duration-200",
              showLive
                ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                : "border-border/60 bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {showLive ? (
              <>
                <Monitor className="h-3 w-3" />
                Platform View
              </>
            ) : (
              <>
                <Play className="h-3 w-3" />
                Live Preview
              </>
            )}
          </button>
        </div>
      )}

      {/* Content area */}
      <div>
        {/* Image view */}
        {!showLive && (
          <div className="overflow-hidden relative aspect-video rounded-lg border border-border shadow-md">
            <ThemeAwareImage
              src={image}
              srcDark={imageDark}
              alt={alt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Showcase view — taller than image to show full showcase */}
        {Showcase && showLive && (
          <div className="relative aspect-[3/4] md:aspect-video overflow-hidden bg-card [&>*]:!p-0">
            <Showcase />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
