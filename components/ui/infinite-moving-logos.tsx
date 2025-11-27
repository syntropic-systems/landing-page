"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

type LogoItem = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
};

type InfiniteMovingLogosProps = {
  items: LogoItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  variant?: "infinite" | "static";
};

export const InfiniteMovingLogos = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  variant = "infinite",
}: InfiniteMovingLogosProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const isStatic = variant === "static";
  const infiniteGapOffset = "1.25rem"; // half of gap-10 spacing

  useEffect(() => {
    if (isStatic) return;

    const initAnimation = () => {
      if (!scrollerRef.current || !containerRef.current) return;

      const scrollerEl = scrollerRef.current;
      const containerEl = containerRef.current;
      const originalChildrenCount = scrollerEl.children.length;

      const ensureFullWidth = () => {
        let totalWidth = scrollerEl.scrollWidth;
        const clonedChildren = Array.from(scrollerEl.children);

        // Duplicate content until we can cover at least two full widths.
        while (
          totalWidth < containerEl.offsetWidth * 2 &&
          scrollerEl.children.length < originalChildrenCount * 6
        ) {
          clonedChildren.forEach((child) => {
            const duplicatedItem = child.cloneNode(true);
            scrollerEl.appendChild(duplicatedItem);
          });
          totalWidth = scrollerEl.scrollWidth;
        }
      };

      ensureFullWidth();

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse",
      );

      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    };

    initAnimation();

    return () => {
      if (!scrollerRef.current) return;
      const scrollerEl = scrollerRef.current;
      const originalLength = items.length;

      while (scrollerEl.children.length > originalLength) {
        scrollerEl.removeChild(scrollerEl.lastChild as ChildNode);
      }
      setStart(false);
    };
  }, [direction, speed, isStatic, items.length]);


  return (
    <div
      ref={isStatic ? undefined : containerRef}
      className={cn(
        isStatic
          ? "relative z-20 mx-auto flex w-full justify-center"
          : "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,var(--background)_15%,var(--background)_85%,transparent)]",
        className,
      )}
    >
      <ul
        ref={isStatic ? undefined : scrollerRef}
        className={cn(
          isStatic
            ? "flex flex-wrap items-center justify-center gap-20"
            : "flex w-max min-w-full shrink-0 flex-nowrap gap-10 py-4",
          !isStatic && start && "animate-scroll",
          !isStatic && pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={
          !isStatic
            ? ({ "--scroll-offset": infiniteGapOffset } as React.CSSProperties)
            : undefined
        }
      >
        {items.map((item, index) => (
          <li
            key={`${item.src}-${index}`}
            className="flex h-20 w-40 items-center justify-center transition-colors md:w-48"
            aria-label={item.alt ?? "Client logo"}
          >
            <Image
              src={item.src}
              alt={item.alt ?? "Client logo"}
              width={item.width ?? 140}
              height={item.height ?? 48}
              className="h-10 w-auto object-contain opacity-100 grayscale transition hover:opacity-100 hover:grayscale-0"
              draggable={false}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

