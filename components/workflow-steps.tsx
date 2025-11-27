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

export function WorkflowSteps({ steps }: WorkflowStepsProps) {
    const [activeStep, setActiveStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const STEP_DURATION = 7000; // 7 seconds

    // Intersection Observer to detect when component is in view
    useEffect(() => {
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

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
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

        // Reset progress when step changes
        setProgress(0);

        // Clear existing intervals
        if (intervalRef.current) {
            clearTimeout(intervalRef.current);
        }
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }

        // Progress bar animation (updates every 50ms for smooth animation)
        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev + (100 / (STEP_DURATION / 50));
                return newProgress >= 100 ? 100 : newProgress;
            });
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

    const activeStepData = steps[activeStep];

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

            {/* Right side - Image */}
            <div className="sticky top-24">
                <div className="rounded-xl shadow-lg overflow-hidden bg-muted aspect-[4/3] flex items-center justify-center relative">
                    {activeStepData?.image && (
                        <img
                            src={activeStepData.image}
                            alt={activeStepData.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

