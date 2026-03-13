'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/animations';

interface Hero2Props {
    title: string;
    description?: string;
    badge?: string;
}

export function Hero2({
    title,
    description,
    badge,
}: Hero2Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const hasForcedScroll = useRef(false);
    const isAutoScrolling = useRef(false);
    const touchStartY = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const hero = sectionRef.current;
        if (!hero) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
        if (isMobile) return;

        const scrollToNext = () => {
            const next = hero.nextElementSibling as HTMLElement | null;
            if (!next) {
                hasForcedScroll.current = false;
                return;
            }

            const header = document.querySelector('header') as HTMLElement | null;
            const headerHeight = header?.offsetHeight ?? 0;

            isAutoScrolling.current = true;
            touchStartY.current = null;

            const heroRect = hero.getBoundingClientRect();
            const heroBottom = heroRect.bottom + window.scrollY;
            const targetTop = heroBottom - headerHeight;

            window.scrollTo({
                top: Math.max(targetTop, 0),
                behavior: 'smooth',
            });

            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                isAutoScrolling.current = false;
            }, 900);
        };

        const isWithinHero = () => {
            const heroRect = hero.getBoundingClientRect();
            const heroTop = heroRect.top + window.scrollY;
            const heroBottom = heroTop + heroRect.height;
            const scrollY = window.scrollY;
            return scrollY >= heroTop - 2 && scrollY < heroBottom - 2;
        };

        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY <= 0) return;

            if (isAutoScrolling.current) {
                if (event.cancelable) event.preventDefault();
                return;
            }

            if (hasForcedScroll.current) return;
            if (!isWithinHero()) return;

            if (event.cancelable) event.preventDefault();

            hasForcedScroll.current = true;
            scrollToNext();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!['Space', 'PageDown', 'ArrowDown'].includes(event.code)) return;

            const target = event.target as HTMLElement | null;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
                return;
            }

            if (isAutoScrolling.current) {
                event.preventDefault();
                return;
            }

            if (hasForcedScroll.current) return;
            if (!isWithinHero()) return;

            event.preventDefault();
            hasForcedScroll.current = true;
            scrollToNext();
        };

        const handleTouchStart = (event: TouchEvent) => {
            touchStartY.current = event.touches[0]?.clientY ?? null;
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (isAutoScrolling.current) {
                if (event.cancelable) event.preventDefault();
                return;
            }

            if (hasForcedScroll.current) return;
            if (touchStartY.current === null) return;

            const currentY = event.touches[0]?.clientY ?? null;
            if (currentY === null) return;

            const delta = touchStartY.current - currentY;
            if (delta <= 32) return;
            if (!isWithinHero()) return;

            if (event.cancelable) event.preventDefault();

            hasForcedScroll.current = true;
            scrollToNext();
        };

        const handleTouchEnd = () => {
            touchStartY.current = null;
        };

        const handleScroll = () => {
            if (window.scrollY <= hero.offsetHeight * 0.25) {
                hasForcedScroll.current = false;
            }
        };

        hero.addEventListener('wheel', handleWheel, { passive: false });
        hero.addEventListener('touchstart', handleTouchStart, { passive: true });
        hero.addEventListener('touchmove', handleTouchMove, { passive: false });
        hero.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            hero.removeEventListener('wheel', handleWheel);
            hero.removeEventListener('touchstart', handleTouchStart);
            hero.removeEventListener('touchmove', handleTouchMove);
            hero.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <motion.section
            ref={sectionRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative h-[100vh] flex items-center -mt-14 pt-14 mb-20 md:mb-28 lg:mb-32 overflow-hidden rounded-b-3xl shadow-primary/30 shadow-2xl bg-background bg-gradient-to-b from-primary/50 via-background to-card"
        >
            <div className="container relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl text-left space-y-6 lg:space-y-10">
                        {badge && (
                            <RevealOnScroll direction="up" duration={0.6}>
                                <span className="inline-flex items-center px-3 py-1 rounded-full border border-primary/70 bg-accent/60 text-accent-foreground text-sm font-semibold tracking-wider backdrop-blur uppercase">
                                    {badge}
                                </span>
                            </RevealOnScroll>
                        )}
                        <RevealOnScroll direction="up" delay={0.15} duration={0.7}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                                {title}
                            </h1>
                        </RevealOnScroll>
                        {description && (
                            <RevealOnScroll direction="up" delay={0.3} duration={0.7}>
                                <p className="text-lg md:text-xl text-foreground/70">
                                    {description}
                                </p>
                            </RevealOnScroll>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
