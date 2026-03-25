"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/lib/blog";

export function BlogToc({ items }: { items: TocItem[] }) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    const headingEls = items
      .map((item) => document.getElementById(item.slug))
      .filter(Boolean) as HTMLElement[];

    if (headingEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target.id) {
          setActiveSlug(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1" aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.slug}
          href={`#${item.slug}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(item.slug)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className={cn(
            "block text-sm py-1 transition-colors border-l-2",
            item.level === 2 ? "pl-3" : "pl-6",
            activeSlug === item.slug
              ? "border-primary text-primary font-medium"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          )}
        >
          {item.text}
        </a>
      ))}
    </nav>
  );
}
