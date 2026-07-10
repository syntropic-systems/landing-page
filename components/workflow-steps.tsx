"use client";

import { useState, useEffect, useCallback, useRef, type ComponentType } from 'react';
import { useInView as useFramerInView } from "framer-motion";
import { cn } from '@/lib/utils';
import { RevealOnScroll } from '@/components/animations';

interface WorkflowStep {
    step: string;
    title: string;
    description: string;
    image?: string;
    showcase?: ComponentType;
    duration?: number;
}

interface WorkflowStepsProps {
    steps: WorkflowStep[];
}

const DEFAULT_DURATION = 7000;

export function WorkflowSteps({ steps }: WorkflowStepsProps) {
    const [active, setActive] = useState(0);
    const [progress, setProgress] = useState(0);
    const startTimeRef = useRef(Date.now());
    const rafRef = useRef<number>(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useFramerInView(sectionRef, { once: true, margin: "-60px" });

    const current = steps[active];
    const Showcase = current?.showcase;
    const stepDuration = current?.duration ?? DEFAULT_DURATION;

    const advanceTab = useCallback(() => {
        setActive((prev) => (prev + 1) % steps.length);
    }, [steps.length]);

    // Progress bar animation synced to showcase duration
    useEffect(() => {
        if (!inView) return;

        startTimeRef.current = Date.now();
        setProgress(0);

        const tick = () => {
            const elapsed = Date.now() - startTimeRef.current;
            const pct = Math.min(elapsed / stepDuration, 1);
            setProgress(pct);

            if (pct < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                advanceTab();
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, advanceTab, inView, stepDuration]);

    const handleStepClick = (i: number) => {
        cancelAnimationFrame(rafRef.current);
        setProgress(0);
        setActive(i);
    };

    return (
        <div ref={sectionRef}>
            {/* ── Mobile: Tab-based layout (< lg) ── */}
            <div className="lg:hidden">
                <RevealOnScroll>
                    <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
                        {steps.map((step, i) => (
                            <button
                                key={step.step}
                                onClick={() => handleStepClick(i)}
                                className="group relative flex flex-col items-start gap-1 pb-3 pt-1 cursor-pointer text-left"
                            >
                                <span
                                    className={cn(
                                        "text-lg sm:text-2xl font-semibold tracking-tight transition-colors duration-300",
                                        i === active
                                            ? "text-primary"
                                            : "text-muted-foreground/40"
                                    )}
                                >
                                    {step.step}
                                </span>
                                <span
                                    className={cn(
                                        "text-xs sm:text-sm font-medium transition-colors duration-300 leading-tight",
                                        i === active
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground/70"
                                    )}
                                >
                                </span>

                                {/* Track */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/60 rounded-full overflow-hidden">
                                    {i === active && (
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${progress * 100}%` }}
                                        />
                                    )}
                                    {i < active && (
                                        <div className="h-full w-full bg-primary/40 rounded-full" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Active content */}
                <div key={active} className="grid items-start gap-6 [&>*]:min-w-0">
                    <RevealOnScroll direction="left" duration={0.5}>
                        <div className="flex flex-col gap-3 pt-2">
                            <h4 className="text-xl md:text-2xl font-semibold tracking-tight">
                                {current.title}
                            </h4>
                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {current.description}
                            </p>
                        </div>
                    </RevealOnScroll>
                    <RevealOnScroll direction="right" duration={0.5} delay={0.15}>
                        <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm aspect-[3/4]">
                            {Showcase ? <Showcase /> : current?.image ? (
                                <img
                                    src={current.image}
                                    alt={current.title}
                                    className="w-full h-full object-contain"
                                />
                            ) : null}
                        </div>
                    </RevealOnScroll>
                </div>
            </div>

            {/* ── Desktop: Vertical step list + sticky showcase (lg+) ── */}
            <RevealOnScroll className="hidden lg:block" duration={0.7}>
            <div className="grid lg:grid-cols-2 lg:gap-8 items-start [&>*]:min-w-0">
                {/* Left side — Step list with progress bar */}
                <div>
                    {steps.map((step, i) => {
                        const isActive = i === active;
                        return (
                            <div
                                key={step.step}
                                onClick={() => handleStepClick(i)}
                                className="group relative pl-8 py-2 cursor-pointer transition-all duration-300 mb-4"
                            >
                                {/* Active progress bar only */}
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-r overflow-hidden">
                                        <div
                                            className="absolute left-0 top-0 w-full bg-primary rounded-r"
                                            style={{ height: `${progress * 100}%` }}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <h4
                                        className={cn(
                                            "text-2xl font-semibold tracking-tight transition-colors",
                                            isActive ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {step.title}
                                    </h4>
                                    <p
                                        className="text-base text-muted-foreground leading-relaxed transition-opacity duration-300"
                                        style={{ visibility: isActive ? 'visible' : 'hidden', opacity: isActive ? 1 : 0 }}
                                        aria-hidden={!isActive}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right side — Sticky showcase */}
                <div className="sticky top-24">
                    <div className="w-full overflow-hidden rounded-lg aspect-square relative">
                        {Showcase ? <Showcase /> : current?.image ? (
                            <img
                                src={current.image}
                                alt={current.title}
                                className="w-full h-full object-contain"
                            />
                        ) : null}
                    </div>
                </div>
            </div>
            </RevealOnScroll>
        </div>
    );
}
