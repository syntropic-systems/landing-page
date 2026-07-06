'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { FileUp, Brain, Database, ShieldCheck, Workflow } from 'lucide-react';
import { cn } from '@/lib/utils';

/* Stage order mirrors the content-layer columns for future animation:
   1 → Source Documents · 2+3 → Extracted Intelligence · 4 → right-stack
   cards appear (tasks run) · 5 → their verdicts resolve (badges, scores).
   Validation is deliberately LAST — run actions, then validate outputs. */
export const STAGES = [
    { icon: FileUp, label: 'Document Intake', sub: 'Files ingested' },
    { icon: Brain, label: 'AI Processing', sub: 'Reading content' },
    { icon: Database, label: 'Data Extraction', sub: 'Structuring data' },
    { icon: Workflow, label: 'Automations', sub: 'Run & deliver' },
    { icon: ShieldCheck, label: 'Validation', sub: 'Quality & rules' },
];

/**
 * Renders bare (no card container) — it sits directly on the AppWindow
 * surface, which provides the border/background. Its former header
 * (Workflow Studio title, Running badge, View Runs) now lives in the
 * AppWindow page header, matching the real app shell. Stage tiles carry
 * their own card treatment so they read as pills on that surface.
 *
 * `activeIndex` drives the scene choreography: pills 0..activeIndex are
 * revealed (fade/scale in), pill `activeIndex` is the "running" one
 * (solid-primary icon tile + breathing glow), earlier pills sit idle.
 * activeIndex = -1/null → strip is empty (no pills yet). Layout is
 * reserved (opacity-gated, not unmounted) so the row never reflows.
 */
export function PipelineStrip({
    className,
    activeIndex = null,
}: {
    className?: string;
    activeIndex?: number | null;
}) {
    const active = activeIndex ?? -1;
    return (
        <div className={cn(className)}>
            {/* Stage row — tiles span equally, connectors are separate flex
                items so they sit centered between adjacent tiles.
                NOTE: tuned for the 1920×1080 design target; showcase
                responsiveness is deferred and will be handled separately. */}
            <div className="flex items-stretch gap-1">
                {STAGES.map((stage, i) => {
                    const Icon = stage.icon;
                    const isLast = i === STAGES.length - 1;
                    const isActive = i === active;
                    const isVisible = i <= active;
                    return (
                        <Fragment key={stage.label}>
                            <motion.div
                                initial={false}
                                animate={{
                                    opacity: isVisible ? 1 : 0,
                                    scale: isVisible ? 1 : 0.85,
                                }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className={cn(
                                    'relative isolate flex-1 min-w-0 flex items-center gap-1 px-1 py-2 rounded-lg border shadow-sm transition-colors duration-300',
                                    isActive
                                        ? 'border-primary/30 shadow-md shadow-primary/10'
                                        : 'border-border/50 bg-card/60'
                                )}
                            >
                                {/* Breathing glow behind the running card.
                                    Negative-z children paint ABOVE the
                                    parent's own background, so an opaque
                                    bg-card cover (-z-[5]) sits between the
                                    halo (-z-10) and the content to stop the
                                    glow leaking inside the card. */}
                                {isActive && (
                                    <>
                                        <div
                                            className="absolute -inset-2 -z-10 rounded-xl bg-primary/15 blur-lg animate-pulse"
                                            aria-hidden="true"
                                        />
                                        <div
                                            className="absolute inset-0 -z-[5] rounded-lg bg-card"
                                            aria-hidden="true"
                                        >
                                            <div className="absolute inset-0 rounded-lg bg-accent/20" />
                                        </div>
                                    </>
                                )}
                                <div
                                    className={cn(
                                        'relative h-5 w-5 shrink-0 rounded flex items-center justify-center transition-colors duration-300',
                                        isActive
                                            ? 'bg-primary text-primary-foreground shadow-sm'
                                            : 'bg-accent/50 text-accent-foreground'
                                    )}
                                >
                                    <Icon className="h-3 w-3" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold tracking-tight text-foreground truncate leading-tight">
                                        {stage.label}
                                    </p>
                                    <p
                                        className={cn(
                                            'text-[9px] truncate leading-tight mt-0.5 transition-colors duration-300',
                                            isActive
                                                ? 'text-foreground/70'
                                                : 'text-muted-foreground'
                                        )}
                                    >
                                        {stage.sub}
                                    </p>
                                </div>
                            </motion.div>
                            {!isLast && (
                                <motion.div
                                    className="flex items-center shrink-0"
                                    aria-hidden="true"
                                    initial={false}
                                    animate={{ opacity: i + 1 <= active ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-1.5 border-t border-dashed border-foreground/30" />
                                </motion.div>
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    );
}
