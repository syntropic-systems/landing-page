"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const STORAGE_KEY = "scroll-to-section";
const NAV_DATA_KEY = "nav-data";

type NavData = Record<string, string>;

/**
 * Store a section ID to scroll to after navigation.
 */
export function setScrollTarget(sectionId: string) {
  sessionStorage.setItem(STORAGE_KEY, sectionId);
}

/**
 * Store arbitrary key-value data to be consumed by the target page.
 * Used for things like pre-selecting a tab without putting it in the URL.
 */
export function setNavData(data: NavData) {
  sessionStorage.setItem(NAV_DATA_KEY, JSON.stringify(data));
}

/**
 * Read and clear stored nav data. Returns null if none exists.
 */
export function consumeNavData(): NavData | null {
  const raw = sessionStorage.getItem(NAV_DATA_KEY);
  if (!raw) return null;
  sessionStorage.removeItem(NAV_DATA_KEY);
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Client component that scrolls to a stored section target after navigation.
 * Place once in the layout.
 */
export function ScrollToSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sectionId = sessionStorage.getItem(STORAGE_KEY);
    if (!sectionId) return;

    sessionStorage.removeItem(STORAGE_KEY);

    // Small delay to let the page render, then scroll
    const timeout = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  return null;
}
