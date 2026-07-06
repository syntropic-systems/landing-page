'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValueSwap } from './RevealBits';

/** `resolved` (beat ≥ 5) settles the evaluation: the winner, L1 badge and
 *  bid/score values fill in once the lowest-cost bidder is picked. */
export function L1EvaluationCard({
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
                    <Award className="h-3 w-3 text-primary" />
                    <p className="text-[11px] font-semibold text-foreground">
                        L1 Bidder Evaluation
                    </p>
                </div>
                <span className="text-[9px] font-medium text-foreground/60 px-1.5 py-0.5 rounded bg-foreground/5">
                    Lowest Cost
                </span>
            </div>

            {/* Winner row */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-primary/5 border border-primary/15 mb-2">
                <div className="h-6 w-6 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
                    <Trophy className="h-3 w-3 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-foreground/55 leading-tight">Winner</p>
                    <div className="mt-0.5 leading-tight">
                        <ValueSwap
                            show={resolved}
                            className="text-[11px] font-semibold text-foreground"
                        >
                            BJ Mehta
                        </ValueSwap>
                    </div>
                </div>
                {resolved && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-[9px] font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10 shrink-0"
                    >
                        L1
                    </motion.span>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-md border border-border/40 bg-background/50 p-1.5">
                    <p className="text-[9px] text-foreground/55 leading-tight">
                        Financial Bid
                    </p>
                    <div className="mt-0.5 leading-tight">
                        <ValueSwap
                            show={resolved}
                            className="text-[11px] font-semibold text-foreground tabular-nums"
                        >
                            ₹1.34 Cr
                        </ValueSwap>
                    </div>
                </div>
                <div className="rounded-md border border-border/40 bg-background/50 p-1.5">
                    <p className="text-[9px] text-foreground/55 leading-tight">
                        Technical Score
                    </p>
                    <div className="mt-0.5 leading-tight">
                        <ValueSwap
                            show={resolved}
                            className="text-[11px] font-semibold text-foreground tabular-nums"
                        >
                            61 / 100
                        </ValueSwap>
                    </div>
                </div>
            </div>

            {/* View link footer — decorative; appears once resolved */}
            <motion.div
                className="mt-auto w-full flex items-center justify-between text-[10px] font-medium text-primary pt-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: resolved ? 1 : 0 }}
                transition={{ duration: 0.3, delay: resolved ? 0.4 : 0 }}
            >
                <span>View Full Evaluation</span>
                <ArrowUpRight className="h-3 w-3" />
            </motion.div>
        </div>
    );
}
