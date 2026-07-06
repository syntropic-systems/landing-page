'use client';

import { motion } from 'framer-motion';
import { FolderCheck, CheckCircle2, Loader2, Paperclip, FileText, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ValueSwap } from './RevealBits';

type FormStatus = 'filled' | 'filling' | 'attached' | 'physical';

const FORMS: Array<{
    code: string;
    name: string;
    status: FormStatus;
    statusLabel: string;
}> = [
    { code: 'Form 1', name: 'Bid Form', status: 'filled', statusLabel: 'Filled' },
    { code: 'Form 1-A', name: 'Power of Attorney', status: 'filling', statusLabel: 'Filling…' },
];

const STATUS_STYLES: Record<FormStatus, { icon: typeof CheckCircle2; iconClass: string; pillClass: string }> = {
    filled: {
        icon: CheckCircle2,
        iconClass: 'text-success-foreground',
        pillClass: 'bg-success/40 text-success-foreground border-success-foreground/20',
    },
    attached: {
        icon: Paperclip,
        iconClass: 'text-primary',
        pillClass: 'bg-primary/10 text-primary border-primary/20',
    },
    filling: {
        icon: Loader2,
        iconClass: 'text-warning-foreground animate-spin',
        pillClass: 'bg-warning/40 text-warning-foreground border-warning-foreground/20',
    },
    physical: {
        icon: FileText,
        iconClass: 'text-foreground/50',
        pillClass: 'bg-foreground/5 text-foreground/65 border-foreground/15',
    },
};

/** `resolved` (beat ≥ 5) fills the progress bar + count as the package
 *  assembles. `settled` (pipeline complete — final pill idle) finishes
 *  the last "Filling…" form → "Filled" and bumps the count 22→23, so the
 *  "Completed" header badge doesn't contradict an in-progress form. */
export function BidPackageCard({
    className,
    resolved = true,
    settled = true,
}: {
    className?: string;
    resolved?: boolean;
    settled?: boolean;
}) {
    // Once the pipeline settles, any still-filling form completes.
    const forms = settled
        ? FORMS.map((f) =>
              f.status === 'filling'
                  ? { ...f, status: 'filled' as FormStatus, statusLabel: 'Filled' }
                  : f
          )
        : FORMS;
    return (
        <div
            className={cn(
                'rounded-xl border border-border/60 bg-card/80 shadow-xl shadow-primary/20 p-2.5 w-full sm:w-[240px]',
                className
            )}
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    <FolderCheck className="h-3 w-3 text-primary" />
                    <p className="text-[11px] font-semibold text-foreground">
                        Bid Package Creation
                    </p>
                </div>
                <span className="text-[9px] font-medium text-foreground/60 px-1.5 py-0.5 rounded bg-foreground/5">
                    Pre-Award
                </span>
            </div>

            {/* Progress — inline single line */}
            <div className="mb-2">
                <div className="flex items-baseline justify-between mb-1">
                    <span className="text-[9px] text-foreground/55 uppercase tracking-wider font-medium">
                        Forms Ready
                    </span>
                    <ValueSwap
                        show={resolved}
                        className="text-[11px] font-semibold text-foreground tabular-nums"
                    >
                        {settled ? '23 / 25' : '22 / 25'}
                    </ValueSwap>
                </div>
                <div className="h-1 rounded-full bg-foreground/10 overflow-hidden">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: resolved ? (settled ? '92%' : '88%') : 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>

            {/* Form rows — skeleton placeholders while processing (beat 4),
                then the real rows stagger in as the package resolves (beat 5).
                Each real row is always in flow (opacity-gated) so it reserves
                the row height; the skeleton overlays it — zero reflow. */}
            <div className="space-y-1">
                {forms.map((form, i) => {
                    const style = STATUS_STYLES[form.status];
                    const Icon = style.icon;
                    return (
                        <div key={form.code} className="relative">
                            <motion.div
                                className="flex items-center gap-1.5 rounded-md border border-border/40 bg-background/50 px-1.5 py-1"
                                initial={{ opacity: 0, x: -6 }}
                                animate={resolved ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                                transition={{
                                    duration: 0.3,
                                    delay: resolved ? i * 0.12 : 0,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <Icon className={cn('h-2.5 w-2.5 shrink-0', style.iconClass)} />
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-medium text-foreground truncate leading-tight">
                                        {form.code}: {form.name}
                                    </p>
                                </div>
                                <span
                                    className={cn(
                                        'text-[8.5px] font-medium px-1.5 py-0.5 rounded border shrink-0 whitespace-nowrap',
                                        style.pillClass
                                    )}
                                >
                                    {form.statusLabel}
                                </span>
                            </motion.div>
                            {!resolved && (
                                <div className="absolute inset-0 flex items-center gap-1.5 rounded-md border border-border/40 bg-background/50 px-1.5 py-1">
                                    <span className="h-2.5 w-2.5 shrink-0 rounded bg-foreground/15 animate-pulse" />
                                    <span className="h-2 flex-1 rounded bg-foreground/15 animate-pulse" />
                                    <span className="h-3.5 w-9 shrink-0 rounded bg-foreground/10 animate-pulse" />
                                </div>
                            )}
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
                <span>View All 25 Forms</span>
                <ArrowUpRight className="h-3 w-3" />
            </motion.div>
        </div>
    );
}
