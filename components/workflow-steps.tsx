"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WorkflowStep {
    step: string;
    title: string;
    description: string;
    image?: string;
}

interface WorkflowStepsProps {
    steps: WorkflowStep[];
}

// Baseline values at 1920px width
const BASELINE_WIDTH = 1920;
const BASELINE_Y_OFFSETS = [0, -120, -354, -640];
const BASELINE_SCALES = [1.1, 0.85, 0.70, 0.9];

export function WorkflowSteps({ steps }: WorkflowStepsProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const [multiplier, setMultiplier] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const STEP_DURATION = 7000; // 7 seconds

    // Track container width and calculate multiplier
    useEffect(() => {
        const updateMultiplier = () => {
            if (imageContainerRef.current) {
                const width = imageContainerRef.current.offsetWidth;
                setMultiplier(width / (BASELINE_WIDTH / 2)); // Divide by 2 since container is half of viewport
            }
        };

        updateMultiplier();
        window.addEventListener('resize', updateMultiplier);
        return () => window.removeEventListener('resize', updateMultiplier);
    }, []);

    // Calculate transform based on multiplier
    const getTransform = (index: number) => {
        const yOffset = BASELINE_Y_OFFSETS[index] * multiplier;
        const baseScale = BASELINE_SCALES[index];
        const scale = 1 + (baseScale - 1) * multiplier;
        return `translateY(${yOffset}px) scale(${scale})`;
    };

    // Intersection Observer to detect when component is in view
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                    }
                });
            },
            {
                threshold: 0.2, // Start animation when 20% of the component is visible
            }
        );

        observer.observe(container);

        return () => {
            observer.unobserve(container);
        };
    }, []);

    useEffect(() => {
        // Only start animation when component is in view
        if (!isInView) {
            // Clear intervals when not in view
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
                intervalRef.current = null;
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
            }
            return;
        }

        // Clear existing intervals
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        // Progress bar animation (updates every 50ms for smooth animation)
        let currentProgress = 0;
        progressIntervalRef.current = setInterval(() => {
            currentProgress += (100 / (STEP_DURATION / 50));
            if (currentProgress >= 100) {
                currentProgress = 100;
            }
            setProgress(currentProgress);
        }, 50);

        // Auto-advance to next step after STEP_DURATION
        intervalRef.current = setTimeout(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, STEP_DURATION);

        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [activeStep, steps.length, isInView]);

    const handleStepClick = (index: number) => {
        setActiveStep(index);
        setProgress(0); // Reset progress when manually clicking
    };

    return (
        <div ref={containerRef} className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left side - Steps list */}
            <div>
                {steps.map((step, index) => {
                    const isActive = index === activeStep;

                    return (
                        <div
                            key={step.step}
                            onClick={() => handleStepClick(index)}
                            className={cn(
                                "group relative pl-8 py-2 cursor-pointer transition-all duration-300 mb-4"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 rounded-r overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 w-full bg-primary rounded-r transition-all ease-linear"
                                        style={{
                                            height: `${progress}%`,
                                        }}
                                    />
                                </div>
                            )}
                            {!isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-r " />
                            )}
                            <div className="space-y-2">
                                <h3
                                    className={cn(
                                        "text-2xl font-semibold transition-colors",
                                        isActive ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {step.title}
                                </h3>
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

            {/* Right side - Stacked Images */}
            <div className="sticky top-24 mt-[200px] lg:mt-0">
                <div ref={imageContainerRef} className="overflow-visible bg-transparent aspect-square flex items-start justify-start relative">
                    {steps.slice(0, activeStep + 1).map((step, index) => (
                        step.image && (
                            <img
                                key={step.step}
                                src={step.image}
                                alt={step.title}
                                className="absolute w-full h-full object-contain transition-all duration-500 animate-fade-in"
                                style={{
                                    transform: getTransform(index),
                                    zIndex: index,
                                }}
                            />
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
