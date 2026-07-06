'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, XCircle, FileQuestion, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValueSwap } from './RevealBits';

const STATS = [
    { icon: CheckCircle2, label: 'Matched', value: '7', tone: 'text-success-foreground', bg: 'bg-success/40' },
    { icon: XCircle, label: 'Missing', value: '5', tone: 'text-destructive-foreground', bg: 'bg-destructive/40' },
    { icon: FileQuestion, label: 'Extra', value: '17', tone: 'text-warning-foreground', bg: 'bg-warning/40' },
];

/** `resolved` (beat ≥ 5) settles the scan: badge, score bar and stat
 *  counts fill in; before that the card sits in a scanning state. */
export function ComplianceCard({
    className,
    resolved = true,
}: {
    className?: string;
    resolved?: boolean;
    settled?: boolean; // accepted for a uniform right-card API; unused here
}) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-2.5 w-full sm:w-[240px]',
                className
            )}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-primary" />
                    <p className="text-[11px] font-semibold text-foreground">
                        Compliance Summary
                    </p>
                </div>
                {resolved ? (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-[9px] font-medium text-warning-foreground px-1.5 py-0.5 rounded bg-warning/40 border border-warning-foreground/20"
                    >
                        <AlertTriangle className="h-2.5 w-2.5" />
                        Gaps Found
                    </motion.span>
                ) : (
                    <span className="inline-flex items-center gap-1 shrink-0 whitespace-nowrap text-[9px] font-medium text-foreground/50 px-1.5 py-0.5 rounded bg-foreground/5 border border-border/40">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-pulse" />
                        Scanning…
                    </span>
                )}
            </div>

            {/* Score bar */}
            <div className="mb-2">
                <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[9px] text-foreground/55 uppercase tracking-wider font-medium">
                        Quality Score
                    </span>
                    <ValueSwap
                        show={resolved}
                        className="text-[11px] font-semibold text-foreground tabular-nums"
                    >
                        81 / 100
                    </ValueSwap>
                </div>
                <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: resolved ? '81%' : 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>

            {/* Stat triplet */}
            <div className="grid grid-cols-3 gap-1">
                {STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className={cn(
                                'rounded-md p-1.5 flex flex-col items-center gap-0 border border-border/40',
                                stat.bg
                            )}
                        >
                            <Icon className={cn('h-2.5 w-2.5', stat.tone)} />
                            <ValueSwap
                                show={resolved}
                                className={cn('text-[11px] font-bold tabular-nums mt-0.5', stat.tone)}
                            >
                                {stat.value}
                            </ValueSwap>
                            <p className="text-[8px] text-foreground/60 leading-none mt-0.5">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* View link footer — decorative; appears once resolved */}
            <motion.div
                className="mt-auto w-full flex items-center justify-between text-[10px] font-medium text-primary pt-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: resolved ? 1 : 0 }}
                transition={{ duration: 0.3, delay: resolved ? 0.4 : 0 }}
            >
                <span>View Details</span>
                <ArrowUpRight className="h-3 w-3" />
            </motion.div>
        </div>
    );
}
