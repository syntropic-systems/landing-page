'use client';

import React, { useRef, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { RevealOnScroll } from '@/components/animations';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
  'data-step-id'?: string;
  [key: string]: any;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  ...props
}) => (
  <div
    className={`scroll-stack-card relative w-full p-4 sm:p-8 rounded-2xl shadow-2xl border border-border/40 ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden' }}
    {...props}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  /** Top offset in px for the first card (subsequent cards offset by stackGap) */
  stickyTop?: number;
  /** Vertical gap between stacked card tops in px */
  stackGap?: number;
  /** Scale reduction per card depth in stack (0 = no scale) */
  itemScale?: number;
  onStackComplete?: () => void;
  // Legacy props kept for API compat but ignored
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  enableSmoothScroll?: boolean;
}

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  stickyTop = 100,
  stackGap = 12,
  itemScale = 0.02,
  onStackComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const cardCount = React.Children.count(children);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('.scroll-stack-card');
    if (!cards.length) return;

    const update = () => {
      let topmost = -1;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const stickyOffset = stickyTop + i * stackGap;
        // Card is "stuck" when its top matches its sticky position (within 2px)
        if (rect.top <= stickyOffset + 2) {
          topmost = i;
        }
      });
      setActiveIndex(topmost);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    return () => window.removeEventListener('scroll', update);
  }, [stickyTop, stackGap, cardCount, isMobile]);

  // Fire onStackComplete when last card enters stack
  useEffect(() => {
    if (activeIndex === cardCount - 1) {
      onStackComplete?.();
    }
  }, [activeIndex, cardCount, onStackComplete]);

  // Mobile: each card reveals independently on scroll
  if (isMobile) {
    return (
      <div className={`relative w-full space-y-6 ${className}`.trim()}>
        {React.Children.map(children, (child, i) => (
          <RevealOnScroll key={i} delay={0.05}>
            {child}
          </RevealOnScroll>
        ))}
      </div>
    );
  }

  // Desktop: sticky scroll stack with initial reveal
  return (
    <RevealOnScroll duration={0.7}>
      <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) return child;

          const depth = Math.max(0, activeIndex - i);
          const scale = depth > 0 ? 1 - depth * itemScale : 1;

          return (
            <div
              className="sticky"
              style={{
                top: `${stickyTop + i * stackGap}px`,
                zIndex: i,
                transform: `scale(${scale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.3s ease-out',
                marginBottom: i < cardCount - 1 ? '24px' : '0',
              }}
            >
              {child}
            </div>
          );
        })}
        {/* Extra space so the last card can fully stick */}
        <div style={{ height: '30vh' }} />
      </div>
    </RevealOnScroll>
  );
};

export default ScrollStack;
